# Development Guideline

These conventions apply to future work in this portfolio repository.

## Writing and interface copy

- Use plain, professional language. Do not introduce emojis in project documentation, interface copy, code comments, commit messages, pull requests, or development updates for this project.
- Use text labels and the existing Lucide icons where they help users navigate or act. Give icon-only controls an accessible name.
- Keep the README and deployment checklist accurate when changing commands, environment variables, routes, or behavior.

## Architecture and code

- Keep static content in Server Components. Add client components for browser APIs, state, and interaction. Pass only the data each client component needs.
- Update case-study content in `data/projects.json`. Keep project IDs stable, and validate new asset paths and external links.
- Keep contact validation and delivery on the server. Preserve the verified sender and use the visitor's address for `Reply-To`.
- Reuse existing types, utilities, and components when they fit. Keep changes focused and avoid adding dependencies for behavior the existing stack can handle.
- Preserve keyboard access, visible focus, readable contrast, and reduced-motion behavior. Check responsive layouts when changing navigation, motion, or imagery.

## Secrets and public files

- Keep secrets in a private local environment file or the hosting provider's server-side secret settings. Commit placeholders only.
- Treat `NEXT_PUBLIC_` values and files under `public/` as public. Check new assets, examples, and screenshots for private information before committing.
- Keep visitor contact details and raw provider responses out of logs and browser errors. Return useful validation messages and safe delivery errors.

## Verification and delivery

- Use the Node.js version specified in `.nvmrc` and install from the lockfile with `npm ci`.
- Run `npm run check` before opening a pull request. Add focused regression tests for changed behavior. Use browser verification for routing, styling, motion, or interactions that depend on real layout.
- Keep the coverage scope intact. The configured gate requires 100% statements and lines and at least 98% branches and functions.
- Document deployment changes and call out external integrations that were not verified. Keep commit messages concise and describe the change they introduce.
