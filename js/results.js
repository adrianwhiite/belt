import {S} from './state.js';
import {$,esc,pref,reduceMotion,setPref} from './util.js';
import {ctx,ensureCtx,getMic,show} from './audio.js';
import {poseBelter} from './picker.js';
import {inKeyMode,readySong,tracksFor} from './stage.js';
import {setSaveState,toast} from './account.js';

/* ---------- Results ---------- */
function verdictFor(sc){
  if(sc.cover<.15)return ['We couldn’t hear you','Check that the mic is allowed, then sing out a little louder.'];
  const c=sc.acc*Math.min(1,sc.cover/.6);
  const v=c>=.85?'Studio ready':c>=.7?'The crowd’s on its feet':c>=.5?'Warming up nicely':c>=.3?'Brave and loud':'A shower-stage debut';
  const k=sc.key?` Scored in your own key, ${Math.abs(sc.key)} ${Math.abs(sc.key)===1?'step':'steps'} ${sc.key>0?'above':'below'} the original.`:'';
  return [v,`You sang through ${Math.round(sc.cover*100)}% of the song.${k}`];
}
const FUN=['That was a whole moment','Encore!','Main character energy','That one goes on the fridge','The crowd goes wild','Somebody call the label','Pure, unfiltered you'];
const coachPref=()=>{try{return localStorage.getItem('belt.coach')==='on';}catch(e){return false;}};
const setCoachPref=v=>{try{localStorage.setItem('belt.coach',v?'on':'off');}catch(e){}};
export function showResults(){
  const {song,sc}=S.last;
  $('resSong').textContent=song.title;
  const quiet=sc.cover<.15;
  $('verdict').textContent=quiet?'We couldn\u2019t hear you':FUN[Math.floor(Math.random()*FUN.length)];
  $('sub').textContent=quiet?'Check that the mic is allowed, then sing out a little louder.':'Hit play to hear yourself, then pick a sound.';
  if(!quiet&&S.challenge&&S.challenge.song===song){const me=Math.round(sc.acc*100),d=me-S.challenge.score;
    $('sub').textContent=d>0?`You beat ${S.challenge.by}’s ${S.challenge.score}%. Send it back.`:d===0?`Tied with ${S.challenge.by} at ${me}%. Go again?`:`${-d} short of ${S.challenge.by}’s ${S.challenge.score}%. Go again?`;}
  $('shareScore').hidden=quiet;S.last.card=null;if(!quiet)scoreCard().then(b=>{if(S.last&&S.last.song===song)S.last.card=b;}).catch(()=>{});
  $('demoNote').classList.toggle('on',S.demo);
  setSaveState();
  show('result');setCoach(coachPref()&&!quiet,false);cheer(!quiet);paintStats(quiet);
  if(!quiet)setTimeout(()=>confetti(sc.acc*Math.min(1,sc.cover/.6)),180);
}
// Sharing: a picture of your score plus a link. For Belt's own songs the link is a challenge: it opens
// the same song for your friend with your score to beat. (Your own songs live on your device, so those just share the score.)
const SITE='https://letsbelt.com';
const firstName=()=>{const m=S.user&&S.user.user_metadata,n=m&&(m.full_name||m.name)||'';return String(n).trim().split(/\s+/)[0].replace(/[^\p{L}\-]/gu,'').slice(0,16);};
function shareLink(){const {song,sc}=S.last,n=firstName();return song.own?SITE:`${SITE}/?c=${song.id}.${Math.round(sc.acc*100)}${n?'.'+encodeURIComponent(n):''}`;}
async function scoreCard(){
  const {song,sc}=S.last,score=Math.round(sc.acc*100),W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;
  if(document.fonts&&document.fonts.load)try{await document.fonts.load('800 100px "Bricolage Grotesque"');}catch(e){}
  const g=cv.getContext('2d'),ink='#1d1631',F=(w,px)=>`${w} ${px}px "Bricolage Grotesque","Avenir Next","Segoe UI",system-ui,sans-serif`;
  g.fillStyle=song.color;g.fillRect(0,0,W,H);
  // the bars from the home screen, big and faint, as the backdrop
  const cols=['#ff5d8f','#3ddc97','#ffb020','#9b8aff','#4cc9f0'],hs=[.86,.5,.36,.74,.58],bw=168,gap=30,x0=(W-5*bw-4*gap)/2;
  g.globalAlpha=.16;g.fillStyle=ink;hs.forEach((h,i)=>{const bh=h*420,x=x0+i*(bw+gap),y=H-bh;g.beginPath();g.roundRect?g.roundRect(x,y,bw,bh+60,[46,46,0,0]):g.rect(x,y,bw,bh);g.fill();});g.globalAlpha=1;
  g.fillStyle=ink;g.textBaseline='alphabetic';
  g.font=F(800,84);g.letterSpacing='-4px';g.fillText('belt',84,150);
  g.font=F(800,430);g.letterSpacing='-26px';const num=String(score),nw=g.measureText(num).width;g.fillText(num,70,640);
  g.font=F(800,170);g.letterSpacing='-6px';g.fillText('%',70+nw+6,640);
  g.letterSpacing='-1px';g.font=F(700,52);g.globalAlpha=.75;g.fillText(inKeyMode(song)?'in tune on':'on pitch on',84,740);g.globalAlpha=1;
  // the song title, shrunk to fit on up to two lines
  let px=104,lines;const wrap=()=>{g.font=F(800,px);g.letterSpacing=(-px*.04).toFixed(1)+'px';const ws=song.title.split(' ');lines=[''];for(const w of ws){const t=lines[lines.length-1]?lines[lines.length-1]+' '+w:w;if(g.measureText(t).width>W-168&&lines[lines.length-1])lines.push(w);else lines[lines.length-1]=t;}};
  for(wrap();(lines.length>2||lines.some(l=>g.measureText(l).width>W-168))&&px>48;px-=6,wrap());
  lines.slice(0,2).forEach((l,i)=>g.fillText(l,84,860+i*px*1.02));
  g.font=F(800,50);g.letterSpacing='-1px';const cta=song.own?'Sing yours at letsbelt.com':'Beat me at letsbelt.com',cw=g.measureText(cta).width+92;
  g.beginPath();g.roundRect?g.roundRect(84,H-216,cw,116,58):g.rect(84,H-216,cw,116);g.fill();g.fillStyle='#fbf9ff';g.fillText(cta,130,H-140);
  return new Promise((res,rej)=>cv.toBlob(b=>b?res(b):rej(new Error('no card')),'image/png'));
}
$('shareScore').onclick=async()=>{
  if(!S.last)return;const {song,sc}=S.last,score=Math.round(sc.acc*100),url=shareLink();
  const text=song.own?`I scored ${score}% on ${song.title} on Belt.`:`I scored ${score}% on ${song.title}. Beat me.`;
  const copy=async()=>{try{await navigator.clipboard.writeText(text+' '+url);toast('Link copied. Paste it to a friend.');}catch(e){toast('Sharing isn’t available in this browser.');}};
  try{
    const file=S.last.card?new File([S.last.card],'belt-score.png',{type:'image/png'}):null;
    if(file&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:text+' '+url});return;}
    if(navigator.share){await navigator.share({text,url});return;}
    await copy();
  }catch(e){if(!(e&&e.name==='AbortError'))await copy();}
};
// The numbers: score counts up, then your top note and longest note (or how much you sang).
const CROWD=[[90,'Standing ovation'],[78,'Lighters up'],[62,'Big cheers'],[45,'Warm applause'],[25,'Clapping along'],[0,'Brave first try']];
function paintStats(quiet){
  const {song,sc}=S.last,own=inKeyMode(song),key=sc.key||0,box=$('rstats');
  $('rsScoreL').textContent='Notes hit';
  // how a room full of people would react, in words anyone gets
  const pc=Math.round(sc.acc*100);
  $('rsCrowd').textContent=quiet?'Still waiting':CROWD.find(c=>pc>=c[0])[1];
  // your best line, quoted back to you
  const st=S.last.lineStats||(S.last.lineStats=lineStats()),sungL=st.filter(x=>x.sung),best=sungL.slice().sort((a,b)=>b.pct-a.pct)[0];
  $('rsLineBox').hidden=quiet||!best;
  if(best){const w=best.L.text.trim().replace(/[,.;:]+$/,''),p=Math.round(best.pct*100);
    $('rsLine').textContent='\u201c'+(w.length>60?w.slice(0,59)+'\u2026':w)+'\u201d';
    $('rsLineSub').textContent=p>=95?'Every note, right on':p>=70?`${p}% on pitch. Sing them all like this`:`Your strongest moment, ${p}% on pitch`;}
  const target=quiet?0:Math.round(sc.acc*100),el=$('rsScore'),t0=performance.now();
  box.classList.remove('go');void box.offsetWidth;if(!reduceMotion)box.classList.add('go');
  if(quiet){el.textContent='–';return;}
  const tick=now=>{const k=reduceMotion?1:Math.min(1,(now-t0)/900);el.textContent=Math.round(target*(1-Math.pow(1-k,3)));if(k<1&&$('result').classList.contains('on'))requestAnimationFrame(tick);};
  requestAnimationFrame(tick);
}
// One burst of confetti in Belt's colors when the results arrive. More for a better take. Never loops.
function confetti(q){
  if(reduceMotion)return;
  const cv=document.createElement('canvas');cv.className='confetti';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
  const dpr=Math.min(2,window.devicePixelRatio||1),W=innerWidth,H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;
  const g=cv.getContext('2d');g.scale(dpr,dpr);
  const cols=['#ff5d8f','#3ddc97','#ffb020','#9b8aff','#4cc9f0','#fbf9ff'],n=Math.round(70+110*Math.max(0,Math.min(1,q)));
  const ps=[...Array(n)].map((_,i)=>{const side=i%2?1:-1;return {x:W/2+side*W*(.15+Math.random()*.3),y:-20-Math.random()*H*.35,
    vx:(Math.random()-.5)*3.2,vy:2+Math.random()*3.5,r:Math.random()*6.3,vr:(Math.random()-.5)*.25,flip:Math.random()*6.3,vf:.08+Math.random()*.12,
    w:5+Math.random()*4,h:10+Math.random()*8,round:Math.random()<.3,c:cols[i%cols.length]};});
  const t0=performance.now();
  const step=now=>{
    const t=(now-t0)/1000;g.clearRect(0,0,W,H);let alive=0;
    for(const p of ps){
      p.vy=Math.min(p.vy+.09,4.6);p.vx*=.99;p.x+=p.vx+Math.sin(t*2+p.flip)*.6;p.y+=p.vy;p.r+=p.vr;p.flip+=p.vf;
      if(p.y>H+30)continue;alive++;
      g.save();g.translate(p.x,p.y);g.rotate(p.r);g.scale(Math.cos(p.flip),1);g.fillStyle=p.c;g.globalAlpha=Math.max(0,Math.min(1,3.6-t));
      if(p.round){g.beginPath();g.arc(0,0,p.w*.55,0,6.3);g.fill();}
      else{g.beginPath();g.roundRect?g.roundRect(-p.w/2,-p.h/2,p.w,p.h,p.w/2):g.rect(-p.w/2,-p.h/2,p.w,p.h);g.fill();}
      g.restore();
    }
    if(alive&&t<4&&$('result').classList.contains('on'))requestAnimationFrame(step);else cv.remove();
  };
  requestAnimationFrame(step);
}
// You did it: your Belter keeps clapping while you're on this page (still, with reduced motion).
function cheer(on){
  const b=$('cheerMe')._b;if(!b)return;
  const place=(gap,y)=>{if(!b.hl)return;b.hl.setAttribute('cx',(60-gap).toFixed(1));b.hr.setAttribute('cx',(60+gap).toFixed(1));b.hl.setAttribute('cy',y.toFixed(1));b.hr.setAttribute('cy',y.toFixed(1));};
  const token=cheer.t=(cheer.t||0)+1,t0=performance.now();
  if(!on||reduceMotion){place(22,110);poseBelter(b,on?.25:0,on?.3:0,t0);return;}
  const step=now=>{
    if(cheer.t!==token||!$('result').classList.contains('on'))return;
    const e=(now-t0)/1000,p=Math.abs(Math.sin(e*Math.PI*2.1));
    place(8.5+p*16,103-p*3);poseBelter(b,.55+.2*Math.sin(e*1.3),.5,now);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function setCoach(open,remember){
  $('coach').hidden=!open;$('coachBtn').setAttribute('aria-expanded',open);
  if(remember!==false)setCoachPref(open);
  if(!open)return;
  gSel=null;
  renderCards();drawGraph(null);
}
$('coachBtn').onclick=()=>{setCoach(true);$('coach').scrollIntoView({behavior:'smooth',block:'start'});};
$('coachHide').onclick=()=>{setCoach(false);$('coachBtn').focus();$('result').scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});};

/* Notes from the booth: one thing you did well, one thing to try, one fun fact. Each can replay its moment. */
const NAMES=['C','C\u266f','D','E\u266d','E','F','F\u266f','G','A\u266d','A','B\u266d','B'];
export const noteName=m=>NAMES[((Math.round(m)%12)+12)%12]+(Math.floor(Math.round(m)/12)-1);
function boothNotes(song,sc){
  const per=sc.per.filter(o=>o.frames>=3),key=sc.key||0;
  const lineOf=n=>song.lines.find(L=>n.t>=L.start-.01&&n.t<L.end+.01)||song.lines[0];
  const lines=song.lines.map(L=>{const ps=per.filter(o=>lineOf(o.n)===L);const fr=ps.reduce((a,o)=>a+o.frames,0),vo=ps.reduce((a,o)=>a+o.voiced,0),hi=ps.reduce((a,o)=>a+o.hits,0),ds=ps.reduce((a,o)=>a+o.dsum,0);return {L,fr,vo,hi,hit:vo?hi/vo:0,cov:fr?vo/fr:0,bias:vo?ds/vo:0};}).filter(x=>x.fr>=6);
  const quote=L=>'\u201c'+L.text.trim().replace(/[,.!]+$/,'')+'\u201d';
  const mom=L=>({t0:L.start,t1:L.end});
  const out=[];
  // what you did well
  const longs=inKeyMode(song)?[]:per.filter(o=>o.n.d>=.75&&o.voiced>=6).sort((a,b)=>b.hits/b.voiced-a.hits/a.voiced);
  const bestLine=[...lines].filter(x=>x.cov>.5).sort((a,b)=>b.hit-a.hit)[0];
  if(longs.length&&longs[0].hits/longs[0].voiced>=.8){const o=longs[0];out.push({tag:'Your best bit',c:'#3ddc97',line:'You held that long note like a pro',sub:`${quote(lineOf(o.n))}, ${o.n.d.toFixed(1)} seconds, right on pitch.`,m:{t0:o.n.t-1,t1:o.n.t+o.n.d}});}
  else if(bestLine&&bestLine.hit>=.6)out.push({tag:'Your best bit',c:'#3ddc97',line:`You owned ${quote(bestLine.L)}`,sub:'That line was spot on. Sing the rest like that.',m:mom(bestLine.L)});
  else if(sc.cover>=.8)out.push({tag:'Your best bit',c:'#3ddc97',line:'You never stopped singing',sub:'Commitment is half of karaoke. You had it.',m:null});
  else out.push({tag:'Your best bit',c:'#3ddc97',line:'You showed up and sang',sub:'That\u2019s the hardest part done.',m:null});
  // one thing to try
  const quietLine=[...lines].sort((a,b)=>a.cov-b.cov)[0];
  const worst=[...lines].filter(x=>x.vo>=6).sort((a,b)=>a.hit-b.hit)[0];
  if(quietLine&&quietLine.cov<.45)out.push({tag:'Try next',c:'#ffb020',line:`Big breath before ${quote(quietLine.L)}`,sub:'You went quiet there. Sing it out, even if you\u2019re unsure of it.',m:mom(quietLine.L)});
  else if(worst&&worst.hit<.75){const dir=worst.bias<-.25?'Aim a touch higher':worst.bias>.25?'Relax down a touch':'Listen for the guide';const why=worst.bias<-.25?'You slid a little flat on this line.':worst.bias>.25?'You pushed a little sharp on this line.':'The tune wandered a bit here.';out.push({tag:'Try next',c:'#ffb020',line:`${dir} on ${quote(worst.L)}`,sub:why,m:mom(worst.L)});}
  else if(inKeyMode(song))out.push({tag:'Try next',c:'#ffb020',line:'Go again and lean into the big notes',sub:'You\u2019re in tune. Now push the volume.',m:null});
  else out.push({tag:'Try next',c:'#ffb020',line:song.own?'Turn off the guide vocal':'Turn off the guide melody',sub:'You\u2019ve got this one. See if you can do it on your own.',m:null});
  // fun fact
  const sung=sc.pts.filter(p=>p.ok).map(p=>p.m+key);
  const held=inKeyMode(song)?null:per.filter(o=>o.hits>=4).sort((a,b)=>b.n.d-a.n.d)[0];
  if(key)out.push({tag:'Fun fact',c:'#9b8aff',line:`You sang it ${Math.abs(key)} ${Math.abs(key)===1?'step':'steps'} ${key>0?'higher':'lower'} than the original`,sub:'Your key, your rules. We scored you in it.',m:null});
  else if(sung.length>8){const hi=Math.max(...sung),lo=Math.min(...sung);out.push({tag:'Fun fact',c:'#9b8aff',line:`Your highest note: ${noteName(hi)}`,sub:`You covered ${Math.round(hi-lo)+1} notes, from ${noteName(lo)} up to ${noteName(hi)}.`,m:null});}
  else if(held)out.push({tag:'Fun fact',c:'#9b8aff',line:`Longest note you held: ${held.n.d.toFixed(1)} seconds`,sub:'Lungs of steel.',m:{t0:held.n.t-1,t1:held.n.t+held.n.d}});
  return out;
}
function renderCards(){
  const notes=boothNotes(S.last.song,S.last.sc);S.last.booth=notes;
  $('cards').innerHTML=notes.map((n,i)=>`<div class="card" style="--c:${n.c}"><span class="card-tag">${esc(n.tag)}</span><p class="card-line">${esc(n.line)}</p><p class="card-sub">${esc(n.sub)}</p>${n.m?`<button class="card-hear" data-i="${i}">Hear it</button>`:''}</div>`).join('');
}
$('cards').onclick=e=>{const b=e.target.closest('.card-hear');if(!b)return;const m=S.last.booth[+b.dataset.i].m;playMix(Math.max(0,m.t0-.4),m.t1+.6);};
// Line by line: one bar per line of the song you reached. Taller and greener means more of that line was on pitch.
// Tap a bar to see the words and hear yourself sing it.
let gSel=null;
function lineStats(){
  const {song,sc}=S.last,end=S.last.until??1e9,out=[];let i=0;const pts=sc.pts;
  for(const L of song.lines){if(L.start>end)break;
    while(i<pts.length&&pts[i].t<L.start-.05)i++;let n=0,ok=0,j=i;
    for(;j<pts.length&&pts[j].t<=L.end+.3;j++){n++;if(pts[j].ok)ok++;}
    const need=Math.max(4,(Math.min(L.end,end)-L.start)*5); // sung at least a little of it
    out.push({L,sung:n>=need,pct:n?ok/n:0});}
  return out;
}
const lineCol=x=>!x.sung?'rgba(251,249,255,.16)':x.pct>=.7?'#3ddc97':x.pct>=.4?'#ffb020':'#ff7a59';
function drawGraph(playT){
  const cv=$('graph'),dpr=window.devicePixelRatio||1;
  const w=cv.clientWidth,h=cv.clientHeight;if(w<20||h<20)return; // not on screen yet
  cv.width=w*dpr;cv.height=h*dpr;
  const g=cv.getContext('2d');g.scale(dpr,dpr);g.clearRect(0,0,w,h);
  const st=S.last.lineStats||(S.last.lineStats=lineStats()),n=st.length;if(!n)return;
  const gap=n>36?1.5:n>18?3:5,bw=Math.min(34,(w-gap*(n-1))/n),x0=(w-(bw*n+gap*(n-1)))/2,base=h-4,top=8;
  g.fillStyle='rgba(251,249,255,.1)';g.fillRect(0,top,w,1);g.fillRect(0,top+(base-top)/2,w,1);
  let playing=-1;if(playT!=null)playing=st.findIndex(x=>playT>=x.L.start-.3&&playT<=x.L.end+.3);
  st.forEach((x,i)=>{const bh=x.sung?Math.max(8,x.pct*(base-top)):6,X=x0+i*(bw+gap),on=i===gSel||i===playing;
    g.globalAlpha=gSel!=null&&!on&&playing<0?.45:1;g.fillStyle=lineCol(x);g.beginPath();const r=Math.min(6,bw/2);g.roundRect?g.roundRect(X,base-bh,bw,bh,[r,r,2,2]):g.rect(X,base-bh,bw,bh);g.fill();
    if(on){g.globalAlpha=1;g.fillStyle='#fbf9ff';g.beginPath();g.arc(X+bw/2,Math.max(4,base-bh-7),2.5,0,7);g.fill();}});
  g.globalAlpha=1;cv._geo={x0,bw,gap,n};
  const tips=st.filter(x=>x.sung),good=tips.filter(x=>x.pct>=.7).length;
  if(gSel==null)$('graphLine').textContent=tips.length?`${good} of ${st.length} lines on pitch. Tap a bar to hear that line.`:'Sing a line or two and they’ll show up here.';
}
$('graph').onclick=e=>{
  const cv=$('graph'),q=cv._geo,st=S.last&&S.last.lineStats;if(!q||!st)return;
  const x=e.clientX-cv.getBoundingClientRect().left,i=Math.max(0,Math.min(q.n-1,Math.floor((x-q.x0+q.gap/2)/(q.bw+q.gap))));
  gSel=i;const s1=st[i],words=s1.L.text.trim();
  $('graphLine').textContent=`\u201c${words.length>44?words.slice(0,43)+'\u2026':words}\u201d ${s1.sung?Math.round(s1.pct*100)+'% on pitch':'you didn’t sing this one'}`;
  playMix(Math.max(0,s1.L.start-.4),s1.L.end+.6);
};
export function impulse(){
  const sr=ctx.sampleRate,len=Math.floor(sr*1.6),b=ctx.createBuffer(2,len,sr);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);}
  return b;
}
function setPlayIcon(on){$('playIcon').innerHTML=on?'<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>';$('play').setAttribute('aria-label',on?'Pause':'Play your performance');}
function balGains(){const v=+$('bal').value/100,a=v*Math.PI/2;return {music:Math.max(.035,1.15*Math.cos(a)),voice:Math.max(.05,2*Math.sin(a))};}
export function stopMix(){
  stopTail();
  if(!S.mix)return;
  try{S.mix.b.stop();S.mix.v.stop();}catch(e){}
  S.mix=null;setPlayIcon(false);if(S.last&&!$('coach').hidden)drawGraph(null);
}
// One-tap voice sounds. Each preset sets filter gains and effect sends on one shared chain,
// so switching while it plays is instant.
const FX={
  natural:{hp:60,lp:20000,low:0,pres:0,air:0,thr:0,short:0,long:0,echo:0},
  studio:{hp:110,lp:20000,low:-2,pres:4,air:3,thr:-24,short:.2,long:0,echo:0},
  radio:{hp:380,lp:3300,low:-6,pres:7,air:0,thr:-30,short:.04,long:0,echo:0}
};
// Rooms change where the whole performance happens, music and voice together.
// wet/dry: how much of the room you hear; lp: muffles the speakers; rate: the empty mall plays it slowed;
// clap: a crowd at the end of the song (people, seconds).
const ROOMS={
  bedroom:{name:'Bedroom',ir:null,wet:0,dry:1,lp:20000,rate:1},
  shower:{name:'Shower',ir:[1.6,2.6,9000,.006],wet:.55,dry:.85,lp:20000,rate:1},
  bar:{name:'Karaoke bar',ir:[.9,3.2,3200,.012],wet:.38,dry:.9,lp:6500,rate:1,clap:[14,3.4]},
  mall:{name:'Empty mall',ir:[5.2,1.7,4200,.03],wet:.85,dry:.45,lp:2400,rate:.9},
  arena:{name:'Arena',ir:[3.6,2,5200,.06],wet:.6,dry:.75,lp:20000,rate:1,clap:[70,5.5]}
};
let fxName=FX[pref('voiceFx','studio')]?pref('voiceFx','studio'):'studio',roomName=ROOMS[pref('room','bedroom')]?pref('room','bedroom'):'bedroom',IR=null;
const roomIR={};
// A room's echo: decaying noise, darker as it fades (lp), after a short gap before the first reflections (pre).
function roomImpulse(key){
  if(roomIR[key])return roomIR[key];
  const [sec,decay,lp,pre]=ROOMS[key].ir,sr=ctx.sampleRate,len=Math.floor(sr*(sec+pre)),b=ctx.createBuffer(2,len,sr),p0=Math.floor(pre*sr);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);let y=0;for(let i=p0;i<len;i++){const k=(i-p0)/(len-p0),a=Math.exp(-2*Math.PI*lp*(1-.6*k)/sr);y=(1-a)*(Math.random()*2-1)+a*y;d[i]=y*Math.pow(1-k,decay)*3;}}
  return roomIR[key]=b;
}
// Applause: lots of short, bright noise bursts, building up then fading out.
const clapBufs={};
function applause(key){
  if(clapBufs[key])return clapBufs[key];
  const [people,sec]=ROOMS[key].clap,sr=ctx.sampleRate,len=Math.floor(sr*sec),b=ctx.createBuffer(2,len,sr);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);
    for(let p=0;p<people/2;p++){const rate=3.2+Math.random()*2.4,f=900+Math.random()*1800,a=Math.exp(-2*Math.PI*f/sr),loud=.5+Math.random()*.5;
      let t=Math.random()*.35;
      while(t<sec-.05){const env=Math.min(1,t/.5)*Math.min(1,Math.pow((sec-t)/(sec*.55),1.6)),st=Math.floor(t*sr),n=Math.floor(.03*sr);let y=0;
        for(let i=0;i<n&&st+i<len;i++){y=(1-a)*(Math.random()*2-1)+a*y;const x=Math.random()*2-1;d[st+i]+=(x-y)*Math.exp(-i/(sr*.007))*loud*env*.5/Math.sqrt(people/14);}
        t+=1/rate*(.85+Math.random()*.3);}
    }}
  return clapBufs[key]=b;
}
let tail=null;
function stopTail(){if(tail){try{tail.stop();}catch(e){}tail=null;}}
function impulseLen(sec,decay){const sr=ctx.sampleRate,len=Math.floor(sr*sec),b=ctx.createBuffer(2,len,sr);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);}return b;}
function applyFx(m,instant){
  const f=FX[fxName],now=ctx.currentTime,set=(p,v)=>instant?p.setValueAtTime(v,now):p.setTargetAtTime(v,now,.04);
  set(m.hp.frequency,f.hp);set(m.lp.frequency,f.lp);set(m.low.gain,f.low);set(m.pres.gain,f.pres);set(m.air.gain,f.air);
  set(m.comp.threshold,f.thr);set(m.comp.ratio,f.thr?4:1);
  set(m.sShort.gain,f.short);set(m.sLong.gain,f.long);set(m.sEcho.gain,f.echo);
}
function playMix(from,until){
  ensureCtx();stopMix();
  const {song,voice}=S.last;
  if(!IR)IR={short:impulseLen(1.2,3),long:impulseLen(3.2,2.2)};
  const vb=ctx.createBuffer(1,voice.length,ctx.sampleRate);vb.copyToChannel?vb.copyToChannel(voice,0):vb.getChannelData(0).set(voice);
  const b=ctx.createBufferSource();b.buffer=S.tracks.back;
  const v=ctx.createBufferSource();v.buffer=vb;
  const gb=ctx.createGain(),gv=ctx.createGain(),{music,voice:vg}=balGains();gb.gain.value=music;gv.gain.value=vg;
  const bq=(type,f,q)=>{const n=ctx.createBiquadFilter();n.type=type;n.frequency.value=f;if(q)n.Q.value=q;return n;};
  const hp=bq('highpass',90),lp=bq('lowpass',20000,.7),low=bq('lowshelf',250),pres=bq('peaking',3200,.9),air=bq('highshelf',10000);
  const comp=ctx.createDynamicsCompressor();comp.knee.value=12;
  const rvS=ctx.createConvolver();rvS.buffer=IR.short;const rvL=ctx.createConvolver();rvL.buffer=IR.long;
  const sShort=ctx.createGain(),sLong=ctx.createGain(),sEcho=ctx.createGain();
  const dl=ctx.createDelay(1);dl.delayTime.value=.28;const fb=ctx.createGain();fb.gain.value=.3;
  // everything plays into the room: music, voice and the voice's own effects
  const R=ROOMS[roomName],room=ctx.createGain(),muff=bq('lowpass',R.lp,.7),rDry=ctx.createGain(),rWet=ctx.createGain();
  rDry.gain.value=R.dry;rWet.gain.value=R.wet;room.connect(muff);muff.connect(rDry);rDry.connect(ctx.destination);
  if(R.ir){const cv=ctx.createConvolver();cv.buffer=roomImpulse(roomName);muff.connect(cv);cv.connect(rWet);rWet.connect(ctx.destination);}
  b.connect(gb);gb.connect(room);
  v.connect(hp);hp.connect(lp);lp.connect(low);low.connect(pres);pres.connect(air);air.connect(comp);comp.connect(gv);gv.connect(room);
  gv.connect(sShort);sShort.connect(rvS);rvS.connect(room);
  gv.connect(sLong);sLong.connect(rvL);rvL.connect(room);
  gv.connect(sEcho);sEcho.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(room);
  const rate=R.rate;b.playbackRate.value=rate;v.playbackRate.value=rate;
  const off=from!=null?from:Math.max(0,song.firstT-(song.own?2:song.spb*1.5)),at=ctx.currentTime+.08,end=until!=null?until:Math.min(song.own?song.endT:song.lastEnd+.8,S.last.until!=null?S.last.until+.8:1e9);
  b.start(at,off);v.start(at,off);
  S.mix={b,v,gb,gv,at,off,song,hp,lp,low,pres,air,comp,sShort,sLong,sEcho,room};applyFx(S.mix,true);setPlayIcon(true);
  // a crowd that claps when the whole song ends (not for the short "Hear it" clips)
  const whole=until==null;
  if(whole&&R.clap){const c=ctx.createBufferSource();c.buffer=applause(roomName);const cg=ctx.createGain();cg.gain.value=roomName==='arena'?.9:.7;c.connect(cg);cg.connect(room);c.start(at+(end-off)/rate-.15);tail=c;}
  b.onended=()=>{if(S.mix&&S.mix.b===b)endMix();};
  const tick=()=>{if(!S.mix||S.mix.b!==b)return;const t=(ctx.currentTime-(ctx.outputLatency||0)-at)*rate+off;if(!$('coach').hidden)drawGraph(t);if(t>end){endMix();return;}requestAnimationFrame(tick);};
  requestAnimationFrame(tick);
}
// the song finished on its own: stop the music but let the crowd's applause ring out
function endMix(){const t=tail;tail=null;stopMix();tail=t;}
function paintSound(){
  document.querySelectorAll('#fxVoice button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.fx===fxName));
  document.querySelectorAll('#fxRoom button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.room===roomName));
}
paintSound();
document.querySelectorAll('#fxVoice button').forEach(bt=>bt.onclick=()=>{
  fxName=bt.dataset.fx;setPref('voiceFx',fxName);paintSound();
  if(S.mix)applyFx(S.mix,false);else playMix();
});
// a new room rebuilds the sound, so playback restarts from where you were
document.querySelectorAll('#fxRoom button').forEach(bt=>bt.onclick=()=>{
  roomName=bt.dataset.room;setPref('room',roomName);paintSound();
  if(S.mix){const t=Math.max(S.mix.off,(ctx.currentTime-S.mix.at)*(S.mix.b.playbackRate.value)+S.mix.off);playMix(t);}else playMix();
});

$('play').onclick=()=>S.mix?stopMix():playMix();
$('bal').oninput=()=>{if(!S.mix)return;const {music,voice}=balGains();S.mix.gb.gain.setTargetAtTime(music,ctx.currentTime,.05);S.mix.gv.gain.setTargetAtTime(voice,ctx.currentTime,.05);};
$('again').onclick=async()=>{stopMix();ensureCtx();S.current=S.last.song;S.tracks=await tracksFor(S.current);const ok=await getMic(!$('monitor').checked);S.demo=!ok;readySong();};
$('another').onclick=$('resBack').onclick=()=>{stopMix();show('pick');};
window.addEventListener('resize',()=>{if(S.last&&$('result').classList.contains('on')&&!$('coach').hidden)drawGraph(null);});

