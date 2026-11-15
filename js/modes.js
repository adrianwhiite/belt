// Ways to play. Each mode is one tile on the home screen; with a single mode, home shows
// one big button exactly like before, so the hub only appears once there is a choice.
// A mode can react to a finished take (onResult) — Party mode will use that to keep score.
import {S} from './state.js';
import {$,esc} from './util.js';
import {openPicker,wash} from './picker.js';

export const MODES=[
  {id:'karaoke',name:'Start singing',blurb:'Pick a song and sing it loud',start:el=>wash(el,()=>openPicker())},
];
S.mode='karaoke';
export const currentMode=()=>MODES.find(m=>m.id===S.mode)||MODES[0];
export function startMode(id,el){const m=MODES.find(x=>x.id===id);if(!m)return;S.mode=m.id;m.start(el);}

export function renderModes(){
  const box=$('modes');
  if(MODES.length===1){const m=MODES[0];box.className='modes one';box.innerHTML=`<button class="btn" id="go" data-mode="${m.id}">${esc(m.name)}</button>`;}
  else{box.className='modes';box.innerHTML=MODES.map((m,i)=>`<button class="mode${i?'':' main'}" data-mode="${m.id}"${i?'':' id="go"'}><b>${esc(m.name)}</b><span>${esc(m.blurb)}</span></button>`).join('');}
}
$('modes').onclick=e=>{const b=e.target.closest('[data-mode]');if(b)startMode(b.dataset.mode,b);};
renderModes();
