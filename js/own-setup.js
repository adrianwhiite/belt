import {S} from './state.js';
import {$,esc} from './util.js';
import {cache,ctx,ensureCtx} from './audio.js';
import {CATALOG,VIEW,focusIdx,hay,nq,paintTonight,renderChips,renderWheel,updateCounts} from './picker.js';
import {findScene,openSheet} from './stage.js';
import {SONG_BY_ID,authFor,kv,toast} from './account.js';
import {MELODY_V,OWN,OWN_PAL,alignToMelody,analyzeTrack,extractMelody,keyName,makeOwnSong,parseLRC} from './own.js';
import {ai,aiOn,aiSplit,aiWords,b64,clipWav,mapWords} from './ai.js';

/* Recognition: tags or file name -> LRCLIB (song + synced lyrics) -> MusicBrainz (year) */
const JUNK_RX=/karaoke|backing track|instrumental|in the style of|originally performed|made popular|without (lead )?vocals?|no lead vocals?|with backing vocals|minus one|playback|custom|cover version/i;
// iTunes-style MP4 tags: a ©nam (title) or ©ART (artist) box holding a 'data' box with UTF-8 text
function readMp4Tags(u){
  const out={},find=(a,b,c,d)=>{for(let i=0;i+24<u.length;i++){if(u[i]===a&&u[i+1]===b&&u[i+2]===c&&u[i+3]===d&&u[i+8]===0x64&&u[i+9]===0x61&&u[i+10]===0x74&&u[i+11]===0x61){
    const sz=((u[i+4]<<24)>>>0)+(u[i+5]<<16)+(u[i+6]<<8)+u[i+7];if(sz<17||sz>2000)continue;
    try{return new TextDecoder('utf-8').decode(u.subarray(i+20,i+4+sz)).trim();}catch(e){}}}return '';};
  const t=find(0xA9,0x6E,0x61,0x6D),a=find(0xA9,0x41,0x52,0x54);if(t)out.TIT2=t;if(a)out.TPE1=a;return out;
}
function cleanName(s){
  return String(s||'').replace(/\s*[-–|]?\s*https?:\/\/\S+/gi,' ').replace(/\.[a-z0-9]{2,4}$/i,'').replace(/[_]+/g,' ').replace(/[♂♀★☆♪♫|]+/g,' - ')
    .replace(/\((official|music|lyric)[^)]*\)|\[(official|music|lyric)[^\]]*\]/gi,' ').replace(/\b(official (music )?video|lyric video|hd|4k)\b/gi,' ')
    .replace(/\(([^)]*)\)|\[([^\]]*)\]/g,(m,a,b)=>JUNK_RX.test(a||b||'')?' ':m)
    .replace(/\b(karaoke version|karaoke|custom backing track|backing track|instrumental)\b/ig,' ')
    .replace(/\s*-\s*$/,'').replace(/\s{2,}/g,' ').trim();
}
const cleanTitle=s=>String(s||'').replace(/\s*[-–]\s*(\d{4}\s*)?(remaster(ed)?|mono|stereo|single version|radio edit).*$/i,'').replace(/\s*\((\d{4}\s*)?remaster[^)]*\)/i,'').trim();
const norm=s=>cleanTitle(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();
function readTags(u){
  const out={};if(u.length<10||u[0]!==0x49||u[1]!==0x44||u[2]!==0x33)return out;
  const ver=u[3],ss=o=>(u[o]<<21)|(u[o+1]<<14)|(u[o+2]<<7)|u[o+3],be=o=>((u[o]<<24)>>>0)+(u[o+1]<<16)+(u[o+2]<<8)+u[o+3];
  if(ver<3)return out;
  let p=10;const end=Math.min(u.length,10+ss(6));
  if(u[5]&0x40)p+=ver===4?ss(10):be(10)+4;
  const dec=b=>{const e=b[0],d=b.subarray(1);try{let s;
    if(e===0)s=new TextDecoder('windows-1252').decode(d);else if(e===3)s=new TextDecoder('utf-8').decode(d);
    else if(e===1)s=new TextDecoder(d[0]===0xFE&&d[1]===0xFF?'utf-16be':'utf-16le').decode(d);else s=new TextDecoder('utf-16be').decode(d);
    return s.replace(/^﻿/,'').split('\u0000')[0].trim();}catch(err){return '';}};
  while(p+10<=end){
    const id=String.fromCharCode(u[p],u[p+1],u[p+2],u[p+3]);if(!/^[A-Z0-9]{4}$/.test(id))break;
    const sz=ver===4?ss(p+4):be(p+4);if(sz<=0)break;
    if(id==='TIT2'||id==='TPE1'||id==='TALB')out[id]=dec(u.subarray(p+10,Math.min(end,p+10+sz)));
    p+=10+sz;
  }
  return out;
}
function guessSong(tags,fileName){
  let title=cleanName(tags.TIT2),artist=JUNK_RX.test(tags.TPE1||'')?'':cleanName(tags.TPE1);
  if(title&&!artist){const m=title.split(/\s+[-–]\s+/).map(x=>x.trim()).filter(Boolean);if(m.length===2){artist=m[0];title=m[1];}}
  const fn=cleanName(String(fileName||'').replace(/^\s*\d{1,2}(-\d{1,2})?[\s._-]+(?=\D)/,'')); // "01 Song.m4v" -> "Song"
  if(!title){const m=fn.split(/\s+[-–]\s+/);if(m.length===2){artist=artist||m[0];title=m[1];}}
  return {title,artist,query:title?((artist?artist+' ':'')+title):fn};
}
export async function getJSON(url,ms){
  const ac=new AbortController(),to=setTimeout(()=>ac.abort(),ms||9000);
  try{const r=await fetch(url,{signal:ac.signal});if(!r.ok)throw new Error('http '+r.status);return await r.json();}finally{clearTimeout(to);}
}
const VARIANT=/\b(live|remix|acoustic|demo|instrumental|karaoke|edit|version|cover|sped up|slowed)\b/i;
function pickLyrics(list,q,dur){
  const qt=new Set(norm(q.query).split(' ').filter(Boolean));let best=null,bs=-1e9;
  for(const r of list||[]){
    if(!r||!r.syncedLyrics||r.instrumental)continue;
    const ct=norm(r.artistName+' '+r.trackName).split(' ').filter(Boolean),hit=ct.filter(w=>qt.has(w)).length;
    let s=3*hit/Math.max(1,new Set([...qt,...ct]).size);
    if(q.title&&norm(r.trackName)===norm(q.title))s+=1.5;
    if(dur&&r.duration)s-=Math.min(3,Math.abs(r.duration-dur)/10);
    if(VARIANT.test(r.trackName+' '+(r.albumName||''))&&!VARIANT.test(q.query))s-=1.2;
    if(s>bs){bs=s;best=r;}
  }
  return best;
}
async function findYear(title,artist){
  const t=title.replace(/"/g,''),a=artist.replace(/"/g,''),nt=norm(title);let y=null;
  try{
    const j=await getJSON(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(`recording:"${t}" AND artist:"${a}"`)}&fmt=json&limit=50`,7000);
    for(const r of j.recordings||[]){if((r.score??100)<80||norm(r.title)!==nt)continue;const d=r['first-release-date'];if(d&&/^\d{4}/.test(d)){const v=+d.slice(0,4);if(!y||v<y)y=v;}}
  }catch(e){}
  if(y)return y;
  try{
    const j=await getJSON(`https://itunes.apple.com/search?term=${encodeURIComponent(a+' '+t)}&entity=song&limit=15`,7000);
    for(const r of j.results||[]){if(!norm(r.trackName).startsWith(nt))continue;const v=+String(r.releaseDate||'').slice(0,4);if(v&&(!y||v<y))y=v;}
  }catch(e){}
  return y;
}
async function findSong(q,dur){
  let list=[];const enc=encodeURIComponent;
  try{
    if(q.title&&q.artist)list=await getJSON(`https://lrclib.net/api/search?track_name=${enc(q.title)}&artist_name=${enc(q.artist)}`);
    if(!pickLyrics(list,q,dur)&&q.query)list=(list||[]).concat(await getJSON(`https://lrclib.net/api/search?q=${enc(q.query)}`));
  }catch(e){return {err:'net'};}
  const best=pickLyrics(list,q,dur);if(!best)return {err:'none'};
  const title=cleanTitle(best.trackName),artist=best.artistName;
  const year=await findYear(title,artist);
  return {title,artist,album:cleanTitle(best.albumName||''),year,lrc:parseLRC(best.syncedLyrics),lrcDur:best.duration||0};
}
async function fileId(f){
  const head=new Uint8Array(await f.slice(0,1<<20).arrayBuffer());
  try{const h=new Uint8Array(await crypto.subtle.digest('SHA-256',head));return 'own-'+[...h.slice(0,6)].map(x=>x.toString(16).padStart(2,'0')).join('')+f.size.toString(36);}
  catch(e){let h=2166136261;for(const x of head){h^=x;h=Math.imul(h,16777619);}return 'own-'+(h>>>0).toString(16)+f.size.toString(36);}
}

/* Library: own tracks live in this browser (IndexedDB) and sit at the top of the wheel */
function addToWheel(song){
  OWN[song.id]=song;SONG_BY_ID[song.id]=song;hay.clear();
  const i=CATALOG.findIndex(c=>c.song&&c.song.id===song.id);const item={title:song.title,artist:song.artist||'Your track',color:song.color,song};
  if(i>=0)CATALOG[i]=item;else CATALOG.unshift(item);updateCounts();return item;
}
export async function loadOwnLibrary(){
  const ids=(await kv('get','own:list'))||[];
  for(const id of ids){const rec=await kv('get','track:'+id);if(rec&&rec.lrc&&rec.an)try{addToWheel(makeOwnSong(rec));}catch(e){}}
  if(ids.length&&$('pick').classList.contains('on'))renderWheel(VIEW[focusIdx]);
  paintTonight();
}
export async function saveOwnPatch(id,patch){const rec=await kv('get','track:'+id);if(!rec)return;Object.assign(rec,patch);await kv('put','track:'+id,rec);}

/* The upload flow */
export let pendingOwn=null;S.ownJob=0;
export function checks(title,items){['ownWorkErr','ownWorkWhy','ownWorkClose'].forEach(i=>$(i).hidden=true);$('ownStep').textContent=title;$('ownChecks').innerHTML=items.map(t=>`<li>${esc(t)}</li>`).join('');}
export function tick(i,state){const li=$('ownChecks').children[i];if(li)li.dataset.s=state||'done';}
export const pause=ms=>new Promise(r=>setTimeout(r,ms));
export function ownView(v){$('ownWork').hidden=v!=='work';$('ownFound').hidden=v!=='found';$('ownForm').hidden=v!=='form';}
export function openOwn(){$('scrim').classList.add('on');$('ownSheet').classList.add('on');}
export function closeOwn(){S.ownJob++;$('ownSheet').classList.remove('on');if(!$('sheet').classList.contains('on')&&!$('authSheet').classList.contains('on'))$('scrim').classList.remove('on');}
function ownForm(msg){
  ownView('form');const e=$('ownErr');e.hidden=!msg;e.textContent=msg||'';
  const q=pendingOwn.q||{},h=q.heard||q;$('ownQ').value=h.title?(h.title+(h.artist?' '+h.artist:'')):'';$('ownSugg').innerHTML='';
  setTimeout(()=>{$('ownQ').focus();if($('ownQ').value)suggest();},50);
}
// Suggestions from MusicBrainz, the open music catalog: partial words work, best matches first.
let suggT=0,suggN=0,suggList=[];
async function mbSuggest(text){
  const toks=nq(text).split(' ').filter(Boolean).slice(0,6);if(!toks.length)return [];
  const clause=(t,i)=>{const w=t+(i===toks.length-1&&t.length>1?'*':'');return `(recording:${w} OR artist:${w})`;};
  const j=await getJSON(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(toks.map(clause).join(' AND '))}&fmt=json&limit=40`,7000);
  const seen=new Map();
  for(const r of j.recordings||[]){
    if(r.video)continue;const artist=(r['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('').trim();if(!artist||!r.title)continue;
    const key=nq(cleanTitle(r.title))+'|'+nq(artist),y=+String(r['first-release-date']||'').slice(0,4)||null;
    const pen=VARIANT.test(r.title+' '+(r.disambiguation||''))?25:0,sc=(r.score||0)-pen;
    const o=seen.get(key);if(!o)seen.set(key,{title:cleanTitle(r.title),artist,year:y,sc,hits:1});else{o.hits++;o.sc=Math.max(o.sc,sc);if(y&&(!o.year||y<o.year))o.year=y;}
  }
  // songs with many recordings (well-known ones) rise to the top
  return [...seen.values()].sort((a,b)=>(b.sc+Math.min(20,b.hits*2))-(a.sc+Math.min(20,a.hits*2))).slice(0,6);
}
function suggest(){
  clearTimeout(suggT);const text=$('ownQ').value.trim(),n=++suggN;
  if(text.length<2){$('ownSugg').innerHTML='';$('ownQ').setAttribute('aria-expanded','false');return;}
  suggT=setTimeout(async()=>{
    let list=[];try{list=await mbSuggest(text);}catch(e){}
    if(n!==suggN)return;suggList=list;
    $('ownSugg').innerHTML=list.length?list.map((x,i)=>`<li><button type="button" role="option" data-i="${i}"><i style="background:${OWN_PAL[i%OWN_PAL.length]}"></i><span><b>${esc(x.title)}</b><small>${esc(x.artist)}${x.year?', '+x.year:''}</small></span></button></li>`).join('')
      :'<li class="hint">No matches yet. Keep typing, or tap Find lyrics to search anyway.</li>';
    $('ownQ').setAttribute('aria-expanded',String(!!list.length));
  },380);
}
$('ownQ').oninput=suggest;
$('ownSugg').onclick=e=>{const b=e.target.closest('button');if(!b)return;const x=suggList[+b.dataset.i];if(x)lookForLyrics({title:x.title,artist:x.artist,query:x.artist+' '+x.title,year:x.year});};
export function ownFound(){
  const p=pendingOwn,f=p.found,an=p.an,v=p.vocal;ownView('found');
  $('ownTitle').textContent=f.title;
  $('ownBy').textContent=f.artist+(f.year?`, ${f.year}`:'');
  $('ownAlbum').textContent=f.album?`From ${f.album}`:'';$('ownAlbum').hidden=!f.album;
  const segs=an.segs,ch=segs.length-1;
  const facts=[v&&p.inst?'Singer and band separated':'',
    v?`Melody read from the singer, ${v.notes.length} notes`:'',
    v&&v.wt?`Every word timed by listening, ${v.wt.filter(Boolean).length} of ${f.lrc.filter(l=>l.text).length} lines`:v&&v.al!=null?'Lines matched to the singer’s phrases':`Synced lyrics, ${f.lrc.filter(l=>l.text).length} lines`,
    segs.length?(ch?`Starts in ${keyName(segs[0].k)}, then changes key ${ch===1?'once':ch+' times'}`:`In ${keyName(segs[0].k)}`):'',
    ...((v&&v.ai&&v.ai.problems)||[]).slice(0,2).map(x=>'Heads up: '+x)];
  $('ownFacts').innerHTML=facts.filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('');
  $('ownFine').textContent='Your song stays on this device. To separate the singer, it’s sent briefly to our audio partner, then deleted. Lyrics come from LRCLIB, for personal practice.';
  $('ownVocal').hidden=!!v||!!p.splitP;$('ownGo').hidden=!v;
  (v?$('ownGo'):$('ownWrong')).focus();
}
const OWN_STEPS=['Reading the label','Finding the words','Separating the singer from the band','Learning the melody','Syncing every word to the singer','Mic check'];
function ownFail(i,msg,e){
  tick(i,'fail');$('ownWorkErr').hidden=false;$('ownWorkErr').textContent=msg;
  const d=$('ownWorkWhy');d.hidden=!e;d.textContent=e?'Details: '+String(e.message||e).slice(0,240):'';$('ownWorkClose').hidden=false;
}
function setupError(e){
  const m=String(e&&e.message||e||'');
  if(/credit|balance|insufficient|payment|billing/i.test(m))return 'Your Replicate account needs billing set up. Add a payment method at replicate.com, then try again.';
  if(/REPLICATE_API_TOKEN|unauthenticated|invalid token|authentication token|authentication credentials/i.test(m))return 'The Replicate token is missing or wrong. Check the function secrets in Supabase.';
  if(/sign in/i.test(m))return 'Sign in, then add your song again.';
  if(/not set in the function secrets/i.test(m))return 'A key is missing in Supabase. Check the function secrets.';
  if(/unknown action/i.test(m))return 'The Belt server function needs updating. Redeploy belt-ai in Supabase.';
  if(/invalid jwt|\(401\)/i.test(m))return 'The server didn’t accept your sign-in. Turn off Verify JWT for belt-ai, or sign in again.';
  return 'Couldn’t separate the singer. The details below say where it stopped.';
}
// One file in: the song as you normally hear it. Out: backing track, melody, word-perfect lyrics.
async function ingestOwn(file){
  if(!aiOn()){authFor('own');return;}
  const job=++S.ownJob;ensureCtx();openOwn();ownView('work');
  checks('Setting the stage',OWN_STEPS);tick(0,'active');
  let buf;
  try{buf=await ctx.decodeAudioData(await file.arrayBuffer());}
  catch(e){if(job!==S.ownJob)return;closeOwn();toast(/\.(mp4|m4v|mov)$/i.test(file.name)?'Belt can’t read the sound in that video. Videos bought on iTunes are often copy-protected.':'That file won’t play here. Try an MP3, M4A or WAV file.');return;}
  const id=await fileId(file);
  if(OWN[id]){closeOwn();S.filter='ready';renderChips();renderWheel(CATALOG.find(c=>c.song===OWN[id]));openSheet(OWN[id]);return;}
  const head=new Uint8Array(await file.slice(0,1<<18).arrayBuffer());
  let tags=readTags(head);
  if(!tags.TIT2&&/\.(mp4|m4v|m4a|mov)$/i.test(file.name)){
    const tail=new Uint8Array(await file.slice(Math.max(0,file.size-(2<<20))).arrayBuffer());
    tags=Object.assign({},readMp4Tags(new Uint8Array(await file.slice(0,2<<20).arrayBuffer())),readMp4Tags(tail));
  }
  const q=guessSong(tags,file.name);
  await pause(300);tick(0);tick(1,'active');
  let gotTask;const taskP=new Promise(r=>gotTask=r);
  const anP=analyzeTrack(buf),splitP=aiSplit(file,buf,id,gotTask);splitP.catch(()=>{});
  const judgeP=(async()=>{try{return await ai('judge',{song:await b64(clipWav(buf,Math.min(40,buf.duration*.3),40)),guess:{title:q.title,artist:q.artist}});}catch(e){console.warn('judge',e);return null;}})();
  const found=await findSong(q,buf.duration);if(job!==S.ownJob)return;
  if(found.err==='none'){ // the label didn't lead anywhere: use the title and artist the AI heard
    $('ownChecks').children[1].querySelector&&($('ownStep').textContent='Listening for the song');
    const v=await judgeP;if(job!==S.ownJob)return;
    if(v&&v.heardTitle){const hq={title:cleanTitle(v.heardTitle),artist:v.heardArtist||'',query:(v.heardArtist?v.heardArtist+' ':'')+v.heardTitle};
      const f2=await findSong(hq,buf.duration);if(job!==S.ownJob)return;
      if(!f2.err){Object.assign(q,hq);Object.assign(found,f2);delete found.err;}else q.heard=hq;}
    $('ownStep').textContent='Setting the stage';
  }
  pendingOwn={id,file,buf,q,found,anP,splitP,judgeP,taskP};
  if(found.err==='net')return ownForm('Couldn’t reach the lyrics library. Check your connection, then search again.');
  if(found.err)return ownForm('No synced lyrics found yet. Check the song title and artist.');
  finishOwn(job);
}
async function finishOwn(job){
  const p=pendingOwn;ownView('work');checks('Setting the stage',OWN_STEPS);tick(0);tick(1);tick(2,'active');
  // word timing starts the moment the singer is separated, while the parts download and the melody is read
  if(p.wordsFor!==p.found.lrc){p.wordsFor=p.found.lrc;p.wordsP=p.taskP.then(task=>aiWords(task,p.found.lrc,p.buf.duration));p.wordsP.catch(()=>{});}
  let sp;try{sp=await p.splitP;}catch(e){if(job!==S.ownJob)return;console.warn('split',e);ownFail(2,setupError(e),e);return;}
  if(job!==S.ownJob)return;tick(2);tick(3,'active');
  let vb,ib;try{[vb,ib]=await Promise.all([ctx.decodeAudioData(await sp.vocal.arrayBuffer()),ctx.decodeAudioData(await sp.inst.arrayBuffer())]);}
  catch(e){if(job!==S.ownJob)return;closeOwn();toast('The separated parts didn’t come back right. Try again.');return;}
  const an=await p.anP,notes=await extractMelody(vb,an.tau),verdict=await p.judgeP;if(job!==S.ownJob)return;
  if(notes.length<20||(verdict&&verdict.hasLeadVocal===false)){closeOwn();toast('This file has no singing in it. Upload the song the way you normally hear it, with the singer.');return;}
  tick(3);tick(4,'active');
  const al=alignToMelody(notes,p.found.lrc);let wt=null,wordsWhy='';
  try{const heard=await p.wordsP;wt=mapWords(p.found.lrc,heard);
    if(!wt)console.warn('words: '+(wordsWhy=heard.length<10?`it heard only ${heard.length} words`:`the ${heard.length} words it heard didn’t match the lyrics`));}
  catch(e){console.warn('words',e);wordsWhy=String(e&&e.message||e).slice(0,140);} // falls back to the melody
  if(job!==S.ownJob)return;tick(4);tick(5,'active');await pause(400);tick(5);await pause(300);
  p.an=an;p.vocal={file:sp.vocal,vb,notes,al,wt,ai:verdict,wordsWhy};p.inst={blob:sp.inst,buf:ib};
  ownFound();
}
$('ownBtn').onclick=()=>{if(!aiOn()){authFor('own');return;}ensureCtx();const f=$('ownFile');f.value='';f.click();};
$('ownFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)ingestOwn(f);};
$('ownWrong').onclick=()=>ownForm('');
$('ownCancel').onclick=closeOwn;$('ownWorkClose').onclick=closeOwn;
$('ownForm').onsubmit=e=>{
  e.preventDefault();const text=$('ownQ').value.trim();if(!text)return;
  const top=suggList[0];
  lookForLyrics(top&&nq(top.title+' '+top.artist).includes(nq(text))?{title:top.title,artist:top.artist,query:top.artist+' '+top.title,year:top.year}:{title:'',artist:'',query:text});
};
async function lookForLyrics(q){
  if(!pendingOwn||!pendingOwn.buf){closeOwn();return;}
  const job=++S.ownJob;pendingOwn.q=q;
  ownView('work');checks('Setting the stage',['Finding the words']);tick(0,'active');
  const found=await findSong(q,pendingOwn.buf.duration);if(job!==S.ownJob)return;
  if(!found.err&&!found.year&&q.year)found.year=q.year;
  pendingOwn.found=found;
  if(found.err==='net')return ownForm('Couldn’t reach the lyrics library. Check your connection, then search again.');
  if(found.err)return ownForm('No synced lyrics found for that. Check the spelling, or try the artist’s name as it’s usually written.');
  if(pendingOwn.splitP)finishOwn(job);else ownFound();
};
$('ownGo').onclick=async()=>{
  const p=pendingOwn;if(!p||!p.found||p.found.err)return;
  const f=p.found,v=p.vocal,al=v?v.al:null;if(!v)return;
  const back=p.inst||{blob:p.file,buf:p.buf},d=back.buf.duration-(f.lrcDur||back.buf.duration);
  const h=parseInt(p.id.slice(4,10),16)||0;
  // a backing track a few seconds longer than the original usually has a count-in at the start
  const rec={id:p.id,title:f.title,artist:f.artist,album:f.album,year:f.year,color:OWN_PAL[h%OWN_PAL.length],lrc:f.lrc,
    autoOff:al!=null?al:d>.8&&d<8?+d.toFixed(2):0,userOff:0,lrcDur:f.lrcDur||0,an:p.an,blob:back.blob,added:Date.now(),vocal:v?v.file:null,notes:v?v.notes:null,mv:MELODY_V,wt:v?v.wt:null,ai:v?v.ai:null};
  const song=makeOwnSong(rec);cache[song.id]=Promise.resolve({back:back.buf,guide:v?v.vb:null});
  await kv('put','track:'+rec.id,rec);
  const ids=(await kv('get','own:list'))||[];if(!ids.includes(rec.id)){ids.unshift(rec.id);await kv('put','own:list',ids);}
  const item=addToWheel(song);pendingOwn=null;closeOwn();findScene(song); // pick its music video now, so it's ready on the stage
  S.filter='ready';renderChips();
  renderWheel(item);openSheet(song);
};
