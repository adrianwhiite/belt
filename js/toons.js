// Toon singers: flat, rounded characters drawn in code so every part can move smoothly.
// The mouth opens with how loud you sing, the eyes blink and squeeze shut on big notes,
// the brows lift, the head bobs and tilts. Coordinates fit the Belter frame (120 x 140).
// Each singer is a recipe: skin, hair style, outfit and a few extras, all drawn by the parts below.

const INK='#1d1631';
export const TOONS={
  juno:{skin:'#f6c9a8',shade:'#e8a984',hair:'#1e1a26',hi:'#3a3346',style:'bob',streak:'#9b6bff',
    top:'jacket',c1:'#ff4fa3',c2:'#d9358a',tee:'#1d1631',pat:'studs',bolt:1,shades:'star',shadeC:'#ffd23f',ear:'bolt'},
  marco:{skin:'#e7b78f',shade:'#d39a70',hair:'#3a302c',hi:'#8d8580',style:'curly',beard:'#5b4a42',
    top:'shirt',c1:'#ff8a3d',c2:'#e06d1f',tee:'#ffe08a',pat:'flowers',shades:'aviator',shadeC:'#3fd0ff'},
  priya:{skin:'#c98d66',shade:'#b07450',hair:'#1f1715',hi:'#43332e',style:'pony',
    top:'jacket',c1:'#b48cff',c2:'#ff7ac0',tee:'#1d1631',pat:'sparkle',shades:'heart',shadeC:'#ff5fa8',ear:'star'},
  dre:{skin:'#8c5a3c',shade:'#744832',hair:'#1a1412',hi:'#33261f',style:'twists',hat:'cap',hatC:'#ffd23f',
    top:'track',c1:'#25c99a',c2:'#fbf9ff',tee:'#1d1631',chain:1,phones:'#ff5d8f',dark:1},
  simone:{skin:'#6f4530',shade:'#5a3524',hair:'#20140f',hi:'#3a271d',style:'afro',flower:'#ff5d8f',
    top:'wrap',c1:'#8f3dff',c2:'#6d22d6',tee:'#8f3dff',pat:'sparkle',ear:'bighoop',dark:1},
  june:{skin:'#f8d5bd',shade:'#eab597',hair:'#d9774a',hi:'#f0a070',style:'wavy',hat:'cowboy',hatC:'#ff8fc7',freckles:1,
    top:'fringe',c1:'#2ec4dc',c2:'#1ea3b8',tee:'#fbf9ff'},
};

const FACE='M33 52 C33 30 45 21 60 21 C75 21 87 30 87 52 L87 66 C87 86 75 98 60 98 C45 98 33 86 33 66 Z';
// simple cartoon eyes: an egg-shaped white, a big plain pupil, one highlight
function eye(cx){
  const cy=62;return `<g class="eye"><path d="M${cx} ${cy-8.4} C${cx+5.2} ${cy-8.4} ${cx+6.4} ${cy-2} ${cx+6.4} ${cy+1.4} C${cx+6.4} ${cy+5.8} ${cx+3.6} ${cy+8.2} ${cx} ${cy+8.2} C${cx-3.6} ${cy+8.2} ${cx-6.4} ${cy+5.8} ${cx-6.4} ${cy+1.4} C${cx-6.4} ${cy-2} ${cx-5.2} ${cy-8.4} ${cx} ${cy-8.4} Z" fill="#fff"/>
    <g class="pup"><ellipse cx="${cx}" cy="${cy+1.6}" rx="4" ry="5.2" fill="${INK}"/><circle cx="${cx+1.5}" cy="${cy-.6}" r="1.7" fill="#fff"/></g></g>`;
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
  cap:T=>`<path d="M32 44 C32 26 45 17 60 17 C75 17 88 26 88 44 C80 40 70 38 60 38 C50 38 40 40 32 44 Z" fill="${T.hatC}"/><path d="M32 44 C40 40 50 38 60 38 C70 38 80 40 88 44 L88 47 C80 43 70 41 60 41 C50 41 40 43 32 47 Z" fill="${INK}" opacity=".25"/><circle cx="60" cy="18" r="2.2" fill="${INK}" opacity=".35"/><path transform="translate(60 29)" d="M0 -5 L1.5 -1.6 L5 -1.4 L2.3 1 L3.1 4.6 L0 2.8 L-3.1 4.6 L-2.3 1 L-5 -1.4 L-1.5 -1.6 Z" fill="#ff5d8f"/>`,
  cowboy:T=>`<path d="M8 36 C24 46 96 46 112 36 C108 44 96 50 60 50 C24 50 12 44 8 36 Z" fill="${T.hatC}"/><path d="M34 40 C34 22 42 12 50 16 C54 12 66 12 70 16 C78 12 86 22 86 40 C72 44 48 44 34 40 Z" fill="${T.hatC}"/><path d="M34 36 C48 40 72 40 86 36 L86 40 C72 44 48 44 34 40 Z" fill="#fbf9ff"/>${[40,47,54,60,66,73,80].map(x=>`<circle cx="${x}" cy="${38.6+Math.abs(x-60)*.02}" r="1.1" fill="#7ad8ff"/>`).join('')}<path transform="translate(60 26)" d="M0 -5 L1.5 -1.6 L5 -1.4 L2.3 1 L3.1 4.6 L0 2.8 L-3.1 4.6 L-2.3 1 L-5 -1.4 L-1.5 -1.6 Z" fill="#ffd23f"/><path d="M50 16 C54 22 66 22 70 16" stroke="#a87442" stroke-width="1.4" fill="none"/>`,
};
const SHADES={ // sunglasses pushed up on the head
  star:c=>{const st=x=>`<path transform="translate(${x} 33)" d="M0 -6.5 L1.9 -2 L6.6 -1.7 L3 1.4 L4.1 6 L0 3.6 L-4.1 6 L-3 1.4 L-6.6 -1.7 L-1.9 -2 Z" fill="${c}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`;return st(48)+st(72)+`<path d="M54 33 Q60 30 66 33" stroke="${INK}" stroke-width="1.4" fill="none"/>`;},
  heart:c=>{const h=x=>`<path transform="translate(${x} 33)" d="M0 5 C-7 0 -7 -6 -3.4 -6 C-1.6 -6 0 -4.6 0 -3.2 C0 -4.6 1.6 -6 3.4 -6 C7 -6 7 0 0 5 Z" fill="${c}" stroke="${INK}" stroke-width="1.2"/>`;return h(48)+h(72)+`<path d="M54 32 Q60 30 66 32" stroke="${INK}" stroke-width="1.4" fill="none"/>`;},
  aviator:c=>`<path d="M41 30 C41 28 54 28 55 30 C55 36 50 38 47 38 C43 38 41 34 41 30 Z M65 30 C66 28 79 28 79 30 C79 34 77 38 73 38 C70 38 65 36 65 30 Z" fill="${c}" stroke="#c9a54a" stroke-width="1.4"/><path d="M55 30 Q60 28 65 30" stroke="#c9a54a" stroke-width="1.4" fill="none"/><path d="M44 31 L48 31" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>`,
};
const PAT={ // a print or some sparkle over the outfit
  studs:()=>`<pattern id="ID" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" fill="#e9e6f2"/></pattern>`,
  sparkle:()=>`<pattern id="ID" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#fff" opacity=".85"/><circle cx="6.5" cy="6.5" r=".8" fill="#ffe37a"/></pattern>`,
  flowers:()=>`<pattern id="ID" width="14" height="14" patternUnits="userSpaceOnUse"><g transform="translate(5 5)" fill="#fff6c8"><circle cx="0" cy="-2.4" r="1.8"/><circle cx="2.3" cy="-.7" r="1.8"/><circle cx="1.4" cy="2" r="1.8"/><circle cx="-1.4" cy="2" r="1.8"/><circle cx="-2.3" cy="-.7" r="1.8"/><circle r="1.3" fill="#ff5d8f"/></g><circle cx="11.5" cy="11.5" r="1.2" fill="#2fd3a0"/></pattern>`,
};
const EAR={bolt:x=>`<path transform="translate(${x} 72)" d="M1 -4 L-2.4 1 L0 1 L-1 5 L2.6 -.6 L.2 -.6 Z" fill="#ffd23f"/>`,
  bighoop:x=>`<circle cx="${x}" cy="76" r="6.5" fill="none" stroke="#f2c94c" stroke-width="2"/>`,
  hoop:x=>`<circle cx="${x}" cy="74" r="5" fill="none" stroke="#e8c15a" stroke-width="1.6"/>`,
  star:x=>`<path transform="translate(${x} 74)" d="M0 -4.2 L1.2 -1.2 L4.2 -1 L1.9 1 L2.6 4 L0 2.4 L-2.6 4 L-1.9 1 L-4.2 -1 L-1.2 -1.2 Z" fill="#f2c94c"/>`,
  pearl:x=>`<circle cx="${x}" cy="72" r="2.4" fill="#fbf6ee"/>`};
const TOP={
  jacket:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M47 105 L60 124 L73 105 Z" fill="${T.tee}"/>
    <path d="M40 105 L50 104 L60 124 L52 141 L40 141 C42 128 40 116 40 105 Z M80 105 L70 104 L60 124 L68 141 L80 141 C78 128 80 116 80 105 Z" fill="${T.c2}"/>`,
  shirt:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M50 104 L60 116 L70 104 Z" fill="${T.tee}"/>
    <path d="M44 103 L60 116 L52 122 Z M76 103 L60 116 L68 122 Z" fill="${T.c2}"/><path d="M60 118 L60 141" stroke="${T.c2}" stroke-width="1.4"/><circle cx="60" cy="126" r="1.2" fill="#fff"/><circle cx="60" cy="134" r="1.2" fill="#fff"/>`,
  hoodie:T=>`<path d="M36 108 C36 96 84 96 84 108 L84 112 L36 112 Z" fill="${T.c2}"/><path d="M10 141 C11 120 22 109 40 106 L80 106 C98 109 109 120 110 141 Z" fill="${T.c1}"/>
    <path d="M52 108 L52 124 M68 108 L68 124" stroke="${T.c2}" stroke-width="1.6" stroke-linecap="round"/><path d="M40 128 L80 128 L78 141 L42 141 Z" fill="${T.c2}" opacity=".6"/>`,
  track:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M50 104 L60 112 L70 104 Z" fill="${T.tee}"/><path d="M60 112 L60 141" stroke="${T.c2}" stroke-width="1.6"/>
    <path d="M16 141 C17 126 22 116 30 111 L34 113 C27 118 22 128 21 141 Z M104 141 C103 126 98 116 90 111 L86 113 C93 118 98 128 99 141 Z" fill="${T.c2}"/>`,
  fringe:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M47 105 L60 124 L73 105 Z" fill="${T.tee}"/>
    <path d="M40 105 L50 104 L60 124 L52 141 L40 141 C42 128 40 116 40 105 Z M80 105 L70 104 L60 124 L68 141 L80 141 C78 128 80 116 80 105 Z" fill="${T.c2}"/>
    <path d="M18 120 L16 132 M22 117 L20 130 M26 114 L25 128 M102 120 L104 132 M98 117 L100 130 M94 114 L95 128" stroke="#fbf9ff" stroke-width="1.6" stroke-linecap="round"/>`,
  wrap:T=>`<path d="M10 141 C11 120 22 109 40 105 L80 105 C98 109 109 120 110 141 Z" fill="${T.c1}"/><path d="M46 104 L60 122 L74 104 Z" fill="${T.skin}"/><path d="M46 104 L60 122 L70 141 L56 141 L52 120 Z" fill="${T.c2}"/>`,
};

export function buildToon(svg,key){
  const T=TOONS[key]||TOONS.juno,head=svg.dataset.bust==='head',id='t'+Math.random().toString(36).slice(2,8),[hb,hf]=HAIR[T.style](T),blush=T.dark?.3:.45;
  svg.innerHTML=`
  <defs><clipPath id="${id}m"><path class="tm"/></clipPath><clipPath id="${id}f"><path d="${FACE}"/></clipPath></defs>
  ${T.pat?`<defs>${PAT[T.pat]().replace('ID',id+'p')}</defs>`:''}
  ${head?'':`<g class="body">${TOP[T.top](T)}${T.pat?`<path d="M10 141 C11 120 22 109 40 105 L48 105 L60 124 L72 105 L80 105 C98 109 109 120 110 141 Z" fill="url(#${id}p)"/>`:''}
    ${T.bolt?'<path d="M62 114 L56 124 L60 124 L57 133 L65 121 L61 121 Z" fill="#ffd23f"/>':''}
    ${T.chain?'<path d="M47 106 C50 118 70 118 73 106" fill="none" stroke="#e8c15a" stroke-width="2"/>':''}
    ${T.phones?`<path d="M40 108 C42 116 78 116 80 108" fill="none" stroke="${T.phones}" stroke-width="3" stroke-linecap="round"/><ellipse cx="39" cy="107" rx="5" ry="6" fill="${T.phones}"/><ellipse cx="81" cy="107" rx="5" ry="6" fill="${T.phones}"/><ellipse cx="39" cy="107" rx="2.4" ry="3.4" fill="${INK}" opacity=".35"/><ellipse cx="81" cy="107" rx="2.4" ry="3.4" fill="${INK}" opacity=".35"/>`:''}</g>`}
  <g class="hd">
    <path d="M52 92 L68 92 L68 108 C64 111 56 111 52 108 Z" fill="${T.skin}"/>
    <path d="M52 96 C56 100 64 100 68 96 L68 102 C64 105 56 105 52 102 Z" fill="${T.shade}"/>
    ${hb}
    <ellipse cx="33" cy="64" rx="6" ry="8" fill="${T.skin}"/><ellipse cx="87" cy="64" rx="6" ry="8" fill="${T.shade}"/>
    ${T.ear?EAR[T.ear](32)+EAR[T.ear](88):''}
    <path d="${FACE}" fill="${T.skin}"/>
    <g clip-path="url(#${id}f)"><path d="M72 21 C84 26 90 40 88 62 C87 84 76 97 62 99 C74 90 80 76 80 60 C80 42 77 30 72 21 Z" fill="${T.shade}" opacity=".7"/>
      ${T.beard?`<path d="M33 66 C36 86 46 98 60 98 C74 98 84 86 87 66 C84 76 78 84 70 86 C66 83 54 83 50 86 C42 84 36 76 33 66 Z" fill="${T.beard}" opacity=".55"/>`:''}</g>
    <circle cx="43" cy="74" r="4.6" fill="#ff7f9e" opacity="${blush}"/><circle cx="77" cy="74" r="4.6" fill="#ff7f9e" opacity="${blush}"/>
    ${T.freckles?[[42,71],[45,73],[48,71],[72,71],[75,73],[78,71]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".8" fill="${T.shade}"/>`).join(''):''}
    <g class="eyes">${eye(47)}${eye(73)}</g>
    <path class="shut" d="M41 65 Q47 58.5 53 65 M67 65 Q73 58.5 79 65" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" opacity="0"/>
    <path class="cheek" d="M41 69 Q47 66.5 53 69 M67 69 Q73 66.5 79 69" fill="none" stroke="${T.shade}" stroke-width="1.6" stroke-linecap="round" opacity="0"/>
    <path class="brow" data-s="-1" d="M39 47 Q46 42.5 54 45.5" fill="none" stroke="${T.style==='wavy'?T.shade:T.hair}" stroke-width="3.2" stroke-linecap="round"/>
    <path class="brow" data-s="1" d="M66 45.5 Q74 42.5 81 47" fill="none" stroke="${T.style==='wavy'?T.shade:T.hair}" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M58.5 70 Q60 75 62.5 73.6" fill="none" stroke="${T.shade}" stroke-width="2.2" stroke-linecap="round"/>
    <path class="mouth" fill="#7a2843"/>
    <g clip-path="url(#${id}m)"><ellipse class="tongue" cx="60" fill="#ff7f97"/><rect class="teeth" fill="#fff" rx="1.5"/></g>
    <path class="smile" fill="#7a2843"/>
    ${hf}${T.hat?HAT[T.hat](T):''}${T.shades?SHADES[T.shades](T.shadeC):''}
    ${T.flower?`<g transform="translate(84 36)">${[0,72,144,216,288].map(a=>`<circle cx="${(Math.cos(a*Math.PI/180)*4.4).toFixed(1)}" cy="${(Math.sin(a*Math.PI/180)*4.4).toFixed(1)}" r="3.6" fill="${T.flower}"/>`).join('')}<circle r="2.6" fill="#ffd23f"/></g>`:''}
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

// ---- Characters with their own shapes (new direction): each draws its own head, face and body,
// and brings its own mouth, so they move differently. Ink outlines and night-club colours.
const O=`stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"`;
const MIC=(hand)=>`<g class="arm"><g class="mic"><rect x="47" y="112" width="6" height="26" rx="3" fill="${INK}" transform="rotate(14 50 112)"/><circle cx="51.5" cy="106" r="7.5" fill="#c9c3d9" ${O}/><path d="M45.5 103 L57.5 103 M44.5 106 L58.5 106 M45.5 109 L57.5 109" stroke="#8e86a6" stroke-width=".8"/></g>${hand}</g>`;
export const CHARS={
  vex:{name:'Vex',tilt:-5,bob:.6,
    draw:(id,head)=>`
    ${head?'':`<g class="body"><path d="M22 141 C24 124 34 114 48 110 L72 110 C86 114 96 124 98 141 Z" fill="#1b1822" ${O}/>
      <path d="M38 128 L46 122 L54 130 L62 121 L70 130 L78 122 L84 127" fill="none" stroke="#7dff6a" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M54 110 L54 120 M66 110 L66 120" stroke="#7dff6a" stroke-width="1.6"/></g>`}
    <g class="hd">
      <path d="M54 86 L66 86 L66 112 L54 112 Z" fill="#efd8c9" ${O}/><rect x="53" y="98" width="14" height="4" rx="1" fill="${INK}"/><path d="M60 102 L58.5 106 L61.5 106 Z" fill="#c9c3d9"/>
      <path d="M38 52 C36 30 46 16 61 16 C78 16 86 30 84 52 C86 66 84 80 80 90 L71 84 L48 84 L40 90 C36 78 36 64 38 52 Z" fill="#121018" ${O}/>
      <path d="M41 50 C41 30 49 21 60 21 C71 21 79 30 79 50 L79 66 C79 84 70 97 60 100 C50 97 41 84 41 66 Z" fill="#efd8c9" ${O}/>
      <path d="M68 24 C76 30 79 40 79 54 C78 74 72 90 62 98 C70 86 74 72 74 56 C74 42 72 32 68 24 Z" fill="#d7bba9"/>
      <g class="eyeOpen"><path d="M63 62 C66 57.5 74 57.5 77 61 C74 65.5 66 66 63 62 Z" fill="#fff"/><circle class="pup" cx="70.5" cy="61.6" r="2.6" fill="${INK}"/>
        <path d="M62 61.5 C66 56 74 56 78.5 60 L81 57.5" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M63.5 60.2 C67 58.8 73.5 58.8 76.5 60.6" stroke="#efd8c9" stroke-width="1.8" fill="none"/></g>
      <path class="eyeShut" d="M63 62 C67 64.5 73 64.5 77.5 61.5 L80.5 59.5" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round" opacity="0"/>
      <path class="brow" d="M63 52 L77 50.5" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><circle cx="78.5" cy="52.6" r="1.2" fill="#c9c3d9"/>
      <path d="M60.5 69 L59 76 L62 76" fill="none" stroke="#c9a08b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="mouth" fill="#4a1d3a" ${O}/>
      <path d="M37 54 C35 32 47 18 62 18 C68 18 73 20 76 23 C66 24 58 32 56 44 C55 56 52 66 46 74 C44 66 42 60 37 54 Z" fill="#121018" ${O}/>
      <path d="M50 26 C56 22 63 21 69 22 C60 26 56 32 54 40 Z" fill="#3b4a8a"/>
    </g>
    ${head?'':MIC('<ellipse cx="50" cy="121" rx="6.5" ry="5.5" fill="#efd8c9" '+O+'/>')}`,
    mouth:o=>{const W=7+o*6,H=1.2+o*11,x=63,y=82;return o<.08?`M${x-6} ${y} C${x-2} ${y+1.4} ${x+2} ${y+.6} ${x+6} ${y-2.2} C${x+3} ${y+1.8} ${x-2} ${y+2.6} ${x-6} ${y} Z`
      :`M${x-W/2} ${y-.6} C${x-W/4} ${y-2} ${x+W/4} ${y-2.6} ${x+W/2} ${y-1.8} C${x+W/2} ${y+H*.7} ${x+W/4} ${y+H} ${x} ${y+H} C${x-W/3} ${y+H} ${x-W/2} ${y+H*.6} ${x-W/2} ${y-.6} Z`;}},
  lou:{name:'Big Lou',tilt:2,bob:1.5,
    draw:(id,head)=>`
    ${head?'':`<g class="body"><path d="M2 141 C4 118 20 104 42 100 L78 100 C100 104 116 118 118 141 Z" fill="#7a1f2e" ${O}/>
      <path d="M48 100 L60 124 L72 100 Z" fill="#fbf6ee" ${O}/><path d="M42 100 L48 100 L60 124 L50 141 L36 141 C40 126 40 112 42 100 Z M78 100 L72 100 L60 124 L70 141 L84 141 C80 126 80 112 78 100 Z" fill="#e2b553" ${O}/>
      <path d="M52 104 L60 108 L68 104 L68 112 L60 108 L52 112 Z" fill="${INK}"/><circle cx="76" cy="116" r="3" fill="#ff5d8f"/></g>`}
    <g class="hd">
      <path d="M48 88 L72 88 L72 104 C66 108 54 108 48 104 Z" fill="#dba07a" ${O}/>
      <ellipse cx="30" cy="64" rx="6" ry="8" fill="#dba07a" ${O}/><ellipse cx="90" cy="64" rx="6" ry="8" fill="#dba07a" ${O}/>
      <path d="M32 46 C32 28 45 19 60 19 C75 19 88 28 88 46 L89 70 C89 88 77 99 60 99 C43 99 31 88 31 70 Z" fill="#e8ad84" ${O}/>
      <path d="M78 26 C86 34 88 46 88 62 C88 82 80 94 66 98 C78 88 82 76 82 60 C82 46 81 34 78 26 Z" fill="#d4946b"/>
      <path d="M32 46 C31 25 46 14 62 14 C79 14 90 25 88 46 C84 36 74 30 60 30 C48 30 38 35 32 46 Z" fill="#1d1a1a" ${O}/>
      <path d="M32 46 C32 50 33 54 34 56 L37 44 Z M88 46 C88 50 87 54 86 56 L83 44 Z" fill="#b8b2ae" ${O}/>
      <path d="M48 20 C56 17 66 17 74 20" stroke="#5d5757" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g class="eyeOpen"><ellipse cx="49" cy="60" rx="2.8" ry="3.2" fill="${INK}"/><ellipse cx="71" cy="60" rx="2.8" ry="3.2" fill="${INK}"/><circle cx="50" cy="59" r=".9" fill="#fff"/><circle cx="72" cy="59" r=".9" fill="#fff"/></g>
      <path class="eyeShut" d="M45 61 Q49 57 53 61 M67 61 Q71 57 75 61" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round" opacity="0"/>
      <path d="M41 63 L38 65 M41 60 L37.5 60 M79 63 L82 65 M79 60 L82.5 60" stroke="#b97e5a" stroke-width="1.2" stroke-linecap="round"/>
      <path class="brow" data-s="-1" d="M42 53 C45 49 52 49 55 51.5" stroke="#3a3434" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path class="brow" data-s="1" d="M65 51.5 C68 49 75 49 78 53" stroke="#3a3434" stroke-width="4.2" fill="none" stroke-linecap="round"/>
      <path class="mouth" fill="#5a1520" ${O}/>
      <ellipse cx="60" cy="69" rx="6.5" ry="5.4" fill="#d4946b" ${O}/><ellipse cx="58" cy="67.5" rx="2" ry="1.4" fill="#f2c4a2"/>
      <path d="M60 75 C53 73 46 74 42 78 C40 80 37 80 36 77 C37 82 43 83 48 80 C52 78 56 78 60 79 C64 78 68 78 72 80 C77 83 83 82 84 77 C83 80 80 80 78 78 C74 74 67 73 60 75 Z" fill="#2a2424" ${O}/>
      <path d="M58 94 Q60 95.5 62 94" stroke="#b97e5a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
    </g>
    ${head?'':MIC('<ellipse cx="50" cy="121" rx="7.5" ry="6.5" fill="#e8ad84" '+O+'/>')}`,
    mouth:o=>{const W=14+o*12,H=2+o*16,y=79;return `M${60-W/2} ${y} C${60-W/4} ${y-1} ${60+W/4} ${y-1} ${60+W/2} ${y} C${60+W/2} ${y+H*.8} ${60+W/4} ${y+H} 60 ${y+H} C${60-W/4} ${y+H} ${60-W/2} ${y+H*.8} ${60-W/2} ${y} Z`;}},
  moxie:{name:'Moxie',tilt:0,bob:1.1,
    draw:(id,head)=>`
    ${head?'':`<g class="body"><path d="M30 112 C30 98 90 98 90 112 Z" fill="#d9601a" ${O}/><path d="M14 141 C16 124 26 112 42 108 L78 108 C94 112 104 124 106 141 Z" fill="#ff7a1a" ${O}/>
      <path d="M50 108 L50 124 M70 108 L70 124" stroke="#2b2733" stroke-width="2" stroke-linecap="round"/><rect x="44" y="126" width="32" height="10" rx="3" fill="#2b2733"/><path d="M48 131 L72 131" stroke="#c6ff3d" stroke-width="2" stroke-dasharray="3 2"/></g>`}
    <g class="hd">
      <path d="M34 34 L28 12 L48 24 Z M86 34 L92 12 L72 24 Z" fill="#8f8a99" ${O}/><path d="M35 28 L32 17 L43 24 Z M85 28 L88 17 L77 24 Z" fill="#ff9fb8"/>
      <path d="M26 58 C26 34 42 22 60 22 C78 22 94 34 94 58 C94 72 88 82 80 88 C74 96 66 100 60 100 C54 100 46 96 40 88 C32 82 26 72 26 58 Z" fill="#8f8a99" ${O}/>
      <path d="M28 66 L22 70 L30 72 M92 66 L98 70 L90 72" fill="#8f8a99" ${O}/>
      <path d="M40 74 C40 66 50 64 60 64 C70 64 80 66 80 74 C80 88 70 98 60 98 C50 98 40 88 40 74 Z" fill="#ece8f2" ${O}/>
      <path d="M30 56 C36 48 48 50 54 56 C57 59 63 59 66 56 C72 50 84 48 90 56 C88 66 80 70 72 68 C66 66 64 63 60 63 C56 63 54 66 48 68 C40 70 32 66 30 56 Z" fill="#2b2733"/>
      <path d="M50 30 L54 40 M60 28 L60 40 M70 30 L66 40" stroke="#6f6a7a" stroke-width="2.2" stroke-linecap="round"/>
      <g class="eyeOpen"><circle cx="45" cy="59" r="4.6" fill="#fff"/><circle cx="75" cy="59" r="4.6" fill="#fff"/><g class="pup"><circle cx="46" cy="59.6" r="2.8" fill="${INK}"/><circle cx="76" cy="59.6" r="2.8" fill="${INK}"/></g>
        <path d="M40 56 C43 54 48 54 50 55.5 M70 55.5 C72 54 77 54 80 56" stroke="#2b2733" stroke-width="2.6" stroke-linecap="round"/></g>
      <path class="eyeShut" d="M40.5 60 Q45 56 49.5 60 M70.5 60 Q75 56 79.5 60" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0"/>
      <path class="mouth" fill="#5a1530" ${O}/>
      <path d="M55 72 C55 69.5 65 69.5 65 72 C65 75 61 77 60 77 C59 77 55 75 55 72 Z" fill="${INK}"/>
      <path d="M30 40 C30 18 90 18 90 40" fill="none" stroke="#2b2733" stroke-width="4.5" stroke-linecap="round"/>
      <rect x="20" y="44" width="11" height="18" rx="5" fill="#c6ff3d" ${O}/><rect x="89" y="44" width="11" height="18" rx="5" fill="#c6ff3d" ${O}/>
    </g>
    ${head?'':MIC('<ellipse cx="50" cy="121" rx="6.5" ry="5.5" fill="#8f8a99" '+O+'/>')}`,
    mouth:o=>{const y=80;if(o<.08)return `M53 ${y} C55 ${y+3} 58.5 ${y+3} 60 ${y} C61.5 ${y+3} 65 ${y+3} 67 ${y} C65 ${y+4.6} 61.5 ${y+4.4} 60 ${y+2} C58.5 ${y+4.4} 55 ${y+4.6} 53 ${y} Z`;
      const W=10+o*8,H=2+o*12;return `M${60-W/2} ${y} L${60-W/2+2} ${y+2.6} L${60-W/2+4} ${y} C${60-2} ${y+1} ${60+2} ${y+1} ${60+W/2-4} ${y} L${60+W/2-2} ${y+2.6} L${60+W/2} ${y} C${60+W/2} ${y+H*.8} ${60+W/4} ${y+H} 60 ${y+H} C${60-W/4} ${y+H} ${60-W/2} ${y+H*.8} ${60-W/2} ${y} Z`;}},
};
export function buildChar(svg,key){
  const C=CHARS[key],head=svg.dataset.bust==='head',id='c'+Math.random().toString(36).slice(2,8);svg.innerHTML=C.draw(id,head);
  const q=k=>svg.querySelector(k),qa=k=>[...svg.querySelectorAll(k)];
  const b={svg,char:C,hd:q('.hd'),open:q('.eyeOpen'),shut:q('.eyeShut'),pups:qa('.pup'),brows:qa('.brow'),mouth:q('.mouth'),arm:q('.arm'),seed:Math.random()*10,sm:0};
  poseChar(b,0,0,0);svg._b=b;return b;
}
export function poseChar(b,loud,lift,t){
  const C=b.char;b.sm+=(loud-b.sm)*.22;const L=Math.max(0,Math.min(1,b.sm)),o=Math.max(0,(L-.06)/.94);
  b.mouth.setAttribute('d',C.mouth(o));
  const blink=((t/1000+b.seed)%4.4)<.12,shut=blink||L>.72;b.open.setAttribute('opacity',shut?0:1);b.shut.setAttribute('opacity',shut?1:0);
  const look=Math.sin(t/2300+b.seed);b.pups.forEach(p=>p.setAttribute('transform',`translate(${(look*1).toFixed(2)} 0)`));
  b.brows.forEach(br=>br.setAttribute('transform',`translate(0 ${(-L*3-lift*2).toFixed(2)})`));
  const bob=Math.sin(t/420+b.seed)*(.4+L*C.bob),tilt=C.tilt+Math.sin(t/1100+b.seed)*1.4-L*3;
  b.hd.setAttribute('transform',`translate(0 ${(bob-lift*2).toFixed(2)}) rotate(${tilt.toFixed(2)} 60 100)`);
  if(b.arm)b.arm.setAttribute('transform',`translate(0 ${(-L*3).toFixed(2)})`);
}
