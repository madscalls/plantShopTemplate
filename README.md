# Sill & Soil: plant shop website template

A website template for a market-based plant seller, by Whelk Works (React + Vite). It's built around succulents, orchids, snake plants and pothos.

- **Home** (`/`): hero, the next market date, four favorites, "Find us" (recurring markets and pop-ups), a plant-match teaser and the "Ask us" form.
- **Plant care** (`/care`): a 3-question plant match, care levels with a filter, and tips & tricks.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Make it a client's

- **Name, contact, markets, favorites, form topics:** `src/site.js`.
  - Markets find their own next date from a rule. `{ nth: 2, weekday: 2 }` means the 2nd Tuesday of every month, where weekday 0 is Sunday.
- **Plant care data, the match logic and tips:** `src/plants.js`.
- **Colors and fonts:** the top of `src/styles.css`.
  - `--ink` is the dark "soil" color used for text, buttons and the footer.
  - Taupe is only used for the drawn pots, since it's too light for text.
- **Photos:**
  1. Put them in `public/images/`.
  2. Add `photo: '/images/file.jpg'` to a favorite in `site.js`.
  3. Anything without a photo shows its line drawing.
- **Copy:** anything in `[brackets]` is a placeholder.

## Ask-us form

Set `VITE_FORM_ENDPOINT` in `.env.local` to a form service such as Formspree or Basin, and messages will arrive by email. Without it, the form only shows its thank-you message, which is handy for demos.

## Deploy

On Cloudflare Pages, use build command `npm run build` and output folder `dist`. `public/_redirects` sends `/care` to the app.

## Notes

- Pet safety on the care page follows the ASPCA toxic and non-toxic plant lists. Re-check it if you add plants.
