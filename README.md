# Numeriq

> A browser-based mathematics workspace for calculating, solving, graphing, and analyzing — built with Next.js, React, TypeScript, and a fully static, client-side architecture.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![math.js](https://img.shields.io/badge/math.js-15-f58220?logo=javascript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.9%2B-339933?logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-27%20passing-5fa04e?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-0f766e)

### 🌐 [Live Demo](https://saravanansaranraj27.github.io/numeriq)

Numeriq is a Next.js / React application for everyday and advanced mathematics. It brings together a scientific calculator, equation and quadratic solvers, statistics, matrix and unit tools, a function plotter, calculus, complex numbers, vectors, and three finance calculators in a single dashboard with a persistent theme and accent color.

The application is a fully static site with no backend. All calculations run in the browser, and the production build is exported as static files for GitHub Pages deployment.

## Contents

- [Tool library](#tool-library)
- [Features](#features)
- [Quick start](#quick-start)
- [Using the app](#using-the-app)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Testing and verification](#testing-and-verification)
- [Deployment](#deployment)
- [Formatting](#formatting)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Tool library

The application contains **16 workspaces**: 15 tools in the sidebar groups plus Settings. Every workspace is a static route generated from the shared `ToolId` type in `src/types/numeriq.ts`, and every calculation lives in `src/lib/math/`. No external API is involved.

### Sidebar — 16 workspaces

Routes are shown without the base path. In production they are served under `/numeriq`, for example `/numeriq/calculator/`.

| Group         | Workspace             | Route         | Purpose                                                         |
| ------------- | --------------------- | ------------- | --------------------------------------------------------------- |
| Workspace     | Home                  | `/home`       | Dashboard with the calculator, a graph, and quick tools         |
| Calculator    | Scientific Calculator | `/calculator` | Keypad and keyboard calculator with memory and history          |
| Math Tools    | Equation Solver       | `/equation`   | Solves linear equations in `x`                                  |
| Math Tools    | Quadratic Solver      | `/quadratic`  | Finds quadratic roots and the discriminant                      |
| Math Tools    | Statistics            | `/statistics` | Descriptive statistics for a dataset                            |
| Math Tools    | Matrix Calculator     | `/matrix`     | Matrix arithmetic, determinant, transpose, and inverse          |
| Math Tools    | Unit Converter        | `/units`      | Converts between units across 14 categories                     |
| Math Tools    | Percentage Calculator | `/percentage` | Percentage of a whole, percent of a value, and change           |
| Graphing      | Function Plotter      | `/graphing`   | Plots up to three functions with an adjustable range            |
| Advanced Math | Calculus              | `/calculus`   | Numerical derivative, integral, and limit                       |
| Advanced Math | Complex Numbers       | `/complex`    | Complex arithmetic, magnitude, conjugate, and argument          |
| Advanced Math | Vectors               | `/vectors`    | Vector analysis, sum, difference, cross product, and projection |
| Finance       | EMI Calculator        | `/emi`        | Monthly payment, total payment, and total interest              |
| Finance       | Compound Interest     | `/compound`   | Future value under compounding                                  |
| Finance       | Investment Calculator | `/investment` | Future value with recurring monthly contributions               |
| Application   | Settings              | `/settings`   | Theme, accent color, and default angle mode                     |

### Scientific Calculator

| Area     | Details                                                                                      |
| -------- | -------------------------------------------------------------------------------------------- |
| Keypad   | 30 keys: digits, `+ - × ÷ ^`, `( )`, `π`, `√(`, `sin(`, `cos(`, `tan(`, `=`, `AC`, backspace |
| Memory   | `MC`, `MR`, `M+`, and `M-`, with the stored value shown beside the angle mode                |
| Angle    | `DEG` and `RAD` modes for trigonometric functions                                            |
| Keyboard | Digits, operators, parentheses, `Enter` to evaluate, `Backspace` to delete, `Esc` to clear   |
| History  | Keeps the latest 30 calculations in `localStorage`                                           |
| Engine   | Expressions are evaluated with `mathjs`; results must be finite numbers                      |

### Math Tools

| Tool                  | What it does                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Equation Solver       | Solves a linear equation such as `2x + 4 = 10`                                                                                              |
| Quadratic Solver      | Takes coefficients `a`, `b`, and `c`, then returns the discriminant and roots                                                               |
| Statistics            | Returns count, sum, mean, median, min, max, range, variance, standard deviation, Q1, Q3, and modes                                          |
| Matrix Calculator     | Runs `A + B`, `A − B`, `A × B`, `det(A)`, transpose, and inverse on matrices typed as rows                                                  |
| Unit Converter        | Converts within Length, Mass, Temperature, Area, Volume, Speed, Time, Digital storage, Pressure, Energy, Power, Angle, Force, and Frequency |
| Percentage Calculator | Computes what percent a part is of a whole, a percent of a value, and the percentage change                                                 |

### Graphing and Advanced Math

| Tool             | What it does                                                                                                                             |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Function Plotter | Plots up to 3 preset functions (`sin(x)`, `cos(x)`, `tan(x)`, `x`, `x²`, `0.1x²`, `√x`, `\|x\|`, `1/x`) with a range slider from 2 to 30 |
| Calculus         | Computes a numerical derivative at a point, a definite integral between bounds, and a limit                                              |
| Complex Numbers  | Adds, subtracts, multiplies, and divides complex values, plus magnitude, conjugate, and argument                                         |
| Vectors          | Analyzes two vectors, adds, subtracts, takes the 3D cross product, and computes the scalar projection                                    |

### Finance

| Tool                  | What it does                                                               |
| --------------------- | -------------------------------------------------------------------------- |
| EMI Calculator        | Estimates monthly payment, total payment, and total interest for a loan    |
| Compound Interest     | Projects the future value of a principal at a chosen compounding frequency |
| Investment Calculator | Projects future value from an initial amount and monthly contributions     |

### Math utility layer — 9 modules

| Module          | Exports                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `calculator.ts` | `evaluateExpression`, `formatNumber`                                                                                                            |
| `equations.ts`  | `solveLinearEquation`, `solveQuadratic`                                                                                                         |
| `statistics.ts` | `calculateStatistics`                                                                                                                           |
| `matrix.ts`     | `addMatrices`, `subtractMatrices`, `multiplyMatrices`, `determinant`, `transposeMatrix`, `inverseMatrix`, `matrixToText`                        |
| `percentage.ts` | `percentage`, `percentOf`, `percentChange`                                                                                                      |
| `calculus.ts`   | `derivative`, `integrate`, `limit`                                                                                                              |
| `complex.ts`    | `addComplex`, `subtractComplex`, `multiplyComplex`, `divideComplex`, `magnitudeComplex`, `conjugateComplex`, `argumentComplex`, `formatComplex` |
| `vectors.ts`    | `dotProduct`, `magnitude`, `angleBetween`, `addVectors`, `subtractVectors`, `crossProduct`, `projectionScalar`                                  |
| `finance.ts`    | `emi`, `compoundInterest`, `investmentFutureValue`, `loanTotals`                                                                                |

## Features

| Area               | Capabilities                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Calculator         | Evaluates expressions from a keypad or the keyboard, with memory keys, DEG/RAD modes, and saved history        |
| Math Tools         | Solves equations, analyzes datasets, works with matrices, converts 14 unit categories, and handles percentages |
| Graphing           | Plots up to three functions on a responsive coordinate plane with an adjustable range                          |
| Advanced Math      | Provides numerical calculus, complex-number arithmetic, and vector analysis                                    |
| Finance            | Estimates loan EMI, compound interest growth, and investment value with contributions                          |
| Search             | Finds any tool from the header search by name, category, or related terms                                      |
| Guides             | Shows a "How to use" guide with steps and an example under every tool                                          |
| Theming            | Offers system, light, and dark themes through `next-themes` with 10 accent colors, persisted in `localStorage` |
| Preferences        | Stores the default angle mode and accent color in `localStorage`                                               |
| Loading State      | Shows a branded loading screen that is dismissed after 800ms                                                   |
| Responsive Design  | Uses a shared header, collapsible sidebar, and app shell across every route                                    |
| Client-Side Only   | Builds statically with `output: "export"`; no backend required                                                 |
| GitHub Pages Ready | Uses a `/numeriq` base path in production and a `gh-pages` deployment command                                  |
| Automated Tests    | Runs 27 checks with Node's built-in test runner                                                                |
| Prettier + ESLint  | Provides consistent formatting and linting                                                                     |

## Quick start

### Requirements

- Node.js 20.9 or newer, as required by Next.js 16
- npm
- Visual Studio Code is recommended (see [`docs/VSCODE.md`](docs/VSCODE.md))

### Create the project

```bash
npx create-next-app@latest numeriq
cd numeriq
```

### Clone the repository

```bash
git clone https://github.com/saravanansaranraj27/numeriq.git
cd numeriq
```

### Install dependencies

```bash
npm install
```

### Add the project packages

```bash
npm install mathjs next-themes
npm install --save-dev prettier
npm install --save-dev gh-pages
```

### Configure the test script

```bash
npm pkg set "scripts.test=node --test"
npm pkg set type=module
```

### Verify Node.js

```bash
node --version
```

### Verify the installation

```bash
npm test
```

## Using the app

The development server serves the app at the site root and opens on the Home workspace.

### Start Numeriq

```powershell
npm run dev
```

The application runs at:

```text
http://localhost:3000/
```

The root route renders the Home workspace.

### Workflow

1. Open the **Home** dashboard to see the calculator, a graph, and quick links to the Equation Solver, Matrix Calculator, Statistics, and Unit Converter
2. Use the header search or the sidebar to open any tool; search matches tool names, categories, and related terms
3. Use **Scientific Calculator** with the keypad or keyboard, switch between DEG and RAD, and reuse earlier results from the history panel
4. Open **Math Tools** to solve equations, analyze datasets, work with matrices, convert units, and calculate percentages
5. Use **Function Plotter** to compare up to three functions and adjust the visible range
6. Explore **Calculus**, **Complex Numbers**, and **Vectors** under Advanced Math, and **EMI**, **Compound Interest**, and **Investment** under Finance
7. Read the **How to use** guide under each tool for steps and an example
8. Adjust theme, accent color, and the default angle mode from **Settings**; choices persist via `localStorage`

## Project structure

```text
numeriq/
├── src/
│   ├── app/
│   │   ├── [tool]/                         # Static tool routes (16 tool identifiers)
│   │   ├── layout.tsx                      # Root layout, theme provider, loading screen
│   │   ├── page.tsx                        # Renders the Home workspace
│   │   ├── globals.css                     # Imports every stylesheet from styles/
│   │   └── icon.svg                        # Application icon
│   ├── components/
│   │   ├── layout/                         # Header and Sidebar
│   │   ├── calculator/                     # Calculator, Display, History, Keypad
│   │   ├── tools/                          # Equation, Quadratic, Statistics, Matrix, Units, Percentage
│   │   ├── graphing/                       # Function Plotter
│   │   ├── advanced/                       # Calculus, Complex Numbers, Vectors
│   │   ├── finance/                        # EMI, Compound Interest, Investment
│   │   ├── settings/                       # Settings workspace
│   │   ├── icons.tsx                       # Shared icon set
│   │   └── numeriq-app.tsx                 # Application shell, search, routing, tool guides
│   ├── lib/
│   │   └── math/                           # 9 calculation modules
│   └── types/
│       └── numeriq.ts                      # ThemeMode, AngleMode, ToolId, ToolDefinition
│
├── styles/                                 # Per-area stylesheets
│   ├── globals.css
│   ├── layout.css
│   ├── calculator.css
│   ├── tools.css
│   ├── graphing.css
│   ├── advanced.css
│   ├── finance.css
│   └── settings.css
│
├── tests/
│   ├── unit/                               # Math utility contracts
│   ├── integration/                        # Navigation smoke tests and component contracts
│   ├── quality/                            # Project-wide source and configuration contracts
│   └── responsive/                         # Responsive layout contracts
│
├── docs/
│   ├── TESTING.md                          # Test suites and verification order
│   └── VSCODE.md                           # VS Code setup and workflow
├── .vscode/                                # Format-on-save and ESLint auto-fix settings
├── public/                                 # Static assets
├── .gitignore                              # Git exclusions for generated files
├── .prettierignore                         # Prettier exclusions
├── .prettierrc.json                        # Prettier formatting configuration
├── eslint.config.mjs                       # ESLint configuration
├── next.config.ts                          # Static export and /numeriq base path
├── tsconfig.json                           # TypeScript compiler configuration
├── package.json                            # Project dependencies and npm scripts
├── package-lock.json                       # Locked npm dependency versions
├── AGENTS.md                               # Guidance for AI coding agents
├── CLAUDE.md                               # Claude Code project context
└── README.md                               # Project documentation
```

## Technology

- [Next.js 16](https://nextjs.org/docs) — App Router, routing, and static export (see also [Learn Next.js](https://nextjs.org/learn))
- [React 19](https://react.dev/) — component UI
- [TypeScript 5](https://www.typescriptlang.org/) — typed application code
- [math.js](https://mathjs.org/) — expression evaluation for the calculator, equations, calculus, and plotting
- [next-themes](https://github.com/pacocoursey/next-themes) — system, light, and dark theme support
- [Node.js test runner](https://nodejs.org/api/test.html) — automated unit, integration, quality, and responsive tests
- [Prettier](https://prettier.io/) — source formatting
- [ESLint](https://eslint.org/) — linting, with `eslint-config-next`
- [`gh-pages`](https://www.npmjs.com/package/gh-pages) — static deployment to GitHub Pages

## Development commands

### Application

```powershell
npm run dev
npm run build
```

### Validation

```powershell
npm run lint
npm test
```

### Formatting

```powershell
npx prettier --write .
npx prettier --check .
```

## Testing and verification

The suite contains **5 test files** with **27 checks**. Every check reads source files directly, so no browser is required and the suite runs the same in a terminal, in CI, or in VS Code.

| Suite       | Test file                                       | Checks | Coverage                                                              |
| ----------- | ----------------------------------------------- | :----: | --------------------------------------------------------------------- |
| Unit        | `tests/unit/math-contracts.test.js`             |   6    | Exports and validation messages across the math utility modules       |
| Integration | `tests/integration/navigation-smoke.test.js`    |   4    | Static tool routes, the root route, and the application shell         |
| Integration | `tests/integration/component-contracts.test.js` |   6    | Component families, shared layout, and the UI-to-utility connections  |
| Quality     | `tests/quality/project-quality.test.js`         |   6    | Source directories, static export config, package metadata, and style |
| Responsive  | `tests/responsive/responsive-contracts.test.js` |   5    | Shared layout components, stylesheets, and media queries              |

A successful run currently produces:

```text
# tests 27
# pass 27
# fail 0
```

### Recommended verification order

```powershell
npm test
npm run lint
npm run build
```

These checks do not replace real browser viewport testing. See [`docs/TESTING.md`](docs/TESTING.md) for what each suite verifies.

## Deployment

### Deploy to GitHub Pages

Build the project and deploy the generated `out` directory:

```powershell
npm run build
npx gh-pages -d out --nojekyll
```

The `--nojekyll` flag keeps GitHub Pages from skipping the `_next` folder. The production build is exported statically and served under the `/numeriq` base path configured in `next.config.ts`.

### Manual deployment

Create a production build:

```powershell
npm run build
```

The built files are located in the `out/` directory and can be deployed to any static hosting service configured for the `/numeriq` base path.

## Formatting

The project uses Prettier and ESLint. The repository includes VS Code settings for format-on-save and ESLint auto-fix; see [`docs/VSCODE.md`](docs/VSCODE.md).

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

## Troubleshooting

### Node.js version error during `npm install` or `npm run dev`

Next.js 16 requires a supported Node.js version. Check your version:

```powershell
node --version
```

Install Node.js 20.9 or newer, then run `npm install` again.

### A tool page is blank or returns 404

The production site is served under the `/numeriq` base path. Open the Live Demo link or start from the root route:

```text
http://localhost:3000/
```

### Port 3000 is already in use

Stop the other process, or start the server on another port:

```powershell
npm run dev -- --port 3001
```

### A test fails

Read the assertion message, fix the file it points to, and run the suite again:

```powershell
npm test
```

### Formatting differs from the expected style

Format the project, then check it again:

```powershell
npx prettier --write .
npx prettier --check .
```

### Assets fail to load on GitHub Pages

GitHub Pages skips folders that start with an underscore, such as `_next`, so the exported scripts return 404 errors. Deploy with `--nojekyll` so the exported assets are served:

```powershell
npm run build
npx gh-pages -d out --nojekyll
```

Wait a minute for GitHub to publish, then hard refresh the page with `Ctrl + F5`.

## Complete command reference

```powershell
git clone https://github.com/saravanansaranraj27/numeriq.git
npm install
node --version
npx prettier --write .
npx prettier --check .
npm test
npm run lint
npm run dev
npm run build
npx gh-pages -d out --nojekyll
```

## Contributing

Bug reports, improvements, and pull requests are welcome.

Keep changes focused and verify them before opening a pull request:

```powershell
npm test
npm run lint
npm run build
```

Keep new behavior covered by the matching suite under `tests/`, and see [`docs/TESTING.md`](docs/TESTING.md) for details.

## License

This project is licensed under the MIT License.
