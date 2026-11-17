// Pins: collectible enamel pins you earn by singing, worn on a denim jacket on your profile.
// Every pin is worked out from your singing stats (the performances rows), so nothing extra is stored
// except which pins you've already seen unlock (so each one celebrates once) and party wins.
import {pref,setPref,esc} from './util.js';

/* ---------- What it takes ---------- */
// ctx is built once from all your takes; each pin says how far along you are: [have, need]
const dayKey=d=>new Date(d).toLocaleDateString('en-CA');
function context(rows,builtIns){
  const r=rows.filter(x=>x.cover>=.3).slice().sort((a,b)=>a.created_at.localeCompare(b.created_at));
  const days=[...new Set(r.map(x=>dayKey(x.created_at)))].sort();
  let streak=0,run=0,prev=null;for(const d of days){const t=new Date(d+'T12:00');run=prev&&(t-prev)/864e5<1.5?run+1:1;prev=t;streak=Math.max(streak,run);}
  const bySong={},bySongDay={};for(const x of r){(bySong[x.song_id]=bySong[x.song_id]||[]).push(x);const k=x.song_id+'|'+dayKey(x.created_at);bySongDay[k]=(bySongDay[k]||0)+1;}
  const lines=x=>(x.lines||[]).filter(l=>l.sung);
  let hot=0;for(const x of r){let n=0;for(const l of lines(x)){n=l.pct>=.85?n+1:0;hot=Math.max(hot,n);}}
  const glow=Math.max(0,...Object.values(bySong).map(a=>a.length>1?Math.max(...a.slice(1).map(x=>x.score||0))-(a[0].score||0):0));
  const hour=x=>new Date(x.created_at).getHours();
  return {
    songs:r.length,days:days.length,streak,best:Math.max(0,...r.map(x=>x.score||0)),
    flawless:r.some(x=>lines(x).some(l=>l.pct>=.98)),hot,
    highs:r.filter(x=>x.high_midi>=72).length,low:r.some(x=>x.low_midi!=null&&x.low_midi<=45),
    span:Math.max(0,...r.map(x=>x.high_midi!=null&&x.low_midi!=null?x.high_midi-x.low_midi:0)),
    epic:r.some(x=>x.finished&&x.song_len>=300),short:r.some(x=>x.finished&&x.song_len&&x.song_len<60),
    minutes:r.reduce((a,x)=>a+(x.sang_seconds||0),0)/60,encore:Math.max(0,...Object.values(bySongDay)),
    signature:Math.max(0,...Object.values(bySong).map(a=>a.length)),glow,
    own:new Set(r.filter(x=>x.own).map(x=>x.song_id)).size,built:builtIns.filter(id=>bySong[id]).length,builtAll:builtIns.length,
    party:r.filter(x=>x.mode==='party').length,wins:+pref('partyWins','0'),
    owl:r.some(x=>hour(x)<4),early:r.some(x=>hour(x)>=4&&hour(x)<8),key:r.some(x=>x.key_shift),
    finished:r.filter(x=>x.finished).length,
    season:r.some(x=>x.song_id==='jingle'&&new Date(x.created_at).getMonth()===11),wish:!!bySong.bday,
  };
}
const n=(v,need)=>[Math.min(v,need),need],yes=v=>[v?1:0,1];

// shape, glyph, enamel colours [face, accent], tier: c common (silver rim), r rare (gold), l legendary (holographic)
export const PINS=[
  {id:'open_mic',name:'Open mic',desc:'Sing your first song.',shape:'pick',glyph:'mic',c:['#ff5d8f','#ffd1df'],tier:'c',got:x=>n(x.songs,1)},
  {id:'regular',name:'Regular',desc:'Sing 10 songs.',shape:'circle',glyph:'10',c:['#4cc9f0','#d6f3fc'],tier:'c',got:x=>n(x.songs,10)},
  {id:'residency',name:'Residency',desc:'Sing 50 songs.',shape:'shield',glyph:'50',c:['#9b8aff','#e6e0ff'],tier:'r',got:x=>n(x.songs,50)},
  {id:'world_tour',name:'World tour',desc:'Sing 100 songs.',shape:'rosette',glyph:'globe',c:['#2b6fd6','#bfe0ff'],tier:'l',got:x=>n(x.songs,100)},
  {id:'three_nights',name:'Three-night run',desc:'Sing on 3 different days.',shape:'hex',glyph:'3',c:['#3ddc97','#d4f7e7'],tier:'c',got:x=>n(x.days,3)},
  {id:'on_a_roll',name:'On a roll',desc:'Sing 3 days in a row.',shape:'circle',glyph:'flame',c:['#ff8a3d','#ffe1cc'],tier:'r',got:x=>n(x.streak,3)},
  {id:'week_of_shows',name:'Week of shows',desc:'Sing 7 days in a row.',shape:'star',glyph:'7',c:['#ff5d3d','#ffd8cf'],tier:'l',got:x=>n(x.streak,7)},
  {id:'crowd_pleaser',name:'Crowd pleaser',desc:'Score 70% or more.',shape:'heart',glyph:'clap',c:['#ff5d8f','#ffe0ea'],tier:'c',got:x=>n(x.best,70)},
  {id:'standing_ovation',name:'Standing ovation',desc:'Score 85% or more.',shape:'shield',glyph:'crown',c:['#ffc23d','#fff1c7'],tier:'r',got:x=>n(x.best,85)},
  {id:'pitch_perfect',name:'Pitch perfect',desc:'Score 95% or more.',shape:'star',glyph:'note',c:['#ffd23f','#fff5c9'],tier:'l',got:x=>n(x.best,95)},
  {id:'flawless',name:'Flawless line',desc:'Sing a whole line on pitch.',shape:'pick',glyph:'check',c:['#3ddc97','#dcfff0'],tier:'c',got:x=>yes(x.flawless)},
  {id:'hot_streak',name:'Hot streak',desc:'Nail 5 lines in a row.',shape:'hex',glyph:'bolt',c:['#ffb020','#fff0c9'],tier:'r',got:x=>n(x.hot,5)},
  {id:'head_in_clouds',name:'Head in the clouds',desc:'Hit a C5 or higher.',shape:'circle',glyph:'cloud',c:['#7ad8ff','#e3f7ff'],tier:'c',got:x=>n(x.highs,1)},
  {id:'cloud_nine',name:'Cloud nine',desc:'Hit a C5 or higher in 9 songs.',shape:'rosette',glyph:'9',c:['#5ab8ff','#dff1ff'],tier:'r',got:x=>n(x.highs,9)},
  {id:'down_low',name:'Down low',desc:'Hit an A2 or lower.',shape:'shield',glyph:'down',c:['#6b4fd8','#e1d9ff'],tier:'c',got:x=>yes(x.low)},
  {id:'octave_jumper',name:'Octave jumper',desc:'Cover an octave in one song.',shape:'hex',glyph:'up',c:['#25c99a','#d3f5ea'],tier:'c',got:x=>n(Math.floor(x.span),12)},
  {id:'two_octave_club',name:'Two-octave club',desc:'Cover two octaves in one song.',shape:'star',glyph:'2x',c:['#c86bff','#f1dcff'],tier:'l',got:x=>n(Math.floor(x.span),24)},
  {id:'epic',name:'Epic',desc:'Finish a song that’s 5 minutes or longer.',shape:'shield',glyph:'5m',c:['#e63950','#ffd5db'],tier:'r',got:x=>yes(x.epic)},
  {id:'short_sweet',name:'Short and sweet',desc:'Finish a song under a minute.',shape:'heart',glyph:'clock',c:['#ff9fc0','#ffe8f0'],tier:'c',got:x=>yes(x.short)},
  {id:'warmed_up',name:'Warmed up',desc:'Sing for 10 minutes in total.',shape:'circle',glyph:'10m',c:['#ff7a59','#ffe0d8'],tier:'c',got:x=>n(Math.floor(x.minutes),10)},
  {id:'marathon',name:'Marathon',desc:'Sing for an hour in total.',shape:'rosette',glyph:'1h',c:['#f0503c','#ffd9d3'],tier:'r',got:x=>n(Math.floor(x.minutes),60)},
  {id:'encore',name:'Encore!',desc:'Sing the same song 3 times in one night.',shape:'pick',glyph:'repeat',c:['#b48cff','#efe6ff'],tier:'c',got:x=>n(x.encore,3)},
  {id:'signature',name:'Signature song',desc:'Sing the same song 10 times.',shape:'shield',glyph:'pen',c:['#1d1631','#d9d3f0'],tier:'r',got:x=>n(x.signature,10)},
  {id:'glow_up',name:'Glow up',desc:'Beat your first score on a song by 20 points.',shape:'star',glyph:'sparkle',c:['#ff5fa8','#ffe0f0'],tier:'r',got:x=>n(Math.floor(x.glow),20)},
  {id:'bring_your_own',name:'Bring your own',desc:'Sing one of your own songs.',shape:'hex',glyph:'vinyl',c:['#2b2440','#d8d3e6'],tier:'c',got:x=>n(x.own,1)},
  {id:'crate_digger',name:'Crate digger',desc:'Sing 5 of your own songs.',shape:'rosette',glyph:'crate',c:['#8a5a2b','#f1dcc4'],tier:'r',got:x=>n(x.own,5)},
  {id:'songbook',name:'Songbook',desc:'Sing every built-in song.',shape:'shield',glyph:'book',c:['#3a74b8','#d6e6fa'],tier:'r',got:x=>n(x.built,x.builtAll||5)},
  {id:'party_starter',name:'Party starter',desc:'Sing in a party.',shape:'pick',glyph:'balloon',c:['#ff5d8f','#ffe0ea'],tier:'c',got:x=>n(x.party,1)},
  {id:'crowned',name:'Crowned',desc:'Win a party.',shape:'star',glyph:'crown',c:['#ffc23d','#fff1c7'],tier:'l',got:x=>n(x.wins,1)},
  {id:'night_owl',name:'Night owl',desc:'Sing between midnight and 4am.',shape:'circle',glyph:'moon',c:['#241a3d','#c9b8ff'],tier:'c',got:x=>yes(x.owl)},
  {id:'shower_singer',name:'Shower singer',desc:'Sing before 8am.',shape:'heart',glyph:'sun',c:['#ffd23f','#fff6cf'],tier:'c',got:x=>yes(x.early)},
  {id:'key_change',name:'Key change',desc:'Sing a song in a different key.',shape:'pick',glyph:'key',c:['#25c99a','#d3f5ea'],tier:'c',got:x=>yes(x.key)},
  {id:'no_skips',name:'No skips',desc:'Finish 10 songs to the very end.',shape:'hex',glyph:'play',c:['#4c8fd6','#dbe9fa'],tier:'r',got:x=>n(x.finished,10)},
  {id:'tis_the_season',name:'’Tis the season',desc:'Sing Jingle Bells in December.',shape:'rosette',glyph:'snow',c:['#2fa86a','#d9f5e5'],tier:'c',got:x=>yes(x.season)},
  {id:'make_a_wish',name:'Make a wish',desc:'Sing Happy Birthday.',shape:'circle',glyph:'cake',c:['#ff8fc7','#ffe6f3'],tier:'c',got:x=>yes(x.wish)},
];
export const TIER={c:'Common',r:'Rare',l:'Legendary'};
export function pinState(rows,builtIns){
  const x=context(rows,builtIns);
  return PINS.map(p=>{const [have,need]=p.got(x);return {...p,have,need,earned:have>=need};});
}

/* ---------- Which ones are new ---------- */
// Returns pins earned since you last looked. The very first time, everything already earned is just marked
// as seen (so an existing singer isn't buried in 10 popups), and you get a count instead.
export function newPins(state,takes=0){
  const earned=state.filter(p=>p.earned).map(p=>p.id),raw=pref('pinsSeen','')||(takes<=2?'[]':'');
  if(!raw){setPref('pinsSeen',JSON.stringify(earned));return {first:earned.length,fresh:[]};}
  let seen=[];try{seen=JSON.parse(raw);}catch(e){}
  const fresh=state.filter(p=>p.earned&&!seen.includes(p.id));
  if(fresh.length)setPref('pinsSeen',JSON.stringify([...new Set([...seen,...fresh.map(p=>p.id)])]));
  return {first:0,fresh};
}

/* ---------- Drawing a pin ---------- */
const SHAPES={
  circle:'M50 6 A44 44 0 1 1 49.9 6 Z',
  pick:'M50 95 C31 80 9 52 11 29 C13 11 31 6 50 6 C69 6 87 11 89 29 C91 52 69 80 50 95 Z',
  shield:'M50 5 L87 17 V47 C87 72 70 87 50 95 C30 87 13 72 13 47 V17 Z',
  hex:'M50 5 L89 27.5 V72.5 L50 95 L11 72.5 V27.5 Z',
  heart:'M50 92 C22 74 6 56 6 35 C6 18 19 8 33 8 C42 8 47 13 50 18 C53 13 58 8 67 8 C81 8 94 18 94 35 C94 56 78 74 50 92 Z',
  star:'M50 4 L61.8 33.6 L93.7 35.8 L69.1 56.2 L77 87.2 L50 70 L23 87.2 L30.9 56.2 L6.3 35.8 L38.2 33.6 Z',
  rosette:(()=>{let d='';for(let i=0;i<32;i++){const a=i/32*Math.PI*2-Math.PI/2,r=i%2?40:46;d+=(i?'L':'M')+(50+Math.cos(a)*r).toFixed(1)+' '+(50+Math.sin(a)*r).toFixed(1);}return d+'Z';})(),
};
// simple glyphs, drawn in a 40x40 box centred on the pin
const G={
  mic:'<rect x="14" y="4" width="12" height="20" rx="6"/><path d="M8 18a12 12 0 0 0 24 0M20 30v7M13 37h14" fill="none" stroke-width="3.4"/>',
  flame:'<path d="M20 4c3 8 12 12 12 22a12 12 0 0 1-24 0c0-6 4-9 6-14 1 4 3 6 5 6 0-6-2-9 1-14z"/>',
  clap:'<path d="M10 22l9-14a3 3 0 0 1 5 3l-4 7 9-11a3 3 0 0 1 5 3l-8 11 7-6a3 3 0 0 1 4 4l-9 10c-6 6-15 6-19-1-2-3-1-6 1-6z"/>',
  crown:'<path d="M5 30L3 11l10 8 7-13 7 13 10-8-2 19z"/><rect x="5" y="32" width="30" height="4" rx="2"/>',
  note:'<path d="M14 30V8l18-4v20" fill="none" stroke-width="3.6"/><ellipse cx="10" cy="30" rx="6" ry="5"/><ellipse cx="28" cy="25" rx="6" ry="5"/>',
  check:'<path d="M7 21l9 9 17-19" fill="none" stroke-width="5"/>',
  bolt:'<path d="M23 2L8 23h10l-3 15 17-23H22z"/>',
  cloud:'<path d="M11 31a8 8 0 0 1-1-16 11 11 0 0 1 21-2 9 9 0 0 1 1 18z"/>',
  down:'<path d="M20 5v26M9 21l11 11 11-11" fill="none" stroke-width="5"/>',
  up:'<path d="M20 35V9M9 19L20 8l11 11" fill="none" stroke-width="5"/>',
  clock:'<circle cx="20" cy="20" r="15" fill="none" stroke-width="3.6"/><path d="M20 11v10l7 4" fill="none" stroke-width="3.4"/>',
  repeat:'<path d="M8 17a12 12 0 0 1 21-6M32 23a12 12 0 0 1-21 6" fill="none" stroke-width="3.6"/><path d="M30 4v8h-8M10 36v-8h8" fill="none" stroke-width="3.6"/>',
  pen:'<path d="M8 32l3-9 17-17 6 6-17 17z"/><path d="M6 37c6-3 10 1 15-2" fill="none" stroke-width="2.6"/>',
  sparkle:'<path d="M20 2l4 13 13 5-13 4-4 14-4-14-13-4 13-5z"/>',
  vinyl:'<circle cx="20" cy="20" r="17"/><circle cx="20" cy="20" r="6" class="g2"/><circle cx="20" cy="20" r="1.8"/>',
  crate:'<rect x="5" y="14" width="30" height="21" rx="2"/><rect x="9" y="6" width="5" height="12" rx="1" class="g2"/><rect x="16" y="4" width="5" height="14" rx="1" class="g2"/><rect x="23" y="7" width="5" height="11" rx="1" class="g2"/>',
  book:'<path d="M4 8c6-2 11-1 16 3v24c-5-4-10-5-16-3zM36 8c-6-2-11-1-16 3v24c5-4 10-5 16-3z"/>',
  balloon:'<ellipse cx="20" cy="15" rx="11" ry="13"/><path d="M20 28l-3 4h6zM20 32c-2 3 2 4 0 7" fill="none" stroke-width="2"/>',
  moon:'<path d="M27 4a16 16 0 1 0 9 26A14 14 0 0 1 27 4z"/>',
  sun:'<circle cx="20" cy="20" r="8"/><path d="M20 3v6M20 31v6M3 20h6M31 20h6M8 8l4 4M28 28l4 4M8 32l4-4M28 12l4-4" fill="none" stroke-width="3.2"/>',
  key:'<circle cx="12" cy="20" r="8" fill="none" stroke-width="4"/><path d="M20 20h16M30 20v7M35 20v5" fill="none" stroke-width="4"/>',
  play:'<path d="M12 6l22 14-22 14z"/>',
  snow:'<path d="M20 3v34M5 11l30 18M5 29l30-18M15 6l5 5 5-5M15 34l5-5 5 5" fill="none" stroke-width="3.2"/>',
  cake:'<rect x="6" y="20" width="28" height="15" rx="3"/><path d="M6 25c5 3 9-3 14 0s9 3 14 0" fill="none" stroke-width="2.4" class="gs"/><path d="M20 19v-7" fill="none" stroke-width="3"/><path d="M20 4c3 3 2 6 0 6s-3-3 0-6z"/>',
  globe:'<circle cx="20" cy="20" r="16" fill="none" stroke-width="3.4"/><path d="M4 20h32M20 4c-7 8-7 24 0 32M20 4c7 8 7 24 0 32" fill="none" stroke-width="2.6"/>',
};
let uid=0;
export function pinSVG(p,{locked=false,size=64}={}){
  const id='pn'+(uid++),d=SHAPES[p.shape],[face,acc]=p.c,dark=parseInt(face.slice(1,3),16)*.3+parseInt(face.slice(3,5),16)*.59+parseInt(face.slice(5,7),16)*.11<120,ink=dark?acc:'#1d1631';
  const rim=p.tier==='l'?`url(#${id}h)`:p.tier==='r'?`url(#${id}g)`:`url(#${id}s)`;
  const glyphFor=(ink,face)=>G[p.glyph]?`<g transform="translate(30 30)" fill="${ink}" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round">${G[p.glyph].replace(/class="g2"/g,`fill="${face}" stroke="none"`).replace(/class="gs"/g,`stroke="${face}"`)}</g>`
    :`<text x="50" y="${p.glyph.length>2?59:61}" text-anchor="middle" font-size="${p.glyph.length>2?24:p.glyph.length>1?30:36}" font-weight="800" fill="${ink}" font-family="var(--display, sans-serif)" letter-spacing="-1">${esc(p.glyph)}</text>`;
  const glyph=glyphFor(ink,face);
  if(locked)return `<svg class="pin locked" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true"><path d="${d}" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-dasharray="5 4"/>
    <g opacity=".4" transform="translate(50 50) scale(.72) translate(-50 -50)">${glyphFor('#fff','#2f4a7a')}</g></svg>`;
  return `<svg class="pin t-${p.tier}" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">
    <defs><linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#b9bfd0"/><stop offset="1" stop-color="#7d8499"/></linearGradient>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b8"/><stop offset=".4" stop-color="#f2b830"/><stop offset="1" stop-color="#a86b0c"/></linearGradient>
      <linearGradient id="${id}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7ad9"/><stop offset=".25" stop-color="#ffe066"/><stop offset=".5" stop-color="#6dffc2"/><stop offset=".75" stop-color="#6db4ff"/><stop offset="1" stop-color="#c37bff"/></linearGradient>
      <clipPath id="${id}c"><path d="${d}"/></clipPath></defs>
    <path d="${d}" fill="${rim}" transform="translate(50 50) scale(1.04) translate(-50 -50)"/>
    <path d="${d}" fill="${face}" transform="translate(50 50) scale(.86) translate(-50 -50)"/>
    <path d="${d}" fill="none" stroke="${acc}" stroke-width="2" opacity=".55" transform="translate(50 50) scale(.74) translate(-50 -50)"/>
    ${glyph}
    <g clip-path="url(#${id}c)"><path d="M-10 30 C20 10 50 4 110 -6 L110 -20 L-10 -20 Z" fill="#fff" opacity=".28"/></g></svg>`;
}

/* ---------- The unlock moment ---------- */
// A pin spins down into a spotlight, lands with a thunk, light rays turn behind it and sparks fly.
let queue=[],showing=false,total=PINS.length;
function chime(){
  try{const AC=window.AudioContext||window.webkitAudioContext,c=chime.c||(chime.c=new AC()),t=c.currentTime+.05;
    [[784,0],[988,.09],[1319,.18],[1568,.3]].forEach(([f,d],i)=>{const o=c.createOscillator(),g=c.createGain();o.type=i===3?'triangle':'sine';o.frequency.value=f;
      g.gain.setValueAtTime(0,t+d);g.gain.linearRampToValueAtTime(.12,t+d+.02);g.gain.exponentialRampToValueAtTime(.001,t+d+.9);o.connect(g);g.connect(c.destination);o.start(t+d);o.stop(t+d+1);});}catch(e){}
}
let extra=0;
export function celebrate(pins,{view=false}={}){
  // a big night can earn several at once: show the three rarest, and say how many more are waiting on the jacket
  let list=pins;if(!view&&pins.length>3){const rank={l:0,r:1,c:2};list=pins.slice().sort((a,b)=>rank[a.tier]-rank[b.tier]).slice(0,3);extra+=pins.length-3;}
  queue.push(...list.map(p=>({p,view})));if(!showing)next();
}
function next(){
  const box=document.getElementById('unlock');const item=queue.shift();
  if(!item){showing=false;box.classList.remove('on');box.setAttribute('aria-hidden','true');
    if(extra){const t=document.getElementById('toast');t.textContent=`+${extra} more ${extra===1?'pin':'pins'} on your profile`;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3200);extra=0;}return;}
  showing=true;const {p,view}=item,locked=view&&!p.earned,left=queue.filter(q=>!q.view).length;
  box.className='unlock on t-'+p.tier+(view?' view':'')+(locked?' locked':'');box.setAttribute('aria-hidden','false');
  box.innerHTML=`<div class="u-rays" aria-hidden="true"></div><div class="u-spot" aria-hidden="true"></div><div class="u-sparks" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="--a:${i*20}deg;--d:${90+(i%3)*40}px;--s:${.6+(i%4)*.2}"></i>`).join('')}</div>
    <div class="u-card" role="dialog" aria-modal="true" aria-labelledby="uName">
      <p class="u-kicker">${locked?'Locked pin':view?TIER[p.tier]+' pin':'New '+TIER[p.tier].toLowerCase()+' pin'}</p>
      <div class="u-pin">${pinSVG(p,{locked,size:180})}</div>
      <h2 id="uName">${esc(p.name)}</h2><p class="u-desc">${esc(p.desc)}</p>
      ${locked?`<div class="u-prog" role="progressbar" aria-valuemin="0" aria-valuemax="${p.need}" aria-valuenow="${p.have}"><i style="width:${Math.round(p.have/p.need*100)}%"></i></div><p class="u-count">${p.have} of ${p.need}</p>`:''}
      <button class="btn" id="uOk">${view?'Close':left?`Next pin (${left} more)`:'Pin it to your jacket'}</button></div>`;
  const ok=document.getElementById('uOk');ok.onclick=next;ok.focus();
  box.onclick=e=>{if(e.target===box)next();};
  if(!view)chime();
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&showing)next();});
