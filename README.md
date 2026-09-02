# Her Birthday Website

A romantic, frontend-only birthday surprise site. No backend, no database — just open `index.html` in a browser (or host it anywhere static, like GitHub Pages, Netlify, or Vercel).

## How to run it locally

Open `index.html`, or serve the folder with a simple local server:

```bash
cd birthday-website
python3 -m http.server 8000
# then open http://localhost:8000
```

## Where to put everything

### 1. Her name
Search `index.html` for `data-edit="her-name"` (and `her-name-2` through `her-name-5`) — her name appears in the hero, the letter, the gift message, the final section, and the footer. Just replace `Sarah` in each spot. There's no single variable because each spot is plain text you can word slightly differently if you want (e.g. a nickname in the footer).

### 2. Her photos
Put your images in `assets/photos/` named `neha-memory-1.jpg` through `neha-memory-6.jpg` (or update the `src` paths in `memories.html`). Missing images show a soft placeholder heart.

You can also add more/fewer cards — just copy or remove a `<button class="gallery__item">…</button>` block and update its `data-caption`.

### 3. Birthday date
Open `page.js` and update the countdown target if needed.

```js
const BIRTHDAY_DATE = new Date(2026, 11, 25, 0, 0, 0);
```

The format is `new Date(year, monthIndex, day, hour, minute)` — note **month is 0-indexed** (0 = January, 11 = December). When this date/time arrives, the countdown automatically switches to the "IT'S YOUR DAY!" message with confetti.

### 4. Birthday song
Add your audio file at `assets/birthday-song.mp3` and update the `<audio>` tag in `music.html`. A local file works reliably on GitHub Pages.

### 5. Personal message
Two messages are easy to find and edit directly in `index.html`:
- The main letter: search for `data-edit="personal-message"` in the Personal Message section.
- The gift reveal message: search for `data-edit="gift-message"` in the Surprise section.

Both preserve line breaks exactly as you type them (the CSS uses `white-space: pre-line`), so just edit the text between the tags.

## Design notes

- Fonts: **Cormorant Garamond** (display/headlines) + **Jost** (body), loaded from Google Fonts — swap the `<link>` in `index.html`'s `<head>` and the `--font-display`/`--font-body` variables in `css/style.css` if you'd like different typefaces.
- Colors, radii, and shadows are all CSS custom properties at the top of `css/style.css` under `:root` — change the palette in one place and it updates everywhere.
- Animations respect `prefers-reduced-motion`.
- Background hearts/petals and confetti are capped and cleaned up automatically so performance stays smooth on mobile.

## File structure

```
birthday-website/
├── index.html              <- login and 3-2-1 entry countdown
├── message.html
├── memories.html
├── special.html
├── countdown.html
├── gift.html
├── music.html
├── final.html
├── thank-you.html
├── style.css
├── page.js
├── assets/
│   ├── photos/          <- add memory photos here
│   └── birthday-song.mp3 <- add your song here
└── README.md
```

Happy customizing 🎁
