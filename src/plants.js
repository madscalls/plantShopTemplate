// Care data for the Plant care page and the plant match.
// level: easy | some | fussy.  light: where it's happy.  water: low (every 2–3 weeks) | medium (about weekly) | high (needs checking).
// Pet safety follows the ASPCA toxic / non-toxic plant lists.

export const LEVELS = {
  easy: { label: 'Easy care', blurb: 'Forgives a missed watering or a dim corner.' },
  some: { label: 'Some attention', blurb: "Needs the right spot, then it's simple." },
  fussy: { label: 'Fussy', blurb: 'Rewarding, but check on it often.' },
};

export const PLANTS = [
  { name: 'Snake plant', level: 'easy', light: ['low', 'medium', 'bright'], water: 'low', toxic: true,
    lightText: 'Low to bright, no direct afternoon sun', waterText: 'Every 2–3 weeks, once the soil is dry' },
  { name: 'Pothos', level: 'easy', light: ['low', 'medium', 'bright'], water: 'medium', toxic: true,
    lightText: 'Low to bright indirect', waterText: 'When the top inch is dry, about every 1–2 weeks' },
  { name: 'Zebra haworthia', level: 'easy', light: ['medium', 'bright'], water: 'low', toxic: false,
    lightText: 'Bright, a little direct sun is fine', waterText: 'Every 2–3 weeks, once the soil is dry' },
  { name: 'Jade plant', level: 'easy', light: ['bright'], water: 'low', toxic: true,
    lightText: 'Your sunniest window', waterText: 'When the soil is dry, every 2–3 weeks' },
  { name: 'Aloe vera', level: 'easy', light: ['bright'], water: 'low', toxic: true,
    lightText: 'Bright, with some direct sun', waterText: 'Every 2–3 weeks, once the soil is dry' },
  { name: 'Echeveria', level: 'some', light: ['bright'], water: 'low', toxic: false,
    lightText: 'Lots of direct sun or it stretches', waterText: 'Soak, then let it dry out completely' },
  { name: 'Moth orchid', level: 'some', light: ['medium', 'bright'], water: 'medium', toxic: false,
    lightText: 'Bright but no direct sun', waterText: 'About weekly, when the bark is dry and roots look silvery' },
  { name: 'String of pearls', level: 'fussy', light: ['bright'], water: 'high', toxic: true,
    lightText: 'Bright indirect, a bit of morning sun', waterText: 'When the soil is dry, before the pearls wrinkle' },
];

export const QUESTIONS = [
  { key: 'light', q: 'How much light do you have?', options: [
    { value: 'low', label: 'Not much', sub: 'North window, or across the room' },
    { value: 'medium', label: 'A bright room', sub: 'Lots of daylight, little direct sun' },
    { value: 'bright', label: 'A sunny window', sub: 'Direct sun for part of the day' },
  ] },
  { key: 'water', q: 'How do you water?', options: [
    { value: 'forgetful', label: 'I forget', sub: 'Every few weeks, if I remember' },
    { value: 'weekly', label: 'About weekly', sub: 'I have a routine' },
    { value: 'fussy', label: 'I love to fuss', sub: 'I check on them every few days' },
  ] },
  { key: 'pets', q: 'Pets that nibble?', options: [
    { value: true, label: 'Yes', sub: 'Only show pet-safe plants' },
    { value: false, label: 'No', sub: 'Show everything' },
  ] },
];

const WATER_SCORE = {
  forgetful: { low: 2, medium: 0, high: -2 },
  weekly: { low: 1, medium: 2, high: 0 },
  fussy: { low: 1, medium: 1, high: 2 },
};
const LIGHT_WORDS = { low: 'low light', medium: 'medium light', bright: 'bright light' };

/** Top three plants for someone's light, watering habit and pets. */
export function matchPlants({ light, water, pets }) {
  const ws = WATER_SCORE[water];
  const ranked = PLANTS
    .filter((p) => !(pets && p.toxic))
    .map((p) => {
      const lightOk = p.light.includes(light);
      const score = (lightOk ? 3 : 0) + ws[p.water] + (water === 'forgetful' && p.level === 'easy' ? 1 : 0);
      return { ...p, lightOk, score };
    })
    .sort((a, b) => b.score - a.score);
  return {
    // The toughest low-light plants are toxic, so low light + pets gets a note.
    tough: ranked.length > 0 && !ranked[0].lightOk,
    matches: ranked.slice(0, 3).map((p) => ({
      ...p,
      fit: p.lightOk && ws[p.water] >= 1 ? 'Great match' : 'Could work',
      why: `${p.lightOk ? `Happy in ${LIGHT_WORDS[light]}.` : `Wants more light: ${p.lightText.toLowerCase()}.`} Water: ${p.waterText.toLowerCase()}.${pets ? ' Pet-safe.' : ''}`,
    })),
  };
}

export const TIPS = [
  { title: 'Holes in the pot, always.', text: "Water that can't drain rots roots. Keep a pretty pot as a sleeve and the plant in a nursery pot inside it.", tone: 'lime' },
  { title: 'Too much water is the big killer.', text: 'Push a finger into the soil before you water. Damp? Wait a few days.', tone: 'paper' },
  { title: 'Soak, drain, then wait.', text: 'Water until it runs out the bottom, empty the saucer, and let the soil dry before the next round.', tone: 'celadon' },
  { title: 'The right mix matters.', text: 'Succulents want gritty, fast-draining soil. Orchids grow in bark, not potting soil.', tone: 'canary' },
  { title: 'Read the leaves.', text: 'Wrinkly and soft means thirsty. Yellow or mushy means too wet.', tone: 'celadon' },
  { title: 'Give it a turn.', text: 'Rotate pots a quarter turn every week or two so they grow straight, not toward the window.', tone: 'canary' },
  { title: 'Water less in winter.', text: 'Growth slows when days are short, and so should the watering can.', tone: 'lime' },
  { title: 'Repot in spring, one size up.', text: "A pot that's too big holds extra wet soil. Go just one or two inches wider.", tone: 'paper' },
];
