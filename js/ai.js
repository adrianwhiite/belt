import {S} from './state.js';
import {$,esc} from './util.js';
import {cache,ctx,ensureCtx} from './audio.js';
import {CATALOG,renderWheel,updateCounts} from './picker.js';
import {closeSheet,openSheet,tracksFor} from './stage.js';
import {SONG_BY_ID,kv,toWav,toast} from './account.js';
import {MELODY_V,OWN,alignToMelody,buildOwnLines,extractMelody,monoOf,setRange} from './own.js';
import {checks,closeOwn,openOwn,ownFound,ownView,pause,pendingOwn,saveOwnPatch,tick} from './own-setup.js';

/* Smart setup through the belt-ai server function (keys live there, never in the app) */
export const aiOn=()=>!!(S.sb&&S.user);
async function fnError(error){let m=error&&error.message||'Request failed';try{const r=error.context;if(r&&r.json){const b=await r.clone().json();m=b.error||b.message||b.msg||m;if(r.status)m+=` (${r.status})`;}}catch(e){try{const t=await error.context.text();if(t)m=t.slice(0,200);}catch(e2){}}return new Error(m);}
export async function ai(action,payload,retried){const {data,error}=await S.sb.functions.invoke('belt-ai',{body:{action,...payload}});
  if(error){const st=error.context&&error.context.status;if(st===401&&!retried){try{await S.sb.auth.refreshSession();}catch(e){}return ai(action,payload,true);}throw await fnError(error);}if(data&&data.error)throw new Error(data.error);return data;}
export const b64=blob=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(blob);});
export function clipWav(buf,t0,dur){const x=monoOf(buf),sr=buf.sampleRate,a=Math.max(0,Math.floor(t0*sr));return toWav(x.subarray(a,Math.min(x.length,a+Math.floor(dur*sr))),sr,16000);}
async function aiJudge(backBuf,vb,notes,guess){
  const v0=Math.max(0,(notes[0]?notes[0].t:0)-2);
  return ai('judge',{backing:await b64(clipWav(backBuf,0,45)),vocal:await b64(clipWav(vb,v0,45)),guess:{title:guess.title,artist:guess.artist}});
}
// The vocal goes to private storage for a one-hour link AudioShake can read, then it's deleted.
async function aiSync(vfile,vb,id){
  let blob=vfile,ext=(vfile.name.split('.').pop()||'').toLowerCase();
  if(!['mp3','wav','flac','aiff'].includes(ext)){blob=toWav(monoOf(vb),vb.sampleRate,16000);ext='wav';}
  const path=`${S.user.id}/align/${id}-${Date.now()}.${ext}`;
  const up=await S.sb.storage.from('takes').upload(path,blob,{contentType:ext==='mp3'?'audio/mpeg':'audio/'+ext});if(up.error)throw up.error;
  try{
    const su=await S.sb.storage.from('takes').createSignedUrl(path,3600);if(su.error)throw su.error;
    const {id:task}=await ai('align_start',{url:su.data.signedUrl});
    for(let i=0;i<80;i++){await pause(3000);const r=await ai('align_poll',{id:task});
      if(r.status==='completed')return wordsFrom(r.data,vb.duration);if(r.status==='error')throw new Error(r.error);}
    throw new Error('Alignment took too long');
  }finally{S.sb.storage.from('takes').remove([path]);}
}
// The song goes to private storage for a one-hour link the separation service can read, then it's deleted.
// Upload the smallest thing that works: the file itself when it's an audio format the service reads
// (an iTunes .m4a is a fifth the size of the same song as WAV), otherwise the soundtrack as WAV.
// onTask is called as soon as the separation is done, before the parts are downloaded, so word timing can start right away.
const SPLIT_READS=['mp3','wav','flac','aiff','aif','m4a','aac','ogg','oga','opus','mp4','m4v','mov'],MIME={mp3:'audio/mpeg',m4a:'audio/mp4',aac:'audio/aac',mp4:'video/mp4',m4v:'video/mp4',mov:'video/quicktime'};
export async function aiSplit(file,buf,id,onTask){
  const ext0=(file.name.split('.').pop()||'').toLowerCase(),wavBytes=buf.duration*32000*4;
  const asIs=SPLIT_READS.includes(ext0)&&file.size<=Math.min(45e6,['mp3','wav','flac','aiff','aif'].includes(ext0)?45e6:wavBytes);
  try{return await splitOnce(asIs?file:stereoWav(buf,32000),asIs?ext0:'wav',id,onTask);}
  catch(e){ // the service couldn't read that format: send the plain soundtrack instead
    if(!asIs||ext0==='wav'||/too long|Uploading|401|402|429/i.test(String(e&&e.message)))throw e;
    console.warn('split retry as wav',e);return splitOnce(stereoWav(buf,32000),'wav',id,onTask);
  }
}
async function splitOnce(blob,ext,id,onTask){
  const path=`${S.user.id}/split/${id}-${Date.now()}.${ext}`;
  const stage=async(name,fn)=>{try{return await fn();}catch(e){throw new Error(`${name}: ${e&&e.message||e}`);}};
  await stage('Uploading the song',async()=>{const up=await S.sb.storage.from('takes').upload(path,blob,{contentType:MIME[ext]||'audio/'+ext});if(up.error)throw up.error;});
  try{
    const url=await stage('Sharing the song',async()=>{const su=await S.sb.storage.from('takes').createSignedUrl(path,3600);if(su.error)throw su.error;return su.data.signedUrl;});
    const {id:task}=await stage('Starting the separation',()=>ai('split_start',{url}));
    let parts=[];
    for(let i=0;;i++){
      if(i>200)throw new Error('Separation took too long');
      await pause(i<4?1500:2500);const r=await stage('Checking the separation',()=>ai('split_poll',{id:task}));
      if(r.status==='completed'){parts=r.parts||[];break;}if(r.status==='error')throw new Error(r.error);
    }
    if(onTask)onTask(task);
    return await stage('Downloading the parts',async()=>{
      // the band comes back as one "everything but the singer" part, or as drums, bass and other to mix together
      const whole=['no_vocals','no_stem','accompaniment','instrumental'].some(k=>parts.includes(k)),rest=parts.filter(k=>k!=='vocals'&&!k.startsWith('no_'));
      const instP=whole||!rest.length?fetchPart(task,'instrumental'):rest.length===1?fetchPart(task,rest[0])
        :Promise.all(rest.map(async k=>ctx.decodeAudioData(await (await fetchPart(task,k)).arrayBuffer()))).then(mixToWav);
      const [vocal,inst]=await Promise.all([fetchPart(task,'vocals'),instP]);
      return {task,vocal,inst};
    });
  }finally{S.sb.storage.from('takes').remove([path]);}
}
// The soundtrack only, as a 16-bit stereo WAV at a modest rate; falls back to mono if it would be too big to store.
function stereoWav(buf,rate){
  const n=Math.floor(buf.length*rate/buf.sampleRate),ch=n*4>45e6?1:2,L=buf.getChannelData(0),R=buf.numberOfChannels>1?buf.getChannelData(1):L,k=buf.sampleRate/rate;
  const ab=new ArrayBuffer(44+n*2*ch),v=new DataView(ab),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2*ch,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);
  v.setUint32(24,rate,true);v.setUint32(28,rate*2*ch,true);v.setUint16(32,2*ch,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2*ch,true);
  const at=(x,p)=>{const i=Math.floor(p),f=p-i;return x[i]+((x[i+1]??x[i])-x[i])*f;};
  for(let i=0;i<n;i++){const p=i*k;if(ch===2){v.setInt16(44+i*4,Math.max(-1,Math.min(1,at(L,p)))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,at(R,p)))*32767,true);}
    else v.setInt16(44+i*2,Math.max(-1,Math.min(1,(at(L,p)+at(R,p))/2))*32767,true);}
  return new Blob([ab],{type:'audio/wav'});
}
// adds stems together and writes a 16-bit stereo WAV
function mixToWav(bufs){
  const sr=bufs[0].sampleRate,n=Math.max(...bufs.map(b=>b.length)),L=new Float32Array(n),R=new Float32Array(n);
  for(const b of bufs){const l=b.getChannelData(0),r=b.numberOfChannels>1?b.getChannelData(1):l;for(let i=0;i<b.length;i++){L[i]+=l[i];R[i]+=r[i];}}
  const ab=new ArrayBuffer(44+n*4),v=new DataView(ab),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*4,true);
  for(let i=0;i<n;i++){v.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true);}
  return new Blob([ab],{type:'audio/wav'});
}
// WhisperX listens to the separated singer and reports when each word is sung.
export async function aiWords(task,lrc,dur){
  const prompt=lrc.map(l=>l.text).filter(Boolean).join(' ');
  const {id}=await ai('words_start',{splitId:task,prompt});
  for(let i=0;i<220;i++){await pause(i<3?1500:2500);const r=await ai('words_poll',{id});
    if(r.status==='completed')return wordsFrom(r.data,dur);if(r.status==='error')throw new Error(r.error);}
  throw new Error('Word timing took too long');
}
async function fetchPart(task,model){
  const {data,error}=await S.sb.functions.invoke('belt-ai',{body:{action:'fetch_output',id:task,model}});
  if(error)throw await fnError(error);if(!(data instanceof Blob))throw new Error((data&&data.error)||'No audio came back');return data;
}
async function aiAlignTask(task,dur){
  const {id}=await ai('align_start',{taskId:task,model:'vocals_lead'});
  for(let i=0;i<80;i++){await pause(3000);const r=await ai('align_poll',{id});
    if(r.status==='completed')return wordsFrom(r.data,dur);if(r.status==='error')throw new Error(r.error);}
  throw new Error('Alignment took too long');
}
// Pulls word timings out of the alignment result, whatever its exact shape.
function wordsFrom(data,dur){
  const out=[];
  const walk=o=>{if(Array.isArray(o)){o.forEach(walk);return;}if(!o||typeof o!=='object')return;
    const tx=o.text??o.word??o.value,st=o.start??o.startTime??o.start_time??o.begin,en=o.end??o.endTime??o.end_time;
    if(typeof tx==='string'&&typeof st==='number'&&typeof en==='number'&&tx.trim()&&!/\s/.test(tx.trim()))out.push({w:tx.trim(),s:st,e:en});
    for(const k in o)if(o[k]&&typeof o[k]==='object')walk(o[k]);};
  walk(data);out.sort((a,b)=>a.s-b.s);
  if(out.length&&out[out.length-1].e>dur*5)out.forEach(x=>{x.s/=1000;x.e/=1000;});
  return out.filter((x,i)=>!i||x.s!==out[i-1].s||x.w!==out[i-1].w);
}
// Matches the words AudioShake heard to the lyric words, then fills any gaps inside a line.
const nw=w=>w.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'');
const sameWord=(a,b)=>a===b||(a.length>=3&&b.length>=3&&(a.startsWith(b.slice(0,3))&&b.startsWith(a.slice(0,3))));
export function mapWords(lrc,heard){
  if(!heard||heard.length<10)return null;
  const lines=lrc.filter(l=>l.text&&!/^[♪♫\s]+$/.test(l.text)).map(l=>l.text.match(/\S+\s*/g)||[l.text]);
  const A=[];lines.forEach((ws,li)=>ws.forEach((w,wi)=>A.push({li,wi,n:nw(w)})));
  const B=heard.map(h=>nw(h.w)),n=A.length,m=B.length,W=m+1,sc=new Float32Array((n+1)*W),bt=new Uint8Array((n+1)*W);
  for(let i=1;i<=n;i++){sc[i*W]=-i;bt[i*W]=1;}for(let j=1;j<=m;j++){sc[j]=-j;bt[j]=2;}
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){
    const d=sc[(i-1)*W+j-1]+(sameWord(A[i-1].n,B[j-1])?2:-1),u=sc[(i-1)*W+j]-1,l=sc[i*W+j-1]-1;
    if(d>=u&&d>=l){sc[i*W+j]=d;bt[i*W+j]=0;}else if(u>=l){sc[i*W+j]=u;bt[i*W+j]=1;}else{sc[i*W+j]=l;bt[i*W+j]=2;}}
  const hit=new Array(n).fill(null);
  for(let i=n,j=m;i>0&&j>0;){const b=bt[i*W+j];if(b===0){if(sameWord(A[i-1].n,B[j-1]))hit[i-1]=heard[j-1];i--;j--;}else if(b===1)i--;else j--;}
  const wt=lines.map(()=>null);let k=0;
  lines.forEach((ws,li)=>{
    const h=ws.map((_,wi)=>hit[k+wi]);k+=ws.length;
    if(h.filter(Boolean).length<Math.max(1,ws.length*.3))return;
    const t=h.map(x=>x?[x.s,x.e]:null);
    for(let i=0;i<t.length;i++){if(t[i])continue;let j=i;while(j<t.length&&!t[j])j++;
      const a=i?t[i-1][1]:t[j][0]-.3*(j-i),b=j<t.length?t[j][0]:t[i-1][1]+.3*(j-i),step=(b-a)/(j-i);
      for(let q=i;q<j;q++)t[q]=[a+step*(q-i),a+step*(q-i+1)];i=j;}
    wt[li]=t.map(([a,b])=>[+a.toFixed(3),+b.toFixed(3)]);
  });
  return wt.some(Boolean)?wt:null;
}
let vocalTarget=null;
export function pickVocal(t){vocalTarget=t;const f=$('vocalFile');f.value='';f.click();}
$('ownVocal').onclick=()=>pickVocal('pending');
$('vocalFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)addVocal(f,vocalTarget);};
async function addVocal(file,tgt){
  const pend=tgt==='pending';if(pend&&!pendingOwn)return;
  ensureCtx();if(!pend)closeSheet();
  const job=++S.ownJob;openOwn();ownView('work');
  checks('Getting you in sync',['Learning the melody','Syncing the words to the singer','Mic check']);tick(0,'active');
  const back=()=>{if(pend)ownFound();else closeOwn();};
  let vb;try{vb=await ctx.decodeAudioData(await file.arrayBuffer());}catch(e){back();toast('That file won’t play here. Try an MP3, M4A or WAV file.');return;}
  const dur=pend?pendingOwn.buf.duration:tgt.len,tau=pend?pendingOwn.an.tau:tgt.an.tau;
  if(Math.abs(vb.duration-dur)>1.5){back();toast('That vocal is a different length from your track. Download both from the same song.');return;}
  const notes=await extractMelody(vb,tau);if(job!==S.ownJob)return;
  if(notes.length<20){back();toast('We couldn’t hear a lead vocal in that file. Pick the solo Lead Vocal download.');return;}
  const lrc=pend?pendingOwn.found.lrc:tgt.lrc,al=alignToMelody(notes,lrc);
  let wt=null,verdict=null;
  if(aiOn()){
    // smart setup: Gemini listens to both files while AudioShake times every word
    const items=['Learning the melody','Listening to your files','Syncing every word to the singer','Mic check'];
    $('ownChecks').innerHTML=items.map(t=>`<li>${esc(t)}</li>`).join('');tick(0);tick(1,'active');tick(2,'active');
    const backBuf=pend?pendingOwn.buf:(await tracksFor(tgt)).back,guess=pend?pendingOwn.found:tgt;
    const jP=aiJudge(backBuf,vb,notes,guess).then(r=>{verdict=r;}).catch(e=>console.warn('judge',e)).finally(()=>tick(1));
    const sP=pause(400).then(()=>tick(2));
    await Promise.all([jP,sP]);if(job!==S.ownJob)return;tick(3,'active');await pause(400);tick(3);await pause(300);
  }else{
    tick(0);tick(1,'active');await pause(500);tick(1);tick(2,'active');await pause(450);tick(2);await pause(350);if(job!==S.ownJob)return;
  }
  if(verdict&&verdict.problems&&verdict.problems.length)toast(verdict.problems[0]);
  if(pend){pendingOwn.vocal={file,vb,notes,al,wt,ai:verdict};ownFound();return;}
  if(al!=null)tgt.autoOff=al;tgt.wt=wt;
  tgt.notes=tgt.rawNotes=notes;setRange(tgt);buildOwnLines(tgt);
  await saveOwnPatch(tgt.id,{vocal:file,notes,mv:MELODY_V,autoOff:tgt.autoOff,userOff:0,wt,ai:verdict});
  const tr=await tracksFor(tgt);cache[tgt.id]=Promise.resolve({back:tr.back,guide:vb});
  closeOwn();openSheet(tgt);toast('In sync and ready to sing');
}
$('ownRemove').onclick=async()=>{
  const s=S.current;if(!s||!s.own)return;
  await kv('del','track:'+s.id);const ids=((await kv('get','own:list'))||[]).filter(x=>x!==s.id);await kv('put','own:list',ids);
  const i=CATALOG.findIndex(c=>c.song===s);if(i>=0)CATALOG.splice(i,1);
  delete OWN[s.id];delete SONG_BY_ID[s.id];delete cache[s.id];updateCounts();closeSheet();
  renderWheel(CATALOG.find(c=>c.song));toast('Removed from this device');
};
$('scrim').addEventListener('click',()=>{if($('ownSheet').classList.contains('on'))closeOwn();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('ownSheet').classList.contains('on'))closeOwn();});
