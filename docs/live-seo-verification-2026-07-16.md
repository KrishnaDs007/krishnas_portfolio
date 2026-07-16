# Live SEO Verification - 2026-07-16

Domain checked: `https://www.krishnadevashish.com/`

## Passed Checks

- Home page returns `200`.
- Canonical/custom-domain metadata is present in the live HTML.
- `robots.txt` returns `200` and references `https://www.krishnadevashish.com/sitemap.xml`.
- `sitemap.xml` returns `200` and includes custom-domain URLs.
- Vercel is serving the site with edge cache headers.
- Representative asset cache headers are active:
  - `/images/projects/dsa-visualiser/dsa-visualiser-desktop.webp`: `public, max-age=31536000, immutable`
  - `/favicon.ico`: `public, max-age=86400, stale-while-revalidate=604800`
  - `/assets/KRISHNA-DEVASHISH.pdf`: `public, max-age=86400, stale-while-revalidate=604800`

## Still Pending

- Google Analytics is not active on production yet because `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set.
- SPF must be added in DNS for `krishnadevashish.com`.
- Re-run third-party validators after the next deployment and DNS update.
