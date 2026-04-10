# Dr. Yasser Clinics — Website

Single-page bilingual (Arabic / English) marketing site for **Dr. Yasser Al-Abbas** — Consultant Urologist & Andrologist. Pure HTML/CSS/JS with GSAP for the scroll-driven hero animation. No build step.

## Run locally

Just open `index.html` in a browser, or serve the folder over HTTP:

```bash
# Python (if installed)
python -m http.server 8080

# Node (if installed)
npx serve .
```

Then visit http://localhost:8080.

## Project structure

```
index.html
css/styles.css
js/lang.js          # AR/EN toggle
js/animations.js    # GSAP ScrollTrigger pinned hero
Images/             # logo, doctor cutouts, clinic + about photos, urology icons
```

## Editing content

- **Text**: every translatable element has `data-ar="..." data-en="..."`. Edit those values directly in `index.html`.
- **Contact details**: search `index.html` for `TODO` to find the placeholders for phone, WhatsApp, address, and hours.
- **Booking form**: currently a `mailto:` form. To use a real backend later, swap `action="mailto:..."` for a service like FormSubmit or Formspree.

## Deploying to Hostinger via GitHub

1. Push this folder to a GitHub repo.
2. In hPanel → **Websites → your domain → Git**, connect the repo and set the deploy path to `public_html`. Hostinger will pull on every push.
3. Alternatively, upload the contents of this folder directly into `public_html` via the File Manager or FTP — it's static, so there is nothing to build.

## Notes

- Fonts (Tajawal + Poppins) and GSAP load from CDNs — no local install required.
- The scroll-pin hero is disabled below 960px and when `prefers-reduced-motion: reduce` is set; the page falls back to a stacked layout on mobile.
