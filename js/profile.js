// Your voice over time. After every take Belt keeps a few numbers (never audio): how much you sang,
// how much was on pitch, the range you actually hit, and which lines went well. Signed in, they live in
// the performances table; signed out, the last 20 wait on this device and move over when you sign in.
import {S} from './state.js';
import {pref,setPref} from './util.js';

const LOCAL='perfs',KEEP=20;
export const CROWD=[[90,'Standing ovation'],[78,'Lighters up'],[62,'Big cheers'],[45,'Warm applause'],[25,'Clapping along'],[0,'Brave first try']];
export const crowdFor=score=>CROWD.find(c=>score>=c[0])[1];
const local=()=>{try{return JSON.parse(pref(LOCAL,'[]'))||[];}catch(e){return [];}};
const saveLocal=a=>setPref(LOCAL,JSON.stringify(a.slice(-KEEP)));

// Per line of the song you reached: did you sing it, and how much of it was on pitch.
export function lineStatsFor(song,sc,until){
  const end=until??1e9,out=[],pts=sc.pts;let i=0;
  for(const L of song.lines){if(L.start>end)break;
    while(i<pts.length&&pts[i].t<L.start-.05)i++;let n=0,ok=0,j=i;
    for(;j<pts.length&&pts[j].t<=L.end+.3;j++){n++;if(pts[j].ok)ok++;}
    const need=Math.max(4,(Math.min(L.end,end)-L.start)*5);
    out.push({L,sung:n>=need,pct:n?ok/n:0});}
  return out;
}
const pctile=(a,q)=>a[Math.min(a.length-1,Math.max(0,Math.floor(a.length*q)))];
const device=()=>{const u=navigator.userAgent;return /iPhone|iPad|iPod/.test(u)?'ios':/Android/.test(u)?'android':/Mac/.test(u)?'mac':/Windows/.test(u)?'windows':'other';};

export function performanceRow(song,sc,until,lagSamples,sr){
  const st=lineStatsFor(song,sc,until);
  const hit=sc.pts.filter(p=>p.ok&&p.raw!=null).map(p=>p.raw).sort((a,b)=>a-b);
  // how sharp or flat you tend to be, split by the low, middle and high notes of the song
  let sharp_flat=null;const per=(sc.per||[]).filter(o=>o.voiced&&o.n&&o.n.midi);
  if(per.length>=6){const ms=per.map(o=>o.n.midi).sort((a,b)=>a-b),lo=pctile(ms,.33),hi=pctile(ms,.67),g={low:[0,0],mid:[0,0],high:[0,0]};
    for(const o of per){const k=o.n.midi<lo?'low':o.n.midi>hi?'high':'mid';g[k][0]+=o.dsum;g[k][1]+=o.voiced;}
    sharp_flat=Object.fromEntries(Object.entries(g).filter(([,v])=>v[1]).map(([k,v])=>[k,Math.round(v[0]/v[1]*100)]));}
  return {
    song_id:song.id,song_title:song.title,own:!!song.own,mode:S.mode||'karaoke',
    score:Math.max(0,Math.min(100,Math.round(sc.acc*100))),cover:+sc.cover.toFixed(3),
    sang_seconds:+st.filter(x=>x.sung).reduce((a,x)=>a+(x.L.end-x.L.start),0).toFixed(1),
    finished:until==null,
    low_midi:hit.length>8?+pctile(hit,.05).toFixed(1):null,high_midi:hit.length>8?+pctile(hit,.95).toFixed(1):null,
    key_shift:sc.key||0,
    lines:st.map((x,i)=>({i,pct:+x.pct.toFixed(2),sung:x.sung})),
    sharp_flat,lag_ms:lagSamples&&sr?Math.round(lagSamples/sr*1000):0,device:device(),
  };
}

// Keep the row; never hold up the results page, never bother the singer if it fails.
export async function recordPerformance(row){
  if(row.cover<.15)return; // barely sang: nothing worth keeping
  if(S.user&&S.sb){const {error}=await S.sb.from('performances').insert(row);if(!error){flushPerformances();return;}console.warn('belt: performance not saved',error.message);}
  saveLocal([...local(),{...row,created_at:new Date().toISOString()}]);
}
export async function flushPerformances(){
  const a=local();if(!a.length||!S.user||!S.sb)return;
  const {error}=await S.sb.from('performances').insert(a);
  if(error)console.warn('belt: performances not synced',error.message);else saveLocal([]);
}

// Newest first. Signed in: yours from the table plus anything still waiting here. Signed out: this device.
export async function loadPerformances(limit=200){
  const mine=local().slice().reverse();
  if(!S.user||!S.sb)return mine;
  let data,error;try{({data,error}=await S.sb.from('performances').select('*').order('created_at',{ascending:false}).limit(limit));}catch(e){error=e;}
  if(error||!data){console.warn('belt: performances not loaded',error&&error.message);return mine;}
  return [...mine,...data].sort((a,b)=>b.created_at.localeCompare(a.created_at));
}

// ---- Read helpers for the profile now, and the coach later ----
// The range you comfortably hit, from your recent takes (ignores a one-off squeak).
export function rangeOf(rows,n=20){
  const r=rows.filter(x=>x.low_midi!=null&&x.high_midi!=null).slice(0,n);if(!r.length)return null;
  const lo=r.map(x=>x.low_midi).sort((a,b)=>a-b),hi=r.map(x=>x.high_midi).sort((a,b)=>a-b);
  return {low:Math.round(pctile(lo,.2)),high:Math.round(pctile(hi,.8)),takes:r.length};
}
// Score per take, oldest first, for a trend line.
export const scoreTrend=(rows,n=30)=>rows.filter(x=>x.score!=null&&x.cover>=.3).slice(0,n).reverse().map(x=>({t:x.created_at,score:x.score,song:x.song_title}));
// Lines of one song you keep missing: lowest average on-pitch share across your takes of it.
export function weakestLines(rows,songId,k=3){
  const acc=new Map();for(const r of rows)if(r.song_id===songId&&r.lines)for(const l of r.lines)if(l.sung){const a=acc.get(l.i)||[0,0];a[0]+=l.pct;a[1]++;acc.set(l.i,a);}
  return [...acc].map(([i,[s,n]])=>({i,pct:s/n,takes:n})).sort((a,b)=>a.pct-b.pct).slice(0,k);
}
// Different days you sang, and how many days in a row up to today or yesterday.
export function nights(rows){
  const days=[...new Set(rows.map(r=>new Date(r.created_at).toLocaleDateString('en-CA')))].sort().reverse();
  let streak=0;const d=new Date();if(days[0]!==d.toLocaleDateString('en-CA'))d.setDate(d.getDate()-1);
  for(const day of days){if(day!==d.toLocaleDateString('en-CA'))break;streak++;d.setDate(d.getDate()-1);}
  return {count:days.length,streak};
}
// Best take per song, best first.
export function bestPerSong(rows){
  const m=new Map();for(const r of rows)if(r.cover>=.3&&(!m.has(r.song_id)||r.score>m.get(r.song_id).score))m.set(r.song_id,r);
  return [...m.values()].sort((a,b)=>b.score-a.score);
}
// A friendly name for a range, no jargon. Midi 60 = middle C.
export function voiceLabel(rg){
  if(!rg)return null;const mid=(rg.low+rg.high)/2,span=rg.high-rg.low;
  const where=mid<52?'Low and warm':mid<57?'Rich and grounded':mid<62?'Right in the middle':mid<67?'Bright and clear':'High and soaring';
  const wide=span>=19?'with a huge reach':span>=14?'with a wide reach':span>=9?'with good reach':'still stretching out';
  return {where,wide};
}
