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

The site follows a product-and-community narrative: Extra! is the lead venture, followed by the World Cup project, a personal introduction, the AI Innovation Association and campus roles, then short notes on other explorations. The portrait sits in the personal introduction. The hero is a single-column editorial opening with a subtle background tint; it deliberately avoids age-based messaging and a separate illustration panel.

Facts come from the former public site and information supplied by Mingzhe. On 2026-10-28 he confirmed that Extra! has become a company (叙象科技), that he is Co-founder, CSO and CPO, and that its seed funding is in the millions of CNY with a valuation exceeding CNY 10 million. The page uses approximate figures and the Extra! brand because the company does not yet have an official English name. The motto retains his supplied wording.

The navigation uses a translucent CSS glass treatment, active-section indication, and a keyboard-accessible mobile menu. Functional labels are at least 14px; smaller type appears only inside decorative, aria-hidden artwork. Reduced-motion preferences disable the rotating headline. The site is static: no admin area, API, booking system, message form, or database is required.

## Visitor analytics

The site sends anonymous page views to Vercel Web Analytics. In the private Vercel dashboard, open the `mzsun-website` project and select **Analytics** to view visitors, page views, referrers, and countries. Enable Web Analytics for the project there if it is not already enabled; the Vercel dashboard setting and this code are both required. Analytics does not identify visitors by name or expose their IP addresses in the dashboard.

The locally hosted typefaces are DM Sans for reading and navigation, and Instrument Serif for narrative display. Their Open Font License texts are in `public/fonts/`.
