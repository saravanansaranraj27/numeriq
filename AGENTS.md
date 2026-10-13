<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Numeriq Agent Guide

> Instructions for AI coding agents working in the Numeriq repository — covering the commands, structure, conventions, and verification steps for a fully static Next.js mathematics workspace.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.9%2B-339933?logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-27%20passing-5fa04e?logo=node.js&logoColor=white)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-1a2b34?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)

Numeriq is a Next.js 16 / React 19 application for calculating, solving, graphing, and analyzing. It is a fully static, client-side site with no backend and no external API: every calculation runs in the browser, and the production build is exported as static files for GitHub Pages.

Read this file first, then follow the commands and conventions below. For the full feature list, see the root [`README.md`](README.md).

## Contents

- [Project overview](#project-overview)
- [Features](#features)
- [Quick start](#quick-start)
- [Working in the project](#working-in-the-project)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Conventions](#conventions)
- [Adding or changing a tool](#adding-or-changing-a-tool)
- [Testing and verification](#testing-and-verification)
- [Deployment](#deployment)
- [Boundaries](#boundaries)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Project overview

The application contains **16 workspaces** in the sidebar, all rendered by one client component, `src/components/numeriq-app.tsx`. Every calculation lives in `src/lib/math/`, and every workspace is a static route generated from the `ToolId` type in `src/types/numeriq.ts`.

| Group         | Workspaces | Tools                                                                                        |
| ------------- | :--------: | -------------------------------------------------------------------------------------------- |
| Workspace     |     1      | Home                                                                                         |
| Calculator    |     1      | Scientific Calculator                                                                        |
| Math Tools    |     6      | Equation Solver, Quadratic Solver, Statistics, Matrix Calculator, Unit Converter, Percentage |
| Graphing      |     1      | Function Plotter                                                                             |
| Advanced Math |     3      | Calculus, Complex Numbers, Vectors                                                           |
| Finance       |     3      | EMI Calculator, Compound Interest, Investment Calculator                                     |
| Application   |     1      | Settings                                                                                     |

## Features

These behaviors exist today. Keep them working when you change nearby code.

| Area               | Capabilities                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| Calculator         | Evaluates expressions from a keypad or the keyboard, with memory keys, DEG/RAD modes, and saved history        |
| Math Tools         | Solves equations, analyzes datasets, works with matrices, converts 14 unit categories, and handles percentages |
| Graphing           | Plots up to three functions on a responsive coordinate plane with an adjustable range                          |
| Advanced Math      | Provides numerical calculus, complex-number arithmetic, and vector analysis                                    |
| Finance            | Estimates loan EMI, compound interest growth, and investment value with contributions                          |
| Search             | Finds any tool from the header search by name, category, or related terms                                      |
| Guides             | Shows a "How to use" guide with steps and an example under every tool                                          |
| Theming            | Offers system, light, and dark themes through `next-themes` with 10 accent colors                              |
| Preferences        | Stores the accent color, default angle mode, and calculator history in `localStorage`                          |
| Client-Side Only   | Builds statically with `output: "export"`; no backend required                                                 |
| GitHub Pages Ready | Uses a `/numeriq` base path in production and a `gh-pages` deployment command                                  |

## Quick start

### Requirements

- Node.js 20.9 or newer, as required by Next.js 16
- npm

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

## Working in the project

1. Read the relevant guide in `node_modules/next/dist/docs/` before changing routing, configuration, or rendering code
2. Read the existing component and its math module before editing, and follow the patterns already in the file
3. Make the smallest change that solves the task
4. Run `npm test`, then `npm run lint`, then `npm run build`
5. Update `README.md` or `docs/` when behavior or commands change
6. Report any check you could not run, and say why

The development server runs at the site root and the root route renders the Home workspace:

```text
http://localhost:3000/
```

## Project structure

```text
numeriq/
├── src/
│   ├── app/
│   │   ├── [tool]/                         # Static tool routes (16 tool identifiers)
│   │   ├── layout.tsx                      # Root layout, theme provider, loading screen
│   │   ├── page.tsx                        # Renders the Home workspace
│   │   └── globals.css                     # Imports every stylesheet from styles/
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
│   │   └── math/                           # 9 calculation modules, no React
│   └── types/
│       └── numeriq.ts                      # ThemeMode, AngleMode, ToolId, ToolDefinition
│
├── styles/                                 # Per-area stylesheets
├── tests/                                  # unit, integration, quality, responsive
├── docs/
│   ├── TESTING.md                          # Test suites and verification order
│   └── VSCODE.md                           # VS Code setup and workflow
├── next.config.ts                          # Static export and /numeriq base path
├── .prettierrc.json                        # Prettier formatting configuration
├── eslint.config.mjs                       # ESLint configuration
├── tsconfig.json                           # TypeScript compiler configuration
├── package.json                            # Dependencies and npm scripts
├── AGENTS.md                               # This document
├── CLAUDE.md                               # Claude Code project context
└── README.md                               # Project documentation
```

## Technology

- [Next.js 16](https://nextjs.org/docs) — App Router, routing, and static export
- [React 19](https://react.dev/) — component UI
- [TypeScript 5](https://www.typescriptlang.org/) — typed application code, with `strict` enabled
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
npm test
npm run lint
```

### Formatting

```powershell
npx prettier --write .
npx prettier --check .
```

## Conventions

- Use the `@/*` alias for imports from `src/`
- Format with Prettier: semicolons, double quotes, trailing commas, and a print width of 100
- Keep calculations in `src/lib/math/` and keep those modules free of React. Components call the utilities; they do not reimplement the math
- Evaluate expressions with `mathjs`, and throw an `Error` with a clear message for invalid input. Components catch it and show the message
- `src/components/numeriq-app.tsx` is a client component that holds the tool titles, search terms, route paths, and "How to use" guides
- Put styles in the matching file under `styles/`. Do not use `!important`; a test fails if it appears
- Reuse the existing `localStorage` keys (`numeriq-accent`, `numeriq-angle-mode`, and `numeriq-history`) rather than adding new ones without need
- Do not add a backend, server actions, or API routes. The site is exported statically with `output: "export"`

## Adding or changing a tool

The 16 tool identifiers must stay in sync across the project. When adding, renaming, or removing a tool, update every place below:

| Step | File                                  | Change                                                                        |
| :--: | ------------------------------------- | ----------------------------------------------------------------------------- |
|  1   | `src/types/numeriq.ts`                | The `ToolId` union                                                            |
|  2   | `src/app/[tool]/page.tsx`             | The `generateStaticParams` list                                               |
|  3   | `src/components/numeriq-app.tsx`      | `titles`, `searchMap`, `routeIds`, `toolHelp`, `routePaths`, and `renderTool` |
|  4   | `src/components/layout/sidebar.tsx`   | The sidebar group entry                                                       |
|  5   | `src/components/` and `src/lib/math/` | The tool component and its utility module                                     |
|  6   | `tests/`                              | The explicit tool lists in the navigation and quality suites                  |

## Testing and verification

The suite contains **5 test files** with **27 checks**. Every check reads source files directly, so no browser is required.

| Suite       | Test file                                       | Checks |
| ----------- | ----------------------------------------------- | :----: |
| Unit        | `tests/unit/math-contracts.test.js`             |   6    |
| Integration | `tests/integration/navigation-smoke.test.js`    |   4    |
| Integration | `tests/integration/component-contracts.test.js` |   6    |
| Quality     | `tests/quality/project-quality.test.js`         |   6    |
| Responsive  | `tests/responsive/responsive-contracts.test.js` |   5    |

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

Keep new behavior covered by the matching suite under `tests/`. Do not delete or weaken a check to make it pass; fix the source it points to. See [`docs/TESTING.md`](docs/TESTING.md) for what each suite verifies.

## Deployment

The production build is a static export served from GitHub Pages under the `/numeriq` base path:

```powershell
npm run build
npx gh-pages -d out --nojekyll
```

## Boundaries

- Do not edit generated or ignored output: `.next/`, `out/`, `node_modules/`, and `next-env.d.ts`
- Do not change `output: "export"` or the `/numeriq` base path in `next.config.ts` unless the task asks for it
- Do not commit `.env*` files or secrets
- Do not add dependencies without a clear need, and run `npm install` so `package-lock.json` stays in sync
- Keep changes focused

## Troubleshooting

### Node.js version error during `npm install` or `npm run dev`

Next.js 16 requires a supported Node.js version. Check your version:

```powershell
node --version
```

Install Node.js 20.9 or newer, then run `npm install` again.

### The Next.js guides are missing from `node_modules`

Install dependencies, then read the guide in `node_modules/next/dist/docs/`:

```powershell
npm install
```

### A test fails after renaming or adding a tool

The route, type, and component checks list the tool identifiers explicitly. Follow [Adding or changing a tool](#adding-or-changing-a-tool), then run the suite again:

```powershell
npm test
```

### `npx prettier --check .` reports formatting errors

Format the project, then check it again:

```powershell
npx prettier --write .
npx prettier --check .
```

### Port 3000 is already in use

Stop the other process, or start the server on another port:

```powershell
npm run dev -- --port 3001
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
npm install
node --version
npm test
npm run lint
npm run dev
npm run build
npx prettier --write .
npx prettier --check .
npx gh-pages -d out --nojekyll
```

## Contributing

Keep changes focused and verify them before finishing a task:

```powershell
npm test
npm run lint
npm run build
```

Keep new behavior covered by the matching suite under `tests/`, and see [`docs/TESTING.md`](docs/TESTING.md) for details.

## License

This project is licensed under the MIT License.
