// The cast: six singers drawn in code so every part can move smoothly with your voice.
//
// One style, six different people:
//   - flat shapes, no outlines, one shadow tone per colour, Belt's own palette
//   - each singer is built on a different shape (narrow, wide, round, tall...) so the
//     silhouette alone tells you who it is
//   - each has their own eyes and their own mouth, so they don't sing the same way
// Coordinates fit the Belter frame (120 x 140); the head sits inside x 16-104, y 0-96 for round badges.

const INK='#1d1631',PAPER='#fbf9ff',PINK='#ff5d8f',MINT='#3ddc97',GOLD='#ffc23d',SKY='#4cc9f0';
const f=n=>(+n).toFixed(1);

// mouth shapes
const dee=(cx,y,W,H)=>`M${f(cx-W/2)} ${f(y)} C${f(cx-W/2)} ${f(y-H*.12)} ${f(cx+W/2)} ${f(y-H*.12)} ${f(cx+W/2)} ${f(y)} C${f(cx+W/2)} ${f(y+H*.75)} ${f(cx+W*.26)} ${f(y+H)} ${f(cx)} ${f(y+H)} C${f(cx-W*.26)} ${f(y+H)} ${f(cx-W/2)} ${f(y+H*.75)} ${f(cx-W/2)} ${f(y)} Z`;
const oh=(cx,y,W,H)=>`M${f(cx)} ${f(y)} C${f(cx+W*.55)} ${f(y)} ${f(cx+W*.55)} ${f(y+H)} ${f(cx)} ${f(y+H)} C${f(cx-W*.55)} ${f(y+H)} ${f(cx-W*.55)} ${f(y)} ${f(cx)} ${f(y)} Z`;
const smile=(cx,y,W)=>`M${f(cx-W/2)} ${f(y)} Q${f(cx)} ${f(y+W*.42)} ${f(cx+W/2)} ${f(y)} Q${f(cx)} ${f(y+W*.2)} ${f(cx-W/2)} ${f(y)} Z`;
const band=(cx,y,W,h)=>`M${f(cx-W/2)} ${f(y-2)} H${f(cx+W/2)} V${f(y+h)} H${f(cx-W/2)} Z`;

const mouthParts=(id,lip)=>`<path class="mouth" fill="#4a1830" stroke="${lip||'#4a1830'}" stroke-width="${lip?2.2:1.6}" stroke-linejoin="round"/><clipPath id="${id}"><path class="mclip"/></clipPath><g clip-path="url(#${id})"><ellipse class="tongue" fill="#ff7f97"/><path class="teeth" fill="#fff"/></g>`;
const mic=skin=>`<g class="arm"><rect x="47" y="110" width="6.5" height="30" rx="3.2" fill="#2b2440" transform="rotate(12 50 112)"/><circle cx="52" cy="105" r="8" fill="#d8d3e6"/><path d="M46 102.5h12M45 105.5h14M46 108.5h12" stroke="#a8a1bd" stroke-width="1"/><rect x="43" y="116" width="15" height="11" rx="5.5" fill="${skin}"/></g>`;
const dots=(pts,r=2.9)=>pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/><circle cx="${x+1}" cy="${y-1}" r="${r*.32}" fill="#fff"/>`).join('');
const arcs=(pts,c=INK)=>`<path d="${pts.map(([x,y])=>`M${x-4.6} ${y+1.5} Q${x} ${y-3.6} ${x+4.6} ${y+1.5}`).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`;
const STAR='M0 -10 L2.9 -3.4 L10 -2.9 L4.6 1.8 L6.3 9 L0 5.2 L-6.3 9 L-4.6 1.8 L-10 -2.9 L-2.9 -3.4 Z';

export const CHARS={
  // Vex: narrow and sharp. Half-shut eyes, flat little mouth; sings like she's above it all.
  vex:{tilt:-4,bob:.5,
    draw:(id,head)=>{const sk='#f3dfd3',sh='#dcc1b3',hr='#241a3d',lid='#7a5fa8';return `
    ${head?'':`<g class="body"><path d="M40 114 C42 100 78 100 80 114 Z" fill="#17112b"/><path d="M26 141 C27 123 37 112 50 109 L70 109 C83 112 93 123 94 141 Z" fill="${hr}"/>
      <path d="M55 110 L54 124 M65 110 L66 124" stroke="${MINT}" stroke-width="2" stroke-linecap="round"/>
      <g transform="translate(77 127)"><path d="M0 5 C-7 0 -6.5 -5.5 -3 -5.5 C-1.4 -5.5 0 -4.4 0 -3 C0 -4.4 1.4 -5.5 3 -5.5 C6.5 -5.5 7 0 0 5 Z" fill="${PINK}"/><path d="M0 -3 L-1.6 -.6 L1.2 1 L-.4 4" stroke="${hr}" stroke-width="1.2" fill="none"/></g></g>`}
    <g class="hd">
      <rect x="54" y="88" width="12" height="24" fill="${sh}"/><rect x="54" y="99" width="12" height="4.5" fill="#17112b"/>${[57,60,63].map(x=>`<circle cx="${x}" cy="101.2" r="1" fill="${MINT}"/>`).join('')}
      <path d="M33 58 C29 30 43 11 60 11 C78 11 91 30 87 58 L89 93 L75 85 L45 85 L31 93 Z" fill="${hr}"/><path d="M31 93 L32.2 79 L45 85 Z M89 93 L87.8 79 L75 85 Z" fill="${MINT}"/>
      <path d="M40 56 C40 35 48 25 60 25 C72 25 80 35 80 56 L80 68 C80 85 70 96 60 96 C50 96 40 85 40 68 Z" fill="${sk}"/>
      <g class="eyeOpen"><ellipse cx="50" cy="64" rx="5.4" ry="4.8" fill="#fff"/><ellipse cx="70" cy="64" rx="5.4" ry="4.8" fill="#fff"/>
        <g class="pup"><circle cx="51.4" cy="65.4" r="2.6" fill="${INK}"/><circle cx="71.4" cy="65.4" r="2.6" fill="${INK}"/></g>
        <path d="M44.6 64 A5.4 4.8 0 0 1 55.4 64 Z M64.6 64 A5.4 4.8 0 0 1 75.4 64 Z" fill="${lid}"/><path d="M44 64 H56 M64 64 H76" stroke="${INK}" stroke-width="2" stroke-linecap="round"/></g>
      <g class="eyeShut" opacity="0"><ellipse cx="50" cy="64" rx="5.4" ry="4.8" fill="${lid}"/><ellipse cx="70" cy="64" rx="5.4" ry="4.8" fill="${lid}"/><path d="M44.8 66 Q50 69.6 55.2 66 M64.8 66 Q70 69.6 75.2 66" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/></g>
      <path class="brow" d="M45 55.5 L55 57.5 M65 57.5 L75 55.5" stroke="${hr}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M58.6 73.5 Q60 75 61.4 73.5" fill="none" stroke="${sh}" stroke-width="1.8" stroke-linecap="round"/>
      ${mouthParts(id)}
      <path d="M38 60 C35 36 46 19 62 19 C75 19 83 28 82 46 C76 37 68 33 61 35 C58 46 50 55 38 60 Z" fill="${hr}"/><path d="M82 46 C84.5 54 84 62 81.5 70 L79.5 50 Z" fill="${hr}"/>
      <path d="M52 22 C47 28 43 38 41 50 L45 47 C47 38 50 30 56 23 Z" fill="${MINT}"/>
    </g>${head?'':mic(sk)}`;},
    mouth:o=>{if(o<.1)return {d:'M56 82.5 Q60 81.2 64 82.5 Q60 82.2 56 82.5 Z'};const W=6+o*5,H=2+o*12;return {d:oh(60,81,W,H),t:[60,81+H,W*.36,H*.3]};}},

  // Big Lou: wide and square. Tiny eyes, giant moustache, and a mouth that opens like a garage door.
  lou:{tilt:2,bob:1.6,
    draw:(id,head)=>{const sk='#eaa77a',sh='#d48c5e',hr='#2a2026';return `
    ${head?'':`<g class="body"><path d="M-2 141 C0 118 16 104 42 101 L78 101 C104 104 120 118 122 141 Z" fill="#8e2440"/><path d="M49 101 L60 126 L71 101 Z" fill="${PAPER}"/>
      <path d="M42 101 L49 101 L60 126 L52 141 L34 141 C40 128 41 114 42 101 Z M78 101 L71 101 L60 126 L68 141 L86 141 C80 128 79 114 78 101 Z" fill="#6d1730"/>
      <path d="M50 104 L60 109 L70 104 L70 114 L60 109 L50 114 Z" fill="${GOLD}"/><circle cx="60" cy="109" r="2.6" fill="#e09a12"/><path d="M80 121 L85 115 L90 121 Z" fill="${PINK}"/></g>`}
    <g class="hd">
      <path d="M47 88 H73 V104 C67 108 53 108 47 104 Z" fill="${sh}"/><circle cx="28" cy="66" r="6.5" fill="${sk}"/><circle cx="92" cy="66" r="6.5" fill="${sk}"/>
      <path d="M30 50 C30 30 44 22 60 22 C76 22 90 30 90 50 L92 74 C92 90 78 100 60 100 C42 100 28 90 28 74 Z" fill="${sk}"/>
      <path d="M50 93 Q60 98 70 93" fill="none" stroke="${sh}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M29 52 C24 24 44 9 66 11 C82 12 94 24 91 50 C88 39 78 32 63 32 C50 32 37 38 29 52 Z" fill="${hr}"/><path d="M44 22 C52 16 64 15 74 18" fill="none" stroke="#5a4a58" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M29 52 L30 64 L34.5 60 L35 46 Z M91 50 L90 64 L85.5 60 L85 45 Z" fill="${hr}"/>
      <path class="brow" d="M40 52 Q47 46.5 55 51 M65 51 Q73 46.5 80 52" fill="none" stroke="${hr}" stroke-width="4.4" stroke-linecap="round"/>
      <g class="eyeOpen"><g class="pup">${dots([[48,60],[72,60]],3.1)}</g></g><g class="eyeShut" opacity="0">${arcs([[48,60],[72,60]])}</g>
      ${mouthParts(id)}
      <ellipse cx="60" cy="70" rx="7.2" ry="6" fill="${sh}"/><ellipse cx="57.6" cy="68" rx="2" ry="1.3" fill="#f5c19c"/>
      <path d="M60 76 C53 73.5 46 75 42 79 C40 81 37 81 35.5 78 C36 84 43 85.5 48.5 82 C52.5 79.5 56.5 79.5 60 81 C63.5 79.5 67.5 79.5 71.5 82 C77 85.5 84 84 84.5 78 C83 81 80 81 78 79 C74 75 67 73.5 60 76 Z" fill="${hr}"/>
    </g>${head?'':mic(sk)}`;},
    mouth:o=>{if(o<.1)return {d:smile(60,84,9)};const W=14+o*10,H=2+o*14;return {d:dee(60,81,W,H),t:[60,81+H,W*.3,H*.32]};}},

  // Moxie: a raccoon DJ. Wide head with cheek tufts, masked eyes, and little fangs when he lets rip.
  moxie:{tilt:0,bob:1.2,
    draw:(id,head)=>{const fur='#8f8a9c',dk='#2b2733';return `
    ${head?'':`<g class="body"><path d="M32 113 C32 99 88 99 88 113 Z" fill="#e06d1f"/><path d="M16 141 C18 124 28 113 43 109 L77 109 C92 113 102 124 104 141 Z" fill="#ff8a3d"/>
      <path d="M52 110 V123 M68 110 V123" stroke="${PAPER}" stroke-width="2" stroke-linecap="round"/><path d="M44 130 H76 L74 141 H46 Z" fill="#e06d1f"/></g>`}
    <g class="hd">
      <path d="M36 36 L27 11 L50 25 Z M84 36 L93 11 L70 25 Z" fill="${fur}"/><path d="M36 30 L32 18 L43 25 Z M84 30 L88 18 L77 25 Z" fill="#ff9fb8"/>
      <path d="M24 60 C24 36 42 23 60 23 C78 23 96 36 96 60 C96 66 94 70 98 76 L88 78 C84 90 72 99 60 99 C48 99 36 90 32 78 L22 76 C26 70 24 66 24 60 Z" fill="${fur}"/>
      <path d="M52 30 L55 40 M60 28 V40 M68 30 L65 40" stroke="#6f6a7c" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M28 58 C34 48 48 49 55 56 C58 58.5 62 58.5 65 56 C72 49 86 48 92 58 C90 69 81 72 72 70 C66 68.5 64 65 60 65 C56 65 54 68.5 48 70 C39 72 30 69 28 58 Z" fill="${dk}"/>
      <path d="M42 76 C42 68 50 65 60 65 C70 65 78 68 78 76 C78 89 69 97 60 97 C51 97 42 89 42 76 Z" fill="#f1edf7"/>
      <g class="eyeOpen"><circle cx="44" cy="60" r="5" fill="#fff"/><circle cx="76" cy="60" r="5" fill="#fff"/><g class="pup"><circle cx="45" cy="60.6" r="3" fill="${INK}"/><circle cx="77" cy="60.6" r="3" fill="${INK}"/><circle cx="46" cy="59.6" r="1" fill="#fff"/><circle cx="78" cy="59.6" r="1" fill="#fff"/></g></g>
      <g class="eyeShut" opacity="0">${arcs([[44,60],[76,60]],'#fff')}</g>
      ${mouthParts(id)}
      <path d="M60 77 V81.5" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/><path d="M54.5 72.5 C54.5 70 65.5 70 65.5 72.5 C65.5 75.5 61.5 78 60 78 C58.5 78 54.5 75.5 54.5 72.5 Z" fill="${INK}"/>
      <path d="M29 42 C29 17 91 17 91 42" fill="none" stroke="${dk}" stroke-width="5" stroke-linecap="round"/><rect x="17.5" y="44" width="12" height="20" rx="6" fill="${SKY}"/><rect x="90.5" y="44" width="12" height="20" rx="6" fill="${SKY}"/>
    </g>${head?'':mic(fur)}`;},
    mouth:o=>{const y=81.5;if(o<.1)return {d:`M53 ${y} Q56.5 ${y+4.5} 60 ${y} Q63.5 ${y+4.5} 67 ${y} Q63.5 ${y+3} 60 ${y+.6} Q56.5 ${y+3} 53 ${y} Z`};
      const W=10+o*8,H=2+o*11,l=60-W/2,r=60+W/2;return {d:dee(60,y,W,H),t:[60,y+H,W*.3,H*.3],teeth:`M${f(l+1)} ${y-2} h3.6 l-1.8 5.6 Z M${f(r-4.6)} ${y-2} h3.6 l-1.8 5.6 Z`};}},

  // Dot: small and round. Giant glasses, giant bun, and the biggest voice in the room.
  dot:{tilt:0,bob:2.2,
    draw:(id,head)=>{const sk='#7a4b33',sh='#633a26',hr='#ddd6ee';return `
    ${head?'':`<g class="body"><path d="M30 141 C31 126 39 116 50 113 L70 113 C81 116 89 126 90 141 Z" fill="${MINT}"/><path d="M56 113 L60 141 L64 113 Z" fill="#25b87a"/>
      ${[[49,112],[54,114.6],[60,115.6],[66,114.6],[71,112]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.3" fill="${PAPER}"/>`).join('')}</g>`}
    <g class="hd">
      <rect x="55" y="88" width="10" height="26" fill="${sh}"/>
      <circle cx="60" cy="24" r="14" fill="${hr}"/><path d="M53 23 C55 16 66 16 67 23 C67.5 27 61 28 60 24" fill="none" stroke="#bfb6d8" stroke-width="2" stroke-linecap="round"/>
      <circle cx="60" cy="66" r="27" fill="${sk}"/>
      <path d="M33 64 C31 42 44 30 60 30 C76 30 89 42 87 64 C82 49 72 41 60 41 C48 41 38 49 33 64 Z" fill="${hr}"/>
      <circle cx="33" cy="77" r="4.5" fill="none" stroke="${GOLD}" stroke-width="2.2"/><circle cx="87" cy="77" r="4.5" fill="none" stroke="${GOLD}" stroke-width="2.2"/>
      <path class="brow" d="M41 52.5 Q47 49 53 52 M67 52 Q73 49 79 52.5" fill="none" stroke="#a79fc0" stroke-width="2.6" stroke-linecap="round"/>
      <g class="eyeOpen"><g class="pup">${dots([[47,67],[73,67]],2.8)}</g></g><g class="eyeShut" opacity="0">${arcs([[47,67],[73,67]])}</g>
      <circle cx="47" cy="66" r="11" fill="#fff" fill-opacity=".16" stroke="${PINK}" stroke-width="3.2"/><circle cx="73" cy="66" r="11" fill="#fff" fill-opacity=".16" stroke="${PINK}" stroke-width="3.2"/><path d="M58 65 Q60 63 62 65" fill="none" stroke="${PINK}" stroke-width="3"/>
      <path d="M57.5 77 Q60 79.4 62.5 77" fill="none" stroke="${sh}" stroke-width="2" stroke-linecap="round"/>
      ${mouthParts(id)}
    </g>${head?'':mic(sk)}`;},
    mouth:o=>{if(o<.1)return {d:smile(60,82.5,9)};const W=8+o*12,H=2+o*10.5;return {d:oh(60,80.5,W,H),t:[60,80.5+H,W*.34,H*.3]};}},

  // Rio: the pop star. Two big puffs, star shades that never come off, and a full-teeth grin.
  rio:{tilt:3,bob:1.4,
    draw:(id,head)=>{const sk='#c68a5e',sh='#ad7248',hr='#4a2378';const sp=(x,y,s)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#fff"/>`;return `
    ${head?'':`<g class="body"><path d="M20 141 C22 124 32 113 46 110 L74 110 C88 113 98 124 100 141 Z" fill="${PINK}"/><path d="M54 109 L60 122 L66 109 Z" fill="${INK}"/>
      <path d="M46 110 L54 109 L60 122 L50 134 Z M74 110 L66 109 L60 122 L70 134 Z" fill="${GOLD}"/>${sp(31,129,1)}${sp(88,124,.8)}${sp(80,136,.6)}</g>`}
    <g class="hd">
      <circle cx="33" cy="30" r="18" fill="${hr}"/><circle cx="87" cy="30" r="18" fill="${hr}"/><circle cx="27" cy="23" r="5" fill="#6a3aa6"/><circle cx="81" cy="23" r="5" fill="#6a3aa6"/>
      <rect x="54" y="88" width="12" height="24" fill="${sh}"/><circle cx="36" cy="68" r="5.5" fill="${sk}"/><circle cx="84" cy="68" r="5.5" fill="${sk}"/>
      <circle cx="35" cy="80" r="6" fill="none" stroke="${GOLD}" stroke-width="2.2"/><circle cx="85" cy="80" r="6" fill="none" stroke="${GOLD}" stroke-width="2.2"/>
      <path d="M37 58 C37 38 47 28 60 28 C73 28 83 38 83 58 L83 68 C83 86 72 97 60 97 C48 97 37 86 37 68 Z" fill="${sk}"/>
      <path d="M37 58 C36 38 46 26 60 26 C74 26 84 38 83 58 C80 46 72 38 60 36 C48 38 40 46 37 58 Z" fill="${hr}"/>
      <ellipse cx="42" cy="42" rx="6" ry="3.6" fill="${GOLD}" transform="rotate(-40 42 42)"/><ellipse cx="78" cy="42" rx="6" ry="3.6" fill="${GOLD}" transform="rotate(40 78 42)"/>
      <path class="brow" d="M41 50 Q47 46.5 54 49.5 M66 49.5 Q73 46.5 79 50" fill="none" stroke="${hr}" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M56 62 Q60 60 64 62" fill="none" stroke="${GOLD}" stroke-width="2.4"/>
      ${[48,72].map(x=>`<path transform="translate(${x} 63)" d="${STAR}" fill="${INK}" stroke="${GOLD}" stroke-width="2.4" stroke-linejoin="round"/>`).join('')}
      <g class="eyeOpen"><path d="M44.5 62 L47.5 58.5 M68.5 62 L71.5 58.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></g>
      <g class="eyeShut" opacity="0">${sp(47,61,1)}${sp(71,61,1)}</g>
      <path d="M58 75 Q60 77 62 75" fill="none" stroke="${sh}" stroke-width="2" stroke-linecap="round"/><circle cx="71" cy="83" r="1.1" fill="#7a4a2c"/>
      ${mouthParts(id,'#d6336c')}
    </g>${head?'':mic(sk)}`;},
    mouth:o=>{const W=15+o*4,H=4.6+o*12,y=81;return {d:dee(60,y,W,H),t:[60,y+H+1,W*.3,H*.26],teeth:band(60,y,W,Math.min(3.4,H*.7))};}},

  // Buck: tall and long. Hat down low, beard up high, and a warm round mouth somewhere in the middle.
  buck:{tilt:-2,bob:1,
    draw:(id,head)=>{const sk='#f2c4a0',sh='#dfa67e',bd='#d9662b',bd2='#b94f1c',hat='#f4e6c8';return `
    ${head?'':`<g class="body"><path d="M16 141 C18 123 30 112 46 109 L74 109 C90 112 102 123 104 141 Z" fill="#4c8fd6"/><path d="M60 122 V141" stroke="#3a74b8" stroke-width="2"/><rect x="74" y="122" width="13" height="10" rx="2" fill="#3a74b8"/>
      <path d="M43 108 C50 114 70 114 77 108 L73 118 L60 127 L47 118 Z" fill="#e63950"/>${[[52,114],[60,119],[68,114],[60,112]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.1" fill="${PAPER}"/>`).join('')}</g>`}
    <g class="hd">
      <rect x="53" y="88" width="14" height="22" fill="${sh}"/><circle cx="38" cy="62" r="5" fill="${sk}"/><circle cx="82" cy="62" r="5" fill="${sk}"/>
      <path d="M40 40 C40 30 48 26 60 26 C72 26 80 30 80 40 L80 72 C80 88 70 98 60 98 C50 98 40 88 40 72 Z" fill="${sk}"/>
      <path d="M38 63 C40 68 46 73 60 73 C74 73 80 68 82 63 L83 79 C83 95 72 105 60 105 C48 105 37 95 37 79 Z" fill="${bd}"/>
      <path class="brow" d="M44 49 Q50 46 55 48.5 M65 48.5 Q70 46 76 49" fill="none" stroke="${bd2}" stroke-width="3.6" stroke-linecap="round"/>
      <g class="eyeOpen"><g class="pup">${dots([[50,55],[70,55]],2.8)}</g></g><g class="eyeShut" opacity="0">${arcs([[50,55],[70,55]])}</g>
      ${mouthParts(id)}
      <ellipse cx="60" cy="64" rx="5" ry="5.4" fill="#e8967a"/>
      <path d="M60 71 C54 68.5 47 70.5 44 75 C49 77.5 55 77 60 75 C65 77 71 77.5 76 75 C73 70.5 66 68.5 60 71 Z" fill="${bd2}"/>
      <path d="M10 31 C26 40 94 40 110 31 C106 39 92 44 60 44 C28 44 14 39 10 31 Z" fill="#d9c49c"/>
      <path d="M36 35 C35 16 43 6 51 11 C55 6 65 6 69 11 C77 6 85 16 84 35 C70 39 50 39 36 35 Z" fill="${hat}"/><path d="M51 11 C55 17 65 17 69 11" fill="none" stroke="#d9c49c" stroke-width="1.8"/>
      <path d="M36 30 C50 34 70 34 84 30 L84 35 C70 39 50 39 36 35 Z" fill="#8a5a2b"/><path transform="translate(60 33.6) scale(.42)" d="${STAR}" fill="${GOLD}"/>
    </g>${head?'':mic(sk)}`;},
    mouth:o=>{if(o<.1)return {d:smile(60,80.5,8)};const W=10+o*8,H=2+o*12,y=79.5;return {d:dee(60,y,W,H),t:[60,y+H,W*.32,H*.3],teeth:band(60,y,W*.7,Math.min(2.6,H*.3))};}},
};

export function buildChar(svg,key){
  const C=CHARS[key]||CHARS.vex,head=svg.dataset.bust==='head',id='c'+Math.random().toString(36).slice(2,8);svg.innerHTML=C.draw(id,head);
  const q=k=>svg.querySelector(k),qa=k=>[...svg.querySelectorAll(k)];
  const b={svg,char:C,hd:q('.hd'),open:q('.eyeOpen'),shut:q('.eyeShut'),pups:qa('.pup'),brows:qa('.brow'),mouth:q('.mouth'),mclip:q('.mclip'),tongue:q('.tongue'),teeth:q('.teeth'),arm:q('.arm'),seed:Math.random()*10,sm:0};
  poseChar(b,0,0,0);svg._b=b;return b;
}
export function poseChar(b,loud,lift,t){
  const C=b.char;b.sm+=(loud-b.sm)*.22;const L=Math.max(0,Math.min(1,b.sm)),o=Math.max(0,(L-.06)/.94),m=C.mouth(o);
  b.mouth.setAttribute('d',m.d);b.mclip.setAttribute('d',m.d);b.teeth.setAttribute('d',m.teeth||'');
  const tg=m.t||[0,0,0,0];b.tongue.setAttribute('cx',f(tg[0]));b.tongue.setAttribute('cy',f(tg[1]));b.tongue.setAttribute('rx',f(tg[2]));b.tongue.setAttribute('ry',f(tg[3]));
  // blink every few seconds; eyes shut on the big notes
  const shut=((t/1000+b.seed)%4.4)<.12||L>.72;b.open.setAttribute('opacity',shut?0:1);b.shut.setAttribute('opacity',shut?1:0);
  const look=Math.sin(t/2300+b.seed);b.pups.forEach(p=>p.setAttribute('transform',`translate(${f(look)} 0)`));
  b.brows.forEach(br=>br.setAttribute('transform',`translate(0 ${f(-L*3-lift*2)})`));
  const bob=Math.sin(t/420+b.seed)*(.4+L*C.bob),tilt=C.tilt+Math.sin(t/1100+b.seed)*1.4-L*3;
  b.hd.setAttribute('transform',`translate(0 ${f(bob-lift*2)}) rotate(${f(tilt)} 60 100)`);
  if(b.arm)b.arm.setAttribute('transform',`translate(0 ${f(-L*3)})`);
}
