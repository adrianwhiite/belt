import {S} from './state.js';
import {bestPerSong,flushPerformances,loadPerformances,nights,rangeOf,scoreTrend,voiceLabel} from './profile.js';
import {$,esc,pref,reduceMotion,setPref} from './util.js';
import {SONGS} from './songs.js';
import {ctx,ensureCtx,show} from './audio.js';
import {CAST_KEYS,CATALOG,GENRES,bests,buildBelter,myGenre,openPicker,paintAuth,paintMe} from './picker.js';
import {openSheet,scoreTake,tracksFor} from './stage.js';
import {noteName,showResults,stopMix} from './results.js';

/* ---------- Accounts (Supabase + Google). Singing never needs an account; Save does. ---------- */
const SB_URL='https://wksewqwujfrqmqliltbn.supabase.co',SB_KEY='sb_publishable_-hWzU5dnarN0XczEFFpmOQ_NnHLooy5';
S.sb=null;S.user=null;
try{if(window.supabase)S.sb=window.supabase.createClient(SB_URL,SB_KEY);}catch(e){S.sb=null;}
export const SONG_BY_ID=Object.fromEntries(SONGS.map(s=>[s.id,s]));
export function toast(msg,act){const t=$('toast');t.textContent=msg;t.classList.toggle('act',!!act);
  if(act){const b=document.createElement('button');b.textContent=act.label;b.onclick=()=>{clearTimeout(toast.h);t.classList.remove('on','act');act.fn();};t.append(b);}
  t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>{t.classList.remove('on','act');},act?act.ms||5000:2600);}

// Keep a take in this browser while Google sign-in leaves the page and comes back.
const idb=()=>new Promise((res,rej)=>{const r=indexedDB.open('belt',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
export async function kv(op,key,val){try{const db=await idb();return await new Promise((res,rej)=>{const tx=db.transaction('kv',op==='get'?'readonly':'readwrite'),st=tx.objectStore('kv');const r=op==='get'?st.get(key):op==='put'?st.put(val,key):st.delete(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}catch(e){return null;}}

export function toWav(f32,srIn,srOut){
  const sr=srOut||22050,ratio=srIn/sr,n=Math.floor(f32.length/ratio),buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
  const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++){const x=i*ratio,a=Math.floor(x),f=x-a,s=(f32[a]||0)*(1-f)+(f32[a+1]||0)*f;v.setInt16(44+i*2,Math.max(-1,Math.min(1,s))*32767,true);}
  return new Blob([buf],{type:'audio/wav'});
}
export function setSaveState(){
  const b=$('save');b.hidden=S.demo||!S.sb;
  b.disabled=!!(S.last&&S.last.saved);b.textContent=S.last&&S.last.saved?'Saved to My songs':'Save this take';
}
async function uploadTake(t){
  const path=`${S.user.id}/${Date.now()}-${t.songId}.wav`;
  const up=await S.sb.storage.from('takes').upload(path,t.blob,{contentType:'audio/wav'});
  if(up.error)throw up.error;
  const ins=await S.sb.from('takes').insert({song_id:t.songId,song_title:t.title,score:t.score,key_shift:t.key,audio_path:path});
  if(ins.error)throw ins.error;
}
async function saveTake(){
  if(!S.last||S.last.saved)return;
  const t={songId:S.last.song.id,title:S.last.song.title,score:Math.round(S.last.sc.acc*100),key:S.last.sc.key||0,blob:toWav(S.last.until!=null?S.last.voice.subarray(0,Math.ceil((S.last.until+1)*ctx.sampleRate)):S.last.voice,ctx.sampleRate)};
  if(!S.user){await kv('put','pending',t);authFor('takes');return;}
  const b=$('save');b.disabled=true;b.textContent='Saving';
  try{await uploadTake(t);S.last.saved=true;setSaveState();toast('Saved to My songs');}
  catch(e){b.disabled=false;b.textContent='Save this take';toast('Couldn’t save. Check your connection and try again.');}
}
export function authFor(kind){
  $('authTitle').textContent=kind==='own'?'Sign in to add your songs':kind==='hello'?'Sign in to Belt':'Keep your takes';
  $('authSub').textContent=kind==='own'?'Belt uses your account to take out the vocals and sync every word.':kind==='hello'?'Save your takes and add your own songs. You can also just start singing.':'Sign in once and your saved takes will be here next time.';
  openAuth();
}
function openAuth(){$('scrim').classList.add('on');$('authSheet').classList.add('on');$('google').focus();googleButton();}
// Google's own sign-in button: you sign in on letsbelt.com and Google hands Belt a token, so the
// Google screen names our site instead of the sign-in server's address. If Google's script can't
// load, the regular "Continue with Google" button (a redirect through Supabase) stays.
const GOOGLE_CLIENT_ID='847048926254-c7u0did0l5t6vbmmu1bhpcev58cu1b2o.apps.googleusercontent.com';
let gisP=null;
function loadGis(){
  if(gisP)return gisP;
  gisP=new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='https://accounts.google.com/gsi/client';sc.async=true;
    sc.onload=()=>window.google&&google.accounts?res(google):rej(new Error('no gis'));sc.onerror=()=>rej(new Error('gis blocked'));
    document.head.appendChild(sc);setTimeout(()=>rej(new Error('gis timeout')),8000);});
  gisP.catch(()=>{gisP=null;});return gisP;
}
const hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
async function googleButton(){
  if(!GOOGLE_CLIENT_ID||!S.sb)return;
  try{
    const g=await loadGis();
    const raw=hex(crypto.getRandomValues(new Uint8Array(16))),hashed=hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)));
    g.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,nonce:hashed,ux_mode:'popup',itp_support:true,use_fedcm_for_button:true,
      callback:async r=>{const {error}=await S.sb.auth.signInWithIdToken({provider:'google',token:r.credential,nonce:raw});
        if(error){console.warn('google id token',error);toast('Google sign-in didn’t finish. Try again.');googleButton();}}});
    const box=$('gbtn');box.innerHTML='';
    g.accounts.id.renderButton(box,{type:'standard',theme:'filled_black',size:'large',shape:'pill',text:'continue_with',logo_alignment:'center',width:Math.min(400,Math.max(240,$('authSheet').clientWidth-40))});
    box.hidden=false;$('google').hidden=true;
  }catch(e){console.warn('google button',e);$('gbtn').hidden=true;$('google').hidden=false;}
}
export function closeAuth(){$('authSheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');}
async function signIn(){
  if(!S.sb){toast('Sign-in isn’t available here.');return;}
  const {error}=await S.sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});
  if(error)toast('Google sign-in didn’t start. Try again.');
}
async function flushPending(){
  const t=await kv('get','pending');if(!t||!S.user)return;
  try{await uploadTake(t);await kv('del','pending');toast('Saved to My songs');openMine();}
  catch(e){toast('Couldn’t save your take. Try again from the song.');}
}
// Profile: your Belter, what your voice is like, a few numbers and your tickets. Works signed out too.
const PIANO_LO=36,PIANO_HI=84,BLACK=new Set([1,3,6,8,10]);
function pianoSVG(low,high){
  const lo=Math.min(PIANO_LO,low-2)-(Math.min(PIANO_LO,low-2)%12),hi=Math.max(PIANO_HI,high+2);let whites=[],blacks=[];
  for(let m=lo;m<=hi;m++)(BLACK.has(m%12)?blacks:whites).push(m);
  const W=whites.length,ww=100/W,on=m=>m>=low&&m<=high;let x=0,out='';const xs={};
  for(const m of whites){xs[m]=x;out+=`<rect x="${(x*ww).toFixed(2)}%" y="0" width="${(ww-.35).toFixed(2)}%" height="100%" rx="2" class="${on(m)?'kw on':'kw'}"/>`;x++;}
  for(const m of blacks){const left=xs[m-1];if(left==null)continue;out+=`<rect x="${((left+1)*ww-ww*.32).toFixed(2)}%" y="0" width="${(ww*.64).toFixed(2)}%" height="60%" rx="1.5" class="${on(m)?'kb on':'kb'}"/>`;}
  const pos=m=>((xs[m]??xs[m-1]??0)+.5)*ww;
  return `<svg class="keys" role="img" aria-label="Your range on a piano, ${noteName(low)} to ${noteName(high)}" preserveAspectRatio="none">${out}</svg>
    <div class="key-tags" aria-hidden="true"><span style="left:${pos(low).toFixed(1)}%">${noteName(low)}</span><span style="left:${pos(high).toFixed(1)}%">${noteName(high)}</span></div>`;
}
function firstSongOf(){const own=CATALOG.find(c=>c.song&&c.song.own);return own?own.song:SONG_BY_ID.jingle;}
function paintVoice(rows){
  const rg=rangeOf(rows),card=$('voiceCard');
  if(!rg){const s=firstSongOf();
    card.innerHTML=`<p class="v-kicker">Your voice</p><h4>Sing one song and Belt maps your voice</h4>
      <p class="v-sub">Your range, the kind of voice you have and how it grows. Just the notes, never a recording.</p>
      <button class="btn paper" id="firstSong">Sing ${esc(s.title)}</button>`;
    $('firstSong').onclick=()=>{openPicker(CATALOG.find(c=>c.song===s));setTimeout(()=>openSheet(s),reduceMotion?0:300);};return;}
  const v=voiceLabel(rg),tr=scoreTrend(rows,10);let trend='';
  if(tr.length>=4){const h=Math.floor(tr.length/2),a=tr.slice(0,h),b=tr.slice(h),avg=x=>x.reduce((s,y)=>s+y.score,0)/x.length,d=Math.round(avg(b)-avg(a));
    trend=d>=3?` Up ${d} points lately.`:d<=-3?' A few off nights lately. It happens.':' Holding steady.';}
  card.innerHTML=`<p class="v-kicker">Your voice</p><h4>${esc(v.where)}, ${esc(v.wide)}</h4>${pianoSVG(rg.low,rg.high)}
    <p class="v-sub">${noteName(rg.low)} to ${noteName(rg.high)}, from your last ${rg.takes} ${rg.takes===1?'take':'takes'}.${trend}</p>`;
}
const ago=d=>{const days=Math.round((new Date().setHours(0,0,0,0)-new Date(d).setHours(0,0,0,0))/864e5);
  return days<=0?'Tonight':days===1?'Last night':days<7?days+' nights ago':days<14?'Last week':new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'}).format(d);};
const tick=(r,fmtD,fmtM)=>{const s=SONG_BY_ID[r.song_id],d=new Date(r.created_at);return `<li class="take ticket" data-id="${r.id}" style="--c:${s?s.color:'#9b8aff'}">
  <button class="take-open" data-path="${esc(r.audio_path)}" data-song="${esc(r.song_id)}" aria-label="Play your take of ${esc(r.song_title)} from your show on ${fmtM.format(d)} ${fmtD.format(d)}">
    <span class="tk-stub" aria-hidden="true"><b>${fmtD.format(d)}</b><small>${fmtM.format(d)}</small></span>
    <span class="tk-main"><span class="take-title">${esc(r.song_title)}</span><span class="take-meta">${esc(ago(d))}${r.score!=null?' · '+r.score+'%':''}</span></span>
    <span class="tk-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6.5v11l9-5.5z"/></svg></span></button>
  <button class="take-del" data-path="${esc(r.audio_path)}" aria-label="Delete this take of ${esc(r.song_title)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></li>`;};
export async function openMine(){
  stopMix();show('mine');
  const name=S.user?(S.user.user_metadata&&(S.user.user_metadata.full_name||S.user.user_metadata.name)||String(S.user.email||'You').split('@')[0]):'You';
  $('meName').textContent=name.split(' ')[0];
  const since=S.user&&S.user.created_at?new Intl.DateTimeFormat(undefined,{month:'short',year:'numeric'}).format(new Date(S.user.created_at)):'';
  const setSub=(extra)=>{$('meSub').textContent=[GENRES[myGenre()].label||GENRES[myGenre()].name,extra||(since?'since '+since:'')].filter(Boolean).join(' · ');};setSub();
  $('signOut').textContent=S.user?'Sign out':'Sign in to keep your takes';$('signOut').hidden=!S.sb;
  $('shareSet').hidden=true;
  const b=Object.values(bests());$('stBest').textContent=b.length?Math.max(...b)+'%':'–';
  $('stNights').textContent='0';$('stSongs').textContent='0';
  loadPerformances().then(rows=>{if(!$('mine').classList.contains('on'))return;
    paintVoice(rows);const n=nights(rows),best=bestPerSong(rows);
    $('stNights').textContent=String(n.count);$('stSongs').textContent=String(new Set(rows.map(r=>r.song_id)).size);
    if(best.length){const cur=parseInt($('stBest').textContent)||0;$('stBest').textContent=Math.max(cur,best[0].score,...b)+'%';}
    if(n.streak>=2)setSub(`${n.streak} nights in a row`);
  });
  const list=$('takes');
  if(!S.user){list.innerHTML='<li class="empty">Sign in and every take you save becomes a ticket stub from that night’s show, ready to play back.</li>';return;}
  list.innerHTML='<li class="empty">Loading your past shows</li>';
  const {data,error}=await S.sb.from('takes').select('*').order('created_at',{ascending:false});
  if(error){list.innerHTML='<li class="empty">Couldn’t load your takes. Check your connection and try again.</li>';return;}
  mineTakes=data;$('shareSet').hidden=!data.length;
  const ts=data.map(r=>r.score).filter(x=>x!=null);if(ts.length){const cur=parseInt($('stBest').textContent)||0;$('stBest').textContent=Math.max(cur,...ts)+'%';}
  if(!data.length){list.innerHTML='<li class="empty">No past shows yet. After a song, tap Save this take to keep its ticket stub here.</li>';return;}
  const fmtD=new Intl.DateTimeFormat(undefined,{day:'numeric'}),fmtM=new Intl.DateTimeFormat(undefined,{month:'short'});
  list.innerHTML=data.map(r=>tick(r,fmtD,fmtM)).join('');
}
let mineTakes=[];
$('shareSet').onclick=async()=>{
  const best={};for(const r of mineTakes)if(!(best[r.song_title]>=r.score))best[r.song_title]=r.score;
  const text='My Belt setlist\n'+Object.entries(best).map(([t,v])=>`${t}: ${v??'–'}%`).join('\n');
  try{if(navigator.share){await navigator.share({title:'My Belt setlist',text});return;}await navigator.clipboard.writeText(text);toast('Setlist copied');}catch(e){}
};
function openCast(){
  $('cast').innerHTML=CAST_KEYS.map(k=>[k,GENRES[k]]).map(([k,G])=>`<button data-g="${k}" aria-pressed="${k===myGenre()}"><svg class="belter" data-genre="${k}" viewBox="0 0 120 140"></svg>${esc(G.name)}</button>`).join('');
  document.querySelectorAll('#cast svg').forEach(buildBelter);
  $('scrim').classList.add('on');$('castSheet').classList.add('on');
}
$('cast').onclick=e=>{const b=e.target.closest('button');if(!b)return;setPref('genre',b.dataset.g);document.querySelectorAll('#cast button').forEach(x=>x.setAttribute('aria-pressed',x===b));paintMe();$('meSub').textContent=(GENRES[myGenre()].label||GENRES[myGenre()].name)+($('meSub').textContent.includes('since')?' · since'+$('meSub').textContent.split('since')[1]:'');};
export const closeCast=()=>{$('castSheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');};
$('castDone').onclick=closeCast;$('editMe').onclick=openCast;
$('scrim').addEventListener('click',()=>{if($('castSheet').classList.contains('on'))closeCast();});
async function openTake(path,songId){
  const song=SONG_BY_ID[songId];
  if(!song){toast(String(songId).startsWith('own-')?'Open this take on the device that has the track.':'That song isn’t here any more.');return;}
  ensureCtx();$('busy').classList.add('on');
  try{
    const {data,error}=await S.sb.storage.from('takes').download(path);if(error)throw error;
    const ab=await ctx.decodeAudioData(await data.arrayBuffer());
    S.tracks=await tracksFor(song);S.current=song;S.demo=false;
    document.documentElement.style.setProperty('--song',song.color);
    const total=Math.ceil(song.dur*ctx.sampleRate),voice=new Float32Array(total);voice.set(ab.getChannelData(0).subarray(0,total));
    const until=ab.duration<song.dur-1?ab.duration:null;
    S.last={song,voice,sc:scoreTake(song,voice,ctx.sampleRate,until),until,saved:true};
    $('busy').classList.remove('on');showResults();
  }catch(e){$('busy').classList.remove('on');toast('Couldn’t open that take.');}
}
$('takes').onclick=async e=>{
  const o=e.target.closest('.take-open');if(o){openTake(o.dataset.path,o.dataset.song);return;}
  const d=e.target.closest('.take-del');if(!d)return;
  // Delete straight away, with a few seconds to undo; the take is only really removed once that passes.
  const li=d.closest('.take'),next=li.nextSibling,list=$('takes');li.remove();
  if(!list.querySelector('.take'))list.insertAdjacentHTML('beforeend','<li class="empty" data-tmp>No past shows yet. After a song, tap Save this take to keep it here.</li>');
  let undone=false;
  toast(`Deleted ${li.querySelector('.take-title').textContent}`,{label:'Undo',ms:5000,fn:()=>{undone=true;const e2=list.querySelector('[data-tmp]');if(e2)e2.remove();list.insertBefore(li,next&&next.isConnected?next:null);}});
  setTimeout(async()=>{if(undone)return;
    await S.sb.storage.from('takes').remove([d.dataset.path]);
    const {error}=await S.sb.from('takes').delete().eq('id',li.dataset.id);
    if(error){toast('Couldn’t delete that take. It’s back in your list.');const e2=list.querySelector('[data-tmp]');if(e2)e2.remove();list.prepend(li);}
  },5200);
};
$('save').onclick=saveTake;
$('google').onclick=signIn;
$('authCancel').onclick=async()=>{await kv('del','pending');closeAuth();};
$('mineBtn').onclick=openMine;
$('mineBack').onclick=()=>openPicker();
$('signOut').onclick=async()=>{if(!S.user){authFor('takes');return;}await S.sb.auth.signOut();S.user=null;paintAuth();openMine();toast('Signed out');};
$('scrim').addEventListener('click',closeAuth);
if(S.sb){
  S.sb.auth.onAuthStateChange((ev,session)=>{const was=S.user;S.user=session?session.user:null;paintAuth();if(S.user&&!was){const open=$('authSheet').classList.contains('on');closeAuth();if(open)toast('You’re signed in');flushPending();flushPerformances();}});
}

