## PalcoFirst Playwright E2E Tests

### Prerequisites

- **Node.js** 18+
- **npm** (comes with Node.js)

### Install locally

```bash
npm install
npx playwright install chromium
```

### Run tests locally

| Command | Description |
|--------|-------------|
| `npm run test` | Run all tests (headless, Chromium only) |
| `npm run test:headed` | Run with browser window visible |
| `npm run test:ui` | Open Playwright UI mode |

Run a single file:

```bash
npx playwright test tests/desktop/home.spec.ts
```

### Allure report locally

```bash
npm run test
npm run report
```

This generates `allure-report/` and opens it in your browser.

### GitHub Actions

- Workflow: `.github/workflows/playwright.yml`
- Triggers:
  - push to `main` / `master`
  - pull requests targeting `main` / `master`
  - **manual run** via `workflow_dispatch` (“Run workflow” button in GitHub → Actions)
- Uses **Chromium only** in CI for speed.
- Always uploads two artifacts: `allure-results` and `allure-report`.
- On pull requests, the Allure Action posts a test summary comment.

### Allure report on GitHub Pages

- On every push to `main` / `master`, CI:
  - runs Playwright tests
  - generates Allure HTML into `allure-report/`
  - publishes `allure-report` to **GitHub Pages** using `upload-pages-artifact` + `deploy-pages`.
- In repo **Settings → Pages**, the source must be set to **GitHub Actions**.
- The report will then be available at:
  - `https://<github-username>.github.io/<repo-name>/`
  - or the exact URL shown for the `github-pages` environment in the Actions run.
