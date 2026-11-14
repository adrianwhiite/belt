import {S} from './state.js';
import {CH,hz} from './songs.js';
import {stopPreview} from './picker.js';
import {impulse} from './results.js';

/* ---------- Offline rendering of backing + guide tracks ---------- */
export async function renderTracks(song){
  const sr=44100,len=Math.ceil(sr*song.dur);
  const OAC=window.OfflineAudioContext||window.webkitOfflineAudioContext;
  const back=new OAC(2,len,sr),guide=new OAC(1,len,sr);
  const spb=song.spb,bar=song.bar;
  const bus=back.createDynamicsCompressor();bus.threshold.value=-16;bus.ratio.value=3;
  const out=back.createGain();out.gain.value=.85;bus.connect(out);out.connect(back.destination);
  const noise=back.createBuffer(1,sr,sr);const nd=noise.getChannelData(0);for(let i=0;i<sr;i++)nd[i]=Math.random()*2-1;
  const env=(g,t,a,peak,dec,sus)=>{g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(Math.max(sus||0,.0001),t+a+dec);};
  const osc=(type,f,t,d,dest)=>{const o=back.createOscillator();o.type=type;o.frequency.value=f;o.connect(dest);o.start(t);o.stop(t+d);};
  const click=(t,acc)=>{const g=back.createGain();g.connect(bus);env(g,t,.002,acc?.45:.25,.05);osc('square',acc?1760:1320,t,.07,g);};
  const kick=(t,v=1)=>{const g=back.createGain();g.connect(bus);env(g,t,.003,.9*v,.28);const o=back.createOscillator();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.14);o.connect(g);o.start(t);o.stop(t+.32);};
  const nz=(t,v,dec,type,f)=>{const s=back.createBufferSource();s.buffer=noise;const fl=back.createBiquadFilter();fl.type=type;fl.frequency.value=f;const g=back.createGain();s.connect(fl);fl.connect(g);g.connect(bus);env(g,t,.002,v,dec);s.start(t,Math.random()*.5);s.stop(t+dec+.05);};
  const snare=(t,v=1)=>{nz(t,.42*v,.16,'bandpass',1900);const g=back.createGain();g.connect(bus);env(g,t,.002,.22*v,.08);osc('triangle',190,t,.1,g);};
  const hat=(t,v=.11)=>nz(t,v,.035,'highpass',7500);
  const bassN=(t,m,d,v=.5)=>{const g=back.createGain();const lp=back.createBiquadFilter();lp.type='lowpass';lp.frequency.value=700;g.connect(lp);lp.connect(bus);env(g,t,.01,v,Math.max(.1,d*.9),v*.2);osc('triangle',hz(m),t,d+.05,g);osc('sine',hz(m),t,d+.05,g);};
  const keys=(t,ms,d,v=.13)=>{for(const m of ms){const g=back.createGain();const lp=back.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;g.connect(lp);lp.connect(bus);env(g,t,.006,v,Math.max(.08,d));osc('triangle',hz(m),t,d+.1,g);osc('sine',hz(m+12)*1.003,t,d+.1,g);}};
  const pad=(t,ms,d,v=.05)=>{for(const m of ms){const g=back.createGain();const lp=back.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1100;g.connect(lp);lp.connect(bus);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.35);g.gain.setValueAtTime(v,t+Math.max(.4,d-.2));g.gain.exponentialRampToValueAtTime(.0001,t+d+.5);osc('sawtooth',hz(m)*.998,t,d+.6,g);osc('sawtooth',hz(m)*1.002,t,d+.6,g);}};

  for(let i=0;i<2*song.bpb;i++)click(i*spb,i%song.bpb===0);

  const voice=(pcs,lo)=>pcs.map(pc=>lo+(((pc-lo)%12)+12)%12).sort((a,b)=>a-b);
  song.chords.forEach((c,k)=>{
    const t0=song.down+k*bar,last=k===song.chords.length-1;
    const pcs=CH[c].map(x=>(x+song.tonic)%12);
    const v=voice(pcs,55),root=36+(((pcs[0]-36)%12)+12)%12,third=c==='vi'||c==='ii'?3:4;
    const ring=last?bar*1.6:0;
    switch(song.style){
      case 'party':
        kick(t0);for(let i=0;i<3;i++)hat(t0+i*spb,i?.08:.12);
        bassN(t0,root,spb*.9+ring);keys(t0+spb,v,spb*.55);keys(t0+2*spb,v,spb*.55+ring);break;
      case 'waltz':
        kick(t0,.6);hat(t0+spb,.07);hat(t0+2*spb,.07);
        bassN(t0,k%2?root+7-12*(root+7>47):root,spb*.9+ring,.45);keys(t0+spb,v,spb*.5,.11);keys(t0+2*spb,v,spb*.5+ring,.11);break;
      case 'bounce':
        kick(t0);kick(t0+2*spb,.8);snare(t0+spb);snare(t0+3*spb);
        for(let i=0;i<8;i++)hat(t0+i*spb/2,i%2?.07:.1);
        bassN(t0,root,spb*.8);bassN(t0+2*spb,root+7-12*(root+7>47),spb*.8+ring);
        for(let i=0;i<4;i++)keys(t0+(i+.5)*spb,v,spb*.22+(last&&i===3?ring:0),.1);break;
      case 'brass':
        kick(t0);kick(t0+2*spb,.8);snare(t0+spb,.8);snare(t0+3*spb,.8);
        for(let i=0;i<4;i++){hat(t0+i*spb,.1);hat(t0+(i+.66)*spb,.06);}
        [0,third,7,9].forEach((iv,i)=>bassN(t0+i*spb,root+iv,spb*.85+(last&&i===3?ring:0),.45));
        keys(t0+spb,v,spb*.4,.11);keys(t0+3*spb,v,spb*.4+ring,.11);break;
      case 'ballad':
        pad(t0,v,bar+ring);bassN(t0,root,bar*.95+ring,.35);
        for(let i=0;i<song.bpb;i++)keys(t0+i*spb,[v[i%v.length]+12],spb*1.4,.05);break;
    }
  });

  const gd=guide.createBiquadFilter();gd.type='lowpass';gd.frequency.value=3200;gd.connect(guide.destination);
  for(const n of song.notes){
    const t=n.t,d=n.d*.94,f=hz(n.midi);
    const g=guide.createGain();g.connect(gd);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.025);
    g.gain.setValueAtTime(.3,t+Math.max(.03,d-.06));g.gain.exponentialRampToValueAtTime(.0001,t+d);
    const o=guide.createOscillator();o.type='triangle';o.frequency.value=f;
    const l=guide.createOscillator();l.frequency.value=5.5;const lg=guide.createGain();
    lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.007,t+Math.min(.4,d));
    l.connect(lg);lg.connect(o.frequency);o.connect(g);o.start(t);o.stop(t+d+.02);l.start(t);l.stop(t+d+.02);
  }
  const [b,g]=await Promise.all([back.startRendering(),guide.startRendering()]);
  return {back:b,guide:g};
}

/* ---------- Pitch analysis (YIN on a 4x-downsampled signal) ---------- */
export function detectPitch(buf,sr,hop,gateFrac,thr){
  const ds=4,dsr=sr/ds,n=Math.floor(buf.length/ds),x=new Float32Array(n);
  for(let i=0;i<n;i++){let s=0;for(let j=0;j<ds;j++)s+=buf[i*ds+j];x[i]=s/ds;}
  const W=512,H=hop||256,tmin=Math.floor(dsr/1000),tmax=Math.floor(dsr/75),d=new Float32Array(tmax+2);
  const starts=[],rms=[];let maxR=0;
  for(let s=0;s+W+tmax<n;s+=H){let e=0;for(let i=0;i<W;i++)e+=x[s+i]*x[s+i];const r=Math.sqrt(e/W);starts.push(s);rms.push(r);if(r>maxR)maxR=r;}
  const gate=Math.max(.004,maxR*(gateFrac||.1)),frames=[];
  starts.forEach((s,fi)=>{
    const t=(s+W/2)/dsr;
    if(rms[fi]<gate){frames.push({t,m:null});return;}
    let run=0,tau=-1;d[0]=1;
    for(let T=1;T<=tmax;T++){let sum=0;for(let i=0;i<W;i++){const df=x[s+i]-x[s+i+T];sum+=df*df;}run+=sum;d[T]=run?sum*T/run:1;}
    for(let T=tmin;T<=tmax;T++){if(d[T]<(thr||.15)){while(T+1<=tmax&&d[T+1]<d[T])T++;tau=T;break;}}
    if(tau<0){frames.push({t,m:null});return;}
    let bt=tau;if(tau>1&&tau<tmax){const a=d[tau-1],b=d[tau],c=d[tau+1],den=a+c-2*b;if(den)bt=tau+(a-c)/(2*den);}
    frames.push({t,m:69+12*Math.log2(dsr/bt/440)});
  });
  return frames;
}
// Pitch is compared by note name, so any octave counts. A singer who picks their own key
// (everything shifted by the same interval) is scored against the melody moved into that key.
export const fold=d=>((d+6)%12+12)%12-6;
export function scoreIt(song,frames){
  let inNote=0;const vs=[];
  for(const f of frames){
    const n=song.notes.find(n=>f.t>=n.t+.06&&f.t<n.t+n.d);
    if(!n)continue;
    inNote++;
    if(f.m!=null)vs.push({t:f.t,n,diff:fold(f.m-n.midi)});
  }
  const hitsAt=k=>vs.reduce((a,v)=>a+(Math.abs(fold(v.diff-k))<=.9),0);
  let key=0,best=hitsAt(0);
  for(let k=-6;k<6;k++){if(!k)continue;const h=hitsAt(k);if(h>best*1.15+2){best=h;key=k;}}
  const pts=vs.map(v=>{const d=fold(v.diff-key);return {t:v.t,m:v.n.midi+d,ok:Math.abs(d)<=.9};});
  const per=new Map();
  for(const f of frames){const n=song.notes.find(n=>f.t>=n.t+.06&&f.t<n.t+n.d);if(!n)continue;const o=per.get(n)||{n,frames:0,voiced:0,hits:0,dsum:0,ds:[]};o.frames++;per.set(n,o);}
  for(const v of vs){const o=per.get(v.n),d=fold(v.diff-key);o.voiced++;o.dsum+=d;o.ds.push(d);if(Math.abs(d)<=.9)o.hits++;}
  return {acc:vs.length?best/vs.length:0,cover:inNote?vs.length/inNote:0,pts,key,per:[...per.values()]};
}
export function fakeVoice(song,sr){
  const len=Math.ceil(song.dur*sr),v=new Float32Array(len);let ph=0;
  for(const n of song.notes){
    if(Math.random()<.06)continue;
    const miss=Math.random()<.16,cents=miss?(Math.random()<.5?-1:1)*(110+Math.random()*90):(Math.random()-.5)*60;
    const st=Math.floor((n.t+.035)*sr),en=Math.min(len,Math.floor((n.t+n.d-.03)*sr)),f0=hz(n.midi+cents/100);
    for(let i=st;i<en;i++){
      const tt=(i-st)/sr,vib=tt>.25?Math.sin(2*Math.PI*5.5*tt)*.012:0;
      ph+=2*Math.PI*f0*(1+vib)/sr;
      const e=Math.min(1,tt/.04)*Math.min(1,(en-i)/sr/.05);
      v[i]+=.2*e*(Math.sin(ph)+.45*Math.sin(2*ph)+.22*Math.sin(3*ph)+.08*Math.sin(4*ph));
    }
  }
  return v;
}

/* ---------- App state ---------- */

export const PV_LEN=15,pv={on:false,song:null,nodes:null,t0:0,raf:0,tok:0,timer:0}; // song previews in the picker
export let ctx=null;export let micStream=null;export let analyser=null;export let monitor=null;S.current=null;S.tracks=null;S.run=null;S.demo=false;S.last=null;S.mix=null;
export const cache={};
export function show(id){if(id!=='pick'&&pv.on)stopPreview();document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));}
export function ensureCtx(){
  if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;ctx=new AC({latencyHint:'interactive'});}
  if(ctx.state!=='running')ctx.resume();
}
// On the speaker the mic also hears the song, so let the browser cancel the phone's own playback (like a video call).
// With headphones ("Hear yourself" on) there's nothing to cancel, so the mic stays untouched for the cleanest voice.
let micAec=null,micNodes=[];
// Let go of the mic when you're off the stage: the phone's recording light goes out, and Bluetooth
// earbuds switch back from call quality to music quality for the playback.
export function releaseMic(){
  if(!micStream)return;
  micStream.getTracks().forEach(t=>t.stop());micNodes.forEach(n=>{try{n.disconnect();}catch(e){}});micStream=null;micNodes=[];analyser=null;monitor=null;micAec=null;
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
}
// Keep the screen awake while you're on the stage; nobody touches their phone mid-song.
let wake=null;
export async function stayAwake(on){
  try{
    if(on){if(!wake&&navigator.wakeLock&&document.visibilityState==='visible'){wake=await navigator.wakeLock.request('screen');wake.addEventListener('release',()=>{wake=null;});}}
    else if(wake){const w=wake;wake=null;await w.release();}
  }catch(e){wake=null;}
}
export async function getMic(aec){
  aec=!!aec;
  if(micStream&&micAec===aec)return true;
  if(micStream){micStream.getTracks().forEach(t=>t.stop());micNodes.forEach(n=>{try{n.disconnect();}catch(e){}});micStream=null;micNodes=[];}
  try{
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)return false;
    try{if(navigator.audioSession)navigator.audioSession.type='play-and-record';}catch(e){}
    micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:aec,noiseSuppression:false,autoGainControl:false}});micAec=aec;
    const src=ctx.createMediaStreamSource(micStream);micNodes.push(src);
    analyser=ctx.createAnalyser();analyser.fftSize=2048;src.connect(analyser);
    // live monitoring chain ("Hear yourself"), silent until switched on
    const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=100;
    const cmp=ctx.createDynamicsCompressor();cmp.threshold.value=-26;cmp.ratio.value=4;
    monitor=ctx.createGain();monitor.gain.value=0;
    const rv=ctx.createConvolver();rv.buffer=impulse();const send=ctx.createGain();send.gain.value=.18;
    src.connect(hp);hp.connect(cmp);cmp.connect(monitor);monitor.connect(ctx.destination);monitor.connect(send);send.connect(rv);rv.connect(ctx.destination);
    const proc=ctx.createScriptProcessor(4096,1,1),z=ctx.createGain();z.gain.value=0;micNodes.push(proc,hp,monitor);
    src.connect(proc);proc.connect(z);z.connect(ctx.destination);
    proc.onaudioprocess=e=>{
      if(!S.run||!S.run.rec)return;
      const pt=typeof e.playbackTime==='number'&&isFinite(e.playbackTime)?e.playbackTime:ctx.currentTime;
      if(S.run.recT==null){S.run.recT=ctx.currentTime-e.inputBuffer.duration;S.run.pt0=pt;}
      const c=new Float32Array(e.inputBuffer.getChannelData(0));c.at=S.run.recT+(pt-S.run.pt0);S.run.chunks.push(c);
    };
    return true;
  }catch(err){micStream=null;return false;}
}

