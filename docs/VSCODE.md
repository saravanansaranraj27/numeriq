# Numeriq VS Code Setup

> A ready-to-use Visual Studio Code workspace for the Numeriq application — with Prettier format-on-save and ESLint auto-fix already configured.

![VS Code](https://img.shields.io/badge/Editor-VS%20Code-007acc?logo=visualstudiocode&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Prettier](https://img.shields.io/badge/Code%20Style-Prettier-1a2b34?logo=prettier&logoColor=white)
![ESLint](https://img.shields.io/badge/Lint-ESLint-4b32c3?logo=eslint&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.9%2B-339933?logo=node.js&logoColor=white)

Numeriq ships a `.vscode/` folder with format-on-save and ESLint auto-fix. Opening the project folder in VS Code applies the same Prettier rules as `npx prettier --check .` and the same ESLint rules as `npm run lint`, with no manual settings.

## Contents

- [Editor configuration](#editor-configuration)
- [Features](#features)
- [Quick start](#quick-start)
- [Using VS Code](#using-vs-code)
- [Project structure](#project-structure)
- [Technology](#technology)
- [Development commands](#development-commands)
- [Formatting and validation](#formatting-and-validation)
- [Production check](#production-check)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Complete command reference](#complete-command-reference)
- [Contributing](#contributing)
- [License](#license)

## Editor configuration

The workspace contains **1 configuration file** in `.vscode/`.

### Required extensions

The settings below rely on two extensions. Install them from the Extensions view.

| Extension ID             | Purpose                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `esbenp.prettier-vscode` | Prettier integration, matching the formatting rules in `.prettierrc.json` |
| `dbaeumer.vscode-eslint` | ESLint integration, matching the lint check in `npm run lint`             |

### Editor settings

Declared in `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

| Setting                    | Effect                                                                           |
| -------------------------- | -------------------------------------------------------------------------------- |
| `editor.defaultFormatter`  | Prettier formats every file type in the project                                  |
| `editor.formatOnSave`      | Every save runs Prettier, keeping files aligned with `npx prettier --check .`    |
| `editor.codeActionsOnSave` | ESLint's auto-fixable rules are applied explicitly on save                       |
| `[typescript]`             | Pins Prettier and format-on-save for `.ts` files                                 |
| `[typescriptreact]`        | Pins Prettier and format-on-save for `.tsx` files                                |
| `[css]`                    | Pins Prettier and format-on-save for the stylesheets in `styles/` and `src/app/` |

### Prettier rules

Defined in `.prettierrc.json` and applied by both VS Code and `npx prettier --check .`:

- Semicolons
- Double quotes
- Trailing commas wherever valid
- Print width of 100

Files and folders listed in `.prettierignore` are skipped: `node_modules`, `.next`, `out`, `coverage`, and `public`.

## Features

| Area                | Capabilities                                                    |
| ------------------- | --------------------------------------------------------------- |
| Format on save      | Formats the current file with Prettier on every save            |
| ESLint auto-fix     | Applies auto-fixable ESLint rules on save                       |
| Language overrides  | Pins Prettier for TypeScript, TSX, and CSS files                |
| Lint parity         | Matches the formatting and lint checks run from the terminal    |
| Integrated terminal | Runs the dev server, tests, lint, and build from inside VS Code |

## Quick start

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- Node.js 20.9 or newer, as required by Next.js 16
- npm
- A local copy of the project (see the root [`README.md`](../README.md#quick-start))

### Open the project

```powershell
code .
```

Install the Prettier and ESLint extensions if they are not already installed.

### Install dependencies

Run from the integrated terminal:

```bash
npm install
```

### Verify Node.js

```bash
node --version
```

## Using VS Code

1. Open the project folder in VS Code and install the Prettier and ESLint extensions
2. Run `npm run dev` from the integrated terminal to start the development server
3. Edit any file. Format-on-save and the ESLint auto-fix action run automatically on `Ctrl + S`
4. Run `npm test` and `npm run lint` from the integrated terminal before committing
5. Run `npm run build` to confirm the static production build before deploying

## Project structure

```text
numeriq/
├── .vscode/
│   └── settings.json        # Format-on-save, ESLint auto-fix, language overrides
│
├── docs/
│   └── VSCODE.md            # This document
├── .prettierrc.json         # Prettier formatting rules
├── .prettierignore          # Files excluded from Prettier
├── eslint.config.mjs        # ESLint configuration
└── package.json             # Dependencies and npm scripts
```

## Technology

- [Visual Studio Code](https://code.visualstudio.com/) — editor
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`esbenp.prettier-vscode`) — formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (`dbaeumer.vscode-eslint`) — linting

## Development commands

### Development server

```powershell
npm run dev
```

The application runs at:

```text
http://localhost:3000/
```

The root route renders the Home workspace.

### Validation

```powershell
npm test
npm run lint
```

See [`TESTING.md`](TESTING.md) for what each suite verifies.

## Formatting and validation

### Formatting in VS Code

With format-on-save enabled (already configured), pressing:

```text
Ctrl + S
```

formats the currently opened file. You do not need to open every file and save it.

To format the entire project at once:

```powershell
npx prettier --write .
```

### Formatting checks

Check formatting without modifying files:

```powershell
npx prettier --check .
```

### Project validation

Run ESLint:

```powershell
npm run lint
```

Run the complete test suite:

```powershell
npm test
```

## Production check

Build the application:

```powershell
npm run build
```

The static export is written to the `out/` directory.

## Deployment

### GitHub Pages

After creating the production build, deploy the `out` directory:

```powershell
npm run build
npx gh-pages -d out --nojekyll
```

## Troubleshooting

### Files do not format on save

Confirm that `esbenp.prettier-vscode` is installed and that you opened the project root folder, so VS Code loads `.vscode/settings.json`. Then format manually to check:

```powershell
npx prettier --write .
```

### ESLint fixes are not applied on save

Confirm that `dbaeumer.vscode-eslint` is installed, then run ESLint from the terminal:

```powershell
npm run lint
```

### Node.js version error when starting the dev server

Next.js 16 requires a supported Node.js version. Check your version:

```powershell
node --version
```

Install Node.js 20.9 or newer, then run `npm install` again.

### The page shows a 404 in development

Start from the root route:

```text
http://localhost:3000/
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
code .
npm install
node --version
npm run dev
npm test
npm run lint
npx prettier --write .
npx prettier --check .
npm run build
npx gh-pages -d out --nojekyll
```

## Contributing

Keep format-on-save enabled, and verify changes before opening a pull request:

```powershell
npm test
npm run lint
npm run build
```

## License

This project is licensed under the MIT License.
