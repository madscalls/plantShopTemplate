// Everything a new client changes lives here (colors are at the top of styles.css,
// plant care data is in plants.js).

export const SITE = {
  name: 'Sill & Soil',
  city: '[Your City]',
  email: '[hello@yourplants.com]',
  instagram: { handle: '[@yourhandle]', href: '#' },
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
  ],
  replyTime: '[2 days]',
};

/**
 * Where the table is set up. `rule` finds the next date on its own:
 * { nth: 2, weekday: 2 } = the 2nd Tuesday of every month (weekday 0 = Sunday).
 */
export const MARKETS = [
  {
    id: 'tuesday',
    badge: 'Every 2nd Tuesday',
    name: '[Market name] Farmers Market',
    time: '[Time, e.g. 9 AM – 1 PM]',
    address: '[Street address, City]',
    rule: { nth: 2, weekday: 2 },
    tone: 'lime',
  },
  {
    id: 'friday',
    badge: 'First Fridays',
    name: '[Market name] First Friday Market',
    time: '[Time, e.g. 5 – 9 PM]',
    address: '[Street address, City]',
    rule: { nth: 1, weekday: 5 },
    tone: 'canary',
  },
];

/** The four favorites on the home page. Add `photo: '/images/…'` to swap the drawing for a photo. */
export const FAVORITES = [
  { art: 'succulent', bg: 'lime', level: 'easy', name: 'Succulents',
    text: 'Echeveria, haworthia, jade, aloe and whatever else looks good this month. Sun lovers that forgive a missed watering.' },
  { art: 'orchid', bg: 'blue', level: 'some', name: 'Orchids',
    text: 'Moth orchids in bloom, potted in bark. Easier than their reputation, and they flower again with a little patience.' },
  { art: 'snake', bg: 'celadon', level: 'easy', name: 'Snake plants',
    text: 'Tall, architectural and happy in a dim corner. Water every few weeks and mostly leave it alone.' },
  { art: 'pothos', bg: 'canary', level: 'easy', name: 'Pothos',
    text: 'Trailing vines for shelves and hanging pots. Golden, marble and neon, and fast growers in almost any light.' },
];

export const ASK_TOPICS = [
  { label: 'Find a plant', ask: 'Which plant are you looking for?', hint: 'A big snake plant, a pink echeveria, an orchid for a gift…' },
  { label: 'Care question', ask: "What's going on with your plant?", hint: 'Yellow leaves on my pothos, wrinkly succulent…' },
  { label: 'Event or pop-up', ask: 'Tell us about the event', hint: 'Date, place, how many people, favors or a pop-up table…' },
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** The next date (today or later) matching a market's rule. */
export function nextDate({ nth, weekday }, from = new Date()) {
  const today = new Date(from); today.setHours(0, 0, 0, 0);
  for (let k = 0; k < 3; k++) {
    const first = new Date(today.getFullYear(), today.getMonth() + k, 1);
    const d = new Date(first);
    d.setDate(1 + ((weekday - first.getDay() + 7) % 7) + (nth - 1) * 7);
    if (d >= today) return d;
  }
  return today;
}

export const formatDay = (d) => `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
