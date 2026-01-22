# Playwright + TypeScript automation scaffold

This project is a minimal scaffold for web automation using Playwright and TypeScript.

Getting started

1. Install dependencies

```powershell
npm install
```

2. Install Playwright browsers

```powershell
npx playwright install
```

3. Run tests

```powershell
npm test
```

Useful scripts

- `npm test` — run tests headless
- `npm run test:headed` — run tests with visible browser
- `npm run test:debug` — run tests in debug mode
- `npm run install-browsers` — install browser binaries

Files added

- `playwright.config.ts` — Playwright configuration
- `tsconfig.json` — TypeScript configuration
- `tests/example.spec.ts` — sample test
- `package.json` — scripts and devDependencies
