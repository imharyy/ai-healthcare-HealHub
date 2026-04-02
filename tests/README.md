# HealHub Tests

This folder contains the test strategy, runnable backend test skeleton, E2E execution plan, and SRS traceability mapping for HealHub.

## Contents

- [test_cases.md](test_cases.md) - detailed feature study, scenario catalog, and test case matrix
- [traceability_matrix.md](traceability_matrix.md) - mapping from SRS requirements to test case IDs
- [jest.config.cjs](jest.config.cjs) - Jest configuration for backend tests
- [setupTests.js](setupTests.js) - test environment bootstrap
- [integration/](integration) - runnable Jest + Supertest integration skeletons
- [e2e/](e2e) - Playwright role-wise UI test plan

## What Is Covered

The test assets are organized around the implemented system modules:

- Authentication and session management
- Role-based authorization
- Patient, doctor, receptionist, admin, and superadmin workflows
- Appointments, queueing, and schedule management
- Medical records, prescriptions, labs, diagnostics, billing, and pharmacy
- Emergency, telemedicine, notifications, feedback, analytics, AI assistant, and triage
- Security, routing, and production behavior

## Run the Backend Test Skeleton

Install dependencies first:

```bash
npm install
```

Run the Jest + Supertest skeleton:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Test Layout

### Integration Tests

Current runnable integration skeletons live in [integration/](integration):

- [health.integration.test.js](integration/health.integration.test.js)
- [auth.integration.test.js](integration/auth.integration.test.js)
- [appointments.integration.test.js](integration/appointments.integration.test.js)

These use Supertest against the Express app exported from [server/index.js](../server/index.js).

### E2E Plan

The Playwright execution plan is documented in:

- [e2e/role_wise_playwright_plan.md](e2e/role_wise_playwright_plan.md)

It includes exact UI steps for:

- Patient flows
- Doctor flows
- Receptionist flows
- Admin and superadmin flows
- Security and session recovery checks

### Traceability

The requirement-to-test mapping is documented in:

- [traceability_matrix.md](traceability_matrix.md)

Use this matrix when adding new requirements or ensuring coverage stays aligned with the SRS.

## Current Jest Setup

The test runner is configured to use:

- `NODE_ENV=test`
- Node test environment
- Shared test setup from [setupTests.js](setupTests.js)
- Coverage output under `tests/coverage`

The server is test-safe because [server/index.js](../server/index.js) skips database connection and HTTP listening when `NODE_ENV=test`.

## How To Extend The Suite

When adding a new test:

1. Add the test case ID to [test_cases.md](test_cases.md).
2. Update [traceability_matrix.md](traceability_matrix.md) if the case covers an SRS requirement.
3. Add a runnable integration test under [integration/](integration) when the behavior is API-level.
4. Add a Playwright scenario under [e2e/](e2e) when the behavior depends on UI flow.
5. Keep the test data deterministic and role-aware.

## Recommended Next Additions

- Jest unit tests for utility modules such as queue engine, notification service, and triage helpers
- Playwright spec files for each role
- Test database bootstrap/teardown helpers
- API mocks for external services such as Gemini, email, and file storage

## Notes

- The current integration suite is intentionally a skeleton: only a few high-value assertions are executable, while many scenarios are documented as `test.todo()` placeholders.
- The repository currently has no dedicated Playwright config file. Add one when you start automating the E2E plan.
