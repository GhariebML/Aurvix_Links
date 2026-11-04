# AURVIX Links

[![CI](https://github.com/GhariebML/Aurvix_Links/actions/workflows/ci.yml/badge.svg)](https://github.com/GhariebML/Aurvix_Links/actions/workflows/ci.yml)

The page behind the QR code on AURVIX business cards. It is a static [Astro](https://astro.build) site that ships no client-side JavaScript.

## Edit the links

Everything is in **`src/config/links.ts`**: labels, URLs and page text.

Replace `TODO_URL` with the full address to publish a link. Until then the row shows as a non-clickable "Coming soon", and the build prints a warning naming it.

## Local development

Requires Node 24.

```bash
npm ci
```

```bash
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local dev server |
| `npm run check` | Type-checks the project |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run brand` | Regenerates the logo images, favicons and preview image |

## Replace the logo

Overwrite `AURVIX AI Solutions Logo.png`, then run:

```bash
npm run brand
```

This regenerates the emblem, the white wordmark, the favicons and the social preview image. If the new artwork has a different layout, update the crop values at the top of `scripts/generate-brand-assets.mjs`. If you have final artwork as separate files, you can instead replace `src/assets/brand/aurvix-emblem.webp` and `aurvix-wordmark.webp` directly.

## Deploy to Vercel

Build settings are already in `vercel.json`, and the Node version is set in `package.json`.

1. In Vercel, choose **Add New > Project** and import `GhariebML/Aurvix_Links`.
2. Click **Deploy**, leaving the detected settings as they are.
3. Check the `*.vercel.app` address on a phone.

Every push to `main` then deploys to production, and pull requests get preview URLs.

## Connect links.aurvix.com

This requires control of the DNS for `aurvix.com`.

1. In **Project > Settings > Domains**, add `links.aurvix.com`.
2. At your DNS provider, add the record Vercel shows. It is normally a `CNAME` for `links` pointing to the target Vercel gives you.
3. Wait until Vercel shows the domain as valid, then scan a test QR code before printing cards.

`astro.config.mjs` sets `site` to `https://links.aurvix.com`, which is used for the canonical URL and social preview image. Update it if the domain changes.

## Before printing cards

- [ ] All `TODO_URL` values in `src/config/links.ts` are replaced
- [ ] `links.aurvix.com` loads over HTTPS
- [ ] The QR code has been scanned on both iPhone and Android
- [ ] The WhatsApp button opens a chat with the correct number
