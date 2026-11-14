import {S} from './state.js';
import {$,esc,pref,reduceMotion,setPref} from './util.js';
import {SONGS} from './songs.js';
import {PV_LEN,cache,ctx,ensureCtx,pv,show} from './audio.js';
import {openSheet,tracksFor} from './stage.js';
import {SONG_BY_ID,authFor,openMine} from './account.js';

/* ---------- Belters: the singer avatars. Rounded shapes, genres, always on light paper ---------- */
export const INK='#1d1631';
export const GENRES={
  classic:{name:'Classic Belter',c:'#ffbf47',jk:'#3ddc97',hair:'fan',outfit:'v'},
  rocker:{name:'Rocker',c:'#a594ff',jk:'#1d1631',hair:'spikes',eyes:'shades',outfit:'leather'},
  jazz:{name:'Jazz',c:'#6fd3f2',jk:'#1d1631',hat:'fedora',outfit:'turtle'},
  pop:{name:'Pop',c:'#ff9cbb',jk:'#9b8aff',hair:'pony',mic:'headset',outfit:'sparkle'},
  country:{name:'Country',c:'#ffc85c',jk:'#3a7bd5',hat:'cowboy',outfit:'bandana'},
  soul:{name:'Soul',c:'#5fdcab',jk:'#ff5d8f',hair:'afro',outfit:'chain'}
};
let UID=0;
export function buildBelter(svg){
  const id='b'+(UID++),G=GENRES[svg.dataset.genre||'classic']||GENRES.classic,c=G.c,jk=G.jk,bust=svg.dataset.bust==='head';
  const back=G.hair==='spikes'?`<path d="M31 44 L33 12 L44 30 L49 2 L58 27 L66 4 L72 29 L83 10 L89 44 Z" fill="${INK}"/>`:
    G.hair==='afro'?`<g fill="#2a1d24">${[[33,30,19],[47,17,19],[62,13,19],[77,18,19],[89,31,17],[24,48,15],[96,48,15]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`:
    G.hair==='pony'?`<rect x="80" y="2" width="14" height="36" rx="7" fill="${INK}" transform="rotate(28 87 30)"/><circle cx="84" cy="24" r="5" fill="#ffb020"/>`:
    G.hair==='fan'?[[45.5,-14],[55.5,0],[65.5,14]].map(([x,r],i)=>`<rect class="hb" data-i="${i}" data-r="${r}" data-cx="${x+4.5}" x="${x}" y="${i===1?3:7}" width="9" height="${i===1?23:19}" rx="4.5" fill="${INK}"/>`).join(''):'';
  const front=G.hair==='pony'?`<path d="M27 50 C27 28 44 19 61 20 C79 21 93 31 93 50 C86 40 75 35 62 36 C47 36 35 41 27 50 Z" fill="${INK}"/>`:'';
  const hat=G.hat==='fedora'?`<ellipse cx="60" cy="27" rx="41" ry="7" fill="${INK}"/><path d="M37 27 C37 9 46 4 60 4 C74 4 83 9 83 27 Z" fill="${INK}"/><rect x="37" y="18" width="46" height="5.5" fill="#ffb020"/><path d="M50 6 Q60 12 70 6" stroke="#3a3150" stroke-width="2" fill="none"/>`:
    G.hat==='cowboy'?`<path d="M36 28 C36 11 43 3 51 8 C55 4 65 4 69 8 C77 3 84 11 84 28 Z" fill="#a8703a"/><rect x="36" y="20" width="48" height="5" fill="#5b3a1e"/><path d="M10 26 C22 37 98 37 110 26 C104 32 16 32 10 26 Z" fill="#8a5a2b"/><path d="M12 25 C28 34 92 34 108 25 C96 29 24 29 12 25 Z" fill="#a8703a"/>`:'';
  const eyes=G.eyes==='shades'?`<g><rect x="33" y="47" width="23" height="13" rx="6" fill="${INK}"/><rect x="64" y="47" width="23" height="13" rx="6" fill="${INK}"/><rect x="55" y="50" width="10" height="3" rx="1.5" fill="${INK}"/><path d="M37 50 L44 50 M68 50 L75 50" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".6"/></g>`:'';
  const dots=(pts,r,f)=>pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`).join('');
  const star=(x,y)=>`<path d="M${x} ${y-3.5} L${x+1} ${y-1} L${x+3.5} ${y} L${x+1} ${y+1} L${x} ${y+3.5} L${x-1} ${y+1} L${x-3.5} ${y} L${x-1} ${y-1} Z" fill="#fff" opacity=".85"/>`;
  const detail={turtle:`<rect x="44" y="96" width="32" height="14" rx="7" fill="#2b2247"/>`,
    leather:`<path d="M47 102 L60 120 L73 102 Z" fill="#fbf9ff" opacity=".9"/><path d="M38 106 L52 104 L58 128 Z M82 106 L68 104 L62 128 Z" fill="#2f2747"/><path d="M60 122 V140" stroke="#6b6385" stroke-width="1.6"/>${dots([[30,118],[90,118],[26,128],[94,128]],1.6,'#cfc9dd')}`,
    bandana:`<path d="M46 101 L74 101 L60 117 Z" fill="#e0483e"/>${dots([[54,105],[64,104],[60,111]],1.3,'#fff')}`,
    chain:`<path d="M47 102 L60 117 L73 102 Z" fill="#fbf9ff" opacity=".9"/><path d="M45 104 Q60 126 75 104" stroke="#f2c14e" stroke-width="2.6" fill="none"/><circle cx="60" cy="117" r="3.6" fill="#f2c14e"/>`,
    sparkle:`<path d="M47 102 Q60 112 73 102" stroke="#fbf9ff" stroke-width="3" fill="none" opacity=".9"/>${[[30,120],[42,130],[78,116],[90,128],[60,132],[70,124]].map(([x,y])=>star(x,y)).join('')}`,
    v:`<path d="M47 102 L60 118 L73 102 Z" fill="#fbf9ff" opacity=".92"/>`}[G.outfit]||'';
  const outfit=bust?'':`<path d="M14 140 C14 113 32 101 60 101 C88 101 106 113 106 140 Z" fill="${jk}"/>${detail}<rect x="52" y="90" width="16" height="15" rx="6" fill="${c}"/><rect x="52" y="90" width="16" height="15" rx="6" fill="#000" opacity=".16"/>`;
  const headset=G.mic==='headset'&&!bust?`<path d="M92 50 Q99 72 74 81" stroke="${INK}" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="72.5" cy="81.5" r="3.6" fill="${INK}"/>`:'';
  const hands=svg.dataset.clap&&!bust?`<g class="hands"><ellipse class="hl" cx="40" cy="106" rx="9.5" ry="11" fill="${c}" stroke="${INK}" stroke-opacity=".18" stroke-width="1.2"/><ellipse class="hr" cx="80" cy="106" rx="9.5" ry="11" fill="${c}" stroke="${INK}" stroke-opacity=".18" stroke-width="1.2"/></g>`:'';
  const hand=bust||G.mic==='headset'||svg.dataset.mic==='none'?'':`<g class="mic"><rect x="-3.6" y="2" width="7.2" height="28" rx="3.6" fill="${INK}"/><rect x="-4.6" y="1" width="9.2" height="4" rx="2" fill="#6b6385"/><circle cx="0" cy="-6" r="8.5" fill="#cfc9dd"/><path d="M-8 -6 H8 M-6.5 -10.5 H6.5 M-6.5 -1.5 H6.5 M0 -14 V2 M-4.5 -13 V1 M4.5 -13 V1" stroke="${INK}" stroke-width=".7" opacity=".35"/><circle cx="-2.6" cy="-9" r="2.2" fill="#fff" opacity=".7"/><ellipse cx="1" cy="16" rx="7.5" ry="8.5" fill="${c}"/><ellipse cx="1" cy="16" rx="7.5" ry="8.5" fill="#000" opacity=".08"/></g>`;
  svg.innerHTML=`<defs><clipPath id="${id}h"><rect x="26" y="22" width="68" height="72" rx="30"/></clipPath><clipPath id="${id}m"><path class="mpath"/></clipPath></defs>
  ${outfit}
  <g class="head">${back}
   <rect x="26" y="22" width="68" height="72" rx="30" fill="${c}"/>
   <g clip-path="url(#${id}h)"><ellipse cx="96" cy="74" rx="34" ry="46" fill="#000" opacity=".1"/><ellipse cx="42" cy="34" rx="18" ry="10" fill="#fff" opacity=".24"/></g>
   <circle cx="37" cy="69" r="6.5" fill="#ff5d8f" opacity=".22"/><circle cx="83" cy="69" r="6.5" fill="#ff5d8f" opacity=".22"/>
   ${front}
   <rect class="br" data-s="-1" x="36" y="41" width="15" height="4.4" rx="2.2" fill="${INK}"/><rect class="br" data-s="1" x="69" y="41" width="15" height="4.4" rx="2.2" fill="${INK}"/>
   <g class="eo"><ellipse cx="44" cy="55" rx="4.6" ry="6.2" fill="${INK}"/><ellipse cx="76" cy="55" rx="4.6" ry="6.2" fill="${INK}"/><circle cx="45.6" cy="52.8" r="1.5" fill="#fff"/><circle cx="77.6" cy="52.8" r="1.5" fill="#fff"/></g>
   <g class="ec" opacity="0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"><path d="M38.5 55.5 Q44 60 49.5 55.5"/><path d="M70.5 55.5 Q76 60 81.5 55.5"/></g>
   ${eyes}
   <path class="mouth" fill="${INK}"/>
   <g clip-path="url(#${id}m)"><ellipse class="tongue" cx="60" fill="#ff7a8f"/><rect class="teeth" fill="#fff" rx="1.2"/></g>
   ${hat}${headset}
  </g>${hand}${hands}`;
  const q=k=>svg.querySelector(k);
  const b={svg,bust,hair:[...svg.querySelectorAll('.hb')],brows:[...svg.querySelectorAll('.br')],eo:q('.eo'),ec:q('.ec'),mouth:q('.mouth'),mpath:q('.mpath'),tongue:q('.tongue'),teeth:q('.teeth'),head:q('.head'),mic:q('.mic'),hl:q('.hl'),hr:q('.hr'),seed:Math.random()*10,sm:0};
  poseBelter(b,0,0,0);svg._b=b;return b;
}
export function poseBelter(b,loud,lift,t){
  if(!b)return;b.sm+=(loud-b.sm)*.25;const L=b.sm;
  const W=15+L*8,H=2.5+L*19,y0=75;
  const d=`M${60-W/2} ${y0} Q60 ${y0-1.5-L*1.5} ${60+W/2} ${y0} Q${60+W/2} ${y0+H} 60 ${y0+H} Q${60-W/2} ${y0+H} ${60-W/2} ${y0} Z`;
  b.mouth.setAttribute('d',d);b.mpath.setAttribute('d',d);
  b.tongue.setAttribute('cy',(y0+H*.82).toFixed(1));b.tongue.setAttribute('rx',(W*.3).toFixed(1));b.tongue.setAttribute('ry',(H*.32).toFixed(1));
  const th=H>6?Math.min(3.2,H*.18):0;b.teeth.setAttribute('x',(60-W*.3).toFixed(1));b.teeth.setAttribute('y',(y0-1).toFixed(1));b.teeth.setAttribute('width',(W*.6).toFixed(1));b.teeth.setAttribute('height',th.toFixed(1));
  const belting=L>.7,blink=((t/1000+b.seed)%4.4)<.11;
  b.eo.setAttribute('opacity',belting||blink?0:1);b.ec.setAttribute('opacity',belting||blink?1:0);
  b.brows.forEach(br=>{const sgn=+br.dataset.s;const ang=sgn*(-6*L-8*lift);br.setAttribute('transform',`translate(0 ${(-lift*3-L*1.5).toFixed(2)}) rotate(${ang.toFixed(1)} ${sgn<0?43.5:76.5} 43)`);});
  b.head.setAttribute('transform',`rotate(${(-5*L+Math.sin(t/900+b.seed)*1.2).toFixed(2)} 60 96)`);
  b.hair.forEach(h=>{const i=+h.dataset.i,r=+h.dataset.r||0,cx=+h.dataset.cx||60;const k=Math.max(.6,Math.min(1.3,.75+L*(.45+.4*Math.sin(t/140+i*2.1))));h.setAttribute('transform',`rotate(${r} ${cx} 28) translate(${cx} 28) scale(1 ${k.toFixed(3)}) translate(${-cx} -28)`);});
  if(b.mic)b.mic.setAttribute('transform',`translate(${(90-L*2).toFixed(1)} ${(93-L*4).toFixed(1)}) rotate(${(-24+L*6).toFixed(1)})`);
}


export const myGenre=()=>GENRES[pref('genre','classic')]?pref('genre','classic'):'classic';
export function paintMe(){document.querySelectorAll('svg.belter[data-me]').forEach(s=>{s.dataset.genre=myGenre();buildBelter(s);});}
paintMe();

/* ---------- Home: still wordmark, bars that move like audio ---------- */
const bars=[...document.querySelectorAll('#meter i')],barH=[.5,.5,.5,.5,.5],barKick=[0,0,0,0,0];
// The bars are an instrument: touch one and it sings a note; slide across them for a run.
const BAR_NOTES=[60,62,64,67,69];
function pluck(i){
  ensureCtx();if(ctx.state==='suspended')ctx.resume();
  const t=ctx.currentTime,f=440*Math.pow(2,(BAR_NOTES[i]-69)/12),o=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain(),lp=ctx.createBiquadFilter();
  o.type='triangle';o.frequency.value=f;o2.type='sine';o2.frequency.value=f*2;lp.type='lowpass';lp.frequency.setValueAtTime(5200,t);lp.frequency.exponentialRampToValueAtTime(900,t+.6);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.22,t+.008);g.gain.exponentialRampToValueAtTime(.001,t+1.1);
  const g2=ctx.createGain();g2.gain.value=.25;o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(ctx.destination);o.start(t);o2.start(t);o.stop(t+1.2);o2.stop(t+1.2);
  barKick[i]=1;
}
{let down=false,lastBar=-1;const m=$('meter');
  const hit=e=>{const el=document.elementFromPoint(e.clientX,e.clientY),i=bars.indexOf(el);if(i>=0&&i!==lastBar){lastBar=i;pluck(i);}};
  m.addEventListener('pointerdown',e=>{down=true;lastBar=-1;hit(e);});
  window.addEventListener('pointermove',e=>{if(down)hit(e);});
  window.addEventListener('pointerup',()=>{down=false;lastBar=-1;});window.addEventListener('pointercancel',()=>{down=false;});}
function idleFrame(t){
  const homeOn=$('home').classList.contains('on'),mineOn=$('mine').classList.contains('on');
  if(homeOn&&!reduceMotion){
    const pulse=Math.pow(Math.max(0,Math.cos(Math.PI*((t/500)%1))),3);
    bars.forEach((b,i)=>{const g=.42+.17*Math.sin(t/430+i*1.9)+.12*Math.sin(t/710+i*2.7)+.08*Math.sin(t/260+i*4.1)+.16*pulse*(.6+.4*Math.sin(i*1.7+t/2000));
      if(barKick[i]>0){barKick[i]*=.94;}const target=Math.max(g,barKick[i]);barH[i]+=(target-barH[i])*(barKick[i]>.3?.4:.16);const sc=Math.max(.12,Math.min(1,barH[i]));b.style.transform=`scaleY(${sc.toFixed(4)})`;b.style.setProperty('--s',sc.toFixed(3));});
  }
  if(homeOn){poseBelter($('homeMe').querySelector('svg')._b,0,0,t);}
  if(mineOn)poseBelter($('meBig')._b,Math.max(0,Math.sin(t/300))*.35,0,t);
  if($('castSheet').classList.contains('on'))document.querySelectorAll('#cast svg').forEach((s,i)=>poseBelter(s._b,Math.max(0,Math.sin(t/260+i*1.3))*.8,Math.max(0,Math.sin(t/1300+i)),t));
  requestAnimationFrame(idleFrame);
}
requestAnimationFrame(idleFrame);

/* ---------- Picker: the song wheel, a true 3D drum ---------- */
export const fmtLen=s=>{const r=Math.max(0,Math.round(s));return `${Math.floor(r/60)}:${String(r%60).padStart(2,'0')}`;};
export const AUTH={bday:'Traditional',jingle:'James Lord Pierpont',saints:'Traditional',grace:'John Newton',daisy:'Harry Dacre'};
export const GENRE={bday:'Party',jingle:'Holiday',saints:'Party',grace:'Ballads',daisy:'Classics'};
// Licensed-catalog previews: titles only, to show how a full catalog feels. Not playable until licensed.
const HITS=[['Espresso','Sabrina Carpenter'],['APT.','ROSÉ & Bruno Mars'],['Birds of a Feather','Billie Eilish'],['Good Luck, Babe!','Chappell Roan'],['Die With a Smile','Lady Gaga & Bruno Mars'],['Flowers','Miley Cyrus'],['As It Was','Harry Styles'],['drivers license','Olivia Rodrigo'],['Anti-Hero','Taylor Swift'],['Levitating','Dua Lipa'],['Blinding Lights','The Weeknd'],['Mr. Brightside','The Killers'],['Rolling in the Deep','Adele'],['Bohemian Rhapsody','Queen'],["Don’t Stop Believin’",'Journey']];
const PAL=['#ff7a59','#f7a8ff','#4cc9f0','#ffd23f','#9b8aff','#3ddc97','#ff5d8f','#7ee0ff'];
export const CATALOG=[];
{let h=0,p=0;const order='hhshshhshhshshhshhs';
 for(const c of order){if(c==='s'&&p<SONGS.length){const s=SONGS[p++];CATALOG.push({title:s.title,artist:AUTH[s.id],color:s.color,song:s});}
  else if(h<HITS.length){const [t,a]=HITS[h];CATALOG.push({title:t,artist:a,color:PAL[h%PAL.length],song:null});h++;}}
 while(h<HITS.length){const [t,a]=HITS[h];CATALOG.push({title:t,artist:a,color:PAL[h%PAL.length],song:null});h++;}
 while(p<SONGS.length){const s=SONGS[p++];CATALOG.push({title:s.title,artist:AUTH[s.id],color:s.color,song:s});}}
const LOCK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2h-4V7z"/></svg>';
const wheel=$('wheel'),drum=$('drum'),IH=84;

export let focusIdx=-1;let wheelRaf=0;export let VIEW=[];let rows=[];S.filter='ready';
export const lenOf=s=>s.own?s.len:s.lastEnd-s.lead;
const genreOf=c=>c.song?(c.song.own?'Yours':GENRE[c.song.id]):null;
const levelOf=s=>{const r=(s.maxM||0)-(s.minM||0);return r<=7?1:r<=9?2:r<=12?3:r<=15?4:5;};
const LEVELS=['Easy','Easy','Medium','Stretchy','Big range'];
export const bests=()=>{try{return JSON.parse(pref('best','{}'))||{};}catch(e){return {};}};
export function rememberTake(song,sc){
  if(sc.cover<.3)return;const b=bests(),v=Math.round(sc.acc*100);if(!(b[song.id]>=v)){b[song.id]=v;setPref('best',JSON.stringify(b));}
  const ok=sc.pts.filter(p=>p.ok).map(p=>p.m+(sc.key||0)).sort((a,b)=>a-b);
  if(ok.length>8){const hi=ok[Math.floor(ok.length*.97)];if(hi>+pref('top','0'))setPref('top',String(Math.round(hi)));}
}
function chipList(){const own=CATALOG.some(c=>c.song&&c.song.own);
  return [['ready',`Ready to sing (${CATALOG.filter(c=>c.song).length})`],['all',`All ${CATALOG.length}`],...(own?[['Yours','Your songs']]:[]),['Party','Party'],['Holiday','Holiday'],['Ballads','Ballads'],['Classics','Classics']];}
export function renderChips(){$('chips').innerHTML=chipList().map(([f,l])=>`<button data-f="${esc(f)}" aria-pressed="${f===S.filter}">${esc(l)}</button>`).join('');}
export function updateCounts(){renderChips();}
let qT=0;
$('q').oninput=()=>{clearTimeout(qT);qT=setTimeout(()=>{query=nq($('q').value);$('qClear').hidden=!query;renderWheel(VIEW[focusIdx]);},90);};
$('q').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('q').blur();}if(e.key==='Escape'){$('q').value='';$('q').oninput();}};
$('qClear').onclick=()=>{$('q').value='';query='';$('qClear').hidden=true;renderWheel(VIEW[focusIdx]);$('q').focus();};
$('chips').onclick=e=>{const b=e.target.closest('button');if(!b||b.dataset.f===S.filter)return;const keep=VIEW[focusIdx];S.filter=b.dataset.f;renderChips();renderWheel(keep);};
function metaOf(c){
  if(!c.song)return LOCK+esc(c.artist);
  const s=c.song;return esc(s.own?(s.artist||'Your song'):GENRE[s.id])+' · '+fmtLen(lenOf(s));
}
// Search that forgives: partial words, small typos, artists, genres, even a line of the lyrics.
export const nq=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
function near(a,b){ // edit distance within a small limit
  const k=b.length>=7?2:1;if(Math.abs(a.length-b.length)>k)return false;
  let pp=null,prev=Array.from({length:b.length+1},(_,j)=>j); // swapped letters count as one slip
  for(let i=1;i<=a.length;i++){const cur=[i];let mn=i;for(let j=1;j<=b.length;j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
    if(pp&&i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])cur[j]=Math.min(cur[j],pp[j-2]+1);mn=Math.min(mn,cur[j]);}if(mn>k)return false;pp=prev;prev=cur;}
  return prev[b.length]<=k;
}
export const hay=new Map();
function fieldsOf(c){
  if(!hay.has(c)){const s=c.song;hay.set(c,{name:nq(c.title+' '+(c.artist||'')),genre:nq(genreOf(c)||''),words:nq(s?s.lines.map(l=>l.text).join(' '):'')});}
  return hay.get(c);
}
function matchScore(c,q){
  const f=fieldsOf(c),toks=q.split(' ');let sc=0;
  if(f.name.includes(q))sc+=6;if(q.length>5&&f.words.includes(q))sc+=4;
  const nameW=f.name.split(' ');
  for(const t of toks){
    let best=0;
    for(const w of nameW){if(w.startsWith(t))best=Math.max(best,3);else if(t.length>=4&&near(t,w.slice(0,t.length+1))||t.length>=4&&near(t,w))best=Math.max(best,1.5);}
    if(!best&&f.genre.startsWith(t))best=1;
    if(!best&&t.length>=3&&f.words.includes(t))best=.8;
    if(!best)return 0;sc+=best;
  }
  return sc;
}
let query='';
export function renderWheel(keep){
  const base=S.filter==='ready'?CATALOG.filter(c=>c.song):S.filter==='all'?CATALOG:CATALOG.filter(c=>genreOf(c)===S.filter);
  if(query){VIEW=base.map(c=>[c,matchScore(c,query)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);}
  else{VIEW=base;if(!VIEW.length){S.filter='ready';renderChips();VIEW=CATALOG.filter(c=>c.song);}}
  if(!VIEW.length){
    drum.innerHTML=`<p class="none">No songs match “${esc($('q').value.trim())}”<small>${S.filter==='all'?'Try fewer letters, or another word from the title, artist or lyrics.':'Try All, or fewer letters.'}</small></p>`;
    wheel.innerHTML='';rows=[];focusIdx=-1;
    const go=$('pickGo');go.disabled=true;go.textContent='No match yet';$('fLen').textContent='–';$('fLvlT').textContent='–';$('fBest').textContent='–';document.querySelectorAll('#fLvl i').forEach(x=>x.classList.remove('on'));
    return;
  }
  drum.innerHTML=VIEW.map(c=>`<div class="wi${c.song?'':' wide'}"><b>${esc(c.title)}</b><small>${metaOf(c)}</small></div>`).join('');
  wheel.innerHTML='<div class="pad"></div>'+VIEW.map((c,i)=>`<div class="slot" role="option" id="opt${i}" data-i="${i}" aria-label="${esc(c.title+(c.artist?', '+c.artist:''))}"></div>`).join('')+'<div class="pad"></div>';
  rows=[...drum.children];fitTitles();focusIdx=-1;
  const i=Math.max(0,VIEW.indexOf(keep));wheel.scrollTop=i*IH;paintWheel();
}
// Long titles shrink to fit on one line when they're in focus, so nothing gets cut off.
const FOCUS_PX=40,REST_PX=27;
function fitTitles(){rows.forEach(el=>{const b=el.firstChild;b.style.fontSize=FOCUS_PX+'px';b.style.fontVariationSettings='"wght" 800, "opsz" 96';
  const w=b.scrollWidth,cw=b.clientWidth;el._fit=w>cw+1?Math.max(22,Math.floor(FOCUS_PX*cw/w*10)/10):FOCUS_PX;});}
function setFacts(c){
  const s=c.song,L=s?levelOf(s):0;
  $('fLen').textContent=s?fmtLen(lenOf(s)):'–';
  $('fLvlT').textContent=s?LEVELS[L-1]:'Locked';
  document.querySelectorAll('#fLvl i').forEach((x,j)=>x.classList.toggle('on',j<L));
  const b=s?bests()[s.id]:null;$('fBest').textContent=b!=null?b+'%':'–';
}
function paintWheel(){
  wheelRaf=0;const pos=wheel.scrollTop/IH;
  rows.forEach((el,i)=>{const d=i-pos,a=Math.abs(d),b=el.firstChild;
    if(a>3.4){el.style.opacity=0;return;}
    const deg=-d*30;
    el.style.transform=reduceMotion?`translateY(${(d*IH).toFixed(1)}px)`:`rotateX(${deg.toFixed(2)}deg)`;
    el.style.opacity=(reduceMotion?Math.max(0,1-a*.35):(a>2.9?0:Math.max(0,Math.cos(Math.min(89,Math.abs(deg))*Math.PI/180))*Math.max(.25,1-a*.25))).toFixed(3);
    const fit=el._fit||FOCUS_PX,lo=Math.min(REST_PX,fit);b.style.fontSize=(lo+Math.max(0,1-a)*(fit-lo)).toFixed(1)+'px';
    b.style.fontVariationSettings=`"wght" ${Math.round(800-Math.min(1,a)*520)}, "opsz" 96`;
  });
  const idx=Math.max(0,Math.min(VIEW.length-1,Math.round(pos)));
  if(idx!==focusIdx&&VIEW.length){
    focusIdx=idx;const c=VIEW[idx];
    $('pick').style.setProperty('--focus',c.color);
    wheel.setAttribute('aria-activedescendant','opt'+idx);
    setFacts(c);
    const go=$('pickGo');go.disabled=!c.song;go.textContent=c.song?`Sing ${c.title}`:'Coming with the licensed catalog';
    paintPreview(c);
    if(pv.on)followPreview();else warmPreview(c);
    if(navigator.vibrate)try{navigator.vibrate(6);}catch(e){}
  }
}
const scheduleWheel=()=>{if(!wheelRaf)wheelRaf=requestAnimationFrame(paintWheel);};
wheel.addEventListener('scroll',scheduleWheel,{passive:true});
window.addEventListener('resize',()=>{fitTitles();scheduleWheel();});
if(document.fonts)document.fonts.ready.then(()=>{if(rows.length){fitTitles();paintWheel();}});
function scrollToIdx(i,smooth){wheel.scrollTo({top:i*IH,behavior:smooth&&!reduceMotion?'smooth':'auto'});}
wheel.onclick=e=>{const b=e.target.closest('.slot');if(!b)return;const i=+b.dataset.i;if(i!==focusIdx)scrollToIdx(i,true);else choose();};
wheel.onkeydown=e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();scrollToIdx(Math.max(0,Math.min(VIEW.length-1,focusIdx+(e.key==='ArrowDown'?1:-1))),true);}else if(e.key==='Enter')choose();};
function choose(){const c=VIEW[focusIdx];if(c&&c.song){stopPreview();openSheet(c.song);}}

/* ---------- Previews ---------- */
// Tap the record to hear the focused song. While it's on, scrolling the drum plays each song you land on,
// so you can browse by ear. A clip is 15 seconds from where the singing starts.

function paintPreview(c){
  const d=$('preview'),ok=!!(c&&c.song);
  if(ok){const t=c.title.length>22?c.title.slice(0,21)+'…':c.title;$('recTitle').textContent=t;}d.setAttribute('aria-disabled',String(!ok));
  if(+pref('pvUsed','0')<2)queueMicrotask(previewHint);
  d.setAttribute('aria-label',!ok?'No preview for this song yet':pv.on?`Stop the preview of ${c.title}`:`Play a preview of ${c.title}`);
}
{const g=$('grooves');let h='';for(let r=40;r<97;r+=1.35)h+=`<circle r="${r.toFixed(2)}" stroke-opacity="${(.03+.03*Math.abs(Math.sin(r*.7))).toFixed(3)}"/>`;g.innerHTML=h;}
function previewIcon(on){$('previewIcon').setAttribute('d',on?'M8 6h3v12H8zM13 6h3v12h-3z':'M9 6.5v11l9-5.5z');}
function silencePreview(){
  cancelAnimationFrame(pv.raf);clearTimeout(pv.timer);pv.tok++;
  if(pv.nodes){const {g,srcs}=pv.nodes,t=ctx.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.25);
    srcs.forEach(x=>{try{x.stop(t+.3);}catch(e){}});pv.nodes=null;}
  $('previewProg').style.strokeDasharray='0 100';$('preview').classList.remove('wait');pv.song=null;
}
export function stopPreview(){silencePreview();pv.on=false;const d=$('preview');d.classList.remove('on');d.setAttribute('aria-pressed','false');previewIcon(false);paintPreview(VIEW[focusIdx]);}
async function playPreview(song){
  silencePreview();ensureCtx();const tok=pv.tok,d=$('preview');pv.song=song;d.classList.add('wait');
  let tr;try{tr=await tracksFor(song);}catch(e){delete cache[song.id];if(tok===pv.tok)stopPreview();return;}
  if(tok!==pv.tok)return;d.classList.remove('wait');
  const at=Math.max(0,song.own?(song.firstT||0)-.4:(song.down||0)),len=Math.min(PV_LEN,Math.max(3,tr.back.duration-at)),t=ctx.currentTime+.05;
  const g=ctx.createGain();g.connect(ctx.destination);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.9,t+.35);
  g.gain.setValueAtTime(.9,t+len-1.2);g.gain.linearRampToValueAtTime(0,t+len);
  const srcs=[];const add=(buf,v)=>{const s=ctx.createBufferSource(),gg=ctx.createGain();s.buffer=buf;gg.gain.value=v;s.connect(gg);gg.connect(g);s.start(t,at,len);srcs.push(s);};
  add(tr.back,1);if(tr.guide)add(tr.guide,song.own?1:.7);   // your own songs play with the singer, like the record
  pv.nodes={g,srcs};pv.t0=t;
  const tick=()=>{const f=Math.min(1,Math.max(0,(ctx.currentTime-pv.t0)/len));$('previewProg').style.strokeDasharray=`${(f*100).toFixed(2)} 100`;
    if(f<1)pv.raf=requestAnimationFrame(tick);else if(tok===pv.tok)stopPreview();};
  tick();
}
// Get the song you've settled on ready ahead of a tap, so the preview starts right away.
let warmT=0;function warmPreview(c){clearTimeout(warmT);if(!c||!c.song||cache[c.song.id])return;
  warmT=setTimeout(()=>{if(VIEW[focusIdx]===c&&$('pick').classList.contains('on'))tracksFor(c.song).catch(()=>delete cache[c.song.id]);},900);}
// Landing on a new song while previewing: wait until the drum settles, then switch.
function followPreview(){
  clearTimeout(pv.timer);const c=VIEW[focusIdx];
  if(!c||!c.song){silencePreview();return;}
  if(pv.song===c.song)return;
  pv.timer=setTimeout(()=>{if(pv.on&&VIEW[focusIdx]===c)playPreview(c.song);},280);
}
// until someone has played a preview twice, show a little hint by the record
function previewHint(){const n=+pref('pvUsed','0'),show=n<2&&$('preview').getAttribute('aria-disabled')!=='true'&&!pv.on;
  $('preview').classList.toggle('hint',show);}
$('preview').onclick=()=>{
  const c=VIEW[focusIdx];if(!c||!c.song)return;
  if(!pv.on){setPref('pvUsed',String(+pref('pvUsed','0')+1));$('preview').classList.remove('hint');}
  if(pv.on){stopPreview();return;}
  pv.on=true;const d=$('preview');d.classList.add('on');d.setAttribute('aria-pressed','true');previewIcon(true);paintPreview(c);playPreview(c.song);
};
$('pickGo').onclick=choose;
export function openPicker(keep){ensureCtx();show('pick');renderChips();if(focusIdx<0||keep)renderWheel(keep||CATALOG.find(c=>c.song&&c.song.own)||CATALOG.find(c=>c.song&&c.song.id==='jingle'));else paintWheel();}
// The next page washes over this one as a circle that grows out of whatever you tapped,
// while the page underneath eases back and dims.
function wash(el,update){
  if(!document.startViewTransition||reduceMotion){update();return;}
  const r=(el||document.body).getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  const R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y)),r0=Math.min(r.height,r.width)/2;
  const de=document.documentElement,vt=document.startViewTransition(update),ease='cubic-bezier(.22,1,.36,1)';
  vt.ready.then(()=>{
    de.animate({clipPath:[`circle(${r0}px at ${x}px ${y}px)`,`circle(${R}px at ${x}px ${y}px)`]},{duration:680,easing:ease,fill:'forwards',pseudoElement:'::view-transition-new(root)'});
    de.animate({transform:['scale(1)','scale(.95)'],opacity:[1,.55]},{duration:680,easing:ease,fill:'forwards',pseudoElement:'::view-transition-old(root)'});
  }).catch(()=>{});
}
$('go').onclick=e=>wash(e.currentTarget,()=>openPicker());
$('pickBack').onclick=e=>wash(e.currentTarget,()=>{show('home');paintTonight();});
// A challenge link (letsbelt.com/?c=song.score.name) opens Belt with that song up front and a score to beat.
S.challenge=null;
function tonightSong(){if(S.challenge)return S.challenge.song;const o=CATALOG.find(c=>c.song&&c.song.own);return o?o.song:SONG_BY_ID.jingle;}
export function paintTonight(){const s=tonightSong();$('tonightTitle').textContent=s.title;$('tonightDot').style.setProperty('--c',s.color);
  $('tonightLabel').textContent=S.challenge?`${S.challenge.by} scored ${S.challenge.score}%. Beat it?`:'Tonight’s pick';}
$('tonight').onclick=e=>{const s=tonightSong();wash(e.currentTarget,()=>openPicker(CATALOG.find(c=>c.song===s)));setTimeout(()=>openSheet(s),reduceMotion?0:420);};
$('homeMe').onclick=()=>openMine();
$('homeSignIn').onclick=()=>authFor('hello');
export function paintAuth(){const inn=!!S.user;$('homeMe').hidden=!inn;$('homeSignIn').hidden=inn||!S.sb;}

