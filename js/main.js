/* ---------- Songs (all public domain in the US; melodies and lyrics pre-1929) ---------- */
const SONGS=[
{id:'bday',title:'Happy Birthday',vibe:'Quick warm-up',color:'#ff5d8f',bpm:96,bpb:3,pickup:1,key:0,transpose:-5,style:'party',raw:[
 [['Hap','G4',.75],['py ','G4',.25],['birth','A4',1],['day ','G4',1],['to ','C5',1],['you,','B4',2]],
 [['hap','G4',.75],['py ','G4',.25],['birth','A4',1],['day ','G4',1],['to ','D5',1],['you,','C5',2]],
 [['hap','G4',.75],['py ','G4',.25],['birth','G5',1],['day, ','E5',1],['dear ','C5',1],['sing','B4',1],['er,','A4',1]],
 [['hap','F5',.75],['py ','F5',.25],['birth','E5',1],['day ','C5',1],['to ','D5',1],['you!','C5',3]]]},
{id:'jingle',title:'Jingle Bells',vibe:'Big singalong',color:'#3ddc97',bpm:116,bpb:4,pickup:0,key:0,transpose:2,style:'bounce',raw:[
 [['Jin','E4',1],['gle ','E4',1],['bells, ','E4',2],['jin','E4',1],['gle ','E4',1],['bells,','E4',2]],
 [['jin','E4',1],['gle ','G4',1],['all ','C4',1.5],['the ','D4',.5],['way!','E4',4]],
 [['Oh ','F4',1],['what ','F4',1],['fun ','F4',1.5],['it ','F4',.5],['is ','F4',1],['to ','E4',1],['ride ','E4',1],['in ','E4',.5],['a','E4',.5]],
 [['one-','E4',1],['horse ','D4',1],['o','D4',1],['pen ','E4',1],['sleigh, ','D4',2],['hey!','G4',2]],
 [['Jin','E4',1],['gle ','E4',1],['bells, ','E4',2],['jin','E4',1],['gle ','E4',1],['bells,','E4',2]],
 [['jin','E4',1],['gle ','G4',1],['all ','C4',1.5],['the ','D4',.5],['way!','E4',4]],
 [['Oh ','F4',1],['what ','F4',1],['fun ','F4',1.5],['it ','F4',.5],['is ','F4',1],['to ','E4',1],['ride ','E4',1],['in ','E4',.5],['a','E4',.5]],
 [['one-','G4',1],['horse ','G4',1],['o','F4',1],['pen ','D4',1],['sleigh!','C4',4]]]},
{id:'saints',title:'When the Saints',vibe:'Brass band bounce',color:'#ffb020',bpm:112,bpb:4,pickup:1.5,key:0,transpose:5,style:'brass',raw:[
 [['Oh ','C4',.5],['when ','E4',.5],['the ','F4',.5],['saints','G4',2],['',null,.5]],
 [['go ','C4',.5],['march','E4',.5],['ing ','F4',.5],['in,','G4',2],['',null,.5]],
 [['oh ','C4',.5],['when ','E4',.5],['the ','F4',.5],['saints ','G4',1],['go ','E4',1],['march','C4',1],['ing ','E4',1],['in,','D4',2],['',null,.5]],
 [['Oh ','E4',.5],['Lord, ','E4',.5],['I ','D4',.5],['want ','C4',1.5],['to ','C4',.5],['be ','E4',1],['in ','G4',.5],['that ','G4',.5],['num','G4',.5],['ber,','F4',1.5],['',null,1]],
 [['when ','E4',.5],['the ','F4',.5],['saints ','G4',1],['go ','E4',1],['march','C4',1],['ing ','D4',1],['in.','C4',2],['',null,.5]],
 [['Oh ','C4',.5],['when ','E4',.5],['the ','F4',.5],['sun','G4',2],['',null,.5]],
 [['re','C4',.5],['fuse ','E4',.5],['to ','F4',.5],['shine,','G4',2],['',null,.5]],
 [['oh ','C4',.5],['when ','E4',.5],['the ','F4',.5],['sun ','G4',1],['re','E4',1],['fuse ','C4',1],['to ','E4',1],['shine,','D4',2],['',null,.5]],
 [['Oh ','E4',.5],['Lord, ','E4',.5],['I ','D4',.5],['want ','C4',1.5],['to ','C4',.5],['be ','E4',1],['in ','G4',.5],['that ','G4',.5],['num','G4',.5],['ber,','F4',1.5],['',null,1]],
 [['when ','E4',.5],['the ','F4',.5],['sun ','G4',1],['re','E4',1],['fuse ','C4',1],['to ','D4',1],['shine.','C4',3]]]},
{id:'grace',title:'Amazing Grace',vibe:'Slow and soulful',color:'#9b8aff',bpm:76,bpb:3,pickup:1,key:7,transpose:0,style:'ballad',raw:[
 [['A','D4',1],['ma','G4',2],['zing ','B4',.5],['~','G4',.5],['grace, ','B4',2],['how ','A4',1],['sweet ','G4',2],['the ','E4',1],['sound','D4',2]],
 [['that ','D4',1],['saved ','G4',2],['a ','B4',.5],['~','G4',.5],['wretch ','B4',2],['like ','A4',1],['me.','D5',5]],
 [['I ','B4',1],['once ','D5',2],['was ','B4',.5],['~','D5',.5],['lost, ','B4',2],['but ','A4',1],['now ','G4',2],['am ','E4',1],['found,','D4',2]],
 [['was ','D4',1],['blind, ','G4',2],['but ','B4',.5],['~','G4',.5],['now ','B4',2],['I ','A4',1],['see.','G4',3]]]},
{id:'daisy',title:'Daisy Bell',vibe:'Old-school waltz',color:'#4cc9f0',bpm:168,bpb:3,pickup:0,key:0,transpose:-3,style:'waltz',raw:[
 [['Dai','G5',3],['sy, ','E5',3],['Dai','C5',3],['sy,','G4',3]],
 [['give ','A4',1],['me ','B4',1],['your ','C5',1],['an','A4',2],['swer, ','C5',1],['do!','G4',6]],
 [['I’m ','D5',3],['half ','G5',3],['cra','E5',3],['zy','C5',3]],
 [['all ','A4',1],['for ','B4',1],['the ','C5',1],['love ','D5',2],['of ','E5',1],['you!','D5',6]],
 [['It ','E5',1],['won’t ','F5',1],['be ','E5',1],['a ','D5',2],['sty','G5',1],['lish ','E5',2],['mar','D5',1],['riage,','C5',3]],
 [['I ','D5',2],['can’t ','E5',1],['af','C5',2],['ford ','A4',1],['a ','C5',2],['car','A4',1],['riage,','G4',3]],
 [['but ','G4',1],['you’ll ','C5',2],['look ','E5',1],['sweet ','D5',2],['up','G4',1],['on ','C5',2],['the ','E5',1],['seat','D5',2]],
 [['of ','D5',1],['a ','E5',1],['bi','F5',1],['cy','G5',2],['cle ','E5',1],['built ','C5',2],['for ','D5',1],['two!','C5',6]]]}
];

/* ---------- Music helpers ---------- */
const PC={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const toMidi=s=>{const r=/^([A-G])(#|b)?(\d)$/.exec(s);return 12*(+r[3]+1)+PC[r[1]]+(r[2]==='#'?1:r[2]==='b'?-1:0);};
const hz=m=>440*Math.pow(2,(m-69)/12);
const CH={I:[0,4,7],ii:[2,5,9],IV:[5,9,0],V:[7,11,2],vi:[9,0,4]};
const PRIOR={I:.3,IV:.15,V:.18,vi:0,ii:-.05};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function prep(song){
  const spb=60/song.bpm,bar=song.bpb*spb;
  song.spb=spb;song.bar=bar;song.down=2*bar;song.lead=song.down-song.pickup*spb;
  let beat=0;song.notes=[];
  song.lines=song.raw.map(raw=>{
    const line={syl:[]};
    for(const [t,n,b] of raw){
      const st=song.lead+beat*spb,du=b*spb;
      if(n){song.notes.push({t:st,d:du,midi:toMidi(n)+song.transpose,beat,b,syl:t==='~'?'':t.trim().replace(/[,.!?]+$/,'')});}
      if(t==='~'){const s=line.syl[line.syl.length-1];if(s)s.end=st+du;}
      else if(t){line.syl.push({text:t,start:st,end:st+du});}
      beat+=b;
    }
    line.start=line.syl[0].start;line.end=line.syl[line.syl.length-1].end;
    line.text=line.syl.map(s=>s.text).join('');
    return line;
  });
  song.beats=beat;
  const last=song.notes[song.notes.length-1];song.lastEnd=last.t+last.d;
  song.dur=song.lastEnd+bar*1.5+.5;song.firstT=song.notes[0].t;song.endT=song.lastEnd+.7;
  song.tonic=((song.key+song.transpose)%12+12)%12;
  song.minM=Math.min(...song.notes.map(n=>n.midi));song.maxM=Math.max(...song.notes.map(n=>n.midi));
  harmonize(song);
}
function harmonize(song){
  const out=[];let prev='I';const nb=Math.ceil((song.beats-song.pickup)/song.bpb-1e-6);
  for(let k=0;k<nb;k++){
    const b0=song.pickup+k*song.bpb,b1=b0+song.bpb;let best='I',bs=-1e9;
    for(const c in CH){
      let s=PRIOR[c]+(c===prev?.2:0);
      for(const n of song.notes){
        const ov=Math.min(n.beat+n.b,b1)-Math.max(n.beat,b0);if(ov<=0)continue;
        const pc=((n.midi-song.transpose-song.key)%12+12)%12;
        const strong=Math.abs(n.beat-b0)<1e-6?1.6:1;
        s+=(CH[c].includes(pc)?1:-.7)*ov*strong;
      }
      if(s>bs){bs=s;best=c;}
    }
    if(k===0||k===nb-1)best='I';
    out.push(best);prev=best;
  }
  song.chords=out;
}
SONGS.forEach(prep);

/* ---------- Offline rendering of backing + guide tracks ---------- */
async function renderTracks(song){
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
function detectPitch(buf,sr,hop,gateFrac,thr){
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
const fold=d=>((d+6)%12+12)%12-6;
function scoreIt(song,frames){
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
function fakeVoice(song,sr){
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
const $=id=>document.getElementById(id);
const PV_LEN=15,pv={on:false,song:null,nodes:null,t0:0,raf:0,tok:0,timer:0}; // song previews in the picker
let ctx=null,micStream=null,analyser=null,monitor=null,current=null,tracks=null,run=null,demo=false,last=null,mix=null;
const cache={};
function show(id){if(id!=='pick'&&pv.on)stopPreview();document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));}
function ensureCtx(){
  if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;ctx=new AC({latencyHint:'interactive'});}
  if(ctx.state!=='running')ctx.resume();
}
// On the speaker the mic also hears the song, so let the browser cancel the phone's own playback (like a video call).
// With headphones ("Hear yourself" on) there's nothing to cancel, so the mic stays untouched for the cleanest voice.
let micAec=null,micNodes=[];
// Let go of the mic when you're off the stage: the phone's recording light goes out, and Bluetooth
// earbuds switch back from call quality to music quality for the playback.
function releaseMic(){
  if(!micStream)return;
  micStream.getTracks().forEach(t=>t.stop());micNodes.forEach(n=>{try{n.disconnect();}catch(e){}});micStream=null;micNodes=[];analyser=null;monitor=null;micAec=null;
  try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
}
// Keep the screen awake while you're on the stage; nobody touches their phone mid-song.
let wake=null;
async function stayAwake(on){
  try{
    if(on){if(!wake&&navigator.wakeLock&&document.visibilityState==='visible'){wake=await navigator.wakeLock.request('screen');wake.addEventListener('release',()=>{wake=null;});}}
    else if(wake){const w=wake;wake=null;await w.release();}
  }catch(e){wake=null;}
}
async function getMic(aec){
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
      if(!run||!run.rec)return;
      const pt=typeof e.playbackTime==='number'&&isFinite(e.playbackTime)?e.playbackTime:ctx.currentTime;
      if(run.recT==null){run.recT=ctx.currentTime-e.inputBuffer.duration;run.pt0=pt;}
      const c=new Float32Array(e.inputBuffer.getChannelData(0));c.at=run.recT+(pt-run.pt0);run.chunks.push(c);
    };
    return true;
  }catch(err){micStream=null;return false;}
}

/* ---------- Belters: the singer avatars. Rounded shapes, genres, always on light paper ---------- */
const INK='#1d1631';
const GENRES={
  classic:{name:'Classic Belter',c:'#ffbf47',jk:'#3ddc97',hair:'fan',outfit:'v'},
  rocker:{name:'Rocker',c:'#a594ff',jk:'#1d1631',hair:'spikes',eyes:'shades',outfit:'leather'},
  jazz:{name:'Jazz',c:'#6fd3f2',jk:'#1d1631',hat:'fedora',outfit:'turtle'},
  pop:{name:'Pop',c:'#ff9cbb',jk:'#9b8aff',hair:'pony',mic:'headset',outfit:'sparkle'},
  country:{name:'Country',c:'#ffc85c',jk:'#3a7bd5',hat:'cowboy',outfit:'bandana'},
  soul:{name:'Soul',c:'#5fdcab',jk:'#ff5d8f',hair:'afro',outfit:'chain'}
};
let UID=0;
function buildBelter(svg){
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
function poseBelter(b,loud,lift,t){
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
const pref=(k,d)=>{try{const v=localStorage.getItem('belt.'+k);return v==null?d:v;}catch(e){return d;}};
const setPref=(k,v)=>{try{localStorage.setItem('belt.'+k,v);}catch(e){}};
const myGenre=()=>GENRES[pref('genre','classic')]?pref('genre','classic'):'classic';
function paintMe(){document.querySelectorAll('svg.belter[data-me]').forEach(s=>{s.dataset.genre=myGenre();buildBelter(s);});}
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
const fmtLen=s=>{const r=Math.max(0,Math.round(s));return `${Math.floor(r/60)}:${String(r%60).padStart(2,'0')}`;};
const AUTH={bday:'Traditional',jingle:'James Lord Pierpont',saints:'Traditional',grace:'John Newton',daisy:'Harry Dacre'};
const GENRE={bday:'Party',jingle:'Holiday',saints:'Party',grace:'Ballads',daisy:'Classics'};
// Licensed-catalog previews: titles only, to show how a full catalog feels. Not playable until licensed.
const HITS=[['Espresso','Sabrina Carpenter'],['APT.','ROSÉ & Bruno Mars'],['Birds of a Feather','Billie Eilish'],['Good Luck, Babe!','Chappell Roan'],['Die With a Smile','Lady Gaga & Bruno Mars'],['Flowers','Miley Cyrus'],['As It Was','Harry Styles'],['drivers license','Olivia Rodrigo'],['Anti-Hero','Taylor Swift'],['Levitating','Dua Lipa'],['Blinding Lights','The Weeknd'],['Mr. Brightside','The Killers'],['Rolling in the Deep','Adele'],['Bohemian Rhapsody','Queen'],["Don’t Stop Believin’",'Journey']];
const PAL=['#ff7a59','#f7a8ff','#4cc9f0','#ffd23f','#9b8aff','#3ddc97','#ff5d8f','#7ee0ff'];
const CATALOG=[];
{let h=0,p=0;const order='hhshshhshhshshhshhs';
 for(const c of order){if(c==='s'&&p<SONGS.length){const s=SONGS[p++];CATALOG.push({title:s.title,artist:AUTH[s.id],color:s.color,song:s});}
  else if(h<HITS.length){const [t,a]=HITS[h];CATALOG.push({title:t,artist:a,color:PAL[h%PAL.length],song:null});h++;}}
 while(h<HITS.length){const [t,a]=HITS[h];CATALOG.push({title:t,artist:a,color:PAL[h%PAL.length],song:null});h++;}
 while(p<SONGS.length){const s=SONGS[p++];CATALOG.push({title:s.title,artist:AUTH[s.id],color:s.color,song:s});}}
const LOCK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-7-2a2 2 0 1 1 4 0v2h-4V7z"/></svg>';
const wheel=$('wheel'),drum=$('drum'),IH=84;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let focusIdx=-1,wheelRaf=0,VIEW=[],rows=[],filter='ready';
const lenOf=s=>s.own?s.len:s.lastEnd-s.lead;
const genreOf=c=>c.song?(c.song.own?'Yours':GENRE[c.song.id]):null;
const levelOf=s=>{const r=(s.maxM||0)-(s.minM||0);return r<=7?1:r<=9?2:r<=12?3:r<=15?4:5;};
const LEVELS=['Easy','Easy','Medium','Stretchy','Big range'];
const bests=()=>{try{return JSON.parse(pref('best','{}'))||{};}catch(e){return {};}};
function rememberTake(song,sc){
  if(sc.cover<.3)return;const b=bests(),v=Math.round(sc.acc*100);if(!(b[song.id]>=v)){b[song.id]=v;setPref('best',JSON.stringify(b));}
  const ok=sc.pts.filter(p=>p.ok).map(p=>p.m+(sc.key||0)).sort((a,b)=>a-b);
  if(ok.length>8){const hi=ok[Math.floor(ok.length*.97)];if(hi>+pref('top','0'))setPref('top',String(Math.round(hi)));}
}
function chipList(){const own=CATALOG.some(c=>c.song&&c.song.own);
  return [['ready',`Ready to sing (${CATALOG.filter(c=>c.song).length})`],['all',`All ${CATALOG.length}`],...(own?[['Yours','Your songs']]:[]),['Party','Party'],['Holiday','Holiday'],['Ballads','Ballads'],['Classics','Classics']];}
function renderChips(){$('chips').innerHTML=chipList().map(([f,l])=>`<button data-f="${esc(f)}" aria-pressed="${f===filter}">${esc(l)}</button>`).join('');}
function updateCounts(){renderChips();}
let qT=0;
$('q').oninput=()=>{clearTimeout(qT);qT=setTimeout(()=>{query=nq($('q').value);$('qClear').hidden=!query;renderWheel(VIEW[focusIdx]);},90);};
$('q').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('q').blur();}if(e.key==='Escape'){$('q').value='';$('q').oninput();}};
$('qClear').onclick=()=>{$('q').value='';query='';$('qClear').hidden=true;renderWheel(VIEW[focusIdx]);$('q').focus();};
$('chips').onclick=e=>{const b=e.target.closest('button');if(!b||b.dataset.f===filter)return;const keep=VIEW[focusIdx];filter=b.dataset.f;renderChips();renderWheel(keep);};
function metaOf(c){
  if(!c.song)return LOCK+esc(c.artist);
  const s=c.song;return esc(s.own?(s.artist||'Your song'):GENRE[s.id])+' · '+fmtLen(lenOf(s));
}
// Search that forgives: partial words, small typos, artists, genres, even a line of the lyrics.
const nq=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/&/g,' and ').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
function near(a,b){ // edit distance within a small limit
  const k=b.length>=7?2:1;if(Math.abs(a.length-b.length)>k)return false;
  let pp=null,prev=Array.from({length:b.length+1},(_,j)=>j); // swapped letters count as one slip
  for(let i=1;i<=a.length;i++){const cur=[i];let mn=i;for(let j=1;j<=b.length;j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]===b[j-1]?0:1));
    if(pp&&i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])cur[j]=Math.min(cur[j],pp[j-2]+1);mn=Math.min(mn,cur[j]);}if(mn>k)return false;pp=prev;prev=cur;}
  return prev[b.length]<=k;
}
const hay=new Map();
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
function renderWheel(keep){
  const base=filter==='ready'?CATALOG.filter(c=>c.song):filter==='all'?CATALOG:CATALOG.filter(c=>genreOf(c)===filter);
  if(query){VIEW=base.map(c=>[c,matchScore(c,query)]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);}
  else{VIEW=base;if(!VIEW.length){filter='ready';renderChips();VIEW=CATALOG.filter(c=>c.song);}}
  if(!VIEW.length){
    drum.innerHTML=`<p class="none">No songs match “${esc($('q').value.trim())}”<small>${filter==='all'?'Try fewer letters, or another word from the title, artist or lyrics.':'Try All, or fewer letters.'}</small></p>`;
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
function stopPreview(){silencePreview();pv.on=false;const d=$('preview');d.classList.remove('on');d.setAttribute('aria-pressed','false');previewIcon(false);paintPreview(VIEW[focusIdx]);}
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
function openPicker(keep){ensureCtx();show('pick');renderChips();if(focusIdx<0||keep)renderWheel(keep||CATALOG.find(c=>c.song&&c.song.own)||CATALOG.find(c=>c.song&&c.song.id==='jingle'));else paintWheel();}
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
let challenge=null;
function tonightSong(){if(challenge)return challenge.song;const o=CATALOG.find(c=>c.song&&c.song.own);return o?o.song:SONG_BY_ID.jingle;}
function paintTonight(){const s=tonightSong();$('tonightTitle').textContent=s.title;$('tonightDot').style.setProperty('--c',s.color);
  $('tonightLabel').textContent=challenge?`${challenge.by} scored ${challenge.score}%. Beat it?`:'Tonight’s pick';}
$('tonight').onclick=e=>{const s=tonightSong();wash(e.currentTarget,()=>openPicker(CATALOG.find(c=>c.song===s)));setTimeout(()=>openSheet(s),reduceMotion?0:420);};
$('homeMe').onclick=()=>openMine();
$('homeSignIn').onclick=()=>authFor('hello');
function paintAuth(){const inn=!!user;$('homeMe').hidden=!inn;$('homeSignIn').hidden=inn||!sb;}

/* ---------- Before you sing ---------- */
let lyricStyle=pref('lyric','fill');if(!['fill','sweep','glow','bounce'].includes(lyricStyle))lyricStyle='fill';
function paintStyles(){document.querySelectorAll('.sty').forEach(b=>b.setAttribute('aria-pressed',b.dataset.sty===lyricStyle));}
$('styles').onclick=e=>{const b=e.target.closest('.sty');if(!b)return;lyricStyle=b.dataset.sty;setPref('lyric',lyricStyle);paintStyles();};
for(const [id,d] of [['monitor','0'],['bold','0']]){const el=$(id);el.checked=pref(id,d)==='1';el.onchange=()=>setPref(id,el.checked?'1':'0');}
// the guide is its own choice per kind of song: on for the built-in tunes, off for your songs (it's the real singer)
const guideKey=()=>current&&current.own?'guideOwn':'guide';
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
async function openSheet(song){
  ensureCtx();current=song;
  document.documentElement.style.setProperty('--song',song.color);
  $('sheetTitle').textContent=song.title;
  $('sheetFirst').textContent=(song.own?[song.artist,song.year,fmtLen(lenOf(song))]:[AUTH[song.id],GENRE[song.id],fmtLen(lenOf(song))]).filter(Boolean).join(' · ');
  const own=!!song.own,mel=song.notes.length>0;
  $('guideRow').hidden=own&&!mel;$('ownRemove').hidden=!own;
  $('guideText').innerHTML=own?'Guide vocal<small>Plays the original singer quietly under you</small>':'Guide melody<small>Plays the tune softly</small>';
  $('guide').checked=pref(guideKey(),own?'0':'1')==='1';
  $('scrim').classList.add('on');$('sheet').classList.add('on');requestAnimationFrame(previewStyles);
  const st=$('start');st.disabled=true;st.textContent=own?'Loading your song':'Tuning up';
  try{tracks=await tracksFor(song);}
  catch(e){delete cache[song.id];if(current===song)st.textContent='Couldn’t open this song';return;}
  if(own&&mel&&tracks.guide&&song.mv<MELODY_V){ // songs set up before the melody reader improved: re-read from the saved vocal
    st.textContent='Reading the melody again';
    const notes=await extractMelody(tracks.guide,song.an.tau);
    if(notes.length>=20){song.notes=song.rawNotes=notes;song.mv=MELODY_V;setRange(song);buildOwnLines(song);saveOwnPatch(song.id,{notes,mv:MELODY_V});}
  }
  if(current===song){st.disabled=false;st.textContent=own&&!mel?'Add the vocal track':'Take the stage';}
}
function closeSheet(){$('sheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');}
const tracksFor=s=>cache[s.id]||(cache[s.id]=s.own?loadOwnTracks(s):renderTracks(s));
const inKeyMode=s=>!!s.own&&!s.notes.length;
const scoreTake=(s,v,sr,until)=>{let f=detectPitch(v,sr,s.own?512:256);if(until!=null)f=f.filter(x=>x.t<=until);return inKeyMode(s)?scoreOwn(s,f):scoreIt(s,f);};
$('scrim').onclick=()=>{closeSheet();};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('sheet').classList.contains('on'))closeSheet();});
$('start').onclick=async()=>{if(current&&current.own&&!current.notes.length){pickVocal(current);return;}ensureCtx();const ok=await getMic(!$('monitor').checked);demo=!ok;closeSheet();readySong();};

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
async function findScene(song){
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
  if(song&&!known)findScene(song).then(sc=>{if(current===song&&sg.classList.contains('video'))set(sc);});
  const p=v.play();if(p&&p.catch)p.catch(()=>sg.classList.remove('video'));
}
function readySong(){
  stopMix();run=null;
  const song=current,sg=$('sing');backdrop(videoOn(),song);sg.classList.toggle('demo',!!demo);$('skipIntro').hidden=true;
  $('singTitle').textContent=song.title;
  $('micLabel').textContent=demo?'The mic is off, so you’ll hear a pretend singer':'';
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
  const song=current;
  if(!stageOut){stageOut=ctx.createGain();stageOut.connect(ctx.destination);}stageOut.gain.value=stageVol();
  const mk=(buf,gain)=>{const s=ctx.createBufferSource();s.buffer=buf;const g=ctx.createGain();g.gain.value=gain;s.connect(g);g.connect(stageOut);return {s,g};};
  const back=mk(tracks.back,1),gd=tracks.guide?mk(tracks.guide,$('guide').checked?(song.own?.22:.6):0):null;
  // every song gets the same lead-in: at least four seconds of dashes before the first word
  const startAt=ctx.currentTime+.3+Math.max(0,4-song.firstT);back.s.start(startAt);if(gd)gd.s.start(startAt);
  const hear=!demo&&monitor&&$('monitor').checked;
  if(monitor)monitor.gain.setTargetAtTime(hear?.9:0,ctx.currentTime,.05);
  if(!demo)$('micLabel').textContent=hear?'You can hear yourself':'';
  const tr=micStream&&micStream.getAudioTracks()[0],ts=tr&&tr.getSettings?tr.getSettings():{};
  run={song,startAt,back,gd,chunks:[],recT:null,inLat:typeof ts.latency==='number'&&ts.latency<.5?ts.latency:0,rec:!demo,idx:-1,spans:[],trail:[],abuf:new Float32Array(2048),lastM:null,sm:null,diffs:[],key:0,center:null,lastF:performance.now(),bg:null,
    fake:inKeyMode(song)&&demo?fakePlan(song):null,dashes:[...$('breath').children],rlo:null,rhi:null,ns:new Map(),ni:0,pop:null,lvl:0,sung:[],range:'',bold:$('bold').checked,loud:[]};
  requestAnimationFrame(loop);
}
function keyNote(k){
  if(demo)return;
  $('micLabel').textContent=k?`Matched to your key (${Math.abs(k)} ${Math.abs(k)===1?'step':'steps'} ${k>0?'higher':'lower'})`:'Singing in the song’s key';
}
const noteAt=(song,t)=>song.notes.find(n=>t>=n.t&&t<n.t+n.d)||null;
function livePitch(buf,sr){
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
    if(run.rlo==null){const ms=song.notes.map(n=>n.midi).sort((a,b)=>a-b);let a=ms[Math.floor(ms.length*.02)]??song.minM,b=ms[Math.ceil(ms.length*.98)-1]??song.maxM;
      if(b-a<9){const c=(a+b)/2;a=c-4.5;b=c+4.5;}run.rlo=a;run.rhi=b;}
    lo=run.rlo-1.5;hi=run.rhi+1.5;
  }
  const Y=m=>padT+(1-(m-lo)/(hi-lo))*(h-padT-padB);
  for(let k=0;k<=4;k++){const y=padT+k/4*(h-padT-padB);g.fillStyle='rgba(29,22,49,.08)';g.fillRect(left,y-.5,w-left-8,1);}
  g.fillStyle='rgba(29,22,49,.55)';g.font=F(700,10);g.textBaseline='middle';g.fillText('High',10,padT);g.fillText('Low',10,h-padB);
  g.save();g.beginPath();g.rect(left,0,w-left,h);g.clip();
  const rnd=(x,y,wd,ht)=>{g.beginPath();if(g.roundRect)g.roundRect(x,y,wd,ht,Math.min(rr,wd/2));else g.rect(x,y,wd,ht);};
  for(const n of song.notes){
    const x0=X(n.t)+1.5,x1=Math.max(x0+3,X(n.t+n.d)-1.5);if(x1<left||x0>w)continue;const y=Y(Math.max(lo+.6,Math.min(hi-.6,n.midi)))-rr;
    const past=x1<=nowX,active=x0<=nowX&&x1>nowX;
    if(past){const st=run.ns.get(n),hit=st&&st.v>=2&&st.h/st.v>=.5;g.fillStyle=hit?'rgba(29,22,49,.8)':'rgba(29,22,49,.2)';rnd(x0,y,x1-x0,bh);g.fill();}
    else{
      g.fillStyle='rgba(29,22,49,.08)';g.strokeStyle='rgba(29,22,49,.3)';g.lineWidth=.9;rnd(x0,y,x1-x0,bh);g.fill();g.stroke();
      if(active){g.save();rnd(x0,y,x1-x0,bh);g.clip();g.fillStyle=INK;g.fillRect(x0,y,nowX-x0,bh);g.restore();}
    }
    if(n.syl&&x1-x0>4){g.fillStyle=active?INK:'rgba(29,22,49,.55)';g.font=F(active?800:600,10.5);g.textBaseline='top';g.fillText(n.syl,x0+1,y+bh+4);}
  }
  // your voice: one smooth line that fades out behind you. The wobble of a real voice is averaged away for the drawing only.
  const segs=[];{let cur=null,prev=null;
    for(const p of run.trail){
      if(p.m==null||(prev&&(p.t-prev.t>.12||Math.abs(p.m-prev.m)>3))){cur=null;}
      if(p.m==null){prev=null;continue;}
      if(!cur){cur=[];segs.push(cur);}cur.push([X(p.t),Y(Math.max(lo,Math.min(hi,p.m)))]);prev=p;
    }}
  let tipY=null;
  for(const sg of segs){
    for(let pass=0;pass<2;pass++){const ys=sg.map(q=>q[1]);for(let i=0;i<sg.length;i++){const r=Math.min(5,i,sg.length-1-i);let sum=0;for(let k=i-r;k<=i+r;k++)sum+=ys[k];sg[i][1]=sum/(2*r+1);}}
  }
  if(segs.length){const e=segs[segs.length-1],lastP=run.trail[run.trail.length-1];if(lastP&&lastP.m!=null){ // ease the last stretch onto the live dot
    tipY=e[e.length-1][1];}}
  const fade=g.createLinearGradient(X(t-1.5),0,nowX,0);fade.addColorStop(0,'rgba(29,22,49,0)');fade.addColorStop(.45,'rgba(29,22,49,.55)');fade.addColorStop(1,'rgba(29,22,49,1)');
  g.strokeStyle=fade;g.lineWidth=3;g.lineCap='round';g.lineJoin='round';g.beginPath();
  for(const sg of segs){if(sg.length<2)continue;g.moveTo(sg[0][0],sg[0][1]);for(let i=1;i<sg.length-1;i++){const mx=(sg[i][0]+sg[i+1][0])/2,my=(sg[i][1]+sg[i+1][1])/2;g.quadraticCurveTo(sg[i][0],sg[i][1],mx,my);}const e=sg[sg.length-1];g.lineTo(e[0],e[1]);}
  g.stroke();g.restore();
  // now line with a small cap
  g.fillStyle='rgba(29,22,49,.7)';g.fillRect(nowX-.5,padT-6,1,h-padT-padB+12);
  g.beginPath();g.moveTo(nowX-4,padT-8);g.lineTo(nowX+4,padT-8);g.lineTo(nowX,padT-3);g.fill();
  // where you are: a flat ring
  const last=run.trail[run.trail.length-1];
  if(last&&last.m!=null){const yRaw=Y(Math.max(lo,Math.min(hi,last.m)));run.dotY=run.dotY==null||Math.abs(yRaw-run.dotY)>40?yRaw:run.dotY+(yRaw-run.dotY)*.35;
    const y=run.dotY,r=6+Math.min(3,lvl*30);if(tipY!=null){g.strokeStyle=INK;g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(nowX-1,tipY);g.lineTo(nowX,y);g.stroke();}g.fillStyle='#fbf9ff';g.beginPath();g.arc(nowX,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=1.6;g.stroke();}
  else{run.dotY=null;const y=Y(Math.max(lo,Math.min(hi,run.lastM??(lo+hi)/2)));g.strokeStyle='rgba(29,22,49,.35)';g.lineWidth=1.6;g.beginPath();g.arc(nowX,y,6,0,7);g.stroke();}
  if(run.range){g.fillStyle='rgba(29,22,49,.55)';g.font=F(700,10);g.textBaseline='alphabetic';g.fillText(run.range,w-g.measureText(run.range).width-12,h-8);}
  // grade chip: dark plate, own color and own shape (star, double tick, tick)
  if(run.pop){const age=(performance.now()-run.pop.t0)/900;if(age>1)run.pop=null;else{
    const [txt,col]=GR[run.pop.g];g.font=F(800,12.5);g.textBaseline='middle';
    const tw=g.measureText(txt).width,ic=12,pw=tw+ic+22,ph=24,px=w-pw-12,py=18-age*3,sc=age<.12?.86+age*1.2:1;
    g.save();g.globalAlpha=Math.min(1,(1-age)*1.7);g.translate(px+pw/2,py);g.scale(sc,sc);g.translate(-(px+pw/2),-py);
    g.shadowColor='rgba(15,10,30,.35)';g.shadowBlur=10;g.shadowOffsetY=3;g.fillStyle=INK;g.beginPath();if(g.roundRect)g.roundRect(px,py-ph/2,pw,ph,ph/2);else g.rect(px,py-ph/2,pw,ph);g.fill();g.shadowColor='transparent';
    const cx=px+9+ic/2;g.fillStyle=col;g.strokeStyle=col;g.lineWidth=2;g.lineCap='round';g.lineJoin='round';
    if(run.pop.g===0){g.beginPath();for(let k=0;k<10;k++){const r=k%2?ic*.22:ic*.52,a2=-Math.PI/2+k*Math.PI/5;g.lineTo(cx+r*Math.cos(a2),py+r*Math.sin(a2));}g.closePath();g.fill();}
    else{const tick=ox=>{g.beginPath();g.moveTo(cx+ox-ic*.38,py+ic*.02);g.lineTo(cx+ox-ic*.1,py+ic*.3);g.lineTo(cx+ox+ic*.38,py-ic*.32);g.stroke();};if(run.pop.g===1){tick(-ic*.18);tick(ic*.22);}else tick(0);}
    g.fillStyle=col;g.fillText(txt,px+ic+15,py+.5);g.restore();}}
}
const micBuf=new Float32Array(1024),MIC_COLS=['#ff5d8f','#3ddc97','#ffb020','#9b8aff','#4cc9f0'];let micLv=0;
function paintMicMeter(){
  if(!analyser||demo)return;
  analyser.getFloatTimeDomainData(micBuf);let e=0;for(let i=0;i<micBuf.length;i++)e+=micBuf[i]*micBuf[i];
  const db=20*Math.log10(Math.sqrt(e/micBuf.length)+1e-6),v=Math.max(0,Math.min(1,(db+58)/40));micLv=v>micLv?v:micLv*.9+v*.1;
  const bars=$('micMeter').children;
  for(let k=0;k<5;k++){const on=micLv>k*.2+.04,h=on?Math.min(1,.35+(micLv-k*.2)*3.2):.25;bars[k].style.transform=`scaleY(${h.toFixed(2)})`;bars[k].style.opacity=on?1:.22;bars[k].style.background=on?MIC_COLS[k]:'';}
}
// Skip a long intro: jump to a few seconds before the first words. Your recording starts from there.
$('skipIntro').onclick=()=>{
  if(!run||ctx.state!=='running')return;const song=run.song,to=song.lines[0].start-4,t=songTime();if(to<=t+1)return;
  const now=ctx.currentTime,at=now+.06;
  for(const x of [run.back,run.gd].filter(Boolean)){try{x.s.stop(now+.05);}catch(e){}const n=ctx.createBufferSource();n.buffer=x.s.buffer;n.connect(x.g);n.start(at,Math.max(0,to));x.s=n;}
  run.startAt=at-to;run.chunks=[];run.recT=null;run.pt0=null;run.trail=[];$('skipIntro').hidden=true;
};
function songTime(){return ctx.currentTime-(ctx.outputLatency||0)-run.startAt;}
function setLines(song,idx){
  const ls=song.lines,txt=k=>ls[k]?ls[k].text:'';
  $('lnN1').textContent=txt(idx+1);$('lnN2').textContent=txt(idx+2);$('lnN3').textContent=txt(idx+3);$('lnN4').textContent=txt(idx+4);
  const now=$('lineNow'),L=ls[idx];
  now.innerHTML=L.syl.map(s=>{const m=/^([\s\S]*?)(\s*)$/.exec(s.text);return `<span class="w">${esc(m[1])}</span>${m[2]?' ':''}`;}).join('');
  now.classList.remove('in');void now.offsetWidth;now.classList.add('in');
  run.spans=[...now.querySelectorAll('.w')];run.loud=run.spans.map(()=>null);
}
function loop(){
  if(!run)return;
  const song=run.song,t=songTime();
  // lyrics: two lines behind, the one you're on, four ahead
  let idx=0;for(let i=0;i<song.lines.length;i++)if(song.lines[i].start-.35<=t)idx=i;
  // own songs have gaps between lines: once a line is done, show the next one waiting
  {const L=song.lines[idx],N=song.lines[idx+1];if(song.own&&N&&t>L.end+.3&&N.start-L.end>=4)idx++;}
  if(idx!==run.idx){run.idx=idx;setLines(song,idx);}
  const L=song.lines[run.idx],fill=lyricStyle==='fill';
  L.syl.forEach((s,i)=>{const p=Math.max(0,Math.min(1,(t-s.start)/Math.max(.08,s.end-s.start))),sp=run.spans[i];if(!sp)return;
    if(fill)sp.style.setProperty('--p',(p*100).toFixed(1)+'%');
    sp.classList.toggle('lit',p>0);sp.classList.toggle('now',p>0&&p<1);
    if(run.bold&&p>0&&run.loud[i]==null){run.loud[i]=Math.min(1,run.lvl*14);sp.style.fontVariationSettings=`"wght" ${Math.round(480+run.loud[i]*420)}, "opsz" 96`;}});
  // breaks: four dashes above the lyrics run down over the last four seconds
  {let on=false;const i=song.lines.findIndex(L=>L.start>t);
   if(i>=0){const nx=song.lines[i],prevEnd=i?song.lines[i-1].end:-1e9,to=nx.start-t;
     if(nx.start-prevEnd>=4&&t>prevEnd+.3){on=true;run.dashes.forEach((d,j)=>d.style.setProperty('--d',Math.max(0,Math.min(1,to-(3-j))).toFixed(3)));}}
   $('breath').classList.toggle('on',on);}
  $('prog').style.width=Math.max(0,Math.min(100,(t-song.lead)/(song.lastEnd-song.lead)*100))+'%';
  $('left').textContent=fmtLen(song.lastEnd-Math.max(0,t))+' left';
  paintMicMeter();
  {const first=song.lines[0],long=first&&first.start-t>9&&t>-1;if($('skipIntro').hidden===long)$('skipIntro').hidden=!long;}
  // live pitch
  if(inKeyMode(song)){ownLive(song,t);if(t>song.endT){finish();return;}requestAnimationFrame(loop);return;}
  if(song.own)paintMood(song,t);
  let pm=null,lvl=0;const cur=noteAt(song,t);
  if(analyser&&!demo){
    const a=run.abuf;analyser.getFloatTimeDomainData(a);let e=0;for(let i=0;i<a.length;i++)e+=a[i]*a[i];lvl=Math.sqrt(e/a.length);
    if(lvl>.008)pm=livePitch(a,ctx.sampleRate);
  }else if(cur&&t>cur.t+.05&&t<cur.t+cur.d-.04){
    pm=cur.midi+Math.sin(t*6.5)*.3+(Math.sin(t*.9+1)>.93?1.5:0);lvl=.05;
  }
  run.lvl=lvl;
  // only listen around the words: intros, solos and the song leaking from a speaker don't count
  {const L=song.lines[run.idx],N=song.lines[run.idx+1];const near=L&&t>=L.start-1&&t<=L.end+1||N&&t>=N.start-1;if(!near){pm=null;lvl=0;}}
  if(pm!=null){
    run.sm=run.sm==null||Math.abs(pm-run.sm)>1.5?pm:run.sm+(pm-run.sm)*.5;
    let mm=run.sm,ok=null;
    if(cur){
      const raw=fold(mm-cur.midi);
      // learn the singer's key from the last ~2 seconds of sung notes
      run.diffs.push(Math.round(raw));if(run.diffs.length>60)run.diffs.shift();
      if(run.diffs.length>=24){
        const cnt={};let bk=run.key,bc=0;for(const d of run.diffs){cnt[d]=(cnt[d]||0)+1;}
        for(const k in cnt)if(cnt[k]>bc){bc=cnt[k];bk=+k;}
        if(bk!==run.key&&bc>=run.diffs.length*.5){run.key=bk;keyNote(bk);}
      }
      const d=fold(raw-run.key);mm=cur.midi+d;ok=Math.abs(d)<=.9;
      const st=run.ns.get(cur)||{v:0,h:0};st.v++;if(ok)st.h++;run.ns.set(cur,st);
      run.sung.push(run.sm-12*Math.round((run.key||0)/12)); // real singing on a note: this is what the range comes from
      if(run.sung.length%30===0&&run.sung.length>=90){const q=run.sung.slice(-400).sort((a,b)=>a-b),md=q[q.length>>1];run.range=RANGES.find(r=>md<r[0])[1]+' range';}
    }
    else{const ref=run.lastM??(song.minM+song.maxM)/2;while(mm-ref>6)mm-=12;while(ref-mm>6)mm+=12;}
    // what you see is calmer than what's scored: vibrato is averaged out, and a voice that's close to the note sits near it
    const now=performance.now(),dt=Math.min(.1,(now-(run.dispT||now))/1000);run.dispT=now;
    if(run.disp==null||Math.abs(mm-run.disp)>2.5)run.disp=mm;else run.disp+=(mm-run.disp)*(1-Math.exp(-dt/.13));
    let shown=run.disp;if(cur&&Math.abs(shown-cur.midi)<1)shown=cur.midi+(shown-cur.midi)*.55;
    run.trail.push({t,m:shown,ok});run.lastM=shown;
  }else{run.sm=null;run.disp=null;run.trail.push({t,m:null,ok:null});}
  while(run.trail.length&&run.trail[0].t<t-1.5)run.trail.shift();
  // grade each note as it ends
  while(run.ni<song.notes.length&&t>=song.notes[run.ni].t+song.notes[run.ni].d){
    const n=song.notes[run.ni++],st=run.ns.get(n);
    if(st&&st.v>=3){const r=st.h/st.v,gi=r>=.8?0:r>=.55?1:r>=.3?2:-1;if(gi>=0)run.pop={g:gi,t0:performance.now()};}
  }
  const lift=cur?Math.max(0,Math.min(1,(cur.midi-song.minM)/Math.max(1,song.maxM-song.minM))):0;
  poseBelter(rider(),pm!=null?Math.min(1,.25+lvl*12):0,lift,performance.now());
  drawLane(song,t,lvl);
  if(t>song.endT){finish();return;}
  requestAnimationFrame(loop);
}
function stopRun(){
  if(!run)return;
  const now=ctx.currentTime;
  if(monitor)monitor.gain.setTargetAtTime(0,now,.05);
  for(const x of [run.back,run.gd].filter(Boolean)){x.g.gain.setTargetAtTime(0,now,.15);try{x.s.stop(now+.6);}catch(e){}}
}
function leaveStage(){stayAwake(false);releaseMic();backdrop(false);clearTimeout($('sing')._t);$('sing').classList.remove('live','is-ready','clearing');$('sing').style.background='';show('pick');}
function openQuit(){$('scrim').classList.add('on');$('quitSheet').classList.add('on');$('qKeep').focus();}
function closeQuit(){$('quitSheet').classList.remove('on');$('scrim').classList.remove('on');if(ctx&&ctx.state==='suspended')ctx.resume();}
$('quit').onclick=()=>{ // while singing this is a pause button
  if(!run){leaveStage();return;}
  if(ctx.state==='running')ctx.suspend(); // pause everything: music, recording and the clock
  openQuit();
};
$('qKeep').onclick=closeQuit;
$('qAgain').onclick=()=>{closeQuit();stopRun();run=null;readySong();};
$('qEnd').onclick=()=>{closeQuit();stopRun();run=null;leaveStage();};
$('qFinish').onclick=()=>{if(!run){closeQuit();return;}run.stopT=Math.max(0,songTime());closeQuit();finish();};
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
function voiceLag(voice,tr,sr){
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
  const r=run;r.rec=false;stopRun();run=null;clearTimeout($('sing')._t);$('sing').classList.remove('live','clearing');
  stayAwake(false);releaseMic();backdrop(false);
  $('busy').classList.add('on');
  setTimeout(()=>{
   try{
    const song=r.song,sr=ctx.sampleRate;let voice;
    if(demo)voice=inKeyMode(song)?fakeVoiceOwn(song,sr,r.fake):fakeVoice(song,sr);
    else{
      const total=Math.ceil(song.dur*sr);voice=new Float32Array(total);
      const comp=(ctx.outputLatency||0)+(ctx.baseLatency||0)+(r.inLat||0);
      let i0=Math.round(((r.recT??r.startAt)-r.startAt-comp)*sr),drops=0;
      for(const c of r.chunks){ // place each chunk by its own clock time; if the phone dropped some audio, leave a gap there
        if(c.at!=null){const want=Math.round((c.at-r.startAt-comp)*sr);if(Math.abs(want-i0)>c.length*.5){i0=want;drops++;}}
        for(let i=0;i<c.length;i++){const j=i0+i;if(j>=0&&j<total)voice[j]=c[i];}i0+=c.length;}
      // phones don't report every delay (Bluetooth, the mic itself), so line your voice up with the song by ear
      const lag=voiceLag(voice,tracks,sr);console.log('belt take: drops',drops,'lag',lagInfo);
      if(lag){const v2=new Float32Array(total);if(lag>0)v2.set(voice.subarray(lag));else v2.set(voice.subarray(0,total+lag),-lag);voice=v2;}
    }
    const until=r.stopT??null,sc=scoreTake(song,voice,sr,until);
    last={song,voice,sc,until};if(!demo){rememberTake(song,sc);setPref('sung',String(+pref('sung','0')+1));}
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
    if(run&&$('sing').classList.contains('on')&&!$('quitSheet').classList.contains('on')){if(ctx.state==='running')ctx.suspend();openQuit();}
    else if(mix)stopMix();
    if(pv.on)stopPreview();
  }else if($('sing').classList.contains('on'))stayAwake(true);
});

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
function showResults(){
  const {song,sc}=last;
  $('resSong').textContent=song.title;
  const quiet=sc.cover<.15;
  $('verdict').textContent=quiet?'We couldn\u2019t hear you':FUN[Math.floor(Math.random()*FUN.length)];
  $('sub').textContent=quiet?'Check that the mic is allowed, then sing out a little louder.':'Hit play to hear yourself, then pick a sound.';
  if(!quiet&&challenge&&challenge.song===song){const me=Math.round(sc.acc*100),d=me-challenge.score;
    $('sub').textContent=d>0?`You beat ${challenge.by}’s ${challenge.score}%. Send it back.`:d===0?`Tied with ${challenge.by} at ${me}%. Go again?`:`${-d} short of ${challenge.by}’s ${challenge.score}%. Go again?`;}
  $('shareScore').hidden=quiet;last.card=null;if(!quiet)scoreCard().then(b=>{if(last&&last.song===song)last.card=b;}).catch(()=>{});
  $('demoNote').classList.toggle('on',demo);
  setSaveState();
  show('result');setCoach(coachPref()&&!quiet,false);cheer(!quiet);paintStats(quiet);
  if(!quiet)setTimeout(()=>confetti(sc.acc*Math.min(1,sc.cover/.6)),180);
}
// Sharing: a picture of your score plus a link. For Belt's own songs the link is a challenge: it opens
// the same song for your friend with your score to beat. (Your own songs live on your device, so those just share the score.)
const SITE='https://letsbelt.com';
const firstName=()=>{const m=user&&user.user_metadata,n=m&&(m.full_name||m.name)||'';return String(n).trim().split(/\s+/)[0].replace(/[^\p{L}\-]/gu,'').slice(0,16);};
function shareLink(){const {song,sc}=last,n=firstName();return song.own?SITE:`${SITE}/?c=${song.id}.${Math.round(sc.acc*100)}${n?'.'+encodeURIComponent(n):''}`;}
async function scoreCard(){
  const {song,sc}=last,score=Math.round(sc.acc*100),W=1080,H=1350,cv=document.createElement('canvas');cv.width=W;cv.height=H;
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
  if(!last)return;const {song,sc}=last,score=Math.round(sc.acc*100),url=shareLink();
  const text=song.own?`I scored ${score}% on ${song.title} on Belt.`:`I scored ${score}% on ${song.title}. Beat me.`;
  const copy=async()=>{try{await navigator.clipboard.writeText(text+' '+url);toast('Link copied. Paste it to a friend.');}catch(e){toast('Sharing isn’t available in this browser.');}};
  try{
    const file=last.card?new File([last.card],'belt-score.png',{type:'image/png'}):null;
    if(file&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text:text+' '+url});return;}
    if(navigator.share){await navigator.share({text,url});return;}
    await copy();
  }catch(e){if(!(e&&e.name==='AbortError'))await copy();}
};
// The numbers: score counts up, then your top note and longest note (or how much you sang).
const CROWD=[[90,'Standing ovation'],[78,'Lighters up'],[62,'Big cheers'],[45,'Warm applause'],[25,'Clapping along'],[0,'Brave first try']];
function paintStats(quiet){
  const {song,sc}=last,own=inKeyMode(song),key=sc.key||0,box=$('rstats');
  $('rsScoreL').textContent='Notes hit';
  // how a room full of people would react, in words anyone gets
  const pc=Math.round(sc.acc*100);
  $('rsCrowd').textContent=quiet?'Still waiting':CROWD.find(c=>pc>=c[0])[1];
  // your best line, quoted back to you
  const st=last.lineStats||(last.lineStats=lineStats()),sungL=st.filter(x=>x.sung),best=sungL.slice().sort((a,b)=>b.pct-a.pct)[0];
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
const noteName=m=>NAMES[((Math.round(m)%12)+12)%12]+(Math.floor(Math.round(m)/12)-1);
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
  const notes=boothNotes(last.song,last.sc);last.booth=notes;
  $('cards').innerHTML=notes.map((n,i)=>`<div class="card" style="--c:${n.c}"><span class="card-tag">${esc(n.tag)}</span><p class="card-line">${esc(n.line)}</p><p class="card-sub">${esc(n.sub)}</p>${n.m?`<button class="card-hear" data-i="${i}">Hear it</button>`:''}</div>`).join('');
}
$('cards').onclick=e=>{const b=e.target.closest('.card-hear');if(!b)return;const m=last.booth[+b.dataset.i].m;playMix(Math.max(0,m.t0-.4),m.t1+.6);};
// Line by line: one bar per line of the song you reached. Taller and greener means more of that line was on pitch.
// Tap a bar to see the words and hear yourself sing it.
let gSel=null;
function lineStats(){
  const {song,sc}=last,end=last.until??1e9,out=[];let i=0;const pts=sc.pts;
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
  const st=last.lineStats||(last.lineStats=lineStats()),n=st.length;if(!n)return;
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
  const cv=$('graph'),q=cv._geo,st=last&&last.lineStats;if(!q||!st)return;
  const x=e.clientX-cv.getBoundingClientRect().left,i=Math.max(0,Math.min(q.n-1,Math.floor((x-q.x0+q.gap/2)/(q.bw+q.gap))));
  gSel=i;const s1=st[i],words=s1.L.text.trim();
  $('graphLine').textContent=`\u201c${words.length>44?words.slice(0,43)+'\u2026':words}\u201d ${s1.sung?Math.round(s1.pct*100)+'% on pitch':'you didn’t sing this one'}`;
  playMix(Math.max(0,s1.L.start-.4),s1.L.end+.6);
};
function impulse(){
  const sr=ctx.sampleRate,len=Math.floor(sr*1.6),b=ctx.createBuffer(2,len,sr);
  for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);}
  return b;
}
function setPlayIcon(on){$('playIcon').innerHTML=on?'<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>':'<path d="M8 5v14l11-7z"/>';$('play').setAttribute('aria-label',on?'Pause':'Play your performance');}
function balGains(){const v=+$('bal').value/100,a=v*Math.PI/2;return {music:Math.max(.035,1.15*Math.cos(a)),voice:Math.max(.05,2*Math.sin(a))};}
function stopMix(){
  stopTail();
  if(!mix)return;
  try{mix.b.stop();mix.v.stop();}catch(e){}
  mix=null;setPlayIcon(false);if(last&&!$('coach').hidden)drawGraph(null);
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
  const {song,voice}=last;
  if(!IR)IR={short:impulseLen(1.2,3),long:impulseLen(3.2,2.2)};
  const vb=ctx.createBuffer(1,voice.length,ctx.sampleRate);vb.copyToChannel?vb.copyToChannel(voice,0):vb.getChannelData(0).set(voice);
  const b=ctx.createBufferSource();b.buffer=tracks.back;
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
  const off=from!=null?from:Math.max(0,song.firstT-(song.own?2:song.spb*1.5)),at=ctx.currentTime+.08,end=until!=null?until:Math.min(song.own?song.endT:song.lastEnd+.8,last.until!=null?last.until+.8:1e9);
  b.start(at,off);v.start(at,off);
  mix={b,v,gb,gv,at,off,song,hp,lp,low,pres,air,comp,sShort,sLong,sEcho,room};applyFx(mix,true);setPlayIcon(true);
  // a crowd that claps when the whole song ends (not for the short "Hear it" clips)
  const whole=until==null;
  if(whole&&R.clap){const c=ctx.createBufferSource();c.buffer=applause(roomName);const cg=ctx.createGain();cg.gain.value=roomName==='arena'?.9:.7;c.connect(cg);cg.connect(room);c.start(at+(end-off)/rate-.15);tail=c;}
  b.onended=()=>{if(mix&&mix.b===b)endMix();};
  const tick=()=>{if(!mix||mix.b!==b)return;const t=(ctx.currentTime-(ctx.outputLatency||0)-at)*rate+off;if(!$('coach').hidden)drawGraph(t);if(t>end){endMix();return;}requestAnimationFrame(tick);};
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
  if(mix)applyFx(mix,false);else playMix();
});
// a new room rebuilds the sound, so playback restarts from where you were
document.querySelectorAll('#fxRoom button').forEach(bt=>bt.onclick=()=>{
  roomName=bt.dataset.room;setPref('room',roomName);paintSound();
  if(mix){const t=Math.max(mix.off,(ctx.currentTime-mix.at)*(mix.b.playbackRate.value)+mix.off);playMix(t);}else playMix();
});

$('play').onclick=()=>mix?stopMix():playMix();
$('bal').oninput=()=>{if(!mix)return;const {music,voice}=balGains();mix.gb.gain.setTargetAtTime(music,ctx.currentTime,.05);mix.gv.gain.setTargetAtTime(voice,ctx.currentTime,.05);};
$('again').onclick=async()=>{stopMix();ensureCtx();current=last.song;tracks=await tracksFor(current);const ok=await getMic(!$('monitor').checked);demo=!ok;readySong();};
$('another').onclick=$('resBack').onclick=()=>{stopMix();show('pick');};
window.addEventListener('resize',()=>{if(last&&$('result').classList.contains('on')&&!$('coach').hidden)drawGraph(null);});

/* ---------- Accounts (Supabase + Google). Singing never needs an account; Save does. ---------- */
const SB_URL='https://wksewqwujfrqmqliltbn.supabase.co',SB_KEY='sb_publishable_-hWzU5dnarN0XczEFFpmOQ_NnHLooy5';
let sb=null,user=null;
try{if(window.supabase)sb=window.supabase.createClient(SB_URL,SB_KEY);}catch(e){sb=null;}
const SONG_BY_ID=Object.fromEntries(SONGS.map(s=>[s.id,s]));
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),2600);}

// Keep a take in this browser while Google sign-in leaves the page and comes back.
const idb=()=>new Promise((res,rej)=>{const r=indexedDB.open('belt',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});
async function kv(op,key,val){try{const db=await idb();return await new Promise((res,rej)=>{const tx=db.transaction('kv',op==='get'?'readonly':'readwrite'),st=tx.objectStore('kv');const r=op==='get'?st.get(key):op==='put'?st.put(val,key):st.delete(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}catch(e){return null;}}

function toWav(f32,srIn,srOut){
  const sr=srOut||22050,ratio=srIn/sr,n=Math.floor(f32.length/ratio),buf=new ArrayBuffer(44+n*2),v=new DataView(buf);
  const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++){const x=i*ratio,a=Math.floor(x),f=x-a,s=(f32[a]||0)*(1-f)+(f32[a+1]||0)*f;v.setInt16(44+i*2,Math.max(-1,Math.min(1,s))*32767,true);}
  return new Blob([buf],{type:'audio/wav'});
}
function setSaveState(){
  const b=$('save');b.hidden=demo||!sb;
  b.disabled=!!(last&&last.saved);b.textContent=last&&last.saved?'Saved to My songs':'Save this take';
}
async function uploadTake(t){
  const path=`${user.id}/${Date.now()}-${t.songId}.wav`;
  const up=await sb.storage.from('takes').upload(path,t.blob,{contentType:'audio/wav'});
  if(up.error)throw up.error;
  const ins=await sb.from('takes').insert({song_id:t.songId,song_title:t.title,score:t.score,key_shift:t.key,audio_path:path});
  if(ins.error)throw ins.error;
}
async function saveTake(){
  if(!last||last.saved)return;
  const t={songId:last.song.id,title:last.song.title,score:Math.round(last.sc.acc*100),key:last.sc.key||0,blob:toWav(last.until!=null?last.voice.subarray(0,Math.ceil((last.until+1)*ctx.sampleRate)):last.voice,ctx.sampleRate)};
  if(!user){await kv('put','pending',t);authFor('takes');return;}
  const b=$('save');b.disabled=true;b.textContent='Saving';
  try{await uploadTake(t);last.saved=true;setSaveState();toast('Saved to My songs');}
  catch(e){b.disabled=false;b.textContent='Save this take';toast('Couldn’t save. Check your connection and try again.');}
}
function authFor(kind){
  $('authTitle').textContent=kind==='own'?'Sign in to add your songs':kind==='hello'?'Sign in to Belt':'Keep your takes';
  $('authSub').textContent=kind==='own'?'Belt uses your account to separate the singer from the band and sync every word.':kind==='hello'?'Save your takes and add your own songs. You can also just start singing.':'Sign in once and your saved takes will be here next time.';
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
  if(!GOOGLE_CLIENT_ID||!sb)return;
  try{
    const g=await loadGis();
    const raw=hex(crypto.getRandomValues(new Uint8Array(16))),hashed=hex(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)));
    g.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,nonce:hashed,ux_mode:'popup',itp_support:true,use_fedcm_for_button:true,
      callback:async r=>{const {error}=await sb.auth.signInWithIdToken({provider:'google',token:r.credential,nonce:raw});
        if(error){console.warn('google id token',error);toast('Google sign-in didn’t finish. Try again.');googleButton();}}});
    const box=$('gbtn');box.innerHTML='';
    g.accounts.id.renderButton(box,{type:'standard',theme:'filled_black',size:'large',shape:'pill',text:'continue_with',logo_alignment:'center',width:Math.min(400,Math.max(240,$('authSheet').clientWidth-48))});
    box.hidden=false;$('google').hidden=true;
  }catch(e){console.warn('google button',e);$('gbtn').hidden=true;$('google').hidden=false;}
}
function closeAuth(){$('authSheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');}
async function signIn(){
  if(!sb){toast('Sign-in isn’t available here.');return;}
  const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});
  if(error)toast('Google sign-in didn’t start. Try again.');
}
async function flushPending(){
  const t=await kv('get','pending');if(!t||!user)return;
  try{await uploadTake(t);await kv('del','pending');toast('Saved to My songs');openMine();}
  catch(e){toast('Couldn’t save your take. Try again from the song.');}
}
// Profile: your Belter, a few stats and your setlist. Works signed out too.
async function openMine(){
  stopMix();show('mine');
  const name=user?(user.user_metadata&&(user.user_metadata.full_name||user.user_metadata.name)||String(user.email||'You').split('@')[0]):'You';
  $('meName').textContent=name.split(' ')[0];
  const since=user&&user.created_at?new Intl.DateTimeFormat(undefined,{month:'short',year:'numeric'}).format(new Date(user.created_at)):'';
  $('meSub').textContent=GENRES[myGenre()].name+(since?' · since '+since:'');
  const top=+pref('top','0');$('stTop').textContent=top?noteName(top):'–';
  const b=Object.values(bests());$('stBest').textContent=b.length?Math.max(...b)+'%':'–';
  $('stTakes').textContent=pref('sung','0');
  $('signOut').textContent=user?'Sign out':'Sign in to keep your takes';$('signOut').hidden=!sb;
  $('shareSet').hidden=!user;
  const list=$('takes');
  if(!user){list.innerHTML='<li class="empty">Sign in and the takes you save will live here.</li>';return;}
  list.innerHTML='<li class="empty">Loading your takes</li>';
  const {data,error}=await sb.from('takes').select('*').order('created_at',{ascending:false});
  if(error){list.innerHTML='<li class="empty">Couldn’t load your takes. Check your connection and try again.</li>';return;}
  mineTakes=data;$('stTakes').textContent=String(Math.max(data.length,+pref('sung','0')));
  const sb2=data.map(r=>r.score).filter(x=>x!=null);if(sb2.length)$('stBest').textContent=Math.max(...sb2,...b)+'%';
  if(!data.length){list.innerHTML='<li class="empty">No saved takes yet. Sing a song, then tap Save this take.</li>';return;}
  const fmt=new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric'});
  list.innerHTML=data.map(r=>{const s=SONG_BY_ID[r.song_id];return `<li class="take" data-id="${r.id}">
    <button class="take-open" data-path="${esc(r.audio_path)}" data-song="${esc(r.song_id)}"><span class="take-dot" style="background:${s?s.color:'#1d1631'}"></span>
    <span class="take-main"><span class="take-title">${esc(r.song_title)}</span><span class="take-meta">${fmt.format(new Date(r.created_at))}</span></span><span class="take-score">${r.score??'–'}%</span></button>
    <button class="take-del" data-path="${esc(r.audio_path)}" aria-label="Delete this take of ${esc(r.song_title)}">Delete</button></li>`;}).join('');
}
let mineTakes=[];
$('shareSet').onclick=async()=>{
  const best={};for(const r of mineTakes)if(!(best[r.song_title]>=r.score))best[r.song_title]=r.score;
  const text='My Belt setlist\n'+Object.entries(best).map(([t,v])=>`${t}: ${v??'–'}%`).join('\n');
  try{if(navigator.share){await navigator.share({title:'My Belt setlist',text});return;}await navigator.clipboard.writeText(text);toast('Setlist copied');}catch(e){}
};
function openCast(){
  $('cast').innerHTML=Object.entries(GENRES).map(([k,G])=>`<button data-g="${k}" aria-pressed="${k===myGenre()}"><svg class="belter" data-genre="${k}" viewBox="0 0 120 140"></svg>${esc(G.name)}</button>`).join('');
  document.querySelectorAll('#cast svg').forEach(buildBelter);
  $('scrim').classList.add('on');$('castSheet').classList.add('on');
}
$('cast').onclick=e=>{const b=e.target.closest('button');if(!b)return;setPref('genre',b.dataset.g);document.querySelectorAll('#cast button').forEach(x=>x.setAttribute('aria-pressed',x===b));paintMe();$('meSub').textContent=GENRES[myGenre()].name+($('meSub').textContent.includes('since')?' · since'+$('meSub').textContent.split('since')[1]:'');};
const closeCast=()=>{$('castSheet').classList.remove('on');if(!document.querySelector('.sheet.on'))$('scrim').classList.remove('on');};
$('castDone').onclick=closeCast;$('editMe').onclick=openCast;
$('scrim').addEventListener('click',()=>{if($('castSheet').classList.contains('on'))closeCast();});
async function openTake(path,songId){
  const song=SONG_BY_ID[songId];
  if(!song){toast(String(songId).startsWith('own-')?'Open this take on the device that has the track.':'That song isn’t here any more.');return;}
  ensureCtx();$('busy').classList.add('on');
  try{
    const {data,error}=await sb.storage.from('takes').download(path);if(error)throw error;
    const ab=await ctx.decodeAudioData(await data.arrayBuffer());
    tracks=await tracksFor(song);current=song;demo=false;
    document.documentElement.style.setProperty('--song',song.color);
    const total=Math.ceil(song.dur*ctx.sampleRate),voice=new Float32Array(total);voice.set(ab.getChannelData(0).subarray(0,total));
    const until=ab.duration<song.dur-1?ab.duration:null;
    last={song,voice,sc:scoreTake(song,voice,ctx.sampleRate,until),until,saved:true};
    $('busy').classList.remove('on');showResults();
  }catch(e){$('busy').classList.remove('on');toast('Couldn’t open that take.');}
}
$('takes').onclick=async e=>{
  const o=e.target.closest('.take-open');if(o){openTake(o.dataset.path,o.dataset.song);return;}
  const d=e.target.closest('.take-del');if(!d)return;
  if(!d.dataset.sure){d.dataset.sure='1';d.textContent='Really delete?';setTimeout(()=>{if(d.isConnected&&!d.disabled){delete d.dataset.sure;d.textContent='Delete';}},3500);return;}
  const li=d.closest('.take');d.disabled=true;
  await sb.storage.from('takes').remove([d.dataset.path]);
  const {error}=await sb.from('takes').delete().eq('id',li.dataset.id);
  if(error){d.disabled=false;toast('Couldn’t delete that take.');return;}
  li.remove();if(!$('takes').children.length)$('takes').innerHTML='<li class="empty">No saved takes yet. Sing a song, then tap Save this take.</li>';
};
$('save').onclick=saveTake;
$('google').onclick=signIn;
$('authCancel').onclick=async()=>{await kv('del','pending');closeAuth();};
$('mineBtn').onclick=openMine;
$('mineBack').onclick=()=>openPicker();
$('signOut').onclick=async()=>{if(!user){authFor('takes');return;}await sb.auth.signOut();user=null;paintAuth();openMine();toast('Signed out');};
$('scrim').addEventListener('click',closeAuth);
if(sb){
  sb.auth.onAuthStateChange((ev,session)=>{const was=user;user=session?session.user:null;paintAuth();if(user&&!was){const open=$('authSheet').classList.contains('on');closeAuth();if(open)toast('You’re signed in');flushPending();}});
}

/* ---------- Use your own track ----------
   A track you bought (Karaoke Version, etc.) stays on this device. We read its tags or file name,
   look up the song and its synced lyrics on LRCLIB, the year on MusicBrainz, and listen to the
   track to learn its key (and key changes) and its moods. With no melody in a backing track,
   singing is graded on being in tune with the song's key at that moment. */
const OWN={},OWN_PAL=['#ff7a59','#f7a8ff','#4cc9f0','#ffd23f','#3ddc97','#7ee0ff'];
const OK_OWN=.4; // semitones from the nearest in-key note that still count as in tune
const KEYN=['C','D♭','D','E♭','E','F','F♯','G','A♭','A','B♭','B'];
const KS_MAJ=[6.35,2.23,3.48,2.33,4.38,4.09,2.52,5.19,2.39,3.66,2.29,2.88],KS_MIN=[6.33,2.68,3.52,5.38,2.6,3.53,2.54,4.75,3.98,2.69,3.34,3.17];
const keyName=k=>KEYN[k%12]+(k>=12?' minor':' major');
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
async function analyzeTrack(buf){
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
function paintMood(song,t){
  const now=performance.now(),dt=Math.min(.1,(now-run.lastF)/1000);run.lastF=now;
  const c=song.moodCols;if(!c||!c.length)return;
  const fi=Math.max(0,Math.min(c.length-1,t/2)),i=Math.floor(fi),f=fi-i,a=c[i],b=c[Math.min(c.length-1,i+1)];
  const tgt=a.map((v,j)=>v+(b[j]-v)*f);
  if(!run.bg)run.bg=hexHsl(song.color);
  const k=1-Math.exp(-dt/2.2);run.bg=run.bg.map((v,j)=>v+(tgt[j]-v)*k);
  $('sing').style.background=`hsl(${run.bg[0].toFixed(1)} ${run.bg[1].toFixed(1)}% ${run.bg[2].toFixed(1)}%)`;
  // the lights brighten in the big sections and dim in the quiet ones
  const m=song.an.mood[Math.max(0,Math.min(song.an.mood.length-1,Math.round(t/2)))];
  if(m&&(!run.lightT||now-run.lightT>500)){run.lightT=now;$('sing').style.setProperty('--lights',(.22+m[0]*.5).toFixed(2));}
}

/* Live singing on an own track */
function ownLive(song,t){
  paintMood(song,t);
  const L=song.lines[run.idx],inL=L&&t>=L.start-.1&&t<=L.end+.4;
  let pm=null,lvl=0;
  if(analyser&&!demo){
    const a=run.abuf;analyser.getFloatTimeDomainData(a);let e=0;for(let i=0;i<a.length;i++)e+=a[i]*a[i];lvl=Math.sqrt(e/a.length);
    if(lvl>.008)pm=livePitch(a,ctx.sampleRate);
  }else if(run.fake){const f=run.fake.find(f=>t>=f.t0&&t<f.t1);if(f){pm=f.m+Math.sin(t*6.5)*.15;lvl=.06;}}
  if(pm!=null){
    run.sm=run.sm==null||Math.abs(pm-run.sm)>1.5?pm:run.sm+(pm-run.sm)*.5;
    const mm=run.sm;if(run.center==null)run.center=mm; // the lane stays put once it knows where your voice sits
    run.trail.push({t,m:mm,ok:inL?Math.abs(inKey(song,t,mm))<=OK_OWN:null});run.lastM=mm;
  }else{run.sm=null;run.trail.push({t,m:null,ok:null});}
  while(run.trail.length&&run.trail[0].t<t-1.5)run.trail.shift();
  drawOwnLane(song,t,lvl);
}
// The lane for own tracks: faint rails on the notes that are in key right now, a strip showing
// when the words come, and your voice. Rails move when the song changes key.
function drawOwnLane(song,t,lvl){
  const cv=$('lane'),dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;
  if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}
  const g=cv.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);
  const ink='#1d1631',nowX=w*.3,pps=(w-nowX)/2.8,X=tt=>nowX+(tt-t)*pps;
  const c=run.center??62,lo=c-8,hi=c+8,Y=m=>h-18-(m-lo)/(hi-lo)*(h-32);
  const k=keyAt(song,t),sc=SCALES[k],tau=song.an.tau;
  g.fillStyle=ink;
  for(let m=Math.ceil(lo-tau);m<=hi-tau;m++){const pc=((m%12)+12)%12;if(!sc[pc])continue;g.globalAlpha=pc===k%12?.24:.1;g.fillRect(0,Y(m+tau)-.75,w,1.5);}
  g.globalAlpha=.3;
  for(const L of song.lines){const x0=X(L.start),x1=X(L.end);if(x1<0||x0>w)continue;g.beginPath();if(g.roundRect)g.roundRect(x0,h-7,Math.max(4,x1-x0),4,2);else g.rect(x0,h-7,Math.max(4,x1-x0),4);g.fill();}
  g.globalAlpha=.3;g.fillRect(nowX-1,6,2,h-16);
  g.globalAlpha=1;g.strokeStyle=ink;g.lineWidth=4;g.lineCap='round';g.lineJoin='round';
  let open=false,prev=null;g.beginPath();
  for(const p of run.trail){
    if(p.m==null){open=false;prev=null;continue;}
    if(prev&&(p.t-prev.t>.12||Math.abs(p.m-prev.m)>3))open=false;
    const x=X(p.t),y=Y(Math.max(lo,Math.min(hi,p.m)));if(!open){g.moveTo(x,y);open=true;}else g.lineTo(x,y);prev=p;
  }
  g.stroke();
  const last=run.trail[run.trail.length-1];
  if(last&&last.m!=null){
    const y=Y(Math.max(lo,Math.min(hi,last.m))),r=8+Math.min(8,lvl*70);
    g.globalAlpha=.18;g.beginPath();g.arc(nowX,y,r+8,0,7);g.fill();
    g.globalAlpha=1;g.fillStyle=last.ok?'#fbf9ff':ink;g.lineWidth=3;g.beginPath();g.arc(nowX,y,r,0,7);g.fill();g.stroke();
  }else{const y=Y(run.lastM??c);g.globalAlpha=.35;g.lineWidth=3;g.beginPath();g.arc(nowX,y,8,0,7);g.stroke();g.globalAlpha=1;}
}
function scoreOwn(song,frames){
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
function fakePlan(song){
  const out=[];let m=62;
  for(const L of song.lines)for(const s of L.syl){
    const sc=SCALES[keyAt(song,s.start)];let c=Math.round(m)+Math.round((Math.random()-.5)*4);
    for(let i=0;i<3&&!sc[((c%12)+12)%12];i++)c++;m=Math.max(55,Math.min(70,c));
    out.push({t0:s.start+.03,t1:s.end-.03,m:m+song.an.tau+(Math.random()<.15?.7:(Math.random()-.5)*.3)});
  }
  return out;
}
function fakeVoiceOwn(song,sr,plan){
  const len=Math.ceil(song.dur*sr),v=new Float32Array(len);let ph=0;
  for(const n of plan||fakePlan(song)){const st=Math.max(0,Math.floor(n.t0*sr)),en=Math.min(len,Math.floor(n.t1*sr)),f0=hz(n.m);
    for(let i=st;i<en;i++){const tt=(i-st)/sr;ph+=2*Math.PI*f0/sr;const e=Math.min(1,tt/.03)*Math.min(1,(en-i)/sr/.04);v[i]+=.2*e*(Math.sin(ph)+.4*Math.sin(2*ph)+.2*Math.sin(3*ph));}}
  return v;
}

/* Lyrics: LRC lines with start times. Word timing inside a line is spread by word length. */
function parseLRC(txt){
  const out=[];
  for(const raw of String(txt||'').split(/\r?\n/)){
    const tags=[...raw.matchAll(/\[(\d+):(\d+(?:[.:]\d+)?)\]/g)];if(!tags.length)continue;
    const text=raw.replace(/\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim();
    for(const m of tags)out.push({t:+m[1]*60+parseFloat(m[2].replace(':','.')),text});
  }
  return out.sort((a,b)=>a.t-b.t);
}
function buildOwnLines(song){
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
function setRange(s){
  if(!s.notes.length){s.minM=55;s.maxM=70;return;}
  const m=s.notes.map(n=>n.midi).sort((a,b)=>a-b);s.minM=m[Math.floor(m.length*.04)];s.maxM=m[Math.floor(m.length*.96)];
}
// Melody from the solo lead vocal: pitch track, then cut into notes snapped to the song's tuning.
function monoOf(buf){const n=buf.length,c=buf.numberOfChannels,x=new Float32Array(n);for(let k=0;k<c;k++){const d=buf.getChannelData(k);for(let i=0;i<n;i++)x[i]+=d[i]/c;}return x;}
// Melody from the separated lead vocal, made for real singing: a held note stays one bar through vibrato,
// slides and tiny dropouts, and only changes when the voice settles on a new note for a moment.
const MELODY_V=2;
async function extractMelody(buf,tau){
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
function alignToMelody(notes,lrc){
  const ph=notes.filter((n,i)=>i===0||n.t-(notes[i-1].t+notes[i-1].d)>.25).map(n=>n.t),ls=lrc.filter(l=>l.text).map(l=>l.t);
  if(ph.length<4||ls.length<3)return null;
  let best=0,bs=-1;
  for(let k=-300;k<=300;k++){const o=k*.05;let sc=0,j=0;
    for(const t of ls){const x=t+o;while(j<ph.length-1&&ph[j+1]<=x)j++;let d=Math.abs(ph[j]-x);if(j+1<ph.length)d=Math.min(d,Math.abs(ph[j+1]-x));sc+=Math.max(0,1-d/.3);}
    if(sc>bs){bs=sc;best=o;}}
  return bs>=ls.length*.35?+best.toFixed(2):null;
}
function makeOwnSong(rec){
  const s={id:rec.id,title:rec.title,artist:rec.artist,year:rec.year,album:rec.album,color:rec.color,own:true,vibe:'Your own track',
    scene:rec.scene||null,lrc:rec.lrc,autoOff:rec.autoOff||0,userOff:0,lrcDur:rec.lrcDur||0,an:rec.an,len:rec.an.dur,dur:rec.an.dur,endT:rec.an.dur-.05,notes:rec.notes||[],wt:rec.wt||null,mv:rec.mv||1};
  setRange(s);buildOwnLines(s);buildMood(s);return s;
}
async function loadOwnTracks(song){
  const rec=await kv('get','track:'+song.id);if(!rec||!rec.blob)throw new Error('missing');
  ensureCtx();const buf=await ctx.decodeAudioData(await rec.blob.arrayBuffer());
  let guide=null;if(rec.vocal)try{guide=await ctx.decodeAudioData(await rec.vocal.arrayBuffer());}catch(e){}
  return {back:buf,guide};
}

/* Recognition: tags or file name -> LRCLIB (song + synced lyrics) -> MusicBrainz (year) */
const JUNK_RX=/karaoke|backing track|instrumental|in the style of|originally performed|made popular|without (lead )?vocals?|no lead vocals?|with backing vocals|minus one|playback|custom|cover version/i;
// iTunes-style MP4 tags: a ©nam (title) or ©ART (artist) box holding a 'data' box with UTF-8 text
function readMp4Tags(u){
  const out={},find=(a,b,c,d)=>{for(let i=0;i+24<u.length;i++){if(u[i]===a&&u[i+1]===b&&u[i+2]===c&&u[i+3]===d&&u[i+8]===0x64&&u[i+9]===0x61&&u[i+10]===0x74&&u[i+11]===0x61){
    const sz=((u[i+4]<<24)>>>0)+(u[i+5]<<16)+(u[i+6]<<8)+u[i+7];if(sz<17||sz>2000)continue;
    try{return new TextDecoder('utf-8').decode(u.subarray(i+20,i+4+sz)).trim();}catch(e){}}}return '';};
  const t=find(0xA9,0x6E,0x61,0x6D),a=find(0xA9,0x41,0x52,0x54);if(t)out.TIT2=t;if(a)out.TPE1=a;return out;
}
function cleanName(s){
  return String(s||'').replace(/\s*[-–|]?\s*https?:\/\/\S+/gi,' ').replace(/\.[a-z0-9]{2,4}$/i,'').replace(/[_]+/g,' ').replace(/[♂♀★☆♪♫|]+/g,' - ')
    .replace(/\((official|music|lyric)[^)]*\)|\[(official|music|lyric)[^\]]*\]/gi,' ').replace(/\b(official (music )?video|lyric video|hd|4k)\b/gi,' ')
    .replace(/\(([^)]*)\)|\[([^\]]*)\]/g,(m,a,b)=>JUNK_RX.test(a||b||'')?' ':m)
    .replace(/\b(karaoke version|karaoke|custom backing track|backing track|instrumental)\b/ig,' ')
    .replace(/\s*-\s*$/,'').replace(/\s{2,}/g,' ').trim();
}
const cleanTitle=s=>String(s||'').replace(/\s*[-–]\s*(\d{4}\s*)?(remaster(ed)?|mono|stereo|single version|radio edit).*$/i,'').replace(/\s*\((\d{4}\s*)?remaster[^)]*\)/i,'').trim();
const norm=s=>cleanTitle(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,' ').trim();
function readTags(u){
  const out={};if(u.length<10||u[0]!==0x49||u[1]!==0x44||u[2]!==0x33)return out;
  const ver=u[3],ss=o=>(u[o]<<21)|(u[o+1]<<14)|(u[o+2]<<7)|u[o+3],be=o=>((u[o]<<24)>>>0)+(u[o+1]<<16)+(u[o+2]<<8)+u[o+3];
  if(ver<3)return out;
  let p=10;const end=Math.min(u.length,10+ss(6));
  if(u[5]&0x40)p+=ver===4?ss(10):be(10)+4;
  const dec=b=>{const e=b[0],d=b.subarray(1);try{let s;
    if(e===0)s=new TextDecoder('windows-1252').decode(d);else if(e===3)s=new TextDecoder('utf-8').decode(d);
    else if(e===1)s=new TextDecoder(d[0]===0xFE&&d[1]===0xFF?'utf-16be':'utf-16le').decode(d);else s=new TextDecoder('utf-16be').decode(d);
    return s.replace(/^﻿/,'').split('\u0000')[0].trim();}catch(err){return '';}};
  while(p+10<=end){
    const id=String.fromCharCode(u[p],u[p+1],u[p+2],u[p+3]);if(!/^[A-Z0-9]{4}$/.test(id))break;
    const sz=ver===4?ss(p+4):be(p+4);if(sz<=0)break;
    if(id==='TIT2'||id==='TPE1'||id==='TALB')out[id]=dec(u.subarray(p+10,Math.min(end,p+10+sz)));
    p+=10+sz;
  }
  return out;
}
function guessSong(tags,fileName){
  let title=cleanName(tags.TIT2),artist=JUNK_RX.test(tags.TPE1||'')?'':cleanName(tags.TPE1);
  if(title&&!artist){const m=title.split(/\s+[-–]\s+/).map(x=>x.trim()).filter(Boolean);if(m.length===2){artist=m[0];title=m[1];}}
  const fn=cleanName(String(fileName||'').replace(/^\s*\d{1,2}(-\d{1,2})?[\s._-]+(?=\D)/,'')); // "01 Song.m4v" -> "Song"
  if(!title){const m=fn.split(/\s+[-–]\s+/);if(m.length===2){artist=artist||m[0];title=m[1];}}
  return {title,artist,query:title?((artist?artist+' ':'')+title):fn};
}
async function getJSON(url,ms){
  const ac=new AbortController(),to=setTimeout(()=>ac.abort(),ms||9000);
  try{const r=await fetch(url,{signal:ac.signal});if(!r.ok)throw new Error('http '+r.status);return await r.json();}finally{clearTimeout(to);}
}
const VARIANT=/\b(live|remix|acoustic|demo|instrumental|karaoke|edit|version|cover|sped up|slowed)\b/i;
function pickLyrics(list,q,dur){
  const qt=new Set(norm(q.query).split(' ').filter(Boolean));let best=null,bs=-1e9;
  for(const r of list||[]){
    if(!r||!r.syncedLyrics||r.instrumental)continue;
    const ct=norm(r.artistName+' '+r.trackName).split(' ').filter(Boolean),hit=ct.filter(w=>qt.has(w)).length;
    let s=3*hit/Math.max(1,new Set([...qt,...ct]).size);
    if(q.title&&norm(r.trackName)===norm(q.title))s+=1.5;
    if(dur&&r.duration)s-=Math.min(3,Math.abs(r.duration-dur)/10);
    if(VARIANT.test(r.trackName+' '+(r.albumName||''))&&!VARIANT.test(q.query))s-=1.2;
    if(s>bs){bs=s;best=r;}
  }
  return best;
}
async function findYear(title,artist){
  const t=title.replace(/"/g,''),a=artist.replace(/"/g,''),nt=norm(title);let y=null;
  try{
    const j=await getJSON(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(`recording:"${t}" AND artist:"${a}"`)}&fmt=json&limit=50`,7000);
    for(const r of j.recordings||[]){if((r.score??100)<80||norm(r.title)!==nt)continue;const d=r['first-release-date'];if(d&&/^\d{4}/.test(d)){const v=+d.slice(0,4);if(!y||v<y)y=v;}}
  }catch(e){}
  if(y)return y;
  try{
    const j=await getJSON(`https://itunes.apple.com/search?term=${encodeURIComponent(a+' '+t)}&entity=song&limit=15`,7000);
    for(const r of j.results||[]){if(!norm(r.trackName).startsWith(nt))continue;const v=+String(r.releaseDate||'').slice(0,4);if(v&&(!y||v<y))y=v;}
  }catch(e){}
  return y;
}
async function findSong(q,dur){
  let list=[];const enc=encodeURIComponent;
  try{
    if(q.title&&q.artist)list=await getJSON(`https://lrclib.net/api/search?track_name=${enc(q.title)}&artist_name=${enc(q.artist)}`);
    if(!pickLyrics(list,q,dur)&&q.query)list=(list||[]).concat(await getJSON(`https://lrclib.net/api/search?q=${enc(q.query)}`));
  }catch(e){return {err:'net'};}
  const best=pickLyrics(list,q,dur);if(!best)return {err:'none'};
  const title=cleanTitle(best.trackName),artist=best.artistName;
  const year=await findYear(title,artist);
  return {title,artist,album:cleanTitle(best.albumName||''),year,lrc:parseLRC(best.syncedLyrics),lrcDur:best.duration||0};
}
async function fileId(f){
  const head=new Uint8Array(await f.slice(0,1<<20).arrayBuffer());
  try{const h=new Uint8Array(await crypto.subtle.digest('SHA-256',head));return 'own-'+[...h.slice(0,6)].map(x=>x.toString(16).padStart(2,'0')).join('')+f.size.toString(36);}
  catch(e){let h=2166136261;for(const x of head){h^=x;h=Math.imul(h,16777619);}return 'own-'+(h>>>0).toString(16)+f.size.toString(36);}
}

/* Library: own tracks live in this browser (IndexedDB) and sit at the top of the wheel */
function addToWheel(song){
  OWN[song.id]=song;SONG_BY_ID[song.id]=song;hay.clear();
  const i=CATALOG.findIndex(c=>c.song&&c.song.id===song.id);const item={title:song.title,artist:song.artist||'Your track',color:song.color,song};
  if(i>=0)CATALOG[i]=item;else CATALOG.unshift(item);updateCounts();return item;
}
async function loadOwnLibrary(){
  const ids=(await kv('get','own:list'))||[];
  for(const id of ids){const rec=await kv('get','track:'+id);if(rec&&rec.lrc&&rec.an)try{addToWheel(makeOwnSong(rec));}catch(e){}}
  if(ids.length&&$('pick').classList.contains('on'))renderWheel(VIEW[focusIdx]);
  paintTonight();
}
async function saveOwnPatch(id,patch){const rec=await kv('get','track:'+id);if(!rec)return;Object.assign(rec,patch);await kv('put','track:'+id,rec);}

/* The upload flow */
let pendingOwn=null,ownJob=0;
function checks(title,items){['ownWorkErr','ownWorkWhy','ownWorkClose'].forEach(i=>$(i).hidden=true);$('ownStep').textContent=title;$('ownChecks').innerHTML=items.map(t=>`<li>${esc(t)}</li>`).join('');}
function tick(i,state){const li=$('ownChecks').children[i];if(li)li.dataset.s=state||'done';}
const pause=ms=>new Promise(r=>setTimeout(r,ms));
function ownView(v){$('ownWork').hidden=v!=='work';$('ownFound').hidden=v!=='found';$('ownForm').hidden=v!=='form';}
function openOwn(){$('scrim').classList.add('on');$('ownSheet').classList.add('on');}
function closeOwn(){ownJob++;$('ownSheet').classList.remove('on');if(!$('sheet').classList.contains('on')&&!$('authSheet').classList.contains('on'))$('scrim').classList.remove('on');}
function ownForm(msg){
  ownView('form');const e=$('ownErr');e.hidden=!msg;e.textContent=msg||'';
  const q=pendingOwn.q||{},h=q.heard||q;$('ownQ').value=h.title?(h.title+(h.artist?' '+h.artist:'')):'';$('ownSugg').innerHTML='';
  setTimeout(()=>{$('ownQ').focus();if($('ownQ').value)suggest();},50);
}
// Suggestions from MusicBrainz, the open music catalog: partial words work, best matches first.
let suggT=0,suggN=0,suggList=[];
async function mbSuggest(text){
  const toks=nq(text).split(' ').filter(Boolean).slice(0,6);if(!toks.length)return [];
  const clause=(t,i)=>{const w=t+(i===toks.length-1&&t.length>1?'*':'');return `(recording:${w} OR artist:${w})`;};
  const j=await getJSON(`https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(toks.map(clause).join(' AND '))}&fmt=json&limit=40`,7000);
  const seen=new Map();
  for(const r of j.recordings||[]){
    if(r.video)continue;const artist=(r['artist-credit']||[]).map(a=>a.name+(a.joinphrase||'')).join('').trim();if(!artist||!r.title)continue;
    const key=nq(cleanTitle(r.title))+'|'+nq(artist),y=+String(r['first-release-date']||'').slice(0,4)||null;
    const pen=VARIANT.test(r.title+' '+(r.disambiguation||''))?25:0,sc=(r.score||0)-pen;
    const o=seen.get(key);if(!o)seen.set(key,{title:cleanTitle(r.title),artist,year:y,sc,hits:1});else{o.hits++;o.sc=Math.max(o.sc,sc);if(y&&(!o.year||y<o.year))o.year=y;}
  }
  // songs with many recordings (well-known ones) rise to the top
  return [...seen.values()].sort((a,b)=>(b.sc+Math.min(20,b.hits*2))-(a.sc+Math.min(20,a.hits*2))).slice(0,6);
}
function suggest(){
  clearTimeout(suggT);const text=$('ownQ').value.trim(),n=++suggN;
  if(text.length<2){$('ownSugg').innerHTML='';$('ownQ').setAttribute('aria-expanded','false');return;}
  suggT=setTimeout(async()=>{
    let list=[];try{list=await mbSuggest(text);}catch(e){}
    if(n!==suggN)return;suggList=list;
    $('ownSugg').innerHTML=list.length?list.map((x,i)=>`<li><button type="button" role="option" data-i="${i}"><i style="background:${OWN_PAL[i%OWN_PAL.length]}"></i><span><b>${esc(x.title)}</b><small>${esc(x.artist)}${x.year?', '+x.year:''}</small></span></button></li>`).join('')
      :'<li class="hint">No matches yet. Keep typing, or tap Find lyrics to search anyway.</li>';
    $('ownQ').setAttribute('aria-expanded',String(!!list.length));
  },380);
}
$('ownQ').oninput=suggest;
$('ownSugg').onclick=e=>{const b=e.target.closest('button');if(!b)return;const x=suggList[+b.dataset.i];if(x)lookForLyrics({title:x.title,artist:x.artist,query:x.artist+' '+x.title,year:x.year});};
function ownFound(){
  const p=pendingOwn,f=p.found,an=p.an,v=p.vocal;ownView('found');
  $('ownTitle').textContent=f.title;
  $('ownBy').textContent=f.artist+(f.year?`, ${f.year}`:'');
  $('ownAlbum').textContent=f.album?`From ${f.album}`:'';$('ownAlbum').hidden=!f.album;
  const segs=an.segs,ch=segs.length-1;
  const facts=[v&&p.inst?'Singer and band separated':'',
    v?`Melody read from the singer, ${v.notes.length} notes`:'',
    v&&v.wt?`Every word timed by listening, ${v.wt.filter(Boolean).length} of ${f.lrc.filter(l=>l.text).length} lines`:v&&v.al!=null?'Lines matched to the singer’s phrases':`Synced lyrics, ${f.lrc.filter(l=>l.text).length} lines`,
    segs.length?(ch?`Starts in ${keyName(segs[0].k)}, then changes key ${ch===1?'once':ch+' times'}`:`In ${keyName(segs[0].k)}`):'',
    ...((v&&v.ai&&v.ai.problems)||[]).slice(0,2).map(x=>'Heads up: '+x)];
  $('ownFacts').innerHTML=facts.filter(Boolean).map(x=>`<li>${esc(x)}</li>`).join('');
  $('ownFine').textContent='Your song stays on this device. To separate the singer, it’s sent briefly to our audio partner, then deleted. Lyrics come from LRCLIB, for personal practice.';
  $('ownVocal').hidden=!!v||!!p.splitP;$('ownGo').hidden=!v;
  (v?$('ownGo'):$('ownWrong')).focus();
}
const OWN_STEPS=['Reading the label','Finding the words','Separating the singer from the band','Learning the melody','Syncing every word to the singer','Mic check'];
function ownFail(i,msg,e){
  tick(i,'fail');$('ownWorkErr').hidden=false;$('ownWorkErr').textContent=msg;
  const d=$('ownWorkWhy');d.hidden=!e;d.textContent=e?'Details: '+String(e.message||e).slice(0,240):'';$('ownWorkClose').hidden=false;
}
function setupError(e){
  const m=String(e&&e.message||e||'');
  if(/credit|balance|insufficient|payment|billing/i.test(m))return 'Your Replicate account needs billing set up. Add a payment method at replicate.com, then try again.';
  if(/REPLICATE_API_TOKEN|unauthenticated|invalid token|authentication token|authentication credentials/i.test(m))return 'The Replicate token is missing or wrong. Check the function secrets in Supabase.';
  if(/sign in/i.test(m))return 'Sign in, then add your song again.';
  if(/not set in the function secrets/i.test(m))return 'A key is missing in Supabase. Check the function secrets.';
  if(/unknown action/i.test(m))return 'The Belt server function needs updating. Redeploy belt-ai in Supabase.';
  if(/invalid jwt|\(401\)/i.test(m))return 'The server didn’t accept your sign-in. Turn off Verify JWT for belt-ai, or sign in again.';
  return 'Couldn’t separate the singer. The details below say where it stopped.';
}
// One file in: the song as you normally hear it. Out: backing track, melody, word-perfect lyrics.
async function ingestOwn(file){
  if(!aiOn()){authFor('own');return;}
  const job=++ownJob;ensureCtx();openOwn();ownView('work');
  checks('Setting the stage',OWN_STEPS);tick(0,'active');
  let buf;
  try{buf=await ctx.decodeAudioData(await file.arrayBuffer());}
  catch(e){if(job!==ownJob)return;closeOwn();toast(/\.(mp4|m4v|mov)$/i.test(file.name)?'Belt can’t read the sound in that video. Videos bought on iTunes are often copy-protected.':'That file won’t play here. Try an MP3, M4A or WAV file.');return;}
  const id=await fileId(file);
  if(OWN[id]){closeOwn();filter='ready';renderChips();renderWheel(CATALOG.find(c=>c.song===OWN[id]));openSheet(OWN[id]);return;}
  const head=new Uint8Array(await file.slice(0,1<<18).arrayBuffer());
  let tags=readTags(head);
  if(!tags.TIT2&&/\.(mp4|m4v|m4a|mov)$/i.test(file.name)){
    const tail=new Uint8Array(await file.slice(Math.max(0,file.size-(2<<20))).arrayBuffer());
    tags=Object.assign({},readMp4Tags(new Uint8Array(await file.slice(0,2<<20).arrayBuffer())),readMp4Tags(tail));
  }
  const q=guessSong(tags,file.name);
  await pause(300);tick(0);tick(1,'active');
  let gotTask;const taskP=new Promise(r=>gotTask=r);
  const anP=analyzeTrack(buf),splitP=aiSplit(file,buf,id,gotTask);splitP.catch(()=>{});
  const judgeP=(async()=>{try{return await ai('judge',{song:await b64(clipWav(buf,Math.min(40,buf.duration*.3),40)),guess:{title:q.title,artist:q.artist}});}catch(e){console.warn('judge',e);return null;}})();
  const found=await findSong(q,buf.duration);if(job!==ownJob)return;
  if(found.err==='none'){ // the label didn't lead anywhere: use the title and artist the AI heard
    $('ownChecks').children[1].querySelector&&($('ownStep').textContent='Listening for the song');
    const v=await judgeP;if(job!==ownJob)return;
    if(v&&v.heardTitle){const hq={title:cleanTitle(v.heardTitle),artist:v.heardArtist||'',query:(v.heardArtist?v.heardArtist+' ':'')+v.heardTitle};
      const f2=await findSong(hq,buf.duration);if(job!==ownJob)return;
      if(!f2.err){Object.assign(q,hq);Object.assign(found,f2);delete found.err;}else q.heard=hq;}
    $('ownStep').textContent='Setting the stage';
  }
  pendingOwn={id,file,buf,q,found,anP,splitP,judgeP,taskP};
  if(found.err==='net')return ownForm('Couldn’t reach the lyrics library. Check your connection, then search again.');
  if(found.err)return ownForm('No synced lyrics found yet. Check the song title and artist.');
  finishOwn(job);
}
async function finishOwn(job){
  const p=pendingOwn;ownView('work');checks('Setting the stage',OWN_STEPS);tick(0);tick(1);tick(2,'active');
  // word timing starts the moment the singer is separated, while the parts download and the melody is read
  if(p.wordsFor!==p.found.lrc){p.wordsFor=p.found.lrc;p.wordsP=p.taskP.then(task=>aiWords(task,p.found.lrc,p.buf.duration));p.wordsP.catch(()=>{});}
  let sp;try{sp=await p.splitP;}catch(e){if(job!==ownJob)return;console.warn('split',e);ownFail(2,setupError(e),e);return;}
  if(job!==ownJob)return;tick(2);tick(3,'active');
  let vb,ib;try{[vb,ib]=await Promise.all([ctx.decodeAudioData(await sp.vocal.arrayBuffer()),ctx.decodeAudioData(await sp.inst.arrayBuffer())]);}
  catch(e){if(job!==ownJob)return;closeOwn();toast('The separated parts didn’t come back right. Try again.');return;}
  const an=await p.anP,notes=await extractMelody(vb,an.tau),verdict=await p.judgeP;if(job!==ownJob)return;
  if(notes.length<20||(verdict&&verdict.hasLeadVocal===false)){closeOwn();toast('This file has no singing in it. Upload the song the way you normally hear it, with the singer.');return;}
  tick(3);tick(4,'active');
  const al=alignToMelody(notes,p.found.lrc);let wt=null,wordsWhy='';
  try{const heard=await p.wordsP;wt=mapWords(p.found.lrc,heard);
    if(!wt)console.warn('words: '+(wordsWhy=heard.length<10?`it heard only ${heard.length} words`:`the ${heard.length} words it heard didn’t match the lyrics`));}
  catch(e){console.warn('words',e);wordsWhy=String(e&&e.message||e).slice(0,140);} // falls back to the melody
  if(job!==ownJob)return;tick(4);tick(5,'active');await pause(400);tick(5);await pause(300);
  p.an=an;p.vocal={file:sp.vocal,vb,notes,al,wt,ai:verdict,wordsWhy};p.inst={blob:sp.inst,buf:ib};
  ownFound();
}
$('ownBtn').onclick=()=>{if(!aiOn()){authFor('own');return;}ensureCtx();const f=$('ownFile');f.value='';f.click();};
$('ownFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)ingestOwn(f);};
$('ownWrong').onclick=()=>ownForm('');
$('ownCancel').onclick=closeOwn;$('ownWorkClose').onclick=closeOwn;
$('ownForm').onsubmit=e=>{
  e.preventDefault();const text=$('ownQ').value.trim();if(!text)return;
  const top=suggList[0];
  lookForLyrics(top&&nq(top.title+' '+top.artist).includes(nq(text))?{title:top.title,artist:top.artist,query:top.artist+' '+top.title,year:top.year}:{title:'',artist:'',query:text});
};
async function lookForLyrics(q){
  if(!pendingOwn||!pendingOwn.buf){closeOwn();return;}
  const job=++ownJob;pendingOwn.q=q;
  ownView('work');checks('Setting the stage',['Finding the words']);tick(0,'active');
  const found=await findSong(q,pendingOwn.buf.duration);if(job!==ownJob)return;
  if(!found.err&&!found.year&&q.year)found.year=q.year;
  pendingOwn.found=found;
  if(found.err==='net')return ownForm('Couldn’t reach the lyrics library. Check your connection, then search again.');
  if(found.err)return ownForm('No synced lyrics found for that. Check the spelling, or try the artist’s name as it’s usually written.');
  if(pendingOwn.splitP)finishOwn(job);else ownFound();
};
$('ownGo').onclick=async()=>{
  const p=pendingOwn;if(!p||!p.found||p.found.err)return;
  const f=p.found,v=p.vocal,al=v?v.al:null;if(!v)return;
  const back=p.inst||{blob:p.file,buf:p.buf},d=back.buf.duration-(f.lrcDur||back.buf.duration);
  const h=parseInt(p.id.slice(4,10),16)||0;
  // a backing track a few seconds longer than the original usually has a count-in at the start
  const rec={id:p.id,title:f.title,artist:f.artist,album:f.album,year:f.year,color:OWN_PAL[h%OWN_PAL.length],lrc:f.lrc,
    autoOff:al!=null?al:d>.8&&d<8?+d.toFixed(2):0,userOff:0,lrcDur:f.lrcDur||0,an:p.an,blob:back.blob,added:Date.now(),vocal:v?v.file:null,notes:v?v.notes:null,mv:MELODY_V,wt:v?v.wt:null,ai:v?v.ai:null};
  const song=makeOwnSong(rec);cache[song.id]=Promise.resolve({back:back.buf,guide:v?v.vb:null});
  await kv('put','track:'+rec.id,rec);
  const ids=(await kv('get','own:list'))||[];if(!ids.includes(rec.id)){ids.unshift(rec.id);await kv('put','own:list',ids);}
  const item=addToWheel(song);pendingOwn=null;closeOwn();findScene(song); // pick its music video now, so it's ready on the stage
  filter='ready';renderChips();
  renderWheel(item);openSheet(song);
};
/* Smart setup through the belt-ai server function (keys live there, never in the app) */
const aiOn=()=>!!(sb&&user);
async function fnError(error){let m=error&&error.message||'Request failed';try{const r=error.context;if(r&&r.json){const b=await r.clone().json();m=b.error||b.message||b.msg||m;if(r.status)m+=` (${r.status})`;}}catch(e){try{const t=await error.context.text();if(t)m=t.slice(0,200);}catch(e2){}}return new Error(m);}
async function ai(action,payload,retried){const {data,error}=await sb.functions.invoke('belt-ai',{body:{action,...payload}});
  if(error){const st=error.context&&error.context.status;if(st===401&&!retried){try{await sb.auth.refreshSession();}catch(e){}return ai(action,payload,true);}throw await fnError(error);}if(data&&data.error)throw new Error(data.error);return data;}
const b64=blob=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(String(r.result).split(',')[1]);r.onerror=rej;r.readAsDataURL(blob);});
function clipWav(buf,t0,dur){const x=monoOf(buf),sr=buf.sampleRate,a=Math.max(0,Math.floor(t0*sr));return toWav(x.subarray(a,Math.min(x.length,a+Math.floor(dur*sr))),sr,16000);}
async function aiJudge(backBuf,vb,notes,guess){
  const v0=Math.max(0,(notes[0]?notes[0].t:0)-2);
  return ai('judge',{backing:await b64(clipWav(backBuf,0,45)),vocal:await b64(clipWav(vb,v0,45)),guess:{title:guess.title,artist:guess.artist}});
}
// The vocal goes to private storage for a one-hour link AudioShake can read, then it's deleted.
async function aiSync(vfile,vb,id){
  let blob=vfile,ext=(vfile.name.split('.').pop()||'').toLowerCase();
  if(!['mp3','wav','flac','aiff'].includes(ext)){blob=toWav(monoOf(vb),vb.sampleRate,16000);ext='wav';}
  const path=`${user.id}/align/${id}-${Date.now()}.${ext}`;
  const up=await sb.storage.from('takes').upload(path,blob,{contentType:ext==='mp3'?'audio/mpeg':'audio/'+ext});if(up.error)throw up.error;
  try{
    const su=await sb.storage.from('takes').createSignedUrl(path,3600);if(su.error)throw su.error;
    const {id:task}=await ai('align_start',{url:su.data.signedUrl});
    for(let i=0;i<80;i++){await pause(3000);const r=await ai('align_poll',{id:task});
      if(r.status==='completed')return wordsFrom(r.data,vb.duration);if(r.status==='error')throw new Error(r.error);}
    throw new Error('Alignment took too long');
  }finally{sb.storage.from('takes').remove([path]);}
}
// The song goes to private storage for a one-hour link the separation service can read, then it's deleted.
// Upload the smallest thing that works: the file itself when it's an audio format the service reads
// (an iTunes .m4a is a fifth the size of the same song as WAV), otherwise the soundtrack as WAV.
// onTask is called as soon as the separation is done, before the parts are downloaded, so word timing can start right away.
const SPLIT_READS=['mp3','wav','flac','aiff','aif','m4a','aac','ogg','oga','opus','mp4','m4v','mov'],MIME={mp3:'audio/mpeg',m4a:'audio/mp4',aac:'audio/aac',mp4:'video/mp4',m4v:'video/mp4',mov:'video/quicktime'};
async function aiSplit(file,buf,id,onTask){
  const ext0=(file.name.split('.').pop()||'').toLowerCase(),wavBytes=buf.duration*32000*4;
  const asIs=SPLIT_READS.includes(ext0)&&file.size<=Math.min(45e6,['mp3','wav','flac','aiff','aif'].includes(ext0)?45e6:wavBytes);
  try{return await splitOnce(asIs?file:stereoWav(buf,32000),asIs?ext0:'wav',id,onTask);}
  catch(e){ // the service couldn't read that format: send the plain soundtrack instead
    if(!asIs||ext0==='wav'||/too long|Uploading|401|402|429/i.test(String(e&&e.message)))throw e;
    console.warn('split retry as wav',e);return splitOnce(stereoWav(buf,32000),'wav',id,onTask);
  }
}
async function splitOnce(blob,ext,id,onTask){
  const path=`${user.id}/split/${id}-${Date.now()}.${ext}`;
  const stage=async(name,fn)=>{try{return await fn();}catch(e){throw new Error(`${name}: ${e&&e.message||e}`);}};
  await stage('Uploading the song',async()=>{const up=await sb.storage.from('takes').upload(path,blob,{contentType:MIME[ext]||'audio/'+ext});if(up.error)throw up.error;});
  try{
    const url=await stage('Sharing the song',async()=>{const su=await sb.storage.from('takes').createSignedUrl(path,3600);if(su.error)throw su.error;return su.data.signedUrl;});
    const {id:task}=await stage('Starting the separation',()=>ai('split_start',{url}));
    let parts=[];
    for(let i=0;;i++){
      if(i>200)throw new Error('Separation took too long');
      await pause(i<4?1500:2500);const r=await stage('Checking the separation',()=>ai('split_poll',{id:task}));
      if(r.status==='completed'){parts=r.parts||[];break;}if(r.status==='error')throw new Error(r.error);
    }
    if(onTask)onTask(task);
    return await stage('Downloading the parts',async()=>{
      // the band comes back as one "everything but the singer" part, or as drums, bass and other to mix together
      const whole=['no_vocals','no_stem','accompaniment','instrumental'].some(k=>parts.includes(k)),rest=parts.filter(k=>k!=='vocals'&&!k.startsWith('no_'));
      const instP=whole||!rest.length?fetchPart(task,'instrumental'):rest.length===1?fetchPart(task,rest[0])
        :Promise.all(rest.map(async k=>ctx.decodeAudioData(await (await fetchPart(task,k)).arrayBuffer()))).then(mixToWav);
      const [vocal,inst]=await Promise.all([fetchPart(task,'vocals'),instP]);
      return {task,vocal,inst};
    });
  }finally{sb.storage.from('takes').remove([path]);}
}
// The soundtrack only, as a 16-bit stereo WAV at a modest rate; falls back to mono if it would be too big to store.
function stereoWav(buf,rate){
  const n=Math.floor(buf.length*rate/buf.sampleRate),ch=n*4>45e6?1:2,L=buf.getChannelData(0),R=buf.numberOfChannels>1?buf.getChannelData(1):L,k=buf.sampleRate/rate;
  const ab=new ArrayBuffer(44+n*2*ch),v=new DataView(ab),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*2*ch,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);
  v.setUint32(24,rate,true);v.setUint32(28,rate*2*ch,true);v.setUint16(32,2*ch,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2*ch,true);
  const at=(x,p)=>{const i=Math.floor(p),f=p-i;return x[i]+((x[i+1]??x[i])-x[i])*f;};
  for(let i=0;i<n;i++){const p=i*k;if(ch===2){v.setInt16(44+i*4,Math.max(-1,Math.min(1,at(L,p)))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,at(R,p)))*32767,true);}
    else v.setInt16(44+i*2,Math.max(-1,Math.min(1,(at(L,p)+at(R,p))/2))*32767,true);}
  return new Blob([ab],{type:'audio/wav'});
}
// adds stems together and writes a 16-bit stereo WAV
function mixToWav(bufs){
  const sr=bufs[0].sampleRate,n=Math.max(...bufs.map(b=>b.length)),L=new Float32Array(n),R=new Float32Array(n);
  for(const b of bufs){const l=b.getChannelData(0),r=b.numberOfChannels>1?b.getChannelData(1):l;for(let i=0;i<b.length;i++){L[i]+=l[i];R[i]+=r[i];}}
  const ab=new ArrayBuffer(44+n*4),v=new DataView(ab),w=(o,t)=>{for(let i=0;i<t.length;i++)v.setUint8(o+i,t.charCodeAt(i));};
  w(0,'RIFF');v.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);
  v.setUint32(24,sr,true);v.setUint32(28,sr*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*4,true);
  for(let i=0;i<n;i++){v.setInt16(44+i*4,Math.max(-1,Math.min(1,L[i]))*32767,true);v.setInt16(46+i*4,Math.max(-1,Math.min(1,R[i]))*32767,true);}
  return new Blob([ab],{type:'audio/wav'});
}
// WhisperX listens to the separated singer and reports when each word is sung.
async function aiWords(task,lrc,dur){
  const prompt=lrc.map(l=>l.text).filter(Boolean).join(' ');
  const {id}=await ai('words_start',{splitId:task,prompt});
  for(let i=0;i<220;i++){await pause(i<3?1500:2500);const r=await ai('words_poll',{id});
    if(r.status==='completed')return wordsFrom(r.data,dur);if(r.status==='error')throw new Error(r.error);}
  throw new Error('Word timing took too long');
}
async function fetchPart(task,model){
  const {data,error}=await sb.functions.invoke('belt-ai',{body:{action:'fetch_output',id:task,model}});
  if(error)throw await fnError(error);if(!(data instanceof Blob))throw new Error((data&&data.error)||'No audio came back');return data;
}
async function aiAlignTask(task,dur){
  const {id}=await ai('align_start',{taskId:task,model:'vocals_lead'});
  for(let i=0;i<80;i++){await pause(3000);const r=await ai('align_poll',{id});
    if(r.status==='completed')return wordsFrom(r.data,dur);if(r.status==='error')throw new Error(r.error);}
  throw new Error('Alignment took too long');
}
// Pulls word timings out of the alignment result, whatever its exact shape.
function wordsFrom(data,dur){
  const out=[];
  const walk=o=>{if(Array.isArray(o)){o.forEach(walk);return;}if(!o||typeof o!=='object')return;
    const tx=o.text??o.word??o.value,st=o.start??o.startTime??o.start_time??o.begin,en=o.end??o.endTime??o.end_time;
    if(typeof tx==='string'&&typeof st==='number'&&typeof en==='number'&&tx.trim()&&!/\s/.test(tx.trim()))out.push({w:tx.trim(),s:st,e:en});
    for(const k in o)if(o[k]&&typeof o[k]==='object')walk(o[k]);};
  walk(data);out.sort((a,b)=>a.s-b.s);
  if(out.length&&out[out.length-1].e>dur*5)out.forEach(x=>{x.s/=1000;x.e/=1000;});
  return out.filter((x,i)=>!i||x.s!==out[i-1].s||x.w!==out[i-1].w);
}
// Matches the words AudioShake heard to the lyric words, then fills any gaps inside a line.
const nw=w=>w.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]/g,'');
const sameWord=(a,b)=>a===b||(a.length>=3&&b.length>=3&&(a.startsWith(b.slice(0,3))&&b.startsWith(a.slice(0,3))));
function mapWords(lrc,heard){
  if(!heard||heard.length<10)return null;
  const lines=lrc.filter(l=>l.text&&!/^[♪♫\s]+$/.test(l.text)).map(l=>l.text.match(/\S+\s*/g)||[l.text]);
  const A=[];lines.forEach((ws,li)=>ws.forEach((w,wi)=>A.push({li,wi,n:nw(w)})));
  const B=heard.map(h=>nw(h.w)),n=A.length,m=B.length,W=m+1,sc=new Float32Array((n+1)*W),bt=new Uint8Array((n+1)*W);
  for(let i=1;i<=n;i++){sc[i*W]=-i;bt[i*W]=1;}for(let j=1;j<=m;j++){sc[j]=-j;bt[j]=2;}
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++){
    const d=sc[(i-1)*W+j-1]+(sameWord(A[i-1].n,B[j-1])?2:-1),u=sc[(i-1)*W+j]-1,l=sc[i*W+j-1]-1;
    if(d>=u&&d>=l){sc[i*W+j]=d;bt[i*W+j]=0;}else if(u>=l){sc[i*W+j]=u;bt[i*W+j]=1;}else{sc[i*W+j]=l;bt[i*W+j]=2;}}
  const hit=new Array(n).fill(null);
  for(let i=n,j=m;i>0&&j>0;){const b=bt[i*W+j];if(b===0){if(sameWord(A[i-1].n,B[j-1]))hit[i-1]=heard[j-1];i--;j--;}else if(b===1)i--;else j--;}
  const wt=lines.map(()=>null);let k=0;
  lines.forEach((ws,li)=>{
    const h=ws.map((_,wi)=>hit[k+wi]);k+=ws.length;
    if(h.filter(Boolean).length<Math.max(1,ws.length*.3))return;
    const t=h.map(x=>x?[x.s,x.e]:null);
    for(let i=0;i<t.length;i++){if(t[i])continue;let j=i;while(j<t.length&&!t[j])j++;
      const a=i?t[i-1][1]:t[j][0]-.3*(j-i),b=j<t.length?t[j][0]:t[i-1][1]+.3*(j-i),step=(b-a)/(j-i);
      for(let q=i;q<j;q++)t[q]=[a+step*(q-i),a+step*(q-i+1)];i=j;}
    wt[li]=t.map(([a,b])=>[+a.toFixed(3),+b.toFixed(3)]);
  });
  return wt.some(Boolean)?wt:null;
}
let vocalTarget=null;
function pickVocal(t){vocalTarget=t;const f=$('vocalFile');f.value='';f.click();}
$('ownVocal').onclick=()=>pickVocal('pending');
$('vocalFile').onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)addVocal(f,vocalTarget);};
async function addVocal(file,tgt){
  const pend=tgt==='pending';if(pend&&!pendingOwn)return;
  ensureCtx();if(!pend)closeSheet();
  const job=++ownJob;openOwn();ownView('work');
  checks('Getting you in sync',['Learning the melody','Syncing the words to the singer','Mic check']);tick(0,'active');
  const back=()=>{if(pend)ownFound();else closeOwn();};
  let vb;try{vb=await ctx.decodeAudioData(await file.arrayBuffer());}catch(e){back();toast('That file won’t play here. Try an MP3, M4A or WAV file.');return;}
  const dur=pend?pendingOwn.buf.duration:tgt.len,tau=pend?pendingOwn.an.tau:tgt.an.tau;
  if(Math.abs(vb.duration-dur)>1.5){back();toast('That vocal is a different length from your track. Download both from the same song.');return;}
  const notes=await extractMelody(vb,tau);if(job!==ownJob)return;
  if(notes.length<20){back();toast('We couldn’t hear a lead vocal in that file. Pick the solo Lead Vocal download.');return;}
  const lrc=pend?pendingOwn.found.lrc:tgt.lrc,al=alignToMelody(notes,lrc);
  let wt=null,verdict=null;
  if(aiOn()){
    // smart setup: Gemini listens to both files while AudioShake times every word
    const items=['Learning the melody','Listening to your files','Syncing every word to the singer','Mic check'];
    $('ownChecks').innerHTML=items.map(t=>`<li>${esc(t)}</li>`).join('');tick(0);tick(1,'active');tick(2,'active');
    const backBuf=pend?pendingOwn.buf:(await tracksFor(tgt)).back,guess=pend?pendingOwn.found:tgt;
    const jP=aiJudge(backBuf,vb,notes,guess).then(r=>{verdict=r;}).catch(e=>console.warn('judge',e)).finally(()=>tick(1));
    const sP=pause(400).then(()=>tick(2));
    await Promise.all([jP,sP]);if(job!==ownJob)return;tick(3,'active');await pause(400);tick(3);await pause(300);
  }else{
    tick(0);tick(1,'active');await pause(500);tick(1);tick(2,'active');await pause(450);tick(2);await pause(350);if(job!==ownJob)return;
  }
  if(verdict&&verdict.problems&&verdict.problems.length)toast(verdict.problems[0]);
  if(pend){pendingOwn.vocal={file,vb,notes,al,wt,ai:verdict};ownFound();return;}
  if(al!=null)tgt.autoOff=al;tgt.wt=wt;
  tgt.notes=tgt.rawNotes=notes;setRange(tgt);buildOwnLines(tgt);
  await saveOwnPatch(tgt.id,{vocal:file,notes,mv:MELODY_V,autoOff:tgt.autoOff,userOff:0,wt,ai:verdict});
  const tr=await tracksFor(tgt);cache[tgt.id]=Promise.resolve({back:tr.back,guide:vb});
  closeOwn();openSheet(tgt);toast('In sync and ready to sing');
}
$('ownRemove').onclick=async()=>{
  const s=current;if(!s||!s.own)return;
  await kv('del','track:'+s.id);const ids=((await kv('get','own:list'))||[]).filter(x=>x!==s.id);await kv('put','own:list',ids);
  const i=CATALOG.findIndex(c=>c.song===s);if(i>=0)CATALOG.splice(i,1);
  delete OWN[s.id];delete SONG_BY_ID[s.id];delete cache[s.id];updateCounts();closeSheet();
  renderWheel(CATALOG.find(c=>c.song));toast('Removed from this device');
};
$('scrim').addEventListener('click',()=>{if($('ownSheet').classList.contains('on'))closeOwn();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('ownSheet').classList.contains('on'))closeOwn();});
// Opened from a challenge link? Remember who to beat, then tidy the address bar.
try{
  const c=new URLSearchParams(location.search).get('c');
  if(c){const [id,sc,by]=c.split('.'),song=SONG_BY_ID[id],n=Math.round(+sc);
    if(song&&n>=0&&n<=100)challenge={song,score:n,by:(by||'').replace(/[^\p{L}\- ]/gu,'').slice(0,16)||'A friend'};
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

/* ---------- Debug handle for the console and the tests: belt.current, belt.showResults() ---------- */
window.belt={
  get current(){return current},get last(){return last},get run(){return run},get ctx(){return ctx},get demo(){return demo},
  get user(){return user},set user(v){user=v},get sb(){return sb},set sb(v){sb=v},
  $,SONGS,CATALOG,ensureCtx,songTime,tracksFor,fakeVoice,voiceLag,showResults,openMine,
};
