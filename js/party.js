// Party: sing together from anywhere, each on your own phone.
//
// One person hosts and gets a code. Everyone who joins with the code (and the password, if the host set one)
// shares a live room. You take turns: the singer's phone plays the song and listens to them as usual, and
// sends the room a few numbers a second (how loud, the score so far, the line they're on). Nobody's voice
// leaves their phone. The host's phone keeps the party's state (who's in, whose turn, the points) and
// repeats it to the room every few seconds; nothing is stored on a server.
import {S} from './state.js';
import {$,esc,pref,setPref} from './util.js';
import {show} from './audio.js';
import {CATALOG,buildBelter,myGenre,openPicker,poseBelter} from './picker.js';
import {rotateFacts} from './facts.js';
import {pinsAfterSong} from './stage.js';
import {toast} from './account.js';
import {crowdFor} from './profile.js';
import {MODES,renderModes} from './modes.js';

const LETTERS='ABCDEFGHJKLMNPQRSTUVWXYZ',MAX=8,CHEERS=['Yes!','Encore!','Sing it!','Wow'];
const myId=()=>{let v=null;try{v=sessionStorage.getItem('belt.pid');if(!v){v=Math.random().toString(36).slice(2,10);sessionStorage.setItem('belt.pid',v);}}catch(e){v=v||Math.random().toString(36).slice(2,10);}return v;};
const me={id:myId()};
let P=null;          // {role:'host'|'guest',code,st} once you're in a party
let form={tab:'host',name:'',code:'',pw:'',err:'',busy:false};
let ch=null,beat=0,sig='',seen={},banned=new Set(),lastState=0,live={loud:0,score:0,line:''},sentPick=false,advT=0;

const cleanName=s=>String(s||'').replace(/[^\p{L}\p{N} .'\-]/gu,'').trim().slice(0,14);
const defaultName=()=>cleanName(pref('pname','')||(S.user&&S.user.user_metadata&&(S.user.user_metadata.full_name||'').split(' ')[0])||'');
async function topicFor(code,pw){
  if(!pw)return 'party-'+code;
  const h=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(code+':'+pw));
  return 'party-'+code+'-'+[...new Uint8Array(h)].slice(0,8).map(b=>b.toString(16).padStart(2,'0')).join('');
}

/* ---------- The room ---------- */
function connect(topic){return new Promise((res,rej)=>{
  if(!S.sb||!S.sb.channel)return rej(new Error('offline'));
  ch=S.sb.channel(topic,{config:{broadcast:{self:false}}});
  ch.on('broadcast',{event:'m'},e=>{try{receive(e.payload);}catch(err){console.warn('belt: party',err);}});
  const to=setTimeout(()=>rej(new Error('timeout')),8000);
  ch.subscribe(s=>{if(s==='SUBSCRIBED'){clearTimeout(to);res();}else if(s==='CHANNEL_ERROR'||s==='TIMED_OUT'){clearTimeout(to);rej(new Error(s));}});
});}
function disconnect(){clearInterval(beat);clearTimeout(advT);if(ch){try{S.sb.removeChannel(ch);}catch(e){}ch=null;}}
// Say something to the room. The host also acts on its own messages, since the room doesn't echo them back.
function emit(m){m.from=me.id;if(ch)ch.send({type:'broadcast',event:'m',payload:m});if(P&&P.role==='host')hostHandle(m);}
function receive(m){
  if(!P||!m||m.from===me.id)return;
  if(P.role==='host')hostHandle(m);
  else if(m.t==='state'){if(m.st.players[me.id]){P.st=m.st;lastState=Date.now();render();}else if(P.st)leave('You’re no longer in this party.');}
  else if(m.t==='no'&&m.to===me.id&&!P.st){const why={locked:'That party is locked.',full:'That party is full.',started:'That party has already started.'}[m.why]||'Couldn’t join that party.';leave();form.err=why;render();}
  if(m.t==='live'&&P.st&&m.from===singerId()){live=m;paintLive();}
  if(m.t==='cheer')showCheer(m);
}

/* ---------- Host: keeps the party's state ---------- */
const singerId=()=>P&&P.st&&P.st.order[P.st.turn];
const push=()=>{if(ch)ch.send({type:'broadcast',event:'m',payload:{t:'state',st:P.st,from:me.id}});render();};
function hostHandle(m){
  const st=P.st,pl=st.players[m.from];seen[m.from]=Date.now();
  if(m.t==='join'){
    if(pl){pl.name=m.name;pl.av=m.av;pl.away=false;return push();}
    const why=banned.has(m.from)||st.locked?'locked':st.phase!=='lobby'?'started':st.order.length>=MAX?'full':'';
    if(why)return ch.send({type:'broadcast',event:'m',payload:{t:'no',to:m.from,why,from:me.id}});
    st.players[m.from]={name:m.name,av:m.av,pts:0};st.order.push(m.from);return push();
  }
  if(!pl)return;
  if(pl.away){pl.away=false;push();}
  if(m.t==='bye'){if(st.phase==='lobby'){delete st.players[m.from];st.order=st.order.filter(x=>x!==m.from);}else{pl.away=true;if(m.from===singerId()&&(st.phase==='pick'||st.phase==='sing'))return advance();}return push();}
  if(m.from!==singerId())return;
  if(m.t==='pick'&&st.phase==='pick'){st.phase='sing';st.now={song:String(m.song).slice(0,60),artist:String(m.artist||'').slice(0,60)};push();}
  if(m.t==='done'&&(st.phase==='pick'||st.phase==='sing')){
    const pts=Math.max(0,Math.min(100,Math.round(m.pts)||0));pl.pts+=pts;
    st.phase='result';st.last={id:m.from,song:String(m.song).slice(0,60),pts,score:Math.max(0,Math.min(100,Math.round(m.score)||0))};st.now=null;push();
    clearTimeout(advT);advT=setTimeout(advance,6500);
  }
}
function advance(){
  clearTimeout(advT);const st=P.st;let i=st.turn;
  for(;;){i++;if(i>=st.order.length){i=0;st.round++;}
    if(st.round>st.rounds){st.phase='final';st.now=null;return push();}
    if(!st.players[st.order[i]].away)break;}
  st.turn=i;st.phase='pick';st.now=null;push();
}
function hostTick(){
  const st=P.st,now=Date.now();
  for(const id of st.order)if(id!==me.id){const away=now-(seen[id]||0)>12000;if(away!==!!st.players[id].away)st.players[id].away=away;}
  if((st.phase==='pick'||st.phase==='sing')&&st.players[singerId()].away)return advance();
  push();
}
function startGame(){const st=P.st;if(st.order.length<2)return;for(const id of st.order)st.players[id].pts=0;st.round=1;st.turn=0;st.phase='pick';st.now=null;st.last=null;st.locked=true;push();}

/* ---------- Getting in and out ---------- */
async function host(){
  const name=cleanName(form.name);if(!name){form.err='Add your name first.';return render();}
  form.busy=true;form.err='';render();setPref('pname',name);
  const code=Array.from({length:6},()=>LETTERS[Math.floor(Math.random()*LETTERS.length)]).join('');
  try{await connect(await topicFor(code,form.pw.trim()));}catch(e){form.busy=false;form.err='Couldn’t open a party. Check your connection and try again.';disconnect();return render();}
  form.busy=false;seen={};banned=new Set();
  P={role:'host',code,hasPw:!!form.pw.trim(),st:{phase:'lobby',rounds:2,round:1,turn:0,order:[me.id],players:{[me.id]:{name,av:myGenre(),pts:0,host:true}},locked:false,now:null,last:null}};
  S.mode='party';beat=setInterval(hostTick,3000);render();
}
async function join(){
  const name=cleanName(form.name),code=form.code.toUpperCase().replace(/[^A-Z]/g,'').slice(0,6);
  if(!name){form.err='Add your name first.';return render();}
  if(code.length!==6){form.err='Party codes are 6 letters.';return render();}
  form.busy=true;form.err='';render();setPref('pname',name);
  try{await connect(await topicFor(code,form.pw.trim()));}catch(e){form.busy=false;form.err='Couldn’t reach the party. Check your connection and try again.';disconnect();return render();}
  P={role:'guest',code,st:null};S.mode='party';lastState=Date.now();
  const hello=()=>emit({t:P.st?'hi':'join',name,av:myGenre()});hello();beat=setInterval(()=>{hello();render();},4000);
  setTimeout(()=>{if(P&&P.role==='guest'&&!P.st){leave();form.err='Couldn’t find that party. Check the code'+(form.pw?' and password':'')+', and that the host has it open.';render();}},7000);
}
function leave(msg){
  if(P&&ch)emit({t:'bye'});disconnect();P=null;sig='';form.busy=false;S.mode='karaoke';
  if(msg)toast(msg);render();
}
export function partyBack(){
  if(P&&P.st&&P.st.phase!=='final'&&P.st.phase!=='lobby'){toast(P.role==='host'?'Leaving ends the party for everyone.':'Leave the party?',{label:'Leave',ms:5000,fn:()=>{leave();show('home');}});return;}
  if(P)leave();S.mode='karaoke';show('home');
}

/* ---------- Your turn: tell the room what's happening on your stage ---------- */
const mine=()=>P&&P.st&&singerId()===me.id&&(P.st.phase==='pick'||P.st.phase==='sing');
setInterval(()=>{
  if(!mine()){sentPick=false;return;}
  const r=S.run;if(!r||!$('sing').classList.contains('on'))return;
  if(!sentPick){sentPick=true;const c=CATALOG.find(x=>x.song===r.song);emit({t:'pick',song:r.song.title,artist:(c&&c.artist)||''});}
  let n=0,ok=0;for(const p of r.trail)if(p.m!=null){n++;if(p.ok)ok++;}
  emit({t:'live',loud:Math.min(1,(r.lvl||0)*12+(r.lastM!=null?.25:0)),score:n?Math.round(ok/n*100):0,line:(r.spans&&r.spans[0]?r.spans[0].parentNode.textContent:'').replace(/\s+/g,' ').trim().slice(0,80)});
},300);
const levelOf=s=>{const r=(s.maxM||0)-(s.minM||0);return r<=7?1:r<=9?2:r<=12?3:r<=15?4:5;};
// Party points out of 100: mostly pitch, plus singing the whole thing, plus a little for a harder song.
export const partyPoints=(song,sc)=>Math.round(60*sc.acc+25*Math.min(1,sc.cover/.7)+15*(levelOf(song)-1)/4);
function onResult(last){
  if(!mine())return false;
  const quiet=last.sc.cover<.15;emit({t:'done',song:last.song.title,pts:quiet?0:partyPoints(last.song,last.sc),score:Math.round(last.sc.acc*100)});
  show('party');render();return true;
}

/* ---------- What you see ---------- */
const head=(av,cls='mini')=>`<span class="${cls}"><svg class="belter" data-genre="${esc(av)}" data-bust="head" viewBox="4 -2 112 112"></svg></span>`;
const bust=av=>`<span class="av"><svg class="belter" id="pSinger" data-genre="${esc(av)}" viewBox="0 -4 120 140"></svg></span>`;
function board(st,opts={}){
  const ids=[...st.order].sort((a,b)=>st.players[b].pts-st.players[a].pts),top=st.players[ids[0]].pts;
  return `<div class="p-list">${(opts.plain?st.order:ids).map(id=>{const p=st.players[id];return `<div class="p-row${p.away?' away':''}${!opts.plain&&top>0&&p.pts===top?' lead':''}">${head(p.av)}<b>${esc(p.name)}${id===me.id?' (you)':''}</b>
    ${p.away?'<small>Away</small>':p.host&&opts.plain?'<small>Host</small>':''}${opts.plain?(P.role==='host'&&id!==me.id?`<button data-kick="${id}" aria-label="Remove ${esc(p.name)}">×</button>`:''):`<em>${p.pts}</em>`}</div>`;}).join('')}</div>`;
}
function view(){
  if(!P){const f=form,hosting=f.tab==='host';return `<h2>Party</h2><p class="lede">Sing together from anywhere. Everyone joins on their own phone and you take turns.</p>
    <div class="p-tabs"><button data-tab="host" aria-pressed="${hosting}">Host</button><button data-tab="join" aria-pressed="${!hosting}">Join</button></div>
    <label class="p-field">Your name<input id="pName" maxlength="14" autocomplete="given-name" value="${esc(f.name)}" placeholder="What should we call you?"></label>
    ${hosting?'':`<label class="p-field">Party code<input id="pCode" maxlength="6" autocapitalize="characters" autocomplete="off" spellcheck="false" value="${esc(f.code)}" placeholder="6 letters"></label>`}
    <label class="p-field">${hosting?'Room password (optional)':'Password, if the host set one'}<input id="pPw" maxlength="24" autocomplete="off" value="${esc(f.pw)}" placeholder="${hosting?'Leave empty for none':''}"></label>
    ${f.err?`<p class="p-err" role="alert">${esc(f.err)}</p>`:''}
    <button class="btn" id="pGo"${f.busy?' disabled':''}>${f.busy?'Connecting…':hosting?'Host a party':'Join the party'}</button>
    ${S.sb&&S.sb.channel?'':'<p class="p-note">Party needs a connection. Check that you’re online and reload.</p>'}`;}
  const st=P.st;if(!st)return `<h2>Joining ${esc(P.code)}</h2><p class="lede">Looking for the party…</p>`;
  const sid=singerId(),sp=st.players[sid],isHost=P.role==='host',hostName=(Object.values(st.players).find(p=>p.host)||{}).name||'the host';
  const lost=!isHost&&Date.now()-lastState>12000?`<p class="p-err" role="alert">Lost touch with ${esc(hostName)}. Waiting for them to come back…</p>`:'';
  if(st.phase==='lobby')return `<div class="p-code"><span><small>Party code${P.hasPw?' · password on':''}</small><b>${esc(P.code)}</b></span><button id="pShare">Invite</button></div>
    ${board(st,{plain:true})}
    ${isHost?`<div class="p-opts"><span>Rounds</span><span class="p-seg">${[1,2,3].map(n=>`<button data-rounds="${n}" aria-pressed="${st.rounds===n}">${n}</button>`).join('')}</span></div>
      <div class="p-opts"><span>Lock the room</span><span class="p-seg"><button data-lock="0" aria-pressed="${!st.locked}">Open</button><button data-lock="1" aria-pressed="${!!st.locked}">Locked</button></span></div>
      <button class="btn" id="pStart"${st.order.length<2?' disabled':''}>${st.order.length<2?'Waiting for friends…':'Start the party'}</button>
      <p class="p-note">Everyone picks their own song. Up to ${MAX} singers.</p>`
     :`<p class="p-note">Waiting for ${esc(hostName)} to start the party.</p>`}<div class="trivia dark" id="pTrivia" aria-live="polite" hidden></div>${lost}`;
  if(st.phase==='final'){const ids=[...st.order].sort((a,b)=>st.players[b].pts-st.players[a].pts),w=st.players[ids[0]],tie=ids[1]&&st.players[ids[1]].pts===w.pts;
    if(ids[0]===me.id&&!tie&&w.pts>0&&!P.won){P.won=true;setPref('partyWins',String(+pref('partyWins','0')+1));setTimeout(()=>pinsAfterSong(),300);}
    return `<div class="p-stage me">${bust(w.av)}<h3>${tie?'It’s a tie at the top':esc(w.name)+' wins the party'}</h3><p>${w.pts} points</p></div>${board(st)}
      ${isHost?'<button class="btn" id="pAgain">Play again</button>':`<p class="p-note">${esc(hostName)} can start another round.</p>`}<button class="p-link" id="pLeave">Leave the party</button>`;}
  if(st.phase==='result'&&st.last){const lp=st.players[st.last.id]||{name:'',av:'vex'};
    return `<div class="p-stage">${bust(lp.av)}<h3>${esc(lp.name)} · ${st.last.pts} points</h3><p>${esc(crowdFor(st.last.score))} for ${esc(st.last.song)}</p></div>${board(st)}<p class="p-note">Next singer coming up…</p>`;}
  if(sid===me.id)return `<div class="p-stage me">${bust(sp.av)}<h3>You’re up, ${esc(sp.name)}</h3><p>${st.phase==='sing'?'Your song is waiting.':'Pick any song. Everyone’s watching.'}</p><button class="btn" id="pSing">${st.phase==='sing'?'Back to your song':'Pick your song'}</button></div>${board(st)}${lost}`;
  return `<div class="p-stage">${bust(sp.av)}<h3>${esc(sp.name)} ${st.phase==='sing'?'is singing '+esc(st.now.song):'is picking a song'}</h3>
      ${st.phase==='sing'?`<p class="p-line" id="pLine" aria-live="off"></p><div class="p-score" id="pScore" aria-label="Score so far">0%</div>`:'<p>Get ready to cheer.</p>'}</div>
    ${st.phase==='sing'?'<div class="trivia dark" id="pTrivia" aria-live="polite" hidden></div>':''}
    <div class="p-cheers">${CHEERS.map((c,i)=>`<button data-cheer="${i}">${c}</button>`).join('')}</div>${board(st)}
    ${isHost?`<button class="p-link" id="pSkip">Skip ${esc(sp.name)}’s turn</button>`:''}${lost}`;
}
function render(){
  const body=$('partyBody');if(!body)return;
  if(!P&&!form.name)form.name=defaultName();
  const st=P&&P.st,html=view();
  if(st&&st.phase!=='final'&&P.won)P.won=false;
  $('partyRound').textContent=st&&st.phase!=='lobby'&&st.phase!=='final'?`Round ${Math.min(st.round,st.rounds)} of ${st.rounds}`:'';
  $('partyBackLabel').textContent=P?'Leave':'Home';
  if(html===sig)return;sig=html;
  const act=document.activeElement,fid=act&&body.contains(act)?act.id:'',pos=fid&&act.selectionStart;
  body.innerHTML=html;body.querySelectorAll('svg.belter').forEach(buildBelter);
  if(fid&&$(fid)){$(fid).focus();try{$(fid).setSelectionRange(pos,pos);}catch(e){}}
  if(st&&st.phase==='sing')paintLive();
  // something to talk about while you wait: facts about the song being sung, or singing tips in the lobby
  if(triviaStop)triviaStop();triviaStop=null;
  if($('pTrivia'))triviaStop=rotateFacts($('pTrivia'),st.phase==='sing'&&st.now?st.now.song:'',st.phase==='sing'&&st.now?st.now.artist:'',{every:8000,keep:()=>$('party').classList.contains('on')});
}
let triviaStop=null;
function paintLive(){const l=$('pLine'),s=$('pScore');if(l)l.textContent=live.line||'';if(s)s.textContent=(live.score||0)+'%';}
function showCheer(m){const p=P&&P.st&&P.st.players[m.from];if(p)toast(`${p.name}: ${CHEERS[m.i]||CHEERS[0]}`);}
(function sway(){requestAnimationFrame(sway);const s=$('pSinger');if(!s||!s._b||!$('party').classList.contains('on'))return;
  const st=P&&P.st,singing=st&&st.phase==='sing'&&singerId()!==me.id;live.loud*=.97;poseBelter(s._b,singing?live.loud:st&&st.phase==='final'?Math.max(0,Math.sin(performance.now()/300))*.6:0,0,performance.now());})();

$('partyBody').addEventListener('input',e=>{const t=e.target;if(t.id==='pName')form.name=t.value;if(t.id==='pCode')form.code=t.value;if(t.id==='pPw')form.pw=t.value;});
$('partyBody').addEventListener('keydown',e=>{if(e.key==='Enter'&&!P&&e.target.tagName==='INPUT'){e.preventDefault();form.tab==='host'?host():join();}});
$('partyBody').addEventListener('click',async e=>{
  const b=e.target.closest('button');if(!b)return;const st=P&&P.st,d=b.dataset;
  if(d.tab){form.tab=d.tab;form.err='';return render();}
  if(b.id==='pGo')return form.tab==='host'?host():join();
  if(b.id==='pLeave'){leave();return show('home');}
  if(b.id==='pSing'){S.mode='party';return $('sing').classList.contains('on')||S.run?show('sing'):openPicker();}
  if(d.cheer){emit({t:'cheer',i:+d.cheer});return toast('Sent: '+CHEERS[+d.cheer]);}
  if(b.id==='pShare'){const url=`${location.origin}/?party=${P.code}`,text=`Join my Belt party with code ${P.code}`+(P.hasPw?' (I’ll send you the password)':'');
    try{if(navigator.share)await navigator.share({title:'Belt party',text,url});else{await navigator.clipboard.writeText(text+': '+url);toast('Invite copied');}}catch(err){}return;}
  if(!st||P.role!=='host')return;
  if(d.rounds){st.rounds=+d.rounds;return push();}
  if(d.lock){st.locked=d.lock==='1';return push();}
  if(d.kick){banned.add(d.kick);delete st.players[d.kick];st.order=st.order.filter(x=>x!==d.kick);return push();}
  if(b.id==='pStart')return startGame();
  if(b.id==='pSkip')return advance();
  if(b.id==='pAgain'){P.won=false;for(const id of st.order)st.players[id].pts=0;st.phase='lobby';st.round=1;st.turn=0;st.last=null;st.locked=false;return push();}
});
$('partyBack').onclick=partyBack;
window.addEventListener('pagehide',()=>{if(P&&ch)emit({t:'bye'});});

export function openParty(code){if(code&&!P){form.tab='join';form.code=code;}S.mode=P?'party':S.mode;show('party');sig='';render();}
export const inParty=()=>!!P;
MODES.push({id:'party',name:'Party',blurb:'Sing with friends, each on your own phone',start:()=>openParty(),onResult});
renderModes();
// Opened from an invite link?
{const c=new URLSearchParams(location.search).get('party');if(c&&/^[A-Za-z]{6}$/.test(c)){history.replaceState(null,'',location.pathname);openParty(c.toUpperCase());}}
// debug handle for the tests
setTimeout(()=>{if(window.belt)window.belt.party={get state(){return P&&P.st;},get code(){return P&&P.code;}};},0);
