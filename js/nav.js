import {S} from './state.js';
import {$} from './util.js';
import {show} from './audio.js';
import {openPicker,paintAuth,paintTonight,renderChips} from './picker.js';
import {closeQuit,closeSheet} from './stage.js';
import {stopMix} from './results.js';
import {SONG_BY_ID,closeAuth,closeCast} from './account.js';
import {closeOwn,loadOwnLibrary} from './own-setup.js';

// Opened from a challenge link? Remember who to beat, then tidy the address bar.
try{
  const c=new URLSearchParams(location.search).get('c');
  if(c){const [id,sc,by]=c.split('.'),song=SONG_BY_ID[id],n=Math.round(+sc);
    if(song&&n>=0&&n<=100)S.challenge={song,score:n,by:(by||'').replace(/[^\p{L}\- ]/gu,'').slice(0,16)||'A friend'};
    history.replaceState(null,'',location.pathname);}
}catch(e){}
paintTonight();renderChips();paintAuth();
loadOwnLibrary();

/* ---------- The phone's back button or back swipe goes back one step in Belt instead of leaving the site ---------- */
let guard=false,skipPop=false;
const atRoot=()=>$('home').classList.contains('on')&&!document.querySelector('.sheet.on');
function syncGuard(){
  if(atRoot()){if(guard){guard=false;skipPop=true;history.back();}}
  else if(!guard){guard=true;history.pushState({belt:1},'');}
}
function goBack(){
  const open=id=>$(id).classList.contains('on');
  if(open('quitSheet'))return closeQuit();
  if(open('ownSheet'))return closeOwn();
  if(open('authSheet'))return closeAuth();
  if(open('castSheet'))return closeCast();
  if(open('sheet'))return closeSheet();
  const on=document.querySelector('.screen.on').id;
  if(on==='sing')$('quit').click();
  else if(on==='result'){stopMix();show('pick');}
  else if(on==='mine')openPicker();
  else if(on==='pick'){show('home');paintTonight();}
}
window.addEventListener('popstate',()=>{if(skipPop){skipPop=false;return;}guard=false;goBack();syncGuard();});
{const mo=new MutationObserver(()=>queueMicrotask(syncGuard));document.querySelectorAll('.screen,.sheet').forEach(el=>mo.observe(el,{attributes:true,attributeFilter:['class']}));}

