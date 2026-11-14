import {S} from './state.js';
import {$} from './util.js';
import {hz} from './songs.js';
import {analyser,ctx,detectPitch,ensureCtx} from './audio.js';
import {livePitch} from './stage.js';
import {kv} from './account.js';

/* ---------- Use your own track ----------
   A track you bought (Karaoke Version, etc.) stays on this device. We read its tags or file name,
   look up the song and its synced lyrics on LRCLIB, the year on MusicBrainz, and listen to the
   track to learn its key (and key changes) and its moods. With no melody in a backing track,
   singing is graded on being in tune with the song's key at that moment. */
export const OWN={},OWN_PAL=['#ff7a59','#f7a8ff','#4cc9f0','#ffd23f','#3ddc97','#7ee0ff'];
const OK_OWN=.4; // semitones from the nearest in-key note that still count as in tune
const KEYN=['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const KS_MAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],KS_MIN=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
export const keyName=k=>KEYN[k%12]+(k>=12?' minor':' major');
const SCALES=[];for(let k=0;k<24;k++){const iv=k<12?[0,2,4,5,7,9,11]:[0,2,3,5,7,8,10,11],a=new Array(12).fill(false);iv.forEach(i=>a[(k%12+i)%12]=true);SCALES.push(a);}
const keyAt=(song,t)=>{const s=song.an.segs;for(const g of s)if(t<g.t1)return g.k;return s.length?s[s.length-1].k:0;};
// signed distance in semitones from m to the nearest note in the song's key at time t
function inKey(song,t,m){
  const sc=SCALES[keyAt(song,t)],q=m-song.an.tau,r=Math.round(q);let best=9;
  for(let c=r-2;c<=r+2;c++)if(sc[((c%12)+12)%12]){const d=q-c;if(Math.abs(d)<Math.abs(best))best=d;}
  return best;
}

/* FFT for the track analysis */
function fftPlan(N){const L=Math.log2(N),rev=new Uint32Array(N);for(let i=0;i<N;i++){let r=0,x=i;for(let b=0;b<L;b++){r=(r<<1)|(x&1);x>>=1;}rev[i]=r;}
  const c=new Float64Array(N/2),s=new Float64Array(N/2);for(let i=0;i<N/2;i++){c[i]=Math.cos(2*Math.PI*i/N);s[i]=-Math.sin(2*Math.PI*i/N);}return {N,rev,c,s};}
function fft(p,re,im){const {N,rev,c,s}=p;
  for(let i=0;i<N;i++){const j=rev[i];if(j>i){let t=re[i];re[i]=re[j];re[j]=t;t=im[i];im[i]=im[j];im[j]=t;}}
  for(let size=2;size<=N;size<<=1){const h=size>>1,st=N/size;for(let i=0;i<N;i+=size)for(let j=0,k=0;j<h;j++,k+=st){const a=i+j,b=a+h,tr=re[b]*c[k]-im[b]*s[k],ti=re[b]*s[k]+im[b]*c[k];re[b]=re[a]-tr;im[b]=im[a]-ti;re[a]+=tr;im[a]+=ti;}}}
const yieldUI=()=>new Promise(r=>setTimeout(r,0));

// Learns tuning, key segments and a loudness/brightness mood curve from the track.
export async function analyzeTrack(buf){
  const sr=buf.sampleRate,ds=Math.max(1,Math.round(sr/11025)),dsr=sr/ds,nc=buf.numberOfChannels;
  const n=Math.floor(buf.length/ds),x=new Float32Array(n),chans=[];for(let c=0;c<nc;c++)chans.push(buf.getChannelData(c));
  for(let i=0;i<n;i++){let s=0;const o=i*ds;for(const d of chans)for(let j=0;j<ds;j++)s+=d[o+j];x[i]=s/(ds*nc);}
  const N=8192,H=Math.round(dsr/4),p=fftPlan(N),win=new Float32Array(N);for(let i=0;i<N;i++)win[i]=.5-.5*Math.cos(2*Math.PI*i/N);
  const re=new Float64Array(N),im=new Float64Array(N),mag=new Float64Array(N/2);
  const kLo=Math.ceil(65*N/dsr),kHi=Math.floor(2100*N/dsr),frames=[];
  let tc=0,ts=0;
  for(let s=0,fi=0;s+N<=n||fi===0;s+=H,fi++){
    let e=0;for(let i=0;i<N;i++){const v=s+i<n?x[s+i]:0;re[i]=v*win[i];im[i]=0;}
    for(let i=0;i<H&&s+i<n;i++)e+=x[s+i]*x[s+i];
    fft(p,re,im);let mx=0,cs=0,cw=0;
    for(let k=kLo-1;k<=kHi+1;k++){const m=Math.hypot(re[k],im[k]);mag[k]=m;if(m>mx)mx=m;}
    const peaks=[];
    for(let k=kLo;k<=kHi;k++){const m=mag[k];cs+=k*m;cw+=m;
      if(m>mx*.04&&m>mag[k-1]&&m>=mag[k+1]){const a=Math.log(mag[k-1]+1e-12),b=Math.log(m+1e-12),c=Math.log(mag[k+1]+1e-12),den=a-2*b+c,off=den?.5*(a-c)/den:0;
        const f=(k+off)*dsr/N,pm=69+12*Math.log2(f/440);peaks.push(pm,m);
        if(f>100&&f<1500){const ang=2*Math.PI*(pm-Math.round(pm));tc+=m*Math.cos(ang);ts+=m*Math.sin(ang);}}}
    frames.push({rms:Math.sqrt(e/H),cen:cw?cs/cw*dsr/N:0,peaks});
    if(fi%50===49)await yieldUI();
    if(s+N>n)break;
  }
  const tau=Math.atan2(ts,tc)/(2*Math.PI);
  const chroma=frames.map(f=>{const c=new Float64Array(12);for(let i=0;i<f.peaks.length;i+=2){const q=f.peaks[i]-tau,r=Math.round(q);c[((r%12)+12)%12]+=Math.sqrt(f.peaks[i+1])*(1-Math.abs(q-r));}return c;});
  // key per 8 s window, every 2 s, smoothed so it only changes when the music really moves
  const corr=(a,b)=>{let ma=0,mb=0;for(let i=0;i<12;i++){ma+=a[i];mb+=b[i];}ma/=12;mb/=12;let sab=0,sa=0,sb2=0;for(let i=0;i<12;i++){const u=a[i]-ma,v=b[i]-mb;sab+=u*v;sa+=u*u;sb2+=v*v;}return sa&&sb2?sab/Math.sqrt(sa*sb2):0;};
  const W=32,HW=8,scores=[];
  for(let w=0;w*HW<frames.length;w++){const c=new Float64Array(12);for(let i=w*HW;i<Math.min(frames.length,w*HW+W);i++)for(let j=0;j<12;j++)c[j]+=chroma[i][j];
    const sc=new Float64Array(24);for(let k=0;k<24;k++){const prof=k<12?KS_MAJ:KS_MIN,r=new Array(12);for(let j=0;j<12;j++)r[(j+k)%12]=prof[j];sc[k]=corr(c,r);}scores.push(sc);}
  const PEN=.6;let dp=scores.length?Float64Array.from(scores[0]):new Float64Array(24);const back=[];
  for(let w=1;w<scores.length;w++){let bi=0;for(let k=1;k<24;k++)if(dp[k]>dp[bi])bi=k;const nd=new Float64Array(24),bk=new Uint8Array(24);
    for(let k=0;k<24;k++){const stay=dp[k],jump=dp[bi]-PEN;if(stay>=jump){nd[k]=stay+scores[w][k];bk[k]=k;}else{nd[k]=jump+scores[w][k];bk[k]=bi;}}back.push(bk);dp=nd;}
  let k=0;for(let j=1;j<24;j++)if(dp[j]>dp[k])k=j;const path=new Array(scores.length);path[scores.length-1]=k;
  for(let w=scores.length-1;w>0;w--){k=back[w-1][k];path[w-1]=k;}
  const segs=[];path.forEach((k,w)=>{const t=w*2+4;if(segs.length&&segs[segs.length-1].k===k)segs[segs.length-1].t1=t+1;else{if(segs.length)segs[segs.length-1].t1=t-1;segs.push({t0:segs.length?t-1:0,t1:t+1,k});}});
  if(segs.length)segs[segs.length-1].t1=1e9;
  // mood every 2 s: how loud and how bright it is compared with the rest of the song
  const mood=[];for(let i=0;i<frames.length;i+=8){let e=0,c=0,m=0;for(let j=i;j<Math.min(frames.length,i+8);j++){e+=frames[j].rms;c+=frames[j].cen;m++;}mood.push({e:20*Math.log10(e/m+1e-9),c:c/m});}
  const rank=(arr)=>{const s=[...arr].sort((a,b)=>a-b);return v=>{let lo=0,hi=s.length;while(lo<hi){const md=(lo+hi)>>1;if(s[md]<v)lo=md+1;else hi=md;}return s.length>1?lo/(s.length-1):.5;};};
  const re2=rank(mood.map(m=>m.e)),rc=rank(mood.map(m=>m.c));
  return {tau:+tau.toFixed(3),segs,mood:mood.map(m=>[+re2(m.e).toFixed(2),+rc(m.c).toFixed(2)]),dur:buf.duration};
}

/* Mood colors: small shifts around the song's color, kept readable behind dark lyrics */
function hexHsl(hex){const n=parseInt(hex.slice(1),16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;}return [h,s*100,l*100];}
function hslLum(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,9-k(n),1)),lin=c=>c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4);
  return .2126*lin(f(0))+.7152*lin(f(8))+.0722*lin(f(4));}
const INK_LUM=hslLum(...hexHsl('#1d1631'));
function buildMood(song){
  const [h,s,l]=hexHsl(song.color);
  song.moodCols=song.an.mood.map(([e,b],i)=>{
    const minor=keyAt(song,i*2+1)>=12;
    let H=h+(e-.5)*30-(minor?8:0),S=Math.max(20,Math.min(100,s+(e-.5)*26-(minor?10:0))),L=l+(.5-e)*7+(b-.5)*3;
    // keep the lyrics at 7:1 contrast or better
    while(L<96&&(hslLum(H,S,L)+.05)/(INK_LUM+.05)<7)L+=.5;
    return [H,S,Math.min(96,L)];});
}
export function paintMood(song,t){
  const now=performance.now(),dt=Math.min(.1,(now-S.run.lastF)/1000);S.run.lastF=now;
  const c=song.moodCols;if(!c||!c.length)return;
  const fi=Math.max(0,Math.min(c.length-1,t/2)),i=Math.floor(fi),f=fi-i,a=c[i],b=c[Math.min(c.length-1,i+1)];
  const tgt=a.map((v,j)=>v+(b[j]-v)*f);
  if(!S.run.bg)S.run.bg=hexHsl(song.color);
  const k=1-Math.exp(-dt/2.2);S.run.bg=S.run.bg.map((v,j)=>v+(tgt[j]-v)*k);
  $('sing').style.background=`hsl(${S.run.bg[0].toFixed(1)} ${S.run.bg[1].toFixed(1)}% ${S.run.bg[2].toFixed(1)}%)`;
  // the lights brighten in the big sections and dim in the quiet ones
  const m=song.an.mood[Math.max(0,Math.min(song.an.mood.length-1,Math.round(t/2)))];
  if(m&&(!S.run.lightT||now-S.run.lightT>500)){S.run.lightT=now;$('sing').style.setProperty('--lights',(.22+m[0]*.5).toFixed(2));}
}

/* Live singing on an own track */
export function ownLive(song,t){
  paintMood(song,t);
  const L=song.lines[S.run.idx],inL=L&&t>=L.start-.1&&t<=L.end+.4;
  let pm=null,lvl=0;
  if(analyser&&!S.demo){
    const a=S.run.abuf;analyser.getFloatTimeDomainData(a);let e=0;for(let i=0;i<a.length;i++)e+=a[i]*a[i];lvl=Math.sqrt(e/a.length);
    if(lvl>.008)pm=livePitch(a,ctx.sampleRate);
  }else if(S.run.fake){const f=S.run.fake.find(f=>t>=f.t0&&t<f.t1);if(f){pm=f.m+Math.sin(t*6.5)*.15;lvl=.06;}}
  if(pm!=null){
    S.run.sm=S.run.sm==null||Math.abs(pm-S.run.sm)>1.5?pm:S.run.sm+(pm-S.run.sm)*.5;
    const mm=S.run.sm;if(S.run.center==null)S.run.center=mm; // the lane stays put once it knows where your voice sits
    S.run.trail.push({t,m:mm,ok:inL?Math.abs(inKey(song,t,mm))<=OK_OWN:null});S.run.lastM=mm;
  }else{S.run.sm=null;S.run.trail.push({t,m:null,ok:null});}
  while(S.run.trail.length&&S.run.trail[0].t<t-1.5)S.run.trail.shift();
  drawOwnLane(song,t,lvl);
}
// The lane for own tracks: faint rails on the notes that are in key right now, a strip showing
// when the words come, and your voice. Rails move when the song changes key.
function drawOwnLane(song,t,lvl){
  const cv=$('lane'),dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
  const ink='#1d1631',nowX=w*.3,pps=(w-nowX)/2.8,X=tt=>nowX+(tt-t)*pps;
  const c=S.run.center??62,lo=c-8,hi=c+8,Y=m=>h-18-(m-lo)/(hi-lo)*(h-32);
  const k=keyAt(song,t),sc=SCALES[k],tau=song.an.tau;
  g.fillStyle=ink;
  for(let m=Math.ceil(lo-tau);m<=hi-tau;m++){const pc=((m%12)+12)%12;if(!sc[pc])continue;g.globalAlpha=pc===k%12?.24:.1;g.fillRect(0,Y(m+tau)-.75,w,1.5);}
  g.globalAlpha=.3;
  for(const L of song.lines){const x0=X(L.start),x1=X(L.end);if(x1<0||x0>w)continue;g.beginPath();if(g.roundRect)g.roundRect(x0,h-7,Math.max(4,x1-x0),4,2);else g.rect(x0,h-7,Math.max(4,x1-x0),4);g.fill();}
  g.globalAlpha=.3;g.fillRect(nowX-1,6,2,h-16);
  g.globalAlpha=1;g.strokeStyle=ink;g.lineWidth=4;g.lineCap='round';g.lineJoin='round';
  let open=false,prev=null;g.beginPath();
  for(const p of S.run.trail){
    if(p.m==null){open=false;prev=null;continue;}
    if(prev&&(p.t-prev.t>.12||Math.abs(p.m-prev.m)>3))open=false;
    const x=X(p.t),y=Y(Math.max(lo,Math.min(hi,p.m)));if(!open){g.moveTo(x,y);open=true;}else g.lineTo(x,y);prev=p;
  }
  g.stroke();
  const last=S.run.trail[S.run.trail.length-1];
  if(last&&last.m!=null){
    const y=Y(Math.max(lo,Math.min(hi,last.m))),r=8+Math.min(8,lvl*70);
    g.globalAlpha=.18;g.beginPath();g.arc(nowX,y,r+8,0,7);g.fill();
    g.globalAlpha=1;g.fillStyle=last.ok?'#fbf9ff':ink;g.lineWidth=3;g.beginPath();g.arc(nowX,y,r,0,7);g.fill();g.stroke();
  }else{const y=Y(S.run.lastM??c);g.globalAlpha=.35;g.lineWidth=3;g.beginPath();g.arc(nowX,y,8,0,7);g.stroke();g.globalAlpha=1;}
}
export function scoreOwn(song,frames){
  let inL=0,hits=0,li=0;const pts=[],per=new Map();
  for(const f of frames){
    while(li<song.lines.length&&f.t>song.lines[li].end+.3)li++;
    const L=song.lines[li];if(!L||f.t<L.start-.05)continue;
    inL++;let o=per.get(L);if(!o){o={n:{t:L.start,d:L.end-L.start,midi:0},frames:0,voiced:0,hits:0,dsum:0,ds:[]};per.set(L,o);}o.frames++;
    if(f.m==null)continue;
    const d=inKey(song,f.t,f.m),ok=Math.abs(d)<=OK_OWN;o.voiced++;o.dsum+=d;if(ok){o.hits++;hits++;}
    pts.push({t:f.t,m:f.m,ok});
  }
  return {acc:pts.length?hits/pts.length:0,cover:inL?pts.length/inL:0,pts,key:0,per:[...per.values()]};
}
// Preview mode (no mic): a pretend singer who mostly stays in key
export function fakePlan(song){
  const out=[];let m=62;
  for(const L of song.lines)for(const s of L.syl){
    const sc=SCALES[keyAt(song,s.start)];let c=Math.round(m)+Math.round((Math.random()-.5)*4);
    for(let i=0;i<3&&!sc[((c%12)+12)%12];i++)c++;m=Math.max(55,Math.min(70,c));
    out.push({t0:s.start+.03,t1:s.end-.03,m:m+song.an.tau+(Math.random()<.15?.7:(Math.random()-.5)*.3)});
  }
  return out;
}
export function fakeVoiceOwn(song,sr,plan){
  const len=Math.ceil(song.dur*sr),v=new Float32Array(len);let ph=0;
  for(const n of plan||fakePlan(song)){const st=Math.max(0,Math.floor(n.t0*sr)),en=Math.min(len,Math.floor(n.t1*sr)),f0=hz(n.m);
    for(let i=st;i<en;i++){const tt=(i-st)/sr;ph+=2*Math.PI*f0/sr;const e=Math.min(1,tt/.03)*Math.min(1,(en-i)/sr/.04);v[i]+=.2*e*(Math.sin(ph)+.4*Math.sin(2*ph)+.2*Math.sin(3*ph));}}
  return v;
}

/* Lyrics: LRC lines with start times. Word timing inside a line is spread by word length. */
export function parseLRC(txt){
  const out=[];
  for(const raw of String(txt||'').split(/\r?\n/)){
    const tags=[...raw.matchAll(/\[(\d+):(\d+(?:[.:]\d+)?)\]/g)];if(!tags.length)continue;
    const text=raw.replace(/\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim();
    for(const m of tags)out.push({t:+m[1]*60+parseFloat(m[2].replace(':','.')),text});
  }
  return out.sort((a,b)=>a.t-b.t);
}
export function buildOwnLines(song){
  const off=(song.autoOff||0)+(song.userOff||0),lrc=song.lrc;let lines=[];
  for(let i=0;i<lrc.length;i++){
    const text=lrc[i].text;if(!text||/^[♪♫\s]+$/.test(text))continue;
    const st=lrc[i].t+off,nx=lrc[i+1]?lrc[i+1].t+off:st+6,gap=Math.max(.6,nx-st);
    const words=text.match(/\S+\s*/g)||[text],chars=text.replace(/\s/g,'').length;
    const sing=Math.min(gap*.92,Math.max(.9,chars*.085+.25));
    const tot=words.reduce((a,w)=>a+w.trim().length+1,0);let acc=0;
    const syl=words.map((w,j)=>{const a=st+sing*acc/tot;acc+=w.trim().length+1;return {text:j<words.length-1?w:w.trimEnd(),start:a,end:st+sing*acc/tot};});
    lines.push({syl,start:st,end:st+sing,text,t0:st});
  }
  const raw=song.rawNotes||(song.rawNotes=song.notes||[]);
  // a timed line far from where its neighbours put the lyrics is a wrong match (often a repeated chorus): skip it
  const okW=lines.map((L,k)=>{const w=song.wt&&song.wt[k];return w&&w.length===L.syl.length?w[0][0]-L.t0:null;});
  okW.forEach((o,k)=>{if(o==null)return;let p=null,n=null;for(let j=k-1;j>=0;j--)if(okW[j]!=null){p=okW[j];break;}for(let j=k+1;j<okW.length;j++)if(okW[j]!=null){n=okW[j];break;}
    if(p!=null&&n!=null&&Math.abs(o-p)>2.5&&Math.abs(o-n)>2.5)okW[k]=null;});
  let lastAi=-1e9;okW.forEach((o,k)=>{if(o==null)return;const st=lines[k].t0+o;if(st<lastAi-.3)okW[k]=null;else lastAi=st;});
  if(song.wt)lines.forEach((L,k)=>{const w=song.wt[k];if(!w||w.length!==L.syl.length||okW[k]==null)return;
    L.syl.forEach((x,j)=>{x.start=w[j][0];x.end=Math.max(w[j][0]+.08,w[j][1]);});L.start=L.syl[0].start;L.end=L.syl[L.syl.length-1].end;L.ai=true;});
  // lines the listener timed are anchors: every other line moves with the anchors around it, so drift can't build up
  const anchors=lines.map((L,i)=>L.ai?i:-1).filter(i=>i>=0);
  if(anchors.length){
    for(let i=0;i<lines.length;i++){const L=lines[i];if(L.ai)continue;let a=-1,b=-1;for(const k of anchors){if(k<i)a=k;else{b=k;break;}}
      const oa=a>=0?lines[a].start-lines[a].t0:null,ob=b>=0?lines[b].start-lines[b].t0:null;
      const off=oa==null?ob:ob==null?oa:oa+(ob-oa)*(L.t0-lines[a].t0)/Math.max(.01,lines[b].t0-lines[a].t0);
      if(off){L.start+=off;L.end+=off;L.syl.forEach(x=>{x.start+=off;x.end+=off;});}}
  }else if(raw.length&&!alignLines(lines,raw,song.lrcDur&&song.len?(song.len-song.lrcDur)-(song.autoOff||0):0))trackDrift(lines,raw);
  if(lines.some(L=>L.gone))lines=lines.filter(L=>!L.gone);   // sections cut from this version
  if(raw.length)fitWordsToNotes(lines,raw);
  song.lines=lines;
  if(raw.length){song.notes=notesInLyrics(raw,lines);startNotesAtWords(song);labelNotes(song);}
  song.lead=song.firstT=lines.length?lines[0].start:0;
  song.lastEnd=lines.length?lines[lines.length-1].end:song.len;
}
// Lyric files are timed to the album version. Videos and re-recordings can be edited (a section cut or added)
// or drift. Find each line's shift with a best-path search: a line wants to start on a sung phrase and be
// covered by singing; small changes between lines are cheap, a jump (an edit) is allowed but costs more.
function alignLines(lines,ns,edit){
  if(!ns.length||lines.length<3)return false;
  const R=.05,T=Math.ceil((ns[ns.length-1].t+ns[ns.length-1].d+60)/R),vo=new Uint8Array(T+1);
  for(const n of ns)for(let k=Math.max(0,Math.floor(n.t/R)),e=Math.min(T,Math.ceil((n.t+n.d)/R));k<e;k++)vo[k]=1;
  const ps=new Float64Array(T+2);for(let k=0;k<=T;k++)ps[k+1]=ps[k]+vo[k];
  const cov=(a,b)=>{const i=Math.max(0,Math.floor(a/R)),j=Math.min(T,Math.ceil(b/R));return j>i?(ps[j]-ps[i])/(j-i):0;};
  const on=ns.filter((n,i)=>i===0||n.t-(ns[i-1].t+ns[i-1].d)>.2).map(n=>n.t);
  const near=t=>{let lo=0,hi=on.length;while(lo<hi){const m=(lo+hi)>>1;if(on[m]<t)lo=m+1;else hi=m;}let d=1e9;if(lo<on.length)d=on[lo]-t;if(lo>0)d=Math.min(d,t-on[lo-1]);return d;};
  const S=601,O=k=>(k-300)*.1;
  const em=(L,k)=>{const s=L.t0+O(k),d=Math.max(.6,L.end-L.start),c=cov(s,s+d);
    return 1.5*c+2*Math.max(0,1-near(s)/.35)-1.2*cov(s-.6,s)-(c<.15?.8:0)-.01*Math.abs(O(k));};
  // the start lines up already; if this version is shorter or longer than the one the lyrics were timed to,
  // the end should be shifted by about that much (a cut or an added section somewhere in between).
  // When it's shorter, lines can be left out: they were cut from this version.
  const D=edit&&Math.abs(edit)>1.5?edit:0,last=lines.length-1,canCut=D<0,GONE=.8;
  const emAt=(i,k)=>em(lines[i],k)-(i===0?.4*Math.abs(O(k)):0)-(i===last&&D?.9*Math.abs(O(k)-D):0);
  // states 0..S-1: the line is sung at that shift; S..2S-1: the line was cut (the shift is just where it sits in order)
  const N=2*S;let prev=new Float64Array(N).fill(-1e18);const back=[];
  for(let k=0;k<S;k++){prev[k]=emAt(0,k);if(canCut)prev[S+k]=-GONE-.4*Math.abs(O(k));}
  for(let i=1;i<lines.length;i++){
    const L=lines[i],P=lines[i-1],cur=new Float64Array(N).fill(-1e18),b=new Int16Array(N);
    // a sung line can't start on top of the line before it; a cut line only has to keep its place in order
    const gap=Math.min(1,.5*Math.max(.3,P.end-P.start)),roomS=(L.t0-P.t0-gap)/.1,roomG=(L.t0-P.t0-.3)/.1;
    const pmS=new Float64Array(S),paS=new Int16Array(S),pmG=new Float64Array(S),paG=new Int16Array(S);
    let v1=-1e18,a1=0,v2=-1e18,a2=S;
    for(let j=0;j<S;j++){if(prev[j]>v1){v1=prev[j];a1=j;}pmS[j]=v1;paS[j]=a1;if(prev[S+j]>v2){v2=prev[S+j];a2=S+j;}pmG[j]=v2;paG[j]=a2;}
    for(let k=0;k<S;k++){
      let best=-1e18,arg=k;const JS=Math.min(S-1,Math.floor(k+roomS)),JG=Math.min(S-1,Math.floor(k+roomG));
      for(let j=Math.max(0,k-15);j<=Math.min(k+15,JS);j++){const v=prev[j]-Math.abs(j-k)*.06;if(v>best){best=v;arg=j;}}
      if(JS>=0&&pmS[JS]-3>best){best=pmS[JS]-3;arg=paS[JS];}
      if(JG>=0&&pmG[JG]>best){best=pmG[JG];arg=paG[JG];}   // after cut lines, carry on from wherever the cut ends
      cur[k]=best+emAt(i,k);b[k]=arg;
      if(canCut){let gb=-1e18,ga=0;
        if(JG>=0){if(pmS[JG]>gb){gb=pmS[JG];ga=paS[JG];}if(pmG[JG]>gb){gb=pmG[JG];ga=paG[JG];}}
        cur[S+k]=gb-GONE-(i===last&&D?.9*Math.abs(O(k)-D):0);b[S+k]=ga;}
    }
    back.push(b);prev=cur;
  }
  let k=0;for(let j=1;j<N;j++)if(prev[j]>prev[k])k=j;
  const st=new Array(lines.length);st[last]=k;for(let i=last;i>0;i--){k=back[i-1][k];st[i-1]=k;}
  lines.forEach((L,i)=>{const gone=st[i]>=S,o=O(st[i]%S);if(gone)L.gone=true;
    if(o){L.start+=o;L.end+=o;L.syl.forEach(x=>{x.start+=o;x.end+=o;});}});
  return true;
}
// Lyric files are timed to the original record; a re-recording drifts. Follow the drift line by line,
// moving each line toward the sung phrase it belongs to, a little at a time.
function trackDrift(lines,ns){
  const ph=ns.filter((n,i)=>i===0||n.t-(ns[i-1].t+ns[i-1].d)>.2).map(n=>n.t);let off=0;
  for(const L of lines){
    if(L.ai)continue;let bd=null;const t=L.start+off;
    for(const q of ph){const d=q-t;if(Math.abs(d)<2.5&&(bd==null||Math.abs(d)<Math.abs(bd)))bd=d;}
    if(bd!=null)off+=bd*.6;
    if(off){L.start+=off;L.end+=off;L.syl.forEach(x=>{x.start+=off;x.end+=off;});}
  }
}
// With the vocal file we know when each note is sung, so words follow the singing.
function fitWordsToNotes(lines,ns){
  const ph=ns.filter((n,i)=>i===0||n.t-(ns[i-1].t+ns[i-1].d)>.2).map(n=>n.t);
  const snap=t=>{let b=t,bd=.7;for(const q of ph){const d=Math.abs(q-t);if(d<bd){bd=d;b=q;}}return b;};
  lines.forEach((L,i)=>{
    if(L.ai)return;
    const nx=lines[i+1],w0=snap(L.start)-.05,w1=nx?snap(nx.start)-.05:L.start+10;
    const segs=ns.filter(n=>n.t+n.d>w0&&n.t<w1).map(n=>[Math.max(n.t,w0),Math.min(n.t+n.d,w1)]);
    const tot=segs.reduce((a,g)=>a+g[1]-g[0],0);if(tot<.25)return;
    const at=f=>{let r=f*tot;for(const g of segs){const d=g[1]-g[0];if(r<=d)return g[0]+r;r-=d;}return segs[segs.length-1][1];};
    const W=L.syl.map(x=>x.text.trim().length+1),T=W.reduce((a,b)=>a+b,0);let acc=0;
    L.syl.forEach((x,j)=>{x.start=at(acc/T);acc+=W[j];x.end=Math.max(x.start+.08,at(acc/T));});
    L.start=L.syl[0].start;L.end=L.syl[L.syl.length-1].end;
  });
}
// put each word under the note it starts on, like the built-in songs
function labelNotes(song){
  const ns=song.notes;for(const n of ns)n.syl='';let k=0;
  for(const L of song.lines)for(const x of L.syl){while(k<ns.length&&ns[k].t+ns[k].d<x.start-.05)k++;const n=ns[k];
    if(n&&n.t<x.end&&!n.syl)n.syl=x.text.trim().replace(/[,.!?;:"“”]+$/,'').slice(0,12);}
}
export function setRange(s){
  if(!s.notes.length){s.minM=55;s.maxM=70;return;}
  const m=s.notes.map(n=>n.midi).sort((a,b)=>a-b);s.minM=m[Math.floor(m.length*.04)];s.maxM=m[Math.floor(m.length*.96)];
}
// Melody from the solo lead vocal: pitch track, then cut into notes snapped to the song's tuning.
export function monoOf(buf){const n=buf.length,c=buf.numberOfChannels,x=new Float32Array(n);for(let k=0;k<c;k++){const d=buf.getChannelData(k);for(let i=0;i<n;i++)x[i]+=d[i]/c;}return x;}
// Melody from the separated lead vocal, made for real singing: a held note stays one bar through vibrato,
// slides and tiny dropouts, and only changes when the voice settles on a new note for a moment.
export const MELODY_V=2;
export async function extractMelody(buf,tau){
  await yieldUI();await yieldUI();
  const fr=detectPitch(monoOf(buf),buf.sampleRate,256,.025,.25),n=fr.length,hop=n>1?fr[1].t-fr[0].t:.023;
  let m=fr.map(f=>f.m);
  // octave slips: a frame an octave away from the voice around it is the same note
  for(let i=0;i<n;i++){if(m[i]==null)continue;const w=[];for(let j=Math.max(0,i-12);j<=Math.min(n-1,i+12);j++)if(m[j]!=null)w.push(m[j]);
    w.sort((a,b)=>a-b);const md=w[w.length>>1];if(Math.abs(m[i]-12-md)<2)m[i]-=12;else if(Math.abs(m[i]+12-md)<2)m[i]+=12;}
  // bridge short dropouts inside a held note
  for(let i=0;i<n;i++){if(m[i]!=null)continue;let j=i;while(j<n&&m[j]==null)j++;
    if(i>0&&j<n&&(j-i)*hop<=.14&&Math.abs(m[i-1]-m[j])<1.2)for(let k=i;k<j;k++)m[k]=m[i-1]+(m[j]-m[i-1])*(k-i+1)/(j-i+1);i=j;}
  // smooth: median of 7
  const sm=m.map((v,i)=>{if(v==null)return null;const w=[];for(let j=i-3;j<=i+3;j++)if(m[j]!=null)w.push(m[j]);w.sort((a,b)=>a-b);return w[w.length>>1];});
  // hold a note until the voice settles on another one for ~90 ms (vibrato and slides don't count)
  const lab=new Array(n).fill(null),SETTLE=Math.max(3,Math.round(.09/hop));let cur=null,cand=null,cs=0,cc=0;
  for(let i=0;i<n;i++){
    const v=sm[i];if(v==null){cur=null;cand=null;cc=0;continue;}
    const q=v-tau,r=Math.round(q);
    if(cur==null){cur=r;lab[i]=cur;continue;}
    if(Math.abs(q-cur)<=.7){cand=null;cc=0;lab[i]=cur;continue;}
    if(cand===r)cc++;else{cand=r;cs=i;cc=1;}
    if(cc>=SETTLE){cur=cand;for(let k=cs;k<=i;k++)lab[k]=cur;cand=null;cc=0;}else lab[i]=cur;
  }
  // runs of the same note become bars; join the same note across a short gap
  const out=[];
  for(let i=0;i<n;i++){if(lab[i]==null)continue;let j=i;while(j+1<n&&lab[j+1]===lab[i])j++;
    const t=fr[i].t,d=fr[j].t-t+hop,mi=lab[i]+tau,p=out[out.length-1];
    if(p&&Math.abs(p.midi-mi)<.01&&t-(p.t+p.d)<.16)p.d=t+d-p.t;else out.push({t,d,midi:mi});i=j;}
  // drop crumbs: very short bars join a touching neighbour or go
  const res=[];
  for(const x of out){if(x.d>=.12){res.push(x);continue;}const p=res[res.length-1];if(p&&x.t-(p.t+p.d)<.05)p.d=x.t+x.d-p.t;}
  // a short slide into a note belongs to that note: the bar starts where the slide starts
  for(let i=res.length-2;i>=0;i--){const a=res[i],b=res[i+1];
    if(a.d<.22&&b.d>a.d*1.5&&b.t-(a.t+a.d)<.05&&Math.abs(b.midi-a.midi)<=2.5){b.d+=b.t-a.t;b.t=a.t;res.splice(i,1);}}
  return res.map(x=>({t:+x.t.toFixed(3),d:+x.d.toFixed(3),midi:x.midi}));
}
// Bars only where there are words to sing: drop what the separation picked up in intros, solos and gaps.
function notesInLyrics(raw,lines){
  const out=[];let k=0;
  for(const n of raw){
    const a=n.t,b=n.t+n.d;while(k<lines.length&&lines[k].end+.5<a)k++;
    let ov=0;for(let j=Math.max(0,k-1);j<lines.length&&lines[j].start-.3<b;j++)ov+=Math.max(0,Math.min(b,lines[j].end+.5)-Math.max(a,lines[j].start-.3));
    if(ov>=Math.min(.2,n.d*.5))out.push({...n});
  }
  return out;
}
// Bars start where the word starts: singers slide into notes, so the steady part comes a beat late.
function startNotesAtWords(song){
  const ns=song.notes;if(!ns.length)return;let k=0;
  for(const L of song.lines)for(const x of L.syl){
    while(k<ns.length&&ns[k].t<x.start-.03)k++;const n=ns[k];if(!n)return;
    const lead=n.t-x.start;if(!(lead>.03&&lead<.45&&n.t<x.end))continue;
    const p=k?ns[k-1]:null;
    if(p&&p.t+p.d>x.start){if(p.t<x.start-.15)p.d=x.start-p.t;else continue;} // the note before rings on: trim it
    n.d+=lead;n.t=x.start;
  }
}
// Lines up the lyric times with where phrases actually start in the vocal.
export function alignToMelody(notes,lrc){
  const ph=notes.filter((n,i)=>i===0||n.t-(notes[i-1].t+notes[i-1].d)>.25).map(n=>n.t),ls=lrc.filter(l=>l.text).map(l=>l.t);
  if(ph.length<4||ls.length<3)return null;
  let best=0,bs=-1;
  for(let k=-300;k<=300;k++){const o=k*.05;let sc=0,j=0;
    for(const t of ls){const x=t+o;while(j<ph.length-1&&ph[j+1]<=x)j++;let d=Math.abs(ph[j]-x);if(j+1<ph.length)d=Math.min(d,Math.abs(ph[j+1]-x));sc+=Math.max(0,1-d/.3);}
    if(sc>bs){bs=sc;best=o;}}
  return bs>=ls.length*.35?+best.toFixed(2):null;
}
export function makeOwnSong(rec){
  const s={id:rec.id,title:rec.title,artist:rec.artist,year:rec.year,album:rec.album,color:rec.color,own:true,vibe:'Your own track',
    scene:rec.scene||null,lrc:rec.lrc,autoOff:rec.autoOff||0,userOff:0,lrcDur:rec.lrcDur||0,an:rec.an,len:rec.an.dur,dur:rec.an.dur,endT:rec.an.dur-.05,notes:rec.notes||[],wt:rec.wt||null,mv:rec.mv||1};
  setRange(s);buildOwnLines(s);buildMood(s);return s;
}
export async function loadOwnTracks(song){
  const rec=await kv('get','track:'+song.id);if(!rec||!rec.blob)throw new Error('missing');
  ensureCtx();const buf=await ctx.decodeAudioData(await rec.blob.arrayBuffer());
  let guide=null;if(rec.vocal)try{guide=await ctx.decodeAudioData(await rec.vocal.arrayBuffer());}catch(e){}
  return {back:buf,guide};
}

