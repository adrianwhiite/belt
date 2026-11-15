// Little facts about a song and its artist, to enjoy while you wait (song setup, a friend singing in Party).
// They come from Wikipedia's public summaries, shown word for word with a credit, never written by AI,
// so they're never made up. When nothing is found, Belt's own singing tips fill in.
const cache=new Map();
export const TIPS=[
  'Breathe low, into your belly, before a long note.',
  'A small smile while you sing makes high notes brighter.',
  'Relax your jaw. Tension squeezes the sound.',
  'Sip water between songs, not ice-cold.',
  'Stand up if you can. Your lungs get more room.',
  'Hum the tune once before you sing it to find the key.',
  'If a note is out of reach, the key buttons can bring it closer.',
  'Big notes come from air, not from pushing your throat.',
  'Point your phone’s mic toward you, about a hand’s length away.',
];
const WIKI='https://en.wikipedia.org';
async function getJSON(url,ms=6000){
  const c=new AbortController(),to=setTimeout(()=>c.abort(),ms);
  try{const r=await fetch(url,{signal:c.signal,headers:{'Api-User-Agent':'Belt karaoke (letsbelt.com)'}});return r.ok?await r.json():null;}catch(e){return null;}finally{clearTimeout(to);}
}
// best Wikipedia page for a search, or null
async function page(q,must){
  const s=await getJSON(`${WIKI}/w/api.php?action=query&list=search&srlimit=5&format=json&origin=*&srsearch=${encodeURIComponent(q)}`);
  const hits=(s&&s.query&&s.query.search)||[];const hit=hits.find(h=>!must||must.test(h.title+' '+h.snippet));if(!hit)return null;
  const sum=await getJSON(`${WIKI}/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/ /g,'_'))}`);
  if(!sum||sum.type==='disambiguation'||!sum.extract)return null;
  return {title:sum.title,url:(sum.content_urls&&sum.content_urls.desktop&&sum.content_urls.desktop.page)||`${WIKI}/wiki/${encodeURIComponent(hit.title)}`,extract:sum.extract};
}
const sentences=t=>(t.replace(/\s*\([^)]*\)/g,'').match(/[^.!?]+[.!?]+(?=\s|$)/g)||[]).map(x=>x.trim()).filter(x=>x.length>30&&x.length<220);

// [{text, source:{title,url}}] for a song; empty when nothing reliable turns up
export function factsFor(title,artist){
  const key=(title+'|'+artist).toLowerCase();if(cache.has(key))return cache.get(key);
  const p=(async()=>{
    const out=[],art=(artist||'').replace(/\b(feat|ft)\.?.*$/i,'').trim(),known=art&&!/^(traditional|unknown|various)/i.test(art);
    const word=s=>new RegExp(s.split(/\s+/).filter(w=>w.length>2).slice(0,2).map(w=>w.replace(/[^\w]/g,'')).join('|')||'.','i');
    const [song,who]=await Promise.all([
      page(`${title} ${known?art:''} song`,word(title)),
      known?page(`${art} singer OR band OR rapper OR musician`,word(art)):null,
    ]);
    if(song)sentences(song.extract).slice(0,4).forEach(t=>out.push({text:t,source:song}));
    if(who&&(!song||who.title!==song.title))sentences(who.extract).slice(0,4).forEach(t=>out.push({text:t,source:who}));
    // alternate song and artist facts so it doesn't read like an encyclopedia entry
    const a=out.filter(f=>f.source===song),b=out.filter(f=>f.source!==song),mix=[];
    for(let i=0;i<Math.max(a.length,b.length);i++){if(a[i])mix.push(a[i]);if(b[i])mix.push(b[i]);}
    return mix;
  })();
  cache.set(key,p);p.then(r=>{if(!r.length)cache.delete(key);});return p;
}

// Rotates facts (then tips) inside an element until stop() is called or keep() turns false.
export function rotateFacts(el,title,artist,{every=7000,keep=()=>true}={}){
  let i=0,list=null,stopped=false,timer=0;
  const tips=TIPS.slice().sort(()=>Math.random()-.5).map(t=>({text:t,tip:true}));
  const show=()=>{
    if(stopped||!keep()||!el.isConnected){stop();return;}
    const all=(list&&list.length?list:[]).concat(tips),f=all[i%all.length];i++;
    el.classList.remove('in');void el.offsetWidth;
    el.innerHTML=`<small>${f.tip?'Singing tip':'Did you know'}</small><span></span>${f.source?`<a target="_blank" rel="noopener"></a>`:''}`;
    el.querySelector('span').textContent=f.text;
    if(f.source){const a=el.querySelector('a');a.href=f.source.url;a.textContent='From Wikipedia: '+f.source.title;}
    el.classList.add('in');el.hidden=false;timer=setTimeout(show,every);
  };
  const stop=()=>{stopped=true;clearTimeout(timer);};
  if(title)factsFor(title,artist).then(r=>{list=r;if(!stopped&&i<=1){clearTimeout(timer);i=0;show();}});
  show();return stop;
}
