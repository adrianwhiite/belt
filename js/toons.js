// Toon singers: flat, rounded characters drawn in code so every part can move smoothly.
// The mouth opens with how loud you sing, the eyes blink and squeeze shut on big notes,
// the brows lift, the head bobs and tilts. Coordinates fit the Belter frame (120 x 140).
// Each singer is a recipe: skin, hair style, outfit and a few extras, all drawn by the parts below.

const INK='#1d1631';
export const TOONS={
  juno:{skin:'#f6c9a8',shade:'#e8a984',hair:'#1e1a26',hi:'#3a3346',style:'bob',streak:'#9b6bff',iris:'#3b2a22',
    top:'jacket',c1:'#22202b',c2:'#3b3846',tee:'#f04f7a',ear:'hoop'},
  marco:{skin:'#e7b78f',shade:'#d39a70',hair:'#3a302c',hi:'#8d8580',style:'curly',iris:'#4a3426',beard:'#5b4a42',
    top:'shirt',c1:'#4f74a8',c2:'#3d5f8f',tee:'#9aa7b8'},
  priya:{skin:'#c98d66',shade:'#b07450',hair:'#1f1715',hi:'#43332e',style:'pony',iris:'#2e1d16',
    top:'jacket',c1:'#b9a4ff',c2:'#ff9cc8',tee:'#1d1631',ear:'star'},
  dre:{skin:'#8c5a3c',shade:'#744832',hair:'#1a1412',hi:'#33261f',style:'twists',iris:'#24160f',hat:'cap',hatC:'#ff5d8f',
    top:'hoodie',c1:'#efe5d2',c2:'#d9ccb4',tee:'#efe5d2',chain:1,dark:1},
  simone:{skin:'#6f4530',shade:'#5a3524',hair:'#20140f',hi:'#3a271d',style:'afro',iris:'#1e120c',
    top:'wrap',c1:'#7b2f6b',c2:'#5e2253',tee:'#7b2f6b',ear:'pearl',dark:1},
  june:{skin:'#f8d5bd',shade:'#eab597',hair:'#d9774a',hi:'#f0a070',style:'wavy',iris:'#3f6b4a',hat:'cowboy',hatC:'#c9925a',freckles:1,
    top:'shirt',c1:'#6f8fc2',c2:'#5878ad',tee:'#ff8fa3'},
};

const FACE='M33 52 C33 30 45 21 60 21 C75 21 87 30 87 52 L87 66 C87 86 75 98 60 98 C45 98 33 86 33 66 Z';
// an eye whose upper lid rests over the top of the iris, so it looks relaxed rather than staring
function eye(cx,T,id,side){
  const cy=62,sc=`M${cx-7.6} ${cy} C${cx-7.6} ${cy-6} ${cx-4} ${cy-7.4} ${cx} ${cy-7.4} C${cx+4} ${cy-7.4} ${cx+7.6} ${cy-6} ${cx+7.6} ${cy} C${cx+7.6} ${cy+5.6} ${cx+4.2} ${cy+8.2} ${cx} ${cy+8.2} C${cx-4.2} ${cy+8.2} ${cx-7.6} ${cy+5.6} ${cx-7.6} ${cy} Z`;
  const flick=side<0?`M${cx-7.4} ${cy-2.6} L${cx-10.4} ${cy-5}`:`M${cx+7.4} ${cy-2.6} L${cx+10.4} ${cy-5}`;
  return `<g class="eye"><clipPath id="${id}"><path d="${sc}"/></clipPath><path d="${sc}" fill="#fff"/>
    <g clip-path="url(#${id})"><g class="pup"><circle cx="${cx+.6}" cy="${cy+.4}" r="5.6" fill="${T.iris}"/><circle cx="${cx+.6}" cy="${cy+.4}" r="3" fill="${INK}"/>
      <circle cx="${cx+2.6}" cy="${cy-1.8}" r="1.8" fill="#fff"/><circle cx="${cx-1.4}" cy="${cy+2.6}" r=".9" fill="#fff" opacity=".8"/></g>
      <path d="M${cx-9} ${cy-9} L${cx+9} ${cy-9} L${cx+9} ${cy-4.6} C${cx+4} ${cy-6.6} ${cx-4} ${cy-6.6} ${cx-9} ${cy-4.6} Z" fill="${INK}" opacity=".12"/></g>
    <path d="M${cx-7.6} ${cy-1} C${cx-7} ${cy-6.4} ${cx-3.6} ${cy-7.6} ${cx} ${cy-7.6} C${cx+3.6} ${cy-7.6} ${cx+7} ${cy-6.4} ${cx+7.6} ${cy-1}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="${flick}" stroke="${INK}" stroke-width="2.1" stroke-linecap="round"/></g>`;
}
const HAIR={ // [behind the head, in front of the face]
  bob:T=>[`<path d="M29 50 C26 30 40 14 60 14 C82 14 95 29 92 52 C95 66 93 80 88 88 L80 78 L40 78 L32 88 C26 78 25 64 29 50 Z" fill="${T.hair}"/>`,
    `<path d="M30 56 C27 34 41 18 61 18 C80 18 93 31 90 55 C88 47 86 42 83 38 C78 44 70 47 61 46 C66 43 68 39 68 35 C62 40 52 44 41 45 C38 48 34 52 30 56 Z" fill="${T.hair}"/>
     <path d="M41 45 C44 37 52 30 63 27 C57 32 54 37 53 42 Z" fill="${T.hi}" opacity=".9"/>
     <path d="M80 26 C86 31 90 40 90 52 C90 64 88 76 85 84 C84 74 84 62 82 50 C81 41 80 33 80 26 Z" fill="${T.streak}"/>`],
  curly:T=>{let c='';[[38,36,8],[46,27,8.5],[56,23,9],[67,24,9],[76,29,8.5],[83,38,7.5],[35,46,6],[85,47,6],[51,33,7],[63,31,7],[73,35,6.5]].forEach(([x,y,r],i)=>c+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${i%4===1?T.hi:T.hair}"/>`);
    return ['',`${c}<path d="M33 50 L33 62 L36 62 L37 48 Z M87 50 L87 62 L84 62 L83 48 Z" fill="${T.hair}"/>`];},
  pony:T=>[`<path d="M70 20 C84 6 102 14 100 32 C99 44 93 52 88 58 C92 44 90 30 80 26 Z" fill="${T.hair}"/><circle cx="76" cy="20" r="4.5" fill="${T.c2}"/>`,
    `<path d="M31 54 C28 33 42 19 60 19 C79 19 92 32 89 54 C86 42 79 34 70 31 C62 35 50 37 40 41 C36 44 33 48 31 54 Z" fill="${T.hair}"/><path d="M60 21 C58 26 56 30 52 34" stroke="${T.hi}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`],
  twists:T=>{let c='';for(let i=0;i<9;i++)c+=`<rect x="${34+i*6}" y="${30+Math.abs(i-4)*1.2}" width="5" height="12" rx="2.5" fill="${i%2?T.hi:T.hair}"/>`;return ['',c];},
  afro:T=>{let c='';[[60,30,30],[36,40,17],[84,40,17],[44,20,16],[76,20,16],[60,12,15],[30,58,12],[90,58,12]].forEach(([x,y,r])=>c+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${T.hair}"/>`);
    return [c+`<circle cx="50" cy="16" r="5" fill="${T.hi}" opacity=".7"/>`,`<path d="M33 52 C34 40 44 33 60 33 C76 33 86 40 87 52 C82 44 72 40 60 40 C48 40 38 44 33 52 Z" fill="${T.hair}"/>`];},
  wavy:T=>[`<path d="M30 46 C26 30 40 16 60 16 C80 16 94 30 90 46 C96 62 94 82 100 98 C90 102 84 96 82 88 L38 88 C36 96 30 102 20 98 C26 82 24 62 30 46 Z" fill="${T.hair}"/>`,
    `<path d="M31 56 C29 40 40 30 52 30 C48 36 46 42 46 46 C42 47 36 50 31 56 Z M89 56 C91 40 80 30 68 30 C72 36 74 42 74 46 C78 47 84 50 89 56 Z" fill="${T.hair}"/><path d="M34 52 C36 46 40 42 44 40" stroke="${T.hi}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`],
};
const HAT={
  cap:T=>`<path d="M32 44 C32 26 45 17 60 17 C75 17 88 26 88 44 C80 40 70 38 60 38 C50 38 40 40 32 44 Z" fill="${T.hatC}"/><path d="M32 44 C40 40 50 38 60 38 C70 38 80 40 88 44 L88 47 C80 43 70 41 60 41 C50 41 40 43 32 47 Z" fill="${INK}" opacity=".25"/><circle cx="60" cy="18" r="2.2" fill="${INK}" opacity=".35"/><rect x="54" y="30" width="12" height="5" rx="2.5" fill="#fff" opacity=".9"/>`,
  cowboy:T=>`<path d="M8 36 C24 46 96 46 112 36 C108 44 96 50 60 50 C24 50 12 44 8 36 Z" fill="${T.hatC}"/><path d="M34 40 C34 22 42 12 50 16 C54 12 66 12 70 16 C78 12 86 22 86 40 C72 44 48 44 34 40 Z" fill="${T.hatC}"/><path d="M34 36 C48 40 72 40 86 36 L86 40 C72 44 48 44 34 40 Z" fill="#7a4e2a"/><path d="M50 16 C54 22 66 22 70 16" stroke="#a87442" stroke-width="1.4" fill="none"/>`,
};
const EAR={hoop:x=>`<circle cx="${x}" cy="74" r="5" fill="none" stroke="#e8c15a" stroke-width="1.6"/>`,
  star:x=>`<path transform="translate(${x} 74)" d="M0 -4.2 L1.2 -1.2 L4.2 -1 L1.9 1 L2.6 4 L0 2.4 L-2.6 4 L-1.9 1 L-4.2 -1 L-1.2 -1.2 Z" fill="#f2c94c"/>`,
  pearl:x=>`<circle cx="${x}" cy="72" r="2.4" fill="#fbf6ee"/>`};
const TOP={
  jacket:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M47 105 L60 124 L73 105 Z" fill="${T.tee}"/>
    <path d="M40 105 L50 104 L60 124 L52 141 L40 141 C42 128 40 116 40 105 Z M80 105 L70 104 L60 124 L68 141 L80 141 C78 128 80 116 80 105 Z" fill="${T.c2}"/>`,
  shirt:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M50 104 L60 116 L70 104 Z" fill="${T.tee}"/>
    <path d="M44 103 L60 116 L52 122 Z M76 103 L60 116 L68 122 Z" fill="${T.c2}"/><path d="M60 118 L60 141" stroke="${T.c2}" stroke-width="1.4"/><circle cx="60" cy="126" r="1.2" fill="#fff"/><circle cx="60" cy="134" r="1.2" fill="#fff"/>`,
  hoodie:T=>`<path d="M36 108 C36 96 84 96 84 108 L84 112 L36 112 Z" fill="${T.c2}"/><path d="M10 141 C11 120 22 109 40 106 L80 106 C98 109 109 120 110 141 Z" fill="${T.c1}"/>
    <path d="M52 108 L52 124 M68 108 L68 124" stroke="${T.c2}" stroke-width="1.6" stroke-linecap="round"/><path d="M40 128 L80 128 L78 141 L42 141 Z" fill="${T.c2}" opacity=".6"/>`,
  wrap:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M46 104 L60 122 L74 104 Z" fill="${T.skin}"/><path d="M46 104 L60 122 L70 141 L56 141 L52 120 Z" fill="${T.c2}"/>`,
};

export function buildToon(svg,key){
  const T=TOONS[key]||TOONS.juno,head=svg.dataset.bust==='head',id='t'+Math.random().toString(36).slice(2,8),[hb,hf]=HAIR[T.style](T),blush=T.dark?.22:.35;
  svg.innerHTML=`
  <defs><clipPath id="${id}m"><path class="tm"/></clipPath><clipPath id="${id}f"><path d="${FACE}"/></clipPath></defs>
  ${head?'':`<g class="body">${TOP[T.top](T)}${T.chain?'<path d="M47 106 C50 118 70 118 73 106" fill="none" stroke="#e8c15a" stroke-width="2"/>':''}</g>`}
  <g class="hd">
    <path d="M52 92 L68 92 L68 108 C64 111 56 111 52 108 Z" fill="${T.skin}"/>
    <path d="M52 96 C56 100 64 100 68 96 L68 102 C64 105 56 105 52 102 Z" fill="${T.shade}"/>
    ${hb}
    <ellipse cx="33" cy="64" rx="6" ry="8" fill="${T.skin}"/><ellipse cx="87" cy="64" rx="6" ry="8" fill="${T.shade}"/>
    ${T.ear?EAR[T.ear](32)+EAR[T.ear](88):''}
    <path d="${FACE}" fill="${T.skin}"/>
    <g clip-path="url(#${id}f)"><path d="M72 21 C84 26 90 40 88 62 C87 84 76 97 62 99 C74 90 80 76 80 60 C80 42 77 30 72 21 Z" fill="${T.shade}" opacity=".7"/>
      ${T.beard?`<path d="M33 66 C36 86 46 98 60 98 C74 98 84 86 87 66 C84 76 78 84 70 86 C66 83 54 83 50 86 C42 84 36 76 33 66 Z" fill="${T.beard}" opacity=".55"/>`:''}</g>
    <ellipse cx="44" cy="75" rx="6" ry="3.6" fill="#ff8f8f" opacity="${blush}"/><ellipse cx="76" cy="75" rx="6" ry="3.6" fill="#ff8f8f" opacity="${blush}"/>
    ${T.freckles?[[42,71],[45,73],[48,71],[72,71],[75,73],[78,71]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".8" fill="${T.shade}"/>`).join(''):''}
    <g class="eyes">${eye(47,T,id+'l',-1)}${eye(73,T,id+'r',1)}</g>
    <path class="shut" d="M40 63 Q47 68 54.5 63 M65.5 63 Q73 68 80 63" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" opacity="0"/>
    <path class="cheek" d="M41 69 Q47 66.5 53 69 M67 69 Q73 66.5 79 69" fill="none" stroke="${T.shade}" stroke-width="1.6" stroke-linecap="round" opacity="0"/>
    <path class="brow" data-s="-1" d="M39 47 Q46 42.5 54 45.5" fill="none" stroke="${T.style==='wavy'?T.shade:T.hair}" stroke-width="3.6" stroke-linecap="round"/>
    <path class="brow" data-s="1" d="M66 45.5 Q74 42.5 81 47" fill="none" stroke="${T.style==='wavy'?T.shade:T.hair}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M58.5 70 Q60 75 62.5 73.6" fill="none" stroke="${T.shade}" stroke-width="2.2" stroke-linecap="round"/>
    <path class="mouth" fill="#7a2843"/>
    <g clip-path="url(#${id}m)"><ellipse class="tongue" cx="60" fill="#ff7f97"/><rect class="teeth" fill="#fff" rx="1.5"/></g>
    <path class="smile" fill="#7a2843"/>
    ${hf}${T.hat?HAT[T.hat](T):''}
  </g>
  ${head?'':`<g class="arm">
    <path d="M26 141 C27 132 33 125 43 121 C47 120 52 122 54 126 C50 131 46 136 44 141 Z" fill="${T.c1}"/>
    <g class="mic"><rect x="47" y="112" width="6" height="26" rx="3" fill="${INK}" transform="rotate(14 50 112)"/><circle cx="51.5" cy="106" r="7.5" fill="#bdb6cf"/><circle cx="51.5" cy="106" r="7.5" fill="none" stroke="#8e86a6" stroke-width="1"/><path d="M45.5 103 L57.5 103 M44.5 106 L58.5 106 M45.5 109 L57.5 109" stroke="#8e86a6" stroke-width=".8"/></g>
    <ellipse cx="50" cy="121" rx="7" ry="6" fill="${T.skin}"/><path d="M44 120 Q50 124 56 120" stroke="${T.shade}" stroke-width="1.4" fill="none"/>
  </g>`}`;
  const q=k=>svg.querySelector(k),qa=k=>[...svg.querySelectorAll(k)];
  const b={svg,toon:true,hd:q('.hd'),eyes:qa('.eye'),pups:qa('.pup'),shut:q('.shut'),cheek:q('.cheek'),brows:qa('.brow'),mouth:q('.mouth'),tm:q('.tm'),smile:q('.smile'),
    tongue:q('.tongue'),teeth:q('.teeth'),arm:q('.arm'),seed:Math.random()*10,sm:0};
  poseToon(b,0,0,0);svg._b=b;return b;
}

const f=n=>n.toFixed(1);
export function poseToon(b,loud,lift,t){
  b.sm+=(loud-b.sm)*.22;const L=Math.max(0,Math.min(1,b.sm)),y0=80;
  // quiet: a little smiling crescent. Louder: corners stay lifted, the top lip keeps a soft bow, the bottom drops into a wide U
  const open=Math.max(0,(L-.06)/.94),W=12+open*9,H=open*16,l=60-W/2,r=60+W/2,cy=y0-1.4;
  if(H<1.4){b.mouth.setAttribute('d','');b.tm.setAttribute('d','');
    b.smile.setAttribute('d',`M${f(l-.5)} ${f(cy)} C${f(l+W*.25)} ${f(y0+2.6)} ${f(r-W*.25)} ${f(y0+2.6)} ${f(r+.5)} ${f(cy)} C${f(r-W*.28)} ${f(y0+5.2)} ${f(l+W*.28)} ${f(y0+5.2)} ${f(l-.5)} ${f(cy)} Z`);}
  else{const d=`M${f(l)} ${f(cy)} C${f(l+W*.2)} ${f(y0+.6)} ${f(60-W*.14)} ${f(y0-.2)} 60 ${f(y0+.9)} C${f(60+W*.14)} ${f(y0-.2)} ${f(r-W*.2)} ${f(y0+.6)} ${f(r)} ${f(cy)} C${f(r-.4)} ${f(y0+H*.7)} ${f(60+W*.3)} ${f(y0+H)} 60 ${f(y0+H)} C${f(60-W*.3)} ${f(y0+H)} ${f(l+.4)} ${f(y0+H*.7)} ${f(l)} ${f(cy)} Z`;
    b.mouth.setAttribute('d',d);b.tm.setAttribute('d',d);b.smile.setAttribute('d','');
    b.tongue.setAttribute('cy',f(y0+H*.95));b.tongue.setAttribute('rx',f(W*.3));b.tongue.setAttribute('ry',f(H*.34));
    b.teeth.setAttribute('x',f(60-W*.32));b.teeth.setAttribute('y',f(y0-1));b.teeth.setAttribute('width',f(W*.64));b.teeth.setAttribute('height',f(Math.min(3.2,H*.2)));}
  // eyes: blink every few seconds, squeeze shut when belting; cheeks lift as you sing
  const blink=((t/1000+b.seed)%4.2)<.12,belt=L>.72,shut=blink||belt;
  b.eyes.forEach(e=>e.setAttribute('opacity',shut?0:1));b.shut.setAttribute('opacity',shut?1:0);b.cheek.setAttribute('opacity',Math.min(1,L*1.6).toFixed(2));
  const look=Math.sin(t/2300+b.seed)*1.2;b.pups.forEach(p=>p.setAttribute('transform',`translate(${look.toFixed(2)} 0)`));
  b.brows.forEach(br=>{const s=+br.dataset.s;br.setAttribute('transform',`translate(0 ${(-L*3.5-lift*2.5).toFixed(2)}) rotate(${(s*-5*L).toFixed(1)} ${s<0?46:74} 45)`);});
  const bob=Math.sin(t/420+b.seed)*(.4+L*1.6),tilt=Math.sin(t/1100+b.seed)*1.5-L*4;
  b.hd.setAttribute('transform',`translate(0 ${(bob-lift*2).toFixed(2)}) rotate(${tilt.toFixed(2)} 60 100)`);
  if(b.arm)b.arm.setAttribute('transform',`translate(0 ${(-L*3).toFixed(2)})`);
}
