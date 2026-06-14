# CodeTime IT Academy

The original `index.html` landing page has been separated into reusable Next.js 15 App Router components using an FSD-style structure. The contact form submits through a typed API route and appends rows to Google Sheets with the official Google Sheets API.

## File Structure

```text
src/
  app/
    api/contact/route.ts
    globals.css
    layout.tsx
    page.tsx
  views/
    home/ui/home-page.tsx
  widgets/
    header/ui/header.tsx
    hero/ui/hero.tsx
    courses-section/ui/courses-section.tsx
    advantages-section/ui/advantages-section.tsx
    results-section/ui/results-section.tsx
    mentor-section/ui/mentor-section.tsx
    contact-section/ui/contact-section.tsx
    footer/ui/footer.tsx
    bottom-navigation/ui/bottom-navigation.tsx
  features/
    contact-form/
      api/submit-contact-form.ts
      model/types.ts
      model/validation.ts
      ui/contact-form.tsx
    navigation-scrollspy/ui/navigation-scrollspy.tsx
  entities/
    advantage/model/items.ts
    course/model/items.ts
    navigation/model/items.ts
    result/model/items.ts
  shared/
    api/responses.ts
    config/site.ts
    lib/env.ts
    lib/google-sheets.ts
    ui/field-error.tsx
    ui/icon.tsx
    ui/section-heading.tsx
docs/
  google-sheets-setup.md
.env.example
```

## Architecture

- `src/app` contains Next.js App Router files and API routes.
- `src/views` composes a route-level screen. `src/pages` is avoided because it is reserved by Next.js Pages Router.
- `src/widgets` contains large page blocks migrated from `index.html`.
- `src/features` contains behavior-oriented pieces such as form submission and scrollspy navigation.
- `src/entities` stores page data models such as courses, advantages, results, and nav items.
- `src/shared` contains reusable UI primitives, config, API helpers, and infrastructure utilities.

## How It Works

The API route at `POST /api/contact` validates the same payload again on the server, creates a unique ID, and appends this row to Google Sheets:

```text
ID | Full Name | Phone | Course
```

Google Sheets integration lives in `src/shared/lib/google-sheets.ts` and uses a service account through the official `googleapis` package.
Rows are appended with `RAW` input mode so phone numbers such as `+998 90 123 45 67` stay as text instead of being interpreted as spreadsheet formulas.

The old `js/script.js` behavior is replaced by `src/features/navigation-scrollspy/ui/navigation-scrollspy.tsx`.

## Course Options

- Frontend Development
- Backend Development
- Full Stack Development
- React & Next.js
- Python Development

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

Setup instructions are in `docs/google-sheets-setup.md`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```
