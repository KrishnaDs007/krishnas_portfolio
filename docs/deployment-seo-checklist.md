# Deployment SEO Checklist

Use this checklist after deploying the portfolio to `https://www.krishnadevashish.com/`.

## Google Analytics

- Create or open the GA4 property for `krishnadevashish.com`.
- Copy the web stream measurement ID. It should look like `G-XXXXXXXXXX`.
- Add it to Vercel as:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- Redeploy the site after adding the variable.
- Confirm the production page source includes `googletagmanager.com/gtag/js`.

## Vercel Environment Variables

- Save `RESEND_API_KEY` as a Sensitive environment variable in Vercel.
- If Vercel shows that the current `RESEND_API_KEY` value is visible, rotate the key in Resend first, then replace it in Vercel as Sensitive.
- Do not mark `NEXT_PUBLIC_GA_MEASUREMENT_ID` as Sensitive. It is a public browser variable and must be readable by the client bundle.
- Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` only after Google Search Console gives you the HTML meta-tag token.
- Do not mark `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` as Sensitive. The value is published in the page `<head>` by design.

## Google Search Console

- Add `https://www.krishnadevashish.com/` as a URL-prefix property.
- Choose the HTML tag verification method.
- Copy only the `content` value from the Google verification meta tag.
- Add that value in Vercel as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Redeploy and click Verify in Google Search Console.

## SPF Record

Add an SPF TXT record in the DNS provider for `krishnadevashish.com`.

If the domain only sends mail through Google Workspace/Gmail, use:

```txt
v=spf1 include:_spf.google.com ~all
```

If another mail provider is used, add that provider's SPF include before `~all`.
Keep only one SPF TXT record on the root domain.

## Recheck After Deploy

- Run SEO Site Checkup on `https://www.krishnadevashish.com/`.
- Run SEOptimer on `https://www.krishnadevashish.com/`.
- Run Seobility on `https://www.krishnadevashish.com/`.
- Verify CDN/cache warnings against response headers for `/images`, `/assets`, favicon, and Open Graph images.
