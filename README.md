# Mingzhe Sun — personal website

An English, single-page portfolio at [mzsun.me](https://mzsun.me). It introduces Mingzhe, presents selected projects and experience, and provides direct contact links. A small expandable note in the contact section shows his current city and next confirmed event.

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
- Current city and upcoming events: `src/now-data.json`
- Expandable current location and next event: `index.html` and `src/main.js`
- Title word rotation, navigation, and scroll progress: `src/main.js`
- Portrait and icons: `public/`

### Update the current location and next event

Edit only `src/now-data.json` for routine updates. Set `location.city` and `location.country` to what you want visitors to see. Add an object to `events` for each confirmed event. The “Where to find me” dropdown shows only the city, country, and the next event’s name, dates, and venue; notes and URLs are not displayed.

```json
{
  "title": "Event name",
  "startDate": "2026-11-15",
  "endDate": "2026-11-16",
  "place": "City or venue",
  "url": "https://example.com/event"
}
```

Use `YYYY-MM-DD` dates. `endDate` can be omitted; the event title, start date, and place should be provided. Events sort by start date and disappear after their end date (or start date when there is no end date), using the Asia/Shanghai date. Only the next confirmed event appears in the expandable note. When no upcoming events remain, it shows a short empty state. Preview edits at `http://127.0.0.1:5173/` while `npm run dev` is running.

The site follows a product-and-community narrative: Extra! is the lead venture, followed by the World Cup project, a personal introduction, the AI Innovation Association and campus roles, then short notes on other explorations. The portrait sits in the personal introduction. The hero is a single-column editorial opening with a subtle background tint; it deliberately avoids age-based messaging and a separate illustration panel.

Facts come from the former public site and information supplied by Mingzhe. On 2026-10-28 he confirmed that Extra! has become a company (叙象科技), that he is Co-founder, CSO and CPO, and that its seed funding is in the millions of CNY with a valuation exceeding CNY 10 million. The page uses approximate figures and the Extra! brand because the company does not yet have an official English name. The motto retains his supplied wording.

The navigation uses a translucent CSS glass treatment, active-section indication, and a keyboard-accessible mobile menu. Functional labels are at least 14px; smaller type appears only inside decorative, aria-hidden artwork. Reduced-motion preferences disable the rotating headline. The site is static: no admin area, API, booking system, message form, or database is required.

## Visitor analytics

The site sends anonymous page views to Vercel Web Analytics. In the private Vercel dashboard, open the `mzsun-website` project and select **Analytics** to view visitors, page views, referrers, and countries. Enable Web Analytics for the project there if it is not already enabled; the Vercel dashboard setting and this code are both required. Analytics does not identify visitors by name or expose their IP addresses in the dashboard.

The locally hosted typefaces are DM Sans for reading and navigation, and Instrument Serif for narrative display. Their Open Font License texts are in `public/fonts/`.
