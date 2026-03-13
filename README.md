# home-assessment
# How to Run Palco First Playwright Tests

## Prerequisites

- **Node.js** 18+
- **npm** (comes with Node.js)

## Install

```bash
npm install
npx playwright install
```

Install only Chromium (faster):

```bash
npx playwright install chromium
```

## Run Tests

| Command | Description |
|--------|-------------|
| `npm run test` | Run all tests (headless) |
| `npm run test:headed` | Run with browser window visible |
| `npm run test:ui` | Open Playwright UI mode |

Run a single file:

```bash
npx playwright test tests/desktop/home.spec.ts
```

Run one browser only:

```bash
npx playwright test --project=chromium
```

## Allure Report

After running tests, generate and open the Allure report:

```bash
npm run report
```

Or manually:

```bash
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```

**Note:** Allure 3 is used; the `allure` package is included. No Java is required.

## GitHub Actions

- Workflow file: `.github/workflows/playwright.yml`
- Runs on **push** and **pull_request** to `main` or `master`
- Uses Chromium only in CI for speed
- **Artifacts:** `allure-results` and `allure-report` are uploaded so you can download them from the run summary
- On pull requests, the Allure Action posts a test summary comment

## Project Layout

- `pages/` – Page Object Model (BasePage, HomePage)
- `tests/desktop/` – Desktop tests by feature
- `playwright.config.ts` – Browsers, base URL, Allure reporter
- `allure-results/` – Raw Allure data (after test run)
- `allure-report/` – Generated HTML report (after `npm run report`)
