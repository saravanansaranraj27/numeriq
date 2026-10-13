@AGENTS.md

# Numeriq Claude Code Notes

> Project context for Claude Code in the Numeriq repository. The shared agent guide is imported from `AGENTS.md` above; this file adds only what is specific to Claude Code.

![Claude Code](https://img.shields.io/badge/Agent-Claude%20Code-d97757?logo=anthropic&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.9%2B-339933?logo=node.js&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-27%20passing-5fa04e?logo=node.js&logoColor=white)

Numeriq is a fully static, client-side mathematics workspace built with Next.js 16, React 19, TypeScript, `mathjs`, and `next-themes`. It has 16 tool workspaces, and every calculation lives in `src/lib/math/`.

Claude Code loads this file at the start of each session. The full commands, structure, and conventions are in [`AGENTS.md`](AGENTS.md); the feature list is in [`README.md`](README.md).

## Contents

- [Project context](#project-context)
- [Quick start](#quick-start)
- [Workflow](#workflow)
- [Project structure](#project-structure)
- [Development commands](#development-commands)
- [Reminders](#reminders)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Project context

| Area       | Details                                                                                |
| ---------- | -------------------------------------------------------------------------------------- |
| Framework  | Next.js 16 App Router with `output: "export"` and a `/numeriq` base path in production |
| Language   | TypeScript with `strict` enabled and the `@/*` alias for `src/`                        |
| Math       | `src/lib/math/` holds 9 modules built on `mathjs`, with no React                       |
| UI         | `src/components/numeriq-app.tsx` renders all 16 workspaces                             |
| Styles     | Per-area stylesheets in `styles/`, imported by `src/app/globals.css`                   |
| Tests      | 5 files with 27 checks that read source files directly, using `node --test`            |
| Deployment | `npm run build`, then `npx gh-pages -d out --nojekyll`                                 |

## Quick start

### Requirements

- Node.js 20.9 or newer, as required by Next.js 16
- npm

### Install dependencies

```bash
npm install
```

### Verify the installation

```bash
npm test
```

## Workflow

1. Read the relevant guide in `node_modules/next/dist/docs/` before changing Next.js routing, configuration, or rendering code
2. Read the existing component and its math module before editing, and follow the patterns already in the file
3. Make the smallest change that solves the task
4. Run `npm test`, then `npm run lint`, then `npm run build` before reporting the task as done
5. Report any check you could not run, and say why

## Project structure

```text
numeriq/
├── src/
│   ├── app/                    # Routes, root layout, and globals.css
│   ├── components/             # layout, calculator, tools, graphing, advanced, finance, settings
│   ├── lib/math/               # Calculation modules
│   └── types/numeriq.ts        # ThemeMode, AngleMode, ToolId, ToolDefinition
│
├── styles/                     # Per-area stylesheets
├── tests/                      # unit, integration, quality, responsive
├── docs/                       # TESTING.md and VSCODE.md
├── next.config.ts              # Static export and /numeriq base path
├── AGENTS.md                   # Shared agent guide, imported by this file
├── CLAUDE.md                   # This document
└── README.md                   # Project documentation
```

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

## Reminders

- Tool identifiers are listed in several files; follow the checklist in [`AGENTS.md`](AGENTS.md#adding-or-changing-a-tool) when adding or renaming a tool
- Tests read source files directly, so a renamed file or changed string can fail a check even when the app still works
- The site is static: no backend, no API routes, and the `/numeriq` base path applies in production
- Do not use `!important` in any stylesheet
- Do not edit `.next/`, `out/`, or `next-env.d.ts`

## Documentation

- [`AGENTS.md`](AGENTS.md) — shared agent guide with conventions and boundaries
- [`README.md`](README.md) — features, setup, and deployment
- [`docs/TESTING.md`](docs/TESTING.md) — test suites and verification order
- [`docs/VSCODE.md`](docs/VSCODE.md) — editor setup

## Troubleshooting

### Claude Code does not follow the project guide

Confirm the first line of this file is `@AGENTS.md` and that `AGENTS.md` sits in the same folder, then start a new session.

### A test fails after a change

Read the assertion message, fix the source it points to, and run the suite again:

```powershell
npm test
```

### Formatting or lint errors

Format the project, then run lint again:

```powershell
npx prettier --write .
npm run lint
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
npm run dev
npm test
npm run lint
npx prettier --write .
npx prettier --check .
npm run build
npx gh-pages -d out --nojekyll
```

## Contributing

Verify changes before opening a pull request:

```powershell
npm test
npm run lint
npm run build
```

Keep new behavior covered by the matching suite under `tests/`, and see [`docs/TESTING.md`](docs/TESTING.md) for details.

## License

This project is licensed under the MIT License.
