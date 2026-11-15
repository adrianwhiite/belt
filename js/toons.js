// Toon singers: flat, rounded characters drawn in code so every part can move smoothly.
// The mouth opens with how loud you sing, the eyes blink and squeeze shut on big notes,
// the brows lift, the head bobs and tilts. Coordinates fit the Belter frame (120 x 140).

const INK='#1d1631';
export const TOONS={
  juno:{
    skin:'#f6c9a8',shade:'#e8a984',blush:'#ff8f8f',lip:'#7a2843',
    hair:'#1e1a26',hairHi:'#3a3346',streak:'#9b6bff',
    top:'#22202b',topHi:'#3b3846',tee:'#f04f7a',iris:'#3b2a22',
  },
};

export function buildToon(svg,key){
  const T=TOONS[key],head=svg.dataset.bust==='head',id='t'+Math.random().toString(36).slice(2,8);
  svg.innerHTML=`
  <defs><clipPath id="${id}m"><path class="tm"/></clipPath><clipPath id="${id}f"><path d="M33 52 C33 30 45 21 60 21 C75 21 87 30 87 52 L87 66 C87 86 75 98 60 98 C45 98 33 86 33 66 Z"/></clipPath></defs>
  ${head?'':`<g class="body">
    <path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.top}"/>
    <path d="M47 105 L60 124 L73 105 Z" fill="${T.tee}"/>
    <path d="M40 105 L50 104 L60 124 L52 141 L40 141 C42 128 40 116 40 105 Z" fill="${T.topHi}"/>
    <path d="M80 105 L70 104 L60 124 L68 141 L80 141 C78 128 80 116 80 105 Z" fill="${T.topHi}"/>
    <path d="M20 126 C24 118 30 113 37 110" stroke="${T.topHi}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g>`}
  <g class="hd">
    <path d="M52 92 L68 92 L68 108 C64 111 56 111 52 108 Z" fill="${T.skin}"/>
    <path d="M52 96 C56 100 64 100 68 96 L68 102 C64 105 56 105 52 102 Z" fill="${T.shade}"/>
    <path class="hairback" d="M29 50 C26 30 40 14 60 14 C82 14 95 29 92 52 C95 66 93 80 88 88 L80 78 L40 78 L32 88 C26 78 25 64 29 50 Z" fill="${T.hair}"/>
    <ellipse cx="33" cy="64" rx="6" ry="8" fill="${T.skin}"/><ellipse cx="87" cy="64" rx="6" ry="8" fill="${T.shade}"/>
    <circle cx="32" cy="74" r="5" fill="none" stroke="#e8c15a" stroke-width="1.6"/><circle cx="88" cy="74" r="5" fill="none" stroke="#e8c15a" stroke-width="1.6"/>
    <path d="M33 52 C33 30 45 21 60 21 C75 21 87 30 87 52 L87 66 C87 86 75 98 60 98 C45 98 33 86 33 66 Z" fill="${T.skin}"/>
    <g clip-path="url(#${id}f)"><path d="M72 21 C84 26 90 40 88 62 C87 84 76 97 62 99 C74 90 80 76 80 60 C80 42 77 30 72 21 Z" fill="${T.shade}" opacity=".7"/></g>
    <ellipse cx="44" cy="74" rx="6" ry="3.6" fill="${T.blush}" opacity=".35"/><ellipse cx="76" cy="74" rx="6" ry="3.6" fill="${T.blush}" opacity=".35"/>
    <g class="eyes">
      <g class="eye" data-x="47"><ellipse cx="47" cy="62" rx="7.4" ry="8.4" fill="#fff"/><g class="pup"><circle cx="48" cy="63" r="5" fill="${T.iris}"/><circle cx="48" cy="63" r="2.6" fill="${INK}"/><circle cx="49.8" cy="60.8" r="1.6" fill="#fff"/></g>
        <path class="lid" d="M39 58 Q47 50 55.5 58" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M39.5 58.5 L36 56" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></g>
      <g class="eye" data-x="73"><ellipse cx="73" cy="62" rx="7.4" ry="8.4" fill="#fff"/><g class="pup"><circle cx="74" cy="63" r="5" fill="${T.iris}"/><circle cx="74" cy="63" r="2.6" fill="${INK}"/><circle cx="75.8" cy="60.8" r="1.6" fill="#fff"/></g>
        <path class="lid" d="M64.5 58 Q73 50 81 58" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M80.5 58.5 L84 56" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/></g>
    </g>
    <path class="shut" d="M40 63 Q47 68 54.5 63 M65.5 63 Q73 68 80 63" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" opacity="0"/>
    <path class="brow" data-s="-1" d="M39 47 Q46 42.5 54 45.5" fill="none" stroke="${T.hair}" stroke-width="3.6" stroke-linecap="round"/>
    <path class="brow" data-s="1" d="M66 45.5 Q74 42.5 81 47" fill="none" stroke="${T.hair}" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M58.5 70 Q60 75 62.5 73.6" fill="none" stroke="${T.shade}" stroke-width="2.2" stroke-linecap="round"/>
    <path class="mouth" fill="${T.lip}"/>
    <g clip-path="url(#${id}m)"><ellipse class="tongue" cx="60" fill="#ff7f97"/><rect class="teeth" fill="#fff" rx="1.5"/></g>
    <path class="smile" fill="none" stroke="${T.lip}" stroke-width="2.6" stroke-linecap="round"/>
    <g class="hairfront">
      <path d="M30 56 C27 34 41 18 61 18 C80 18 93 31 90 55 C88 47 86 42 83 38 C78 44 70 47 61 46 C66 43 68 39 68 35 C62 40 52 44 41 45 C38 48 34 52 30 56 Z" fill="${T.hair}"/>
      <path d="M41 45 C44 37 52 30 63 27 C57 32 54 37 53 42 Z" fill="${T.hairHi}" opacity=".9"/>
      <path d="M80 26 C86 31 90 40 90 52 C90 64 88 76 85 84 C84 74 84 62 82 50 C81 41 80 33 80 26 Z" fill="${T.streak}"/>
    </g>
  </g>
  ${head?'':`<g class="arm">
    <path d="M26 141 C27 132 33 125 43 121 C47 120 52 122 54 126 C50 131 46 136 44 141 Z" fill="${T.top}"/><path d="M33 130 C37 126 41 124 45 123" stroke="${T.topHi}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <g class="mic"><rect x="47" y="112" width="6" height="26" rx="3" fill="${INK}" transform="rotate(14 50 112)"/><circle cx="51.5" cy="106" r="7.5" fill="#bdb6cf"/><circle cx="51.5" cy="106" r="7.5" fill="none" stroke="#8e86a6" stroke-width="1"/><path d="M45.5 103 L57.5 103 M44.5 106 L58.5 106 M45.5 109 L57.5 109" stroke="#8e86a6" stroke-width=".8"/></g>
    <ellipse cx="50" cy="121" rx="7" ry="6" fill="${T.skin}"/><path d="M44 120 Q50 124 56 120" stroke="${T.shade}" stroke-width="1.4" fill="none"/>
  </g>`}`;
  const q=k=>svg.querySelector(k),qa=k=>[...svg.querySelectorAll(k)];
  const b={svg,toon:true,hd:q('.hd'),eyes:qa('.eye'),pups:qa('.pup'),shut:q('.shut'),brows:qa('.brow'),mouth:q('.mouth'),tm:q('.tm'),smile:q('.smile'),
    tongue:q('.tongue'),teeth:q('.teeth'),hair:q('.hairfront'),arm:q('.arm'),seed:Math.random()*10,sm:0};
  poseToon(b,0,0,0);svg._b=b;return b;
}

export function poseToon(b,loud,lift,t){
  b.sm+=(loud-b.sm)*.22;const L=Math.max(0,Math.min(1,b.sm)),y0=80;
  // mouth: a soft smile when quiet, opening into a round "ah" as you get louder
  const open=Math.max(0,(L-.06)/.94),W=11+open*9,H=open*17;
  if(H<1.2){b.mouth.setAttribute('d','');b.tm.setAttribute('d','');b.smile.setAttribute('d',`M${60-W/2-1} ${y0-1} Q60 ${y0+4} ${60+W/2+1} ${y0-1}`);}
  else{const d=`M${60-W/2} ${y0} Q60 ${y0-2.2+open} ${60+W/2} ${y0} C${60+W/2} ${y0+H*.75} ${60+W*.28} ${y0+H} 60 ${y0+H} C${60-W*.28} ${y0+H} ${60-W/2} ${y0+H*.75} ${60-W/2} ${y0} Z`;
    b.mouth.setAttribute('d',d);b.tm.setAttribute('d',d);b.smile.setAttribute('d','');
    b.tongue.setAttribute('cy',(y0+H*.92).toFixed(1));b.tongue.setAttribute('rx',(W*.32).toFixed(1));b.tongue.setAttribute('ry',(H*.36).toFixed(1));
    b.teeth.setAttribute('x',(60-W*.34).toFixed(1));b.teeth.setAttribute('y',(y0-1.5).toFixed(1));b.teeth.setAttribute('width',(W*.68).toFixed(1));b.teeth.setAttribute('height',Math.min(3.4,H*.22).toFixed(1));}
  // eyes: blink every few seconds, squeeze shut when belting
  const blink=((t/1000+b.seed)%4.2)<.12,belt=L>.72,shut=blink||belt;
  b.eyes.forEach(e=>e.setAttribute('opacity',shut?0:1));b.shut.setAttribute('opacity',shut?1:0);
  const look=Math.sin(t/2300+b.seed)*1.2;b.pups.forEach(p=>p.setAttribute('transform',`translate(${look.toFixed(2)} 0)`));
  b.brows.forEach(br=>{const s=+br.dataset.s;br.setAttribute('transform',`translate(0 ${(-L*3.5-lift*2.5).toFixed(2)}) rotate(${(s*-5*L).toFixed(1)} ${s<0?46:74} 45)`);});
  const bob=Math.sin(t/420+b.seed)*(.4+L*1.6),tilt=Math.sin(t/1100+b.seed)*1.5-L*4;
  b.hd.setAttribute('transform',`translate(0 ${(bob-lift*2).toFixed(2)}) rotate(${tilt.toFixed(2)} 60 100)`);
  b.hair.setAttribute('transform',`translate(0 ${(Math.max(0,-bob)*.5).toFixed(2)})`);
  if(b.arm)b.arm.setAttribute('transform',`translate(0 ${(-L*3).toFixed(2)})`);
}
