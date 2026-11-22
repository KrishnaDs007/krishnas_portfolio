# Krishna Devashish Portfolio

A Next.js portfolio with project case studies, a downloadable résumé, and a contact form. It uses the App Router, TypeScript, Tailwind CSS, and React Email.

## Getting started

Use Node.js 22 LTS, as specified in [`.nvmrc`](.nvmrc), and npm. If your version manager supports `.nvmrc`, run `nvm use` from the repository root.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The site can run locally without provider credentials. To test contact delivery, copy [`.env.example`](.env.example) to a private `.env.local` file and fill in the relevant settings.

## Environment variables

| Variable | Where it is used | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Server, required to send email | Resend API credential. |
| `RESEND_FROM_EMAIL` | Server, required to send email | Sender address on a verified domain in production. |
| `CONTACT_TO_EMAIL` | Server, optional | Overrides the portfolio contact inbox. |
| `UPSTASH_REDIS_REST_URL` | Server, required for production contact submissions | Endpoint for shared rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Server, required for production contact submissions | Credential for the Redis endpoint. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Browser, optional | Enables Google Analytics with the visitor's analytics preference applied. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Public metadata, optional | Publishes the Google Search Console verification token. |

For local Resend testing, use `onboarding@resend.dev` as the sender and set `CONTACT_TO_EMAIL` to the address registered with the Resend account. For production, verify the sender domain in Resend. The visitor's address is used as `Reply-To`.

Store production credentials in the hosting provider's environment settings. Keep real credentials out of Git, screenshots, logs, and documentation. Variables prefixed with `NEXT_PUBLIC_` are public. Use placeholders in `.env.example`.

## Architecture

| Directory | Responsibility |
| --- | --- |
| `app/` | Routes, metadata, sitemap, robots, and server actions. |
| `components/` | Layout, portfolio sections, navigation, and the React Email template. |
| `data/` | Canonical project content in `projects.json`. |
| `hooks/` | Browser interaction logic, including section tracking. |
| `lib/` | Site configuration, project validation, contact validation, and rate limiting. |
| `public/` | Files intentionally served as public assets. |
| `scripts/` | Build-time checks, including project image validation. |

The home, résumé, and project case studies are statically rendered. Interactive sections use client components. The project grid receives a compact card model, while full case-study data stays with the server routes.

The contact server action validates submissions, applies a shared rate limit, and sends the email through Resend. On Vercel, the limit is five attempts per client IP in a ten-minute window. Other hosts use a shared bucket. The form returns a temporary delivery error when the rate limiter is unavailable in production.

## Testing and checks

| Command | Purpose |
| --- | --- |
| `npm test` | Runs Jest and React Testing Library with coverage enabled. |
| `npm run test:coverage` | Runs the suite and generates the coverage report. |
| `npm run check` | Validates project assets, runs lint and TypeScript checks, runs tests, and builds for production. |
| `npm run start` | Serves an existing production build locally. |

Coverage includes untested source files in `app`, `components`, `hooks`, and `lib`. The global gate requires 100% for statements and lines and at least 98% for branches and functions. The HTML report is written to `coverage/index.html`. GitHub Actions runs `npm run check` on pull requests and pushes to `main`.

## Deployment

Set the production environment variables before deploying. After deployment, verify the home page, a project case study, and contact delivery. If analytics is enabled, verify the pageview in GA4 and confirm that opting out prevents the analytics script from loading on the next page load.

See the [deployment checklist](docs/deployment-seo-checklist.md) for configuration and verification. See the [development guideline](guideline.md) for project conventions.
