# Sonaya Beauty Studio — Website

A premium, single-page website for Sonaya Beauty Studio (lash extensions & brow artistry,
Lagos & Enugu). Built with plain HTML5, Tailwind CSS (via CDN), and vanilla JavaScript —
no build step, no framework, no dependencies to install. That makes it a pure **static site**,
which is exactly what Render's "Static Site" hosting wants.

## What's inside

```
sonaya-beauty/
├── index.html        ← the whole site (all sections)
├── css/styles.css     ← design tokens, fonts, animations
├── js/script.js       ← nav, WhatsApp links, carousel behaviour, live notification ticker
└── README.md          ← this file
```

## Before you launch — things to personalize

1. **Social media links.** In `index.html`, search for the footer social icons
   (Instagram, TikTok, Facebook, X, Snapchat). They currently point to placeholder
   handles like `instagram.com/sonayabeautystudio` — swap each `href` for Sonaya's
   real profile URLs.
2. **WhatsApp number.** Already set to `+2347013608697`. If it ever changes, update
   the single `WHATSAPP_NUMBER` constant at the top of `js/script.js` — every
   "Book Now" button on the site pulls from that one value.
3. **"Studio Pulse" live notifications.** The bottom-left popup showing recent
   bookings ("Amara in Lagos just booked Volume Lash Set…") currently cycles through
   sample data in `js/script.js` (`pulseFeed` array), alternating Lagos and Enugu.
   It's there to show genuine social proof at a glance — replace the array with
   real recent bookings periodically, or wire it up to a real data source
   (a Google Sheet, a booking webhook, etc.) later if you want it fully live.
4. **Fonts.** You asked for the typography used on hordstake.org — that site blocks
   automated browsing, so I couldn't inspect its fonts directly. I used a premium
   editorial pairing instead: **Fraunces** (display/headings) + **Manrope** (body/UI).
   If you tell me the exact fonts hordstake.org uses, I can swap them in.
5. **Photography.** All images are real, free-to-use HD stock photography (Unsplash
   License — free for commercial use, no attribution required), hot-linked directly
   from Unsplash's CDN. For a fully custom look, replace the `src` attributes in
   `index.html` with photos of Sonaya's own work.

## Hosting on Render (Static Site)

1. Push this folder to a GitHub (or GitLab) repository.
2. In the Render dashboard, click **New → Static Site**.
3. Connect the repository.
4. Settings:
   - **Build Command:** leave blank (nothing to build)
   - **Publish Directory:** `.` (the repo root, since `index.html` lives there)
5. Click **Create Static Site**. Render will give you a live `.onrender.com` URL
   in a minute or two, and redeploy automatically on every push.

You can also drag-and-drop this folder into Render's "Deploy from a local folder"
option if you're not using Git yet, or simply open `index.html` directly in a
browser to preview it locally first.

## Notes on the build

- **Navbar** is `position: fixed` with a blur backdrop, so it stays pinned through
  scroll and gains a stronger background once you scroll past the hero.
- **8-image carousel** (right after the hero) auto-glides continuously left-to-right
  in a seamless loop and pauses on hover/focus for accessibility.
- **Book Now** buttons on every single service card deep-link straight into
  WhatsApp with a pre-written message naming that exact service.
- Respects `prefers-reduced-motion` for anyone with that OS setting enabled.
