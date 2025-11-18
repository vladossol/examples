# Copilot Instructions for AI Agents

## Project Overview
This codebase is a Playwright-based end-to-end (E2E) test automation suite for a web application, organized for both teacher and student user flows.

## Key Directories & Files
- `tests/` — Main test specs, organized by user role and feature. Naming convention: `<role>.<feature>.spec.js` (e.g., `1.0.teacher.signin.spec.js`).
- `tests/PageObjects/` — Page Object Model (POM) classes encapsulating UI interactions for modular, reusable test code.
- `tests/Utilities/` — Helper modules for cookies and session management per user type.
- `auth.student.json`, `auth.teacher.json` — Store authentication credentials for test logins.
- `playwright.config.js` — Playwright configuration (test runner, browser settings, etc.).
- `README.md` — Basic setup and test run instructions.

## Developer Workflows
- **Install dependencies:** Follow Playwright's official guide ([link](https://playwright.dev/docs/intro)).
- **Run all tests:**
  ```shell
  npx playwright test
  ```
- **View reports:**
  - After running tests, open `playwright-report/index.html` for results.
- **Debugging:**
  - Use Playwright's debug mode or run individual spec files for focused debugging.

## Project-Specific Patterns
- **Page Object Model:** All UI interactions are abstracted in `PageObjects/` classes. Always use these for navigation and actions in specs.
- **Role-based test separation:** Teacher and student flows are separated by file naming and helper modules. Use the correct helpers and credentials for each role.
- **Test data:** Auth files (`auth.*.json`) provide login data. Do not hardcode credentials in specs.
- **Spec naming:** Prefixes indicate flow and role (e.g., `1.0.teacher.signin.spec.js` for teacher sign-in).

## Integration Points
- **Playwright:** All tests use Playwright APIs. Refer to `playwright.config.js` for custom settings.
- **External guides:** For advanced usage, see Playwright docs ([running tests](https://playwright.dev/docs/running-tests)).

## Example Patterns
- **Using Page Objects:**
  ```js
  const LoginPage = require('./PageObjects/login.page');
  const loginPage = new LoginPage(page);
  await loginPage.loginWithCredentials(user, pass);
  ```
- **Role-based helpers:**
  ```js
  const studentCookies = require('./Utilities/student.cookies.helper');
  await studentCookies.setStudentCookies(page);
  ```

## Conventions
- Do not mix teacher and student logic in a single spec.
- Always use helpers and page objects for setup and actions.
- Store all credentials in the appropriate JSON files.

---
For questions or unclear patterns, review the referenced files or ask for clarification.
