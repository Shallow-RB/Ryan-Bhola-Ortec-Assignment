# Ortec - Ryan Bhola

React/Next.js app for the Frontend Ortec Assignment.

Requirements
- Node.js (v18+ recommended)
- pnpm (recommended) or npm/yarn

Quick start (development)

1. Install dependencies

```powershell
pnpm install
```

2. Start the dev server

```powershell
pnpm dev
```

3. Open the app

Open http://localhost:3000.

```

Cypress (end-to-end) tests

Open Cypress interactive runner:

```powershell
pnpm cypress:open
```

Run headless (CI / console):

```powershell
pnpm cypress:run
```

Notes
- The app stores people in localStorage under the key `people`.
- The app fetches a random joke from https://api.chucknorris.io/jokes/random when adding a person. HTTP errors from that endpoint are treated as failures and should prevent saving the entry.


