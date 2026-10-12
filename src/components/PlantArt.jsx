// Line drawings that stand in until real photos go in. Colors come from the palette.
const C = { ink: '#2E2A24', taupe: '#967D69', celadon: '#A8D4AD', lime: '#F2F79E', canary: '#E8EC67', paper: '#FBFBF4' };

function Pot() {
  return (
    <>
      <rect x="34" y="94" width="52" height="10" rx="3" fill={C.taupe} />
      <path d="M38 104h44l-6 28H44z" fill={C.taupe} />
    </>
  );
}

const LEAF = 'M0 0c-7-2-11 4-9 10 2 5 9 8 9 8s7-3 9-8c2-6-2-12-9-10z';
function Leaf({ x, y, r, s, fill }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d={LEAF} fill={fill} />
      <path d="M0 3v11" />
    </g>
  );
}

// [x, y, rotate, scale, fill] for the healthy pothos: trailing vines, then the leafy mound back to front
const POTHOS_VINES = [[24, 104, 40, 0.85, C.celadon], [18, 116, 20, 0.85, C.lime], [18, 128, -5, 0.8, C.celadon], [96, 104, -40, 0.85, C.celadon], [102, 116, -20, 0.85, C.lime], [102, 128, 5, 0.8, C.celadon], [53, 116, 15, 0.7, C.lime]];
const POTHOS_MOUND = [
  [36, 98, 115, 1.25, C.lime],
  [84, 98, 245, 1.25, C.lime],
  [44, 86, 140, 1.1, C.celadon],
  [76, 86, 220, 1.1, C.celadon],
  [52, 82, 165, 1.3, C.lime],
  [68, 82, 195, 1.3, C.lime],
  [60, 76, 180, 1.2, C.celadon],
  [46, 96, 145, 1.45, C.celadon],
  [74, 96, 215, 1.45, C.celadon],
  [60, 97, 180, 1.6, C.celadon],
];

const ART = {
  succulent: (
    <>
      <path d="M60 92c-12-10-14-24-2-36 12 12 10 26 2 36z" fill={C.celadon} />
      <path d="M60 92c-16 0-28-8-30-22 16-2 26 8 30 22z" fill={C.celadon} />
      <path d="M60 92c16 0 28-8 30-22-16-2-26 8-30 22z" fill={C.celadon} />
      <path d="M60 92c-8-4-12-12-8-20 8 4 10 12 8 20zM60 92c8-4 12-12 8-20-8 4-10 12-8 20z" fill={C.canary} />
      <Pot />
    </>
  ),
  snake: (
    <>
      <path d="M50 94C46 70 46 40 52 10c6 30 6 60 4 84z" fill={C.canary} />
      <path d="M62 94c0-24 4-50 12-72 4 26 0 50-6 72z" fill={C.lime} />
      <path d="M44 94c-6-16-10-34-8-52 8 16 12 34 12 52z" fill={C.lime} />
      <path d="M72 94c4-14 10-26 18-34 0 14-6 26-12 34z" fill={C.canary} />
      <Pot />
    </>
  ),
  orchid: (
    <>
      <path d="M66 92V40c0-14 10-22 22-20" />
      <circle cx="88" cy="22" r="7" fill={C.paper} />
      <circle cx="80" cy="34" r="7" fill={C.paper} />
      <circle cx="92" cy="40" r="6" fill={C.paper} />
      <path d="M58 92c-14-2-24-10-26-20 14 0 24 8 26 20zM62 92c14-2 24-8 28-18-14-2-24 6-28 18z" fill={C.celadon} />
      <Pot />
    </>
  ),
  pothos: (
    <g strokeWidth="2">
      <Pot />
      <path d="M36 100c-14 4-20 16-18 34M84 100c14 4 20 16 18 34M52 104c-4 10-2 20 2 28" />
      {POTHOS_VINES.map(([x, y, r, s, fill], i) => <Leaf key={`v${i}`} x={x} y={y} r={r} s={s} fill={fill} />)}
      {POTHOS_MOUND.map(([x, y, r, s, fill], i) => <Leaf key={`m${i}`} x={x} y={y} r={r} s={s} fill={fill} />)}
    </g>
  ),
  // a droopy, thirsty pothos: used next to the "sick plant?" form
  pothosSad: (
    <>
      <path d="M40 96c-10 6-14 18-12 32M80 96c10 6 16 16 16 30M56 92c-6-14-2-28 8-36" />
      <path d="M28 116c-6-2-8-8-4-12 4 2 6 8 4 12zM30 130c-6 0-8-6-6-10 6 2 8 6 6 10zM96 112c6-2 8-8 4-12-4 2-6 8-4 12zM96 126c6 0 8-6 6-10-6 2-8 6-6 10zM64 56c-2-6 2-12 8-12 0 6-4 10-8 12zM58 74c-6-2-8-8-4-12 4 2 6 8 4 12z" fill={C.celadon} />
      <Pot />
    </>
  ),
};

export default function PlantArt({ kind }) {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {ART[kind]}
    </svg>
  );
}
