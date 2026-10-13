# Numeriq Testing

> A professional verification pipeline for the Numeriq application — built with Node's built-in test runner, ESLint, and Prettier.

![Tests](https://img.shields.io/badge/Tests-27%20passing-5fa04e?logo=node.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.9%2B-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-1a2b34?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)

Numeriq is verified with Node's built-in test runner across four dedicated suites (unit, integration, quality, and responsive) totaling 27 checks. Prettier formatting and ESLint linting complete the pipeline.

None of these suites require a browser. Every check reads the source files directly, so the full pipeline runs the same in a terminal, in CI, or in VS Code.

## Contents

- [Test coverage](#test-coverage)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the test suite](#using-the-test-suite)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Test execution](#test-execution)
- [Test reporting](#test-reporting)
- [Formatting](#formatting)
- [Build verification](#build-verification)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Test coverage

The suite contains **5 test files** with **27 individual checks**.

### Unit — 1 test file

| Test file                           | Checks | Coverage                                     |
| ----------------------------------- | :----: | -------------------------------------------- |
| `tests/unit/math-contracts.test.js` |   6    | Math utility exports and validation messages |

Reads the modules in `src/lib/math/` directly and confirms:

- The calculator exports `evaluateExpression` and `formatNumber`, and keeps its "Expression did not produce a finite number" error
- The equation utilities export `solveLinearEquation` and `solveQuadratic`, and keep their linear-equation and non-zero coefficient `a` validation messages
- The finance utilities export functions covering EMI, compound interest, and investment calculations
- The matrix utilities export functions covering matrix, determinant, transpose, and inverse operations
- The statistics utilities export functions covering mean, median, standard deviation, and variance
- The calculus, complex, vectors, and percentage modules each exist and export operations

### Integration — 2 test files

| Test file                                       | Checks | Coverage                                                         |
| ----------------------------------------------- | :----: | ---------------------------------------------------------------- |
| `tests/integration/navigation-smoke.test.js`    |   4    | Static tool routes, the root route, and the application shell    |
| `tests/integration/component-contracts.test.js` |   6    | Component families, shared layout, and UI-to-utility connections |

**Navigation smoke** reads the routes and the application shell to confirm:

- The static tool route declares all 16 tool identifiers (`home`, `calculator`, `equation`, `quadratic`, `statistics`, `matrix`, `units`, `percentage`, `graphing`, `calculus`, `complex`, `vectors`, `emi`, `compound`, `investment`, `settings`)
- The root route imports and renders `NumeriqApp`
- The tool route imports and renders `NumeriqApp`
- The application shell imports the shared header, the shared sidebar, and the calculator

**Component contracts** read the component tree to confirm each feature ships its pieces:

- The main shell references every feature family: calculator, equation solver, quadratic solver, statistics, matrix, unit converter, function plotter, calculus, complex numbers, vectors, EMI, compound interest, investment, and settings
- The calculator family includes `calculator.tsx`, `display.tsx`, `history.tsx`, and `keypad.tsx`
- The shared `header.tsx` and `sidebar.tsx` layout components exist
- The calculator UI imports `@/lib/math/calculator`
- Each tool component has its matching utility module: equation and quadratic solvers with `equations.ts`, statistics, matrix, and percentage with their own modules
- `src/types/numeriq.ts` exports `ThemeMode`, `AngleMode`, and `ToolId`

### Quality — 1 test file

| Test file                               | Checks | Coverage                                          |
| --------------------------------------- | :----: | ------------------------------------------------- |
| `tests/quality/project-quality.test.js` |   6    | Source, configuration, and stylesheet conventions |

Scans every `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`, and `.json` source file (excluding `node_modules`, `.next`, `out`, `.git`, and `tests`) and the project configuration to confirm:

- The required directories exist: `src/app`, `src/components`, `src/lib/math`, `src/types`, and `styles`
- `next.config.ts` keeps `output: "export"` and the production `/numeriq` base path
- `package.json` is named `numeriq` and keeps the `dev` and `build` scripts
- No source file contains an `!important` CSS declaration
- All nine math utility modules exist in `src/lib/math/`
- `src/types/numeriq.ts` defines every one of the 16 route identifiers

### Responsive — 1 test file

| Test file                                       | Checks | Coverage                                         |
| ----------------------------------------------- | :----: | ------------------------------------------------ |
| `tests/responsive/responsive-contracts.test.js` |   5    | Shared layout components and breakpoint coverage |

Checks the layout components and the eight stylesheets under `styles/` together:

- The shared header and sidebar components exist
- Every declared stylesheet exists: `globals`, `layout`, `calculator`, `tools`, `advanced`, `finance`, `graphing`, and `settings`
- The combined stylesheet set defines media queries with `max-width` or `min-width`
- `styles/layout.css` carries its own responsive rules
- No responsive stylesheet relies on `!important`

## Features

| Area               | Capabilities                                                                  |
| ------------------ | ----------------------------------------------------------------------------- |
| Unit tests         | Verify the math utility modules and their validation messages                 |
| Integration tests  | Verify static routes, the root route, the app shell, and component wiring     |
| Quality tests      | Enforce source, configuration, and stylesheet conventions across the project  |
| Responsive tests   | Verify shared layout components and breakpoint coverage                       |
| Browser-free       | Runs without a browser, so it behaves the same locally, in CI, and in VS Code |
| Linting            | ESLint with the Next.js and TypeScript rule sets                              |
| Formatting         | Prettier with the project's `.prettierrc.json`                                |
| Build verification | Confirms the static production build still succeeds                           |

## Quick start

### Requirements

- Node.js 20.9 or newer, as required by Next.js 16
- npm
- A local install of the project (see the root [`README.md`](../README.md#quick-start))

### Install dependencies

```bash
npm install
```

### Verify Node.js

```bash
node --version
```

### Verify the installation

```bash
npm test
```

## Using the test suite

No development server is required. Run the checks from the project root.

1. Run `npm test` to execute the unit, integration, quality, and responsive suites together
2. Run `npm run lint` to confirm ESLint rules pass
3. Run `npx prettier --check .` to confirm formatting
4. Run `npm run build` to confirm the production build still succeeds
5. Follow the [recommended verification order](#recommended-verification-order) before opening a pull request

A successful test run currently produces:

```text
# tests 27
# pass 27
# fail 0
```

## Project structure

```text
numeriq/
├── tests/                                    # Automated test suite
│   ├── unit/
│   │   └── math-contracts.test.js            # 6 checks
│   ├── integration/
│   │   ├── navigation-smoke.test.js          # 4 checks
│   │   └── component-contracts.test.js       # 6 checks
│   ├── quality/
│   │   └── project-quality.test.js           # 6 checks
│   └── responsive/
│       └── responsive-contracts.test.js      # 5 checks
│
├── docs/
│   └── TESTING.md                            # This document
├── eslint.config.mjs                         # ESLint configuration
├── .prettierrc.json                          # Prettier configuration
├── tsconfig.json                             # TypeScript compiler configuration
└── package.json                              # Dependencies and npm scripts
```

## Technology

- [Node.js test runner](https://nodejs.org/api/test.html) (`node --test`) — unit, integration, quality, and responsive suites
- [Prettier](https://prettier.io/) — formatting
- [ESLint](https://eslint.org/) (with `eslint-config-next`) — linting
- [Next.js](https://nextjs.org/docs) — production build used for build verification

## Development commands

### Verification

```powershell
npm test
npm run lint
```

### Formatting

```powershell
npx prettier --write .
npx prettier --check .
```

### Build

```powershell
npm run build
```

## Test execution

### Run the complete suite

```powershell
npm test
```

### Run a specific test file

```powershell
node --test tests/unit/math-contracts.test.js
```

### Run tests matching a name

```powershell
node --test --test-name-pattern="navigation" tests/integration/*.test.js
```

## Test reporting

Results are printed to the terminal by Node's test runner, ending with a summary of tests, passes, and failures. Each failed check reports its assertion and location, and the command exits with a non-zero status, so the suite works directly in CI.

The suites cover utility contracts, routes, and component structure. Responsive behavior is additionally reviewed through responsive layout contracts and source-level checks. These checks do not replace real browser viewport testing, and they do not execute the calculations with sample inputs.

## Formatting

The project uses Prettier and ESLint.

Format the entire project:

```powershell
npx prettier --write .
```

Check formatting without modifying files:

```powershell
npx prettier --check .
```

Run ESLint:

```powershell
npm run lint
```

## Build verification

Create the static production build:

```powershell
npm run build
```

The exported site is written to the `out/` directory.

### Recommended verification order

```powershell
npm test
npm run lint
npm run build
```

## Troubleshooting

### Node.js version error during `npm install`

Next.js 16 requires a supported Node.js version. Check your version:

```powershell
node --version
```

Install Node.js 20.9 or newer, then run `npm install` again.

### A quality or responsive check fails

These checks enforce source conventions such as no `!important`, the static export configuration, the `/numeriq` base path, and the presence of every stylesheet and math module. Read the assertion message, fix the source it points to, and run the suite again:

```powershell
npm test
```

### A check fails after renaming or adding a tool

The route, type, and component checks list the tool identifiers explicitly. Update `src/types/numeriq.ts`, the `generateStaticParams` list in both `[tool]` routes, and the matching test, then run the suite again:

```powershell
npm test
```

### Formatting errors

Format the project, then check it again:

```powershell
npx prettier --write .
npx prettier --check .
```

### Run a single failing file

```powershell
node --test tests/quality/project-quality.test.js
```

## Complete command reference

```powershell
npm install
node --version
npm test
npm run lint
npx prettier --write .
npx prettier --check .
npm run build
node --test tests/unit/math-contracts.test.js
node --test --test-name-pattern="navigation" tests/integration/*.test.js
```

## Contributing

Run the recommended verification order before opening a pull request, and keep any new behavior covered by the matching suite under `tests/`:

```powershell
npm test
npm run lint
npm run build
```

## License

This project is licensed under the MIT License.
