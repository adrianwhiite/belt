import {S} from './state.js';
import {$,esc,pref,reduceMotion,setPref} from './util.js';
import {analyser,cache,ctx,detectPitch,ensureCtx,fakeVoice,fold,getMic,micStream,monitor,pv,releaseMic,renderTracks,scoreIt,show,stayAwake} from './audio.js';
import {AUTH,GENRE,INK,fmtLen,lenOf,poseBelter,rememberTake,stopPreview} from './picker.js';
import {showResults,stopMix} from './results.js';
import {toast} from './account.js';
import {MELODY_V,buildOwnLines,extractMelody,fakePlan,fakeVoiceOwn,loadOwnTracks,ownLive,paintMood,scoreOwn,setRange} from './own.js';
import {getJSON,saveOwnPatch} from './own-setup.js';
import {pickVocal} from './ai.js';

/* ---------- Before you sing ---------- */
let lyricStyle=pref('lyric','fill');if(!['fill','sweep','glow','bounce'].includes(lyricStyle))lyricStyle='fill';
function paintStyles(){document.querySelectorAll('.sty').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sty===lyricStyle));}
$('styles').onclick=e=>{const b=e.target.closest('.sty');if(!b)return;lyricStyle=b.dataset.sty;setPref('lyric',lyricStyle);paintStyles();};
for(const [id,d] of [['monitor','0'],['bold','0']]){const el=$(id);el.checked=pref(id,d)==='1';el.onchange=()=>setPref(id,el.checked?'1':'0');}
// the guide is its own choice per kind of song: on for the built-in tunes, off for your songs (it's the real singer)
const guideKey=()=>S.current&&S.current.own?'guideOwn':'guide';
$('guide').onchange=()=>setPref(guideKey(),$('guide').checked?'1':'0');
paintStyles();
// each style previews itself while the sheet is open
function previewStyles(t){
  if(!$('sheet').classList.contains('on'))return;
  const sp=reduceMotion?.9:(t%2400)/2400;
  document.querySelectorAll('.sty').forEach(el=>{const st=el.dataset.sty;el.querySelectorAll('span').forEach((x,j)=>{const k=Math.max(0,Math.min(1,(sp-j*.28)/.28));
    x.style.background='';x.style.webkitBackgroundClip='';x.style.backgroundClip='';x.style.color='';x.style.textShadow='';x.style.transform='';
    if(st==='fill'){x.style.background=`linear-gradient(90deg,#1d1631 ${k*100}%,rgba(29,22,49,.28) ${k*100}%)`;x.style.webkitBackgroundClip='text';x.style.backgroundClip='text';x.style.color='transparent';}
    if(st==='sweep'){x.style.color=k>0?'#fbf9ff':'#1d1631';x.style.textShadow=k>0?'0 0 0 #1d1631, 1.5px 1.5px 0 #1d1631':'none';}
    if(st==='glow'){x.style.color=k>0?'#1d1631':'rgba(29,22,49,.32)';x.style.textShadow=k>0?'0 0 12px rgba(255,255,255,.95)':'none';}
    if(st==='bounce'){x.style.color=k>0?'#1d1631':'rgba(29,22,49,.32)';x.style.transform=k>0&&k<1?'translateY(-6px)':'none';}});});
  requestAnimationFrame(previewStyles);
}
export async function openSheet(song){
  ensureCtx();S.current=song;
  document.documentElement.style.setProperty('--song',song.color);
  $('sheetTitle').textContent=song.title;
  $('sheetFirst').textContent=(song.own?[song.artist,song.year,fmtLen(lenOf(song))]:[AUTH[song.id],GENRE[song.id],fmtLen(lenOf(song))]).filter(Boolean).join(' · ');
  const own=!!song.own,mel=song.notes.length>0;
  $('guideRow').hidden=own&&!mel;$('ownRemove').hidden=!own;
  $('guideText').innerHTML=own?'Guide vocal<small>Plays the original singer quietly under you</small>':'Guide melody<small>Plays the tune softly</small>';
  $('guide').checked=pref(guideKey(),own?'0':'1')==='1';
  $('scrim').classList.add('on');$('sheet').classList.add('on');requestAnimationFrame(previewStyles);
  const st=$('start');st.disabled=true;st.textContent=own?'Loading your song':'Tuning up';
  try{S.tracks=await tracksFor(song);}
  catch(e){delete cache[song.id];if(S.current===song)st.textContent='Couldn’t open this song';return;}
  if(own&&mel&&S.tracks.guide&&song.mv<MELODY_V){ // songs set up before the melody reader improved: re-read from the saved vocal
    st.textContent='Reading the melody again';
    const notes=await extractMelody(S.tracks.guide,song.an.tau);
    if(notes.length>=20){song.notes=song.rawNotes=notes;song.mv=MELODY_V;setRange(song);buildOwnLines(song);saveOwnPatch(song.id,{notes,mv:MELODY_V});}
  }
  if(S.current===song){st.disabled=false;st.textContent=own&&!mel?'Add the vocal track':'Take the stage';}
}
export function closeSheet(){$('sheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');}
export const tracksFor=s=>cache[s.id]||(cache[s.id]=s.own?loadOwnTracks(s):renderTracks(s));
export const inKeyMode=s=>!!s.own&&!s.notes.length;
export const scoreTake=(s,v,sr,until)=>{let f=detectPitch(v,sr,s.own?512:256);if(until!=null)f=f.filter(x=>x.t<=until);return inKeyMode(s)?scoreOwn(s,f):scoreIt(s,f);};
$('scrim').onclick=()=>{closeSheet();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('sheet').classList.contains('on'))closeSheet();});
$('start').onclick=async()=>{if(S.current&&S.current.own&&!S.current.notes.length){pickVocal(S.current);return;}ensureCtx();const ok=await getMic(!$('monitor').checked);S.demo=!ok;closeSheet();readySong();};

/* ---------- Sing ---------- */
const rider=()=>$('rider')._b;
// The song waits for you: lights up, one tap to start.
// the music video: on unless you've switched it off (or asked your phone for less motion)
const videoOn=()=>pref('video',reduceMotion?'0':'1')==='1';
$('video').checked=videoOn();
$('video').onchange=()=>setPref('video',$('video').checked?'1':'0');
// One loop per kind of music. Add a scene here (and its clip in /backdrops) and point genres at it below.
const SCENES={rock:'band',pop:'pop',rap:'rap',rnb:'rnb',country:'country'};
// Belt's own songs: a live band suits the brassy and old-time ones, a singer in the spotlight suits the rest.
const SCENE_OF={saints:'rock',daisy:'rock',bday:'pop',jingle:'pop',grace:'rnb'};
// Your own songs: the artist's genres from MusicBrainz, sorted into a scene. Anything we don't have a loop for yet goes to pop.
const SCENE_WORDS=[[/country|folk|americana|bluegrass|singer-songwriter|acoustic|honky|outlaw/,'country'],
  [/rock|punk|metal|grunge|garage|indie|emo|alternative|post-|shoegaze|hardcore|ska|britpop|new wave|blues|jazz/,'rock'],
  [/hip.?hop|rap|trap|drill|grime/,'rap'],[/r&b|rnb|rhythm and blues|soul|funk|gospel|quiet storm|new jack swing|motown/,'rnb'],
  [/pop|dance|disco|house|electro|edm|k-pop|synth|latin|reggaeton/,'pop']];
function sceneFromTags(tags){
  const score={};for(const t of tags||[]){const name=String(t.name||'').toLowerCase(),w=+t.count||1;
    for(const [re,sc] of SCENE_WORDS)if(re.test(name)){score[sc]=(score[sc]||0)+w;break;}}
  const best=Object.entries(score).sort((a,b)=>b[1]-a[1])[0];return best?best[0]:null;
}
export async function findScene(song){
  if(!song.own)return SCENE_OF[song.id]||'pop';
  if(song.scene)return song.scene;
  if(!song.artist)return 'pop';
  try{
    const j=await getJSON(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent('artist:"'+song.artist.replace(/"/g,'')+'"')}&fmt=json&limit=3`,6000);
    const a=(j.artists||[]).find(x=>(+x.score||0)>=90)||(j.artists||[])[0];
    const sc=sceneFromTags([...(a&&a.genres||[]),...(a&&a.tags||[])])||'pop';
    song.scene=sc;saveOwnPatch(song.id,{scene:sc});return sc;
  }catch(e){return 'pop';}
}
function backdrop(on,song){
  const v=$('bgvid'),sg=$('sing');sg.classList.toggle('video',on);
  if(!on){v.pause();return;}
  const set=sc=>{const name=SCENES[sc]||SCENES.pop;if(v.dataset.scene===name)return;v.dataset.scene=name;v.poster=`/backdrops/${name}.jpg`;v.src=`/backdrops/${name}.mp4`;const p=v.play();if(p&&p.catch)p.catch(()=>{});};
  const known=song&&(song.own?song.scene:SCENE_OF[song.id]);
  set(known||'pop');
  if(song&&!known)findScene(song).then(sc=>{if(S.current===song&&sg.classList.contains('video'))set(sc);});
  const p=v.play();if(p&&p.catch)p.catch(()=>sg.classList.remove('video'));
}
export function readySong(){
  stopMix();S.run=null;
  const song=S.current,sg=$('sing');backdrop(videoOn(),song);sg.classList.toggle('demo',!!S.demo);$('skipIntro').hidden=true;
  $('singTitle').textContent=song.title;
  $('micLabel').textContent=S.demo?'The mic is off, so you’ll hear a pretend singer':'';
  ['lineNow','lnN1','lnN2','lnN3','lnN4'].forEach(id=>$(id).textContent='');$('breath').classList.remove('on');
  $('lyrics').className='lyrics ly-'+lyricStyle;$('left').textContent=fmtLen(song.lastEnd-Math.min(0,song.firstT))+' left';
  sg.style.background='';sg.style.setProperty('--lights','.75');clearTimeout(sg._t);sg.classList.remove('live','clearing');sg.classList.add('is-ready');
  show('sing');stayAwake(true);setTimeout(()=>$('readyGo').focus(),60);
}
$('readyGo').onclick=()=>{
  ensureCtx();const sg=$('sing');sg.classList.remove('is-ready');sg.classList.add('clearing');sg.style.setProperty('--lights','.5');startSong();
  clearTimeout(sg._t);sg._t=setTimeout(()=>{sg.classList.remove('clearing');sg.classList.add('live');},reduceMotion?0:1300);
};
// While the mic is on, phones treat Belt like a call, so the volume buttons change call volume instead of the music.
// The music therefore has its own volume on the stage.
let stageOut=null;
const stageVol=()=>{const v=+pref('vol','100')/100;return v*v;};
$('volBtn').onclick=()=>{const r=$('volRow'),open=r.hidden;r.hidden=!open;$('volBtn').setAttribute('aria-expanded',String(open));};
$('vol').value=pref('vol','100');
$('vol').oninput=()=>{setPref('vol',$('vol').value);if(stageOut)stageOut.gain.setTargetAtTime(stageVol(),ctx.currentTime,.05);};
function startSong(){
  const song=S.current;
  if(!stageOut){stageOut=ctx.createGain();stageOut.connect(ctx.destination);}stageOut.gain.value=stageVol();
  const mk=(buf,gain)=>{const s=ctx.createBufferSource();s.buffer=buf;const g=ctx.createGain();g.gain.value=gain;s.connect(g);g.connect(stageOut);return {s,g};};
  const back=mk(S.tracks.back,1),gd=S.tracks.guide?mk(S.tracks.guide,$('guide').checked?(song.own?.22:.6):0):null;
  // every song gets the same lead-in: at least four seconds of dashes before the first word
  const startAt=ctx.currentTime+.3+Math.max(0,4-song.firstT);back.s.start(startAt);if(gd)gd.s.start(startAt);
  const hear=!S.demo&&monitor&&$('monitor').checked;
  if(monitor)monitor.gain.setTargetAtTime(hear?.9:0,ctx.currentTime,.05);
  if(!S.demo)$('micLabel').textContent=hear?'You can hear yourself':'';
  const tr=micStream&&micStream.getAudioTracks()[0],ts=tr&&tr.getSettings?tr.getSettings():{};
  S.run={song,startAt,back,gd,chunks:[],recT:null,inLat:typeof ts.latency==='number'&&ts.latency<.5?ts.latency:0,rec:!S.demo,idx:-1,spans:[],trail:[],abuf:new Float32Array(2048),lastM:null,sm:null,diffs:[],key:0,center:null,lastF:performance.now(),bg:null,
    fake:inKeyMode(song)&&S.demo?fakePlan(song):null,dashes:[...$('breath').children],rlo:null,rhi:null,ns:new Map(),ni:0,pop:null,lvl:0,sung:[],range:'',bold:$('bold').checked,loud:[]};
  requestAnimationFrame(loop);
}
function keyNote(k){
  if(S.demo)return;
  $('micLabel').textContent=k?`Matched to your key (${Math.abs(k)} ${Math.abs(k)===1?'step':'steps'} ${k>0?'higher':'lower'})`:'Singing in the song’s key';
}
const noteAt=(song,t)=>song.notes.find(n=>t>=n.t&&t<n.t+n.d)||null;
export function livePitch(buf,sr){
  const ds=2,dsr=sr/ds,n=buf.length>>1,x=new Float32Array(n);
  for(let i=0;i<n;i++)x[i]=(buf[2*i]+buf[2*i+1])*.5;
  const tmin=Math.floor(dsr/1000),tmax=Math.floor(dsr/75),W=n-tmax-1;if(W<256)return null;
  const d=new Float32Array(tmax+2);let run2=0,tau=-1;d[0]=1;
  for(let T=1;T<=tmax;T++){let s=0;for(let i=0;i<W;i++){const df=x[i]-x[i+T];s+=df*df;}run2+=s;d[T]=run2?s*T/run2:1;}
  for(let T=tmin;T<=tmax;T++){if(d[T]<.15){while(T+1<=tmax&&d[T+1]<d[T])T++;tau=T;break;}}
  if(tau<0)return null;
  let bt=tau;if(tau>1&&tau<tmax){const a=d[tau-1],b=d[tau],c=d[tau+1],den=a+c-2*b;if(den)bt=tau+(a-c)/(2*den);}
  return 69+12*Math.log2(dsr/bt/440);
}
// The pitch lane: faint guide lines, notes outlined until sung, syllables under notes, a thin trail of your voice,
// a flat ring for where you are, and a grade chip on a dark plate when a note ends.
const GR=[['Perfect','#ffd23f'],['Great','#ff8fb3'],['Nice','#7fdcff']];
const RANGES=[[48,'Bass'],[53,'Baritone'],[58,'Tenor'],[62,'Alto'],[66,'Mezzo'],[99,'Soprano']];
function drawLane(song,t,lvl){
  const cv=$('lane'),dpr=Math.min(2,window.devicePixelRatio||1),w=cv.clientWidth,h=cv.clientHeight;
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
  const F=(wt,px)=>`${wt} ${px}px "Bricolage Grotesque", system-ui, sans-serif`;
  const left=40,nowX=left+(w-left)*.09,pps=(w-nowX)/4,X=tt=>nowX+(tt-t)*pps,padT=30,padB=26,bh=9,rr=bh/2;
  let lo=song.minM-1.5,hi=song.maxM+1.5;
  if(song.own){ // the lane never moves: one range for the whole song, set by where nearly all its notes sit
    if(S.run.rlo==null){const ms=song.notes.map(n=>n.midi).sort((a,b)=>a-b);let a=ms[Math.floor(ms.length*.02)]??song.minM,b=ms[Math.ceil(ms.length*.98)-1]??song.maxM;
      if(b-a<9){const c=(a+b)/2;a=c-4.5;b=c+4.5;}S.run.rlo=a;S.run.rhi=b;}
    lo=S.run.rlo-1.5;hi=S.run.rhi+1.5;
  }
  const Y=m=>padT+(1-(m-lo)/(hi-lo))*(h-padT-padB);
  for(let k=0;k<=4;k++){const y=padT+k/4*(h-padT-padB);g.fillStyle='rgba(29,22,49,.08)';g.fillRect(left,y-.5,w-left-8,1);}
  g.fillStyle='rgba(29,22,49,.55)';g.font=F(700,10);g.textBaseline='middle';g.fillText('High',10,padT);g.fillText('Low',10,h-padB);
  g.save();g.beginPath();g.rect(left,0,w-left,h);g.clip();
  const rnd=(x,y,wd,ht)=>{g.beginPath();if(g.roundRect)g.roundRect(x,y,wd,ht,Math.min(rr,wd/2));else g.rect(x,y,wd,ht);};
  for(const n of song.notes){
    const x0=X(n.t)+1.5,x1=Math.max(x0+3,X(n.t+n.d)-1.5);if(x1<left||x0>w)continue;const y=Y(Math.max(lo+.6,Math.min(hi-.6,n.midi)))-rr;
    const past=x1<=nowX,active=x0<=nowX&&x1>nowX;
    if(past){const st=S.run.ns.get(n),hit=st&&st.v>=2&&st.h/st.v>=.5;g.fillStyle=hit?'rgba(29,22,49,.8)':'rgba(29,22,49,.2)';rnd(x0,y,x1-x0,bh);g.fill();}
    else{
      g.fillStyle='rgba(29,22,49,.08)';g.strokeStyle='rgba(29,22,49,.3)';g.lineWidth=.9;rnd(x0,y,x1-x0,bh);g.fill();g.stroke();
      if(active){g.save();rnd(x0,y,x1-x0,bh);g.clip();g.fillStyle=INK;g.fillRect(x0,y,nowX-x0,bh);g.restore();}
    }
    if(n.syl&&x1-x0>4){g.fillStyle=active?INK:'rgba(29,22,49,.55)';g.font=F(active?800:600,10.5);g.textBaseline='top';g.fillText(n.syl,x0+1,y+bh+4);}
  }
  // your voice: one smooth line that fades out behind you. The wobble of a real voice is averaged away for the drawing only.
  const segs=[];{let cur=null,prev=null;
    for(const p of S.run.trail){
      if(p.m==null||(prev&&(p.t-prev.t>.12||Math.abs(p.m-prev.m)>3))){cur=null;}
      if(p.m==null){prev=null;continue;}
      if(!cur){cur=[];segs.push(cur);}cur.push([X(p.t),Y(Math.max(lo,Math.min(hi,p.m)))]);prev=p;
    }}
  let tipY=null;
  for(const sg of segs){
    for(let pass=0;pass<2;pass++){const ys=sg.map(q=>q[1]);for(let i=0;i<sg.length;i++){const r=Math.min(5,i,sg.length-1-i);let sum=0;for(let k=i-r;k<=i+r;k++)sum+=ys[k];sg[i][1]=sum/(2*r+1);}}
  }
  if(segs.length){const e=segs[segs.length-1],lastP=S.run.trail[S.run.trail.length-1];if(lastP&&lastP.m!=null){ // ease the last stretch onto the live dot
    tipY=e[e.length-1][1];}}
  const fade=g.createLinearGradient(X(t-1.5),0,nowX,0);fade.addColorStop(0,'rgba(29,22,49,0)');fade.addColorStop(.45,'rgba(29,22,49,.55)');fade.addColorStop(1,'rgba(29,22,49,1)');
  g.strokeStyle=fade;g.lineWidth=3;g.lineCap='round';g.lineJoin='round';g.beginPath();
  for(const sg of segs){if(sg.length<2)continue;g.moveTo(sg[0][0],sg[0][1]);for(let i=1;i<sg.length-1;i++){const mx=(sg[i][0]+sg[i+1][0])/2,my=(sg[i][1]+sg[i+1][1])/2;g.quadraticCurveTo(sg[i][0],sg[i][1],mx,my);}const e=sg[sg.length-1];g.lineTo(e[0],e[1]);}
  g.stroke();g.restore();
  // now line with a small cap
  g.fillStyle='rgba(29,22,49,.7)';g.fillRect(nowX-.5,padT-6,1,h-padT-padB+12);
  g.beginPath();g.moveTo(nowX-4,padT-8);g.lineTo(nowX+4,padT-8);g.lineTo(nowX,padT-3);g.fill();
  // where you are: a flat ring
  const last=S.run.trail[S.run.trail.length-1];
  if(last&&last.m!=null){const yRaw=Y(Math.max(lo,Math.min(hi,last.m)));S.run.dotY=S.run.dotY==null||Math.abs(yRaw-S.run.dotY)>40?yRaw:S.run.dotY+(yRaw-S.run.dotY)*.35;
    const y=S.run.dotY,r=6+Math.min(3,lvl*30);if(tipY!=null){g.strokeStyle=INK;g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(nowX-1,tipY);g.lineTo(nowX,y);g.stroke();}g.fillStyle='#fbf9ff';g.beginPath();g.arc(nowX,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.6;g.stroke();}
  else{S.run.dotY=null;const y=Y(Math.max(lo,Math.min(hi,S.run.lastM??(lo+hi)/2)));g.strokeStyle='rgba(29,22,49,.35)';g.lineWidth=1.6;g.beginPath();g.arc(nowX,y,6,0,7);g.stroke();}
  if(S.run.range){g.fillStyle='rgba(29,22,49,.55)';g.font=F(700,10);g.textBaseline='alphabetic';g.fillText(S.run.range,w-g.measureText(S.run.range).width-12,h-8);}
  // grade chip: dark plate, own color and own shape (star, double tick, tick)
  if(S.run.pop){const age=(performance.now()-S.run.pop.t0)/900;if(age>1)S.run.pop=null;else{
    const [txt,col]=GR[S.run.pop.g];g.font=F(800,12.5);g.textBaseline='middle';
    const tw=g.measureText(txt).width,ic=12,pw=tw+ic+22,ph=24,px=w-pw-12,py=18-age*3,sc=age<.12?.86+age*1.2:1;
    g.save();g.globalAlpha=Math.min(1,(1-age)*1.7);g.translate(px+pw/2,py);g.scale(sc,sc);g.translate(-(px+pw/2),-py);
    g.shadowColor='rgba(15,10,30,.35)';g.shadowBlur=10;g.shadowOffsetY=3;g.fillStyle=INK;g.beginPath();if(g.roundRect)g.roundRect(px,py-ph/2,pw,ph,ph/2);else g.rect(px,py-ph/2,pw,ph);g.fill();g.shadowColor='transparent';
    const cx=px+9+ic/2;g.fillStyle=col;g.strokeStyle=col;g.lineWidth=2;g.lineCap='round';g.lineJoin='round';
    if(S.run.pop.g===0){g.beginPath();for(let k=0;k<10;k++){const r=k%2?ic*.22:ic*.52,a2=-Math.PI/2+k*Math.PI/5;g.lineTo(cx+r*Math.cos(a2),py+r*Math.sin(a2));}g.closePath();g.fill();}
    else{const tick=ox=>{g.beginPath();g.moveTo(cx+ox-ic*.38,py+ic*.02);g.lineTo(cx+ox-ic*.1,py+ic*.3);g.lineTo(cx+ox+ic*.38,py-ic*.32);g.stroke();};if(S.run.pop.g===1){tick(-ic*.18);tick(ic*.22);}else tick(0);}
    g.fillStyle=col;g.fillText(txt,px+ic+15,py+.5);g.restore();}}
}
const micBuf=new Float32Array(1024),MIC_COLS=['#ff5d8f','#3ddc97','#ffb020','#9b8aff','#4cc9f0'];let micLv=0;
function paintMicMeter(){
  if(!analyser||S.demo)return;
  analyser.getFloatTimeDomainData(micBuf);let e=0;for(let i=0;i<micBuf.length;i++)e+=micBuf[i]*micBuf[i];
  const db=20*Math.log10(Math.sqrt(e/micBuf.length)+1e-6),v=Math.max(0,Math.min(1,(db+58)/40));micLv=v>micLv?v:micLv*.9+v*.1;
  const bars=$('micMeter').children;
  for(let k=0;k<5;k++){const on=micLv>k*.2+.04,h=on?Math.min(1,.35+(micLv-k*.2)*3.2):.25;bars[k].style.transform=`scaleY(${h.toFixed(2)})`;bars[k].style.opacity=on?1:.22;bars[k].style.background=on?MIC_COLS[k]:'';}
}
// Skip a long intro: jump to a few seconds before the first words. Your recording starts from there.
$('skipIntro').onclick=()=>{
  if(!S.run||ctx.state!=='running')return;const song=S.run.song,to=song.lines[0].start-4,t=songTime();if(to<=t+1)return;
  const now=ctx.currentTime,at=now+.06;
  for(const x of [S.run.back,S.run.gd].filter(Boolean)){try{x.s.stop(now+.05);}catch(e){}const n=ctx.createBufferSource();n.buffer=x.s.buffer;n.connect(x.g);n.start(at,Math.max(0,to));x.s=n;}
  S.run.startAt=at-to;S.run.chunks=[];S.run.recT=null;S.run.pt0=null;S.run.trail=[];$('skipIntro').hidden=true;
};
export function songTime(){return ctx.currentTime-(ctx.outputLatency||0)-S.run.startAt;}
function setLines(song,idx){
  const ls=song.lines,txt=k=>ls[k]?ls[k].text:'';
  $('lnN1').textContent=txt(idx+1);$('lnN2').textContent=txt(idx+2);$('lnN3').textContent=txt(idx+3);$('lnN4').textContent=txt(idx+4);
  const now=$('lineNow'),L=ls[idx];
  now.innerHTML=L.syl.map(s=>{const m=/^([\s\S]*?)(\s*)$/.exec(s.text);return `<span class="w">${esc(m[1])}</span>${m[2]?' ':''}`;}).join('');
  now.classList.remove('in');void now.offsetWidth;now.classList.add('in');
  S.run.spans=[...now.querySelectorAll('.w')];S.run.loud=S.run.spans.map(()=>null);
}
function loop(){
  if(!S.run)return;
  const song=S.run.song,t=songTime();
  // lyrics: two lines behind, the one you're on, four ahead
  let idx=0;for(let i=0;i<song.lines.length;i++)if(song.lines[i].start-.35<=t)idx=i;
  // own songs have gaps between lines: once a line is done, show the next one waiting
  {const L=song.lines[idx],N=song.lines[idx+1];if(song.own&&N&&t>L.end+.3&&N.start-L.end>=4)idx++;}
  if(idx!==S.run.idx){S.run.idx=idx;setLines(song,idx);}
  const L=song.lines[S.run.idx],fill=lyricStyle==='fill';
  L.syl.forEach((s,i)=>{const p=Math.max(0,Math.min(1,(t-s.start)/Math.max(.08,s.end-s.start))),sp=S.run.spans[i];if(!sp)return;
    if(fill)sp.style.setProperty('--p',(p*100).toFixed(1)+'%');
    sp.classList.toggle('lit',p>0);sp.classList.toggle('now',p>0&&p<1);
    if(S.run.bold&&p>0&&S.run.loud[i]==null){S.run.loud[i]=Math.min(1,S.run.lvl*14);sp.style.fontVariationSettings=`"wght" ${Math.round(480+S.run.loud[i]*420)}, "opsz" 96`;}});
  // breaks: four dashes above the lyrics run down over the last four seconds
  {let on=false;const i=song.lines.findIndex(L=>L.start>t);
   if(i>=0){const nx=song.lines[i],prevEnd=i?song.lines[i-1].end:-1e9,to=nx.start-t;
     if(nx.start-prevEnd>=4&&t>prevEnd+.3){on=true;S.run.dashes.forEach((d,j)=>d.style.setProperty('--d',Math.max(0,Math.min(1,to-(3-j))).toFixed(3)));}}
   $('breath').classList.toggle('on',on);}
  $('prog').style.width=Math.max(0,Math.min(100,(t-song.lead)/(song.lastEnd-song.lead)*100))+'%';
  $('left').textContent=fmtLen(song.lastEnd-Math.max(0,t))+' left';
  paintMicMeter();
  {const first=song.lines[0],long=first&&first.start-t>9&&t>-1;if($('skipIntro').hidden===long)$('skipIntro').hidden=!long;}
  // live pitch
  if(inKeyMode(song)){ownLive(song,t);if(t>song.endT){finish();return;}requestAnimationFrame(loop);return;}
  if(song.own)paintMood(song,t);
  let pm=null,lvl=0;const cur=noteAt(song,t);
  if(analyser&&!S.demo){
    const a=S.run.abuf;analyser.getFloatTimeDomainData(a);let e=0;for(let i=0;i<a.length;i++)e+=a[i]*a[i];lvl=Math.sqrt(e/a.length);
    if(lvl>.008)pm=livePitch(a,ctx.sampleRate);
  }else if(cur&&t>cur.t+.05&&t<cur.t+cur.d-.04){
    pm=cur.midi+Math.sin(t*6.5)*.3+(Math.sin(t*.9+1)>.93?1.5:0);lvl=.05;
  }
  S.run.lvl=lvl;
  // only listen around the words: intros, solos and the song leaking from a speaker don't count
  {const L=song.lines[S.run.idx],N=song.lines[S.run.idx+1];const near=L&&t>=L.start-1&&t<=L.end+1||N&&t>=N.start-1;if(!near){pm=null;lvl=0;}}
  if(pm!=null){
    S.run.sm=S.run.sm==null||Math.abs(pm-S.run.sm)>1.5?pm:S.run.sm+(pm-S.run.sm)*.5;
    let mm=S.run.sm,ok=null;
    if(cur){
      const raw=fold(mm-cur.midi);
      // learn the singer's key from the last ~2 seconds of sung notes
      S.run.diffs.push(Math.round(raw));if(S.run.diffs.length>60)S.run.diffs.shift();
      if(S.run.diffs.length>=24){
        const cnt={};let bk=S.run.key,bc=0;for(const d of S.run.diffs){cnt[d]=(cnt[d]||0)+1;}
        for(const k in cnt)if(cnt[k]>bc){bc=cnt[k];bk=+k;}
        if(bk!==S.run.key&&bc>=S.run.diffs.length*.5){S.run.key=bk;keyNote(bk);}
      }
      const d=fold(raw-S.run.key);mm=cur.midi+d;ok=Math.abs(d)<=.9;
      const st=S.run.ns.get(cur)||{v:0,h:0};st.v++;if(ok)st.h++;S.run.ns.set(cur,st);
      S.run.sung.push(S.run.sm-12*Math.round((S.run.key||0)/12)); // real singing on a note: this is what the range comes from
      if(S.run.sung.length%30===0&&S.run.sung.length>=90){const q=S.run.sung.slice(-400).sort((a,b)=>a-b),md=q[q.length>>1];S.run.range=RANGES.find(r=>md<r[0])[1]+' range';}
    }
    else{const ref=S.run.lastM??(song.minM+song.maxM)/2;while(mm-ref>6)mm-=12;while(ref-mm>6)mm+=12;}
    // what you see is calmer than what's scored: vibrato is averaged out, and a voice that's close to the note sits near it
    const now=performance.now(),dt=Math.min(.1,(now-(S.run.dispT||now))/1000);S.run.dispT=now;
    if(S.run.disp==null||Math.abs(mm-S.run.disp)>2.5)S.run.disp=mm;else S.run.disp+=(mm-S.run.disp)*(1-Math.exp(-dt/.13));
    let shown=S.run.disp;if(cur&&Math.abs(shown-cur.midi)<1)shown=cur.midi+(shown-cur.midi)*.55;
    S.run.trail.push({t,m:shown,ok});S.run.lastM=shown;
  }else{S.run.sm=null;S.run.disp=null;S.run.trail.push({t,m:null,ok:null});}
  while(S.run.trail.length&&S.run.trail[0].t<t-1.5)S.run.trail.shift();
  // grade each note as it ends
  while(S.run.ni<song.notes.length&&t>=song.notes[S.run.ni].t+song.notes[S.run.ni].d){
    const n=song.notes[S.run.ni++],st=S.run.ns.get(n);
    if(st&&st.v>=3){const r=st.h/st.v,gi=r>=.8?0:r>=.55?1:r>=.3?2:-1;if(gi>=0)S.run.pop={g:gi,t0:performance.now()};}
  }
  const lift=cur?Math.max(0,Math.min(1,(cur.midi-song.minM)/Math.max(1,song.maxM-song.minM))):0;
  poseBelter(rider(),pm!=null?Math.min(1,.25+lvl*12):0,lift,performance.now());
  drawLane(song,t,lvl);
  if(t>song.endT){finish();return;}
  requestAnimationFrame(loop);
}
function stopRun(){
  if(!S.run)return;
  const now=ctx.currentTime;
  if(monitor)monitor.gain.setTargetAtTime(0,now,.05);
  for(const x of [S.run.back,S.run.gd].filter(Boolean)){x.g.gain.setTargetAtTime(0,now,.15);try{x.s.stop(now+.6);}catch(e){}}
}
function leaveStage(){stayAwake(false);releaseMic();backdrop(false);clearTimeout($('sing')._t);$('sing').classList.remove('live','is-ready','clearing');$('sing').style.background='';show('pick');}
function openQuit(){$('scrim').classList.add('on');$('quitSheet').classList.add('on');$('qKeep').focus();}
export function closeQuit(){$('quitSheet').classList.remove('on');$('scrim').classList.remove('on');if(ctx&&ctx.state==='suspended')ctx.resume();}
$('quit').onclick=()=>{ // while singing this is a pause button
  if(!S.run){leaveStage();return;}
  if(ctx.state==='running')ctx.suspend(); // pause everything: music, recording and the clock
  openQuit();
};
$('qKeep').onclick=closeQuit;
$('qAgain').onclick=()=>{closeQuit();stopRun();S.run=null;readySong();};
$('qEnd').onclick=()=>{closeQuit();stopRun();S.run=null;leaveStage();};
$('qFinish').onclick=()=>{if(!S.run){closeQuit();return;}S.run.stopT=Math.max(0,songTime());closeQuit();finish();};
$('scrim').addEventListener('click',()=>{if($('quitSheet').classList.contains('on'))closeQuit();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('quitSheet').classList.contains('on'))closeQuit();});
// How late the recording runs against the song, in samples. Phones don't report every delay, so Belt measures it from the take.
// Two listeners: (1) the song itself leaking from the speaker into the mic, which pins the delay exactly, and
// (2) where your notes start against the guide. Each must find one clear, standout answer or it's ignored.
// When neither is sure, Belt uses what it measured on this phone's recent takes.
let lagInfo='';
function onsetCurve(x,n,hop){
  const e=new Float32Array(n),o=new Float32Array(n);
  for(let i=0;i<n;i++){let s=0;for(let k=i*hop,m=k+hop;k<m;k++)s+=x[k]*x[k];e[i]=Math.log(1e-6+Math.sqrt(s/hop));}
  for(let i=1;i<n;i++)o[i]=Math.max(0,e[i]-e[i-1]);let mu=0;for(const v of o)mu+=v;mu/=n;let sd=0;for(let i=0;i<n;i++){o[i]-=mu;sd+=o[i]*o[i];}sd=Math.sqrt(sd/n)||1;for(let i=0;i<n;i++)o[i]/=sd;return o;
}
function lagAgainst(a,b,n){ // returns the best shift (in 10 ms steps) and how far it stands out from the rest
  const LO=-30,HI=60,sc=[];for(let L=LO;L<=HI;L++){let s=0;for(let i=Math.max(0,-L);i<n&&i+L<n;i++)s+=a[i+L]*b[i];sc.push(s/n);}
  let bi=0;for(let i=1;i<sc.length;i++)if(sc[i]>sc[bi])bi=i;
  const rest=sc.filter((_,i)=>Math.abs(i-bi)>4),mu=rest.reduce((p,c)=>p+c,0)/rest.length,sd=Math.sqrt(rest.reduce((p,c)=>p+(c-mu)*(c-mu),0)/rest.length)||1e-9;
  return {L:bi+LO,z:(sc[bi]-mu)/sd,peak:sc[bi]};
}
export function voiceLag(voice,tr,sr){
  const hop=Math.round(sr/100),n=Math.min(Math.floor(voice.length/hop),Math.floor(tr.back.length/hop));if(n<300){lagInfo='short';return 0;}
  const v=onsetCurve(voice,n,hop),ok=r=>r&&r.L>=-6&&r.L<=45;
  const bleed=lagAgainst(v,onsetCurve(tr.back.getChannelData(0),n,hop),n),sing=tr.guide?lagAgainst(v,onsetCurve(tr.guide.getChannelData(0),n,hop),n):null;
  let past=[];try{past=JSON.parse(pref('lags','[]'));}catch(e){}
  let L=null,how='';
  if(ok(bleed)&&bleed.z>=6&&bleed.peak>=.1){L=bleed.L;how='speaker';}
  else if(ok(sing)&&sing.z>=5&&sing.peak>=.08){L=sing.L;how='voice';}
  if(L!=null){past=[...past,L].slice(-7);setPref('lags',JSON.stringify(past));}
  else if(past.length>=2){L=[...past].sort((x,y)=>x-y)[past.length>>1];how='remembered';}
  else{L=0;how='unsure';}
  lagInfo=`${L*10}ms (${how}; speaker z=${bleed.z.toFixed(1)} at ${bleed.L*10}, voice z=${sing?sing.z.toFixed(1):'-'} at ${sing?sing.L*10:'-'})`;
  return L*hop;
}
function finish(){
  const r=S.run;r.rec=false;stopRun();S.run=null;clearTimeout($('sing')._t);$('sing').classList.remove('live','clearing');
  stayAwake(false);releaseMic();backdrop(false);
  $('busy').classList.add('on');
  setTimeout(()=>{
   try{
    const song=r.song,sr=ctx.sampleRate;let voice;
    if(S.demo)voice=inKeyMode(song)?fakeVoiceOwn(song,sr,r.fake):fakeVoice(song,sr);
    else{
      const total=Math.ceil(song.dur*sr);voice=new Float32Array(total);
      const comp=(ctx.outputLatency||0)+(ctx.baseLatency||0)+(r.inLat||0);
      let i0=Math.round(((r.recT??r.startAt)-r.startAt-comp)*sr),drops=0;
      for(const c of r.chunks){ // place each chunk by its own clock time; if the phone dropped some audio, leave a gap there
        if(c.at!=null){const want=Math.round((c.at-r.startAt-comp)*sr);if(Math.abs(want-i0)>c.length*.5){i0=want;drops++;}}
        for(let i=0;i<c.length;i++){const j=i0+i;if(j>=0&&j<total)voice[j]=c[i];}i0+=c.length;}
      // phones don't report every delay (Bluetooth, the mic itself), so line your voice up with the song by ear
      const lag=voiceLag(voice,S.tracks,sr);console.log('belt take: drops',drops,'lag',lagInfo);
      if(lag){const v2=new Float32Array(total);if(lag>0)v2.set(voice.subarray(lag));else v2.set(voice.subarray(0,total+lag),-lag);voice=v2;}
    }
    const until=r.stopT??null,sc=scoreTake(song,voice,sr,until);
    S.last={song,voice,sc,until};if(!S.demo){rememberTake(song,sc);setPref('sung',String(+pref('sung','0')+1));}
    $('busy').classList.remove('on');showResults();
   }catch(e){ // never leave anyone stuck on the stage
    console.error('finish',e);$('busy').classList.remove('on');
    if(!$('result').classList.contains('on')){leaveStage();toast('Something went wrong scoring that take. Give it another go.');}
   }
  },60);
}
// Leaving the app mid-song (a call, a text, the lock button) pauses the song; you come back to "Keep singing".
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='hidden'){
    if(S.run&&$('sing').classList.contains('on')&&!$('quitSheet').classList.contains('on')){if(ctx.state==='running')ctx.suspend();openQuit();}
    else if(S.mix)stopMix();
    if(pv.on)stopPreview();
  }else if($('sing').classList.contains('on'))stayAwake(true);
});

