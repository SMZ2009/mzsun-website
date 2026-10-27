# Mingzhe Sun — personal website

An English, single-page portfolio at [mzsun.me](https://mzsun.me). It introduces Mingzhe, presents selected projects and experience, and provides direct contact links.

## Run locally

Requires Node.js 22.

```powershell
npm install
npm run dev
```

Build with `npm run build`. Vercel deploys `dist/` from the `main` branch using the existing GitHub integration and custom domain.

## Edit the site

- Content and links: `index.html`
- Layout and visual design: `src/styles.css`
- Title word rotation, navigation, and scroll progress: `src/main.js`
- Portrait and icons: `public/`

The first edition uses facts previously published on the former website and the contact details supplied for this rebuild. Project copy can be expanded as new material becomes available. The site is static: no admin area, API, booking system, message form, or database is required.

## Visitor analytics

The site sends anonymous page views to Vercel Web Analytics. In the private Vercel dashboard, open the `mzsun-website` project and select **Analytics** to view visitors, page views, referrers, and countries. Enable Web Analytics for the project there if it is not already enabled; the Vercel dashboard setting and this code are both required. Analytics does not identify visitors by name or expose their IP addresses in the dashboard.

The locally hosted typefaces are DM Sans for reading and navigation, and Instrument Serif for narrative display. Their Open Font License texts are in `public/fonts/`.
