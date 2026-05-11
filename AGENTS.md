# AGENTS.md — fe-boilerplate-2026

This document is the authoritative reference for developers and AI coding agents working in this repository. It covers the full tech stack, project conventions, component patterns, testing strategy, and quality gates. Read it before making any changes.

---

## Stack at a Glance

| Layer              | Tool                 | Version            |
| ------------------ | -------------------- | ------------------ |
| Framework          | Astro                | ^6.x               |
| Styling            | Tailwind CSS         | ^4.x (Vite plugin) |
| Language           | TypeScript           | strict mode        |
| Component Explorer | Storybook            | ^10.x              |
| Unit Testing       | Vitest               | ^4.x               |
| E2E Testing        | Playwright           | ^1.x               |
| Linting            | ESLint (flat config) | ^10.x              |
| Formatting         | Prettier             | ^3.x               |
| Pre-commit Hooks   | Husky + lint-staged  | ^9.x / ^17.x       |
| Package Manager    | pnpm                 | ^10.x              |

---

## Prerequisites

- **Node.js** ≥ 22.12.0 (see `engines` in `package.json`)
- **pnpm** ≥ 10.x — install via `npm install -g pnpm`
- **Playwright browsers** — run `pnpm playwright install chromium` once after cloning

---

## Getting Started

```bash
# 1. Clone and install (also installs husky git hooks via the `prepare` script)
git clone <repo-url>
cd fe-boilerplate-2026
pnpm install

# 2. Install Playwright browser binaries
pnpm playwright install chromium

# 3. Start the dev server
pnpm dev           # http://localhost:4321

# 4. Start Storybook
pnpm storybook     # http://localhost:6006
```

---

## Project Structure

```
fe-boilerplate-2026/
├── .husky/
│   ├── pre-commit       # runs lint-staged on staged files
│   └── pre-push         # runs pnpm test (Vitest) before every push
├── .storybook/
│   ├── main.ts          # Storybook framework + builder config
│   └── preview.ts       # global decorators, Tailwind CSS import
├── e2e/
│   └── home.spec.ts     # Playwright E2E tests
├── src/
│   ├── components/      # Astro UI components + co-located stories
│   │   ├── Badge.astro  + Badge.stories.ts
│   │   ├── Button.astro + Button.stories.ts
│   │   └── Card.astro   + Card.stories.ts
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML shell used by every page
│   ├── pages/
│   │   └── index.astro        # Entry page — uses BaseLayout
│   ├── styles/
│   │   └── global.css         # @import "tailwindcss" — single Tailwind entry point
│   └── utils/
│       ├── cn.ts              # Class-name merge utility
│       └── cn.test.ts         # Vitest unit tests
├── astro.config.mjs           # Astro config — Tailwind Vite plugin registered here
├── eslint.config.js           # ESLint flat config
├── playwright.config.ts       # Playwright config
├── tsconfig.json              # TypeScript strict config (extends astro/tsconfigs/strict)
└── vitest.config.ts           # Vitest config (uses Astro's getViteConfig)
```

---

## Core Framework Components

### Astro

Astro is the rendering framework. All pages live in `src/pages/` and map directly to URLs. Components in `src/components/` are `.astro` files with a TypeScript frontmatter block (`---`).

**Rules:**

- Every page must use `<BaseLayout>` as its outermost wrapper.
- Page-level `<title>` and `<meta description>` are passed as props to `BaseLayout`.
- Never import `global.css` in a page directly — it is already imported inside `BaseLayout.astro`.
- Use `Astro.props` with an exported `interface Props` in every component that accepts props.

### Tailwind CSS v4

Tailwind v4 is loaded as a **Vite plugin** — no `tailwind.config.js` is needed. The single entry point is `src/styles/global.css`:

```css
@import 'tailwindcss';
```

**Rules:**

- Add custom design tokens inside `global.css` using `@theme { }` (Tailwind v4 CSS-first config).
- Do not use arbitrary values (`[value]`) for anything that belongs in the design system — use `@theme` tokens instead.
- Class ordering is enforced by `prettier-plugin-tailwindcss` on every save and commit.

### TypeScript

`tsconfig.json` extends `astro/tsconfigs/strict` and additionally enables `noUnusedLocals`, `noUnusedParameters`, and `exactOptionalPropertyTypes`.

**Rules:**

- All props interfaces must be explicitly typed — no `any`.
- Prefer `import type` for type-only imports (`@typescript-eslint/consistent-type-imports` is enforced).
- Run `pnpm typecheck` (`astro check`) to catch type errors in `.astro` frontmatter.

### `cn` Utility (`src/utils/cn.ts`)

A lightweight class-name merge helper. Use it whenever classes are conditionally composed:

```ts
import { cn } from '../utils/cn';

const classes = cn('base-class', isActive && 'active', disabled && 'opacity-50');
```

Do not concatenate Tailwind classes via string interpolation — it breaks static analysis and PurgeCSS. Always use `cn()` or `class:list` (Astro's built-in directive) for conditional classes.

---

## Component Conventions

### Anatomy of a Component

Every component follows this structure:

```astro
---
// 1. Type-safe props interface
export interface Props {
  label: string;
  variant?: 'primary' | 'secondary';
}

// 2. Destructure with defaults
const { label, variant = 'primary' } = Astro.props;

// 3. Derive classes — use cn() or a variants map, never inline ternaries in the template
const variantClasses = { primary: 'bg-blue-600', secondary: 'bg-white' };
---

<!-- 4. Single root element -->
<button class={`base-classes ${variantClasses[variant]}`}>
  {label}
</button>
```

### Existing Components

| Component    | Props                                     | Notes                                           |
| ------------ | ----------------------------------------- | ----------------------------------------------- |
| `BaseLayout` | `title`, `description?`                   | Required wrapper for all pages                  |
| `Button`     | `label`, `variant?`, `size?`, `disabled?` | Three variants, three sizes                     |
| `Card`       | `title`, `description?`, `href?`          | Renders `<a>` when `href` is set                |
| `Badge`      | `label`, `variant?`                       | Status chips: info / success / warning / danger |

### Adding a New Component

1. Create `src/components/MyComponent.astro` with a typed `Props` interface.
2. Create `src/components/MyComponent.stories.ts` using CSF3 format (see existing stories as reference).
3. Export at minimum a `Default` story and one story per meaningful variant.
4. Add `tags: ['autodocs']` to the story meta so docs are generated automatically.

---

## Storybook

Storybook runs independently of the Astro dev server via `@storybook-astro/framework`, which renders `.astro` components server-side.

```bash
pnpm storybook          # dev server on :6006
pnpm build-storybook    # static output → storybook-static/
```

**Story format** — use CSF3 with `satisfies Meta<typeof Component>`:

```ts
import type { Meta, StoryObj } from 'storybook/internal/types';
import MyComponent from './MyComponent.astro';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  argTypes: {
    /* ... */
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    /* ... */
  },
};
```

**Rules:**

- Stories live alongside components in `src/components/` as `*.stories.ts` files.
- Every component that enters the design system needs at least one story.
- The Storybook preview imports `global.css`, so Tailwind classes render correctly in stories.

---

## Testing

### Unit Tests — Vitest

Vitest is configured via `vitest.config.ts` using `getViteConfig` from `astro/config` to inherit Astro's Vite plugins. The test environment is `happy-dom`.

```bash
pnpm test               # single run
pnpm test:watch         # watch mode
pnpm test:coverage      # run with v8 coverage (outputs text + lcov)
```

**Conventions:**

- Test files must live next to the source file they test: `src/utils/cn.test.ts` tests `src/utils/cn.ts`.
- Only `src/**/*.test.ts` files are picked up by Vitest (see `include` in `vitest.config.ts`).
- `.stories.ts` files are excluded from coverage.
- Aim for 80%+ line coverage on anything in `src/utils/` and any future pure TypeScript modules.
- Do not write unit tests for `.astro` components — use Playwright E2E for integration-level assertions.

### E2E Tests — Playwright

Playwright tests target a running Astro server. The `webServer` config in `playwright.config.ts` runs `pnpm dev` automatically if no server is already running on `:4321`.

```bash
pnpm test:e2e           # headless Chromium
pnpm test:e2e:ui        # Playwright UI mode (interactive)
```

**Conventions:**

- All E2E test files live in `e2e/` and follow the `*.spec.ts` naming pattern.
- Use `page.getByRole()` and `page.getByLabel()` over CSS selectors — they test accessibility semantics.
- One spec file per page or major user flow (e.g., `e2e/home.spec.ts`).
- Do not assert on specific Tailwind class names in E2E tests.

---

## Code Quality

### ESLint

ESLint uses the **flat config** format (`eslint.config.js`). Active rule sets:

- `@eslint/js` recommended
- `typescript-eslint` recommended
- `eslint-plugin-astro` recommended

Custom rules enforced:

- `@typescript-eslint/no-unused-vars` — error (args prefixed `_` are exempt)
- `@typescript-eslint/consistent-type-imports` — enforces `import type` for type-only imports

```bash
pnpm lint           # check
pnpm lint:fix       # auto-fix
```

### Prettier

Prettier runs with two plugins:

- `prettier-plugin-astro` — formats `.astro` files
- `prettier-plugin-tailwindcss` — enforces canonical Tailwind class order

```bash
pnpm format           # write all files
pnpm format:check     # CI-safe check (no writes)
```

**Editor setup:** Install the Prettier VSCode extension and enable "Format on Save". The `.prettierrc` config is picked up automatically.

### TypeScript Type Checking

```bash
pnpm typecheck    # runs astro check — validates .astro frontmatter + .ts files
```

Run this before opening a PR. The Astro LSP handles `.astro` type checking; standard `tsc` alone is insufficient.

---

## Pre-commit Hooks (Husky + lint-staged)

Hooks are installed automatically when you run `pnpm install` (via the `prepare` script).

| Hook         | Trigger      | What it runs                                           |
| ------------ | ------------ | ------------------------------------------------------ |
| `pre-commit` | `git commit` | `lint-staged` — ESLint + Prettier on staged files only |
| `pre-push`   | `git push`   | `pnpm test` — full Vitest unit test suite              |

**lint-staged config** (in `package.json`):

```json
"lint-staged": {
  "*.{ts,tsx,js,mjs}": ["eslint --fix", "prettier --write"],
  "*.astro":            ["eslint --fix", "prettier --write"],
  "*.{css,json,md}":   ["prettier --write"]
}
```

To skip a hook in an emergency (not recommended):

```bash
git commit --no-verify -m "emergency fix"
```

---

## All Scripts Reference

| Script            | Command                 | Description                                    |
| ----------------- | ----------------------- | ---------------------------------------------- |
| `dev`             | `astro dev`             | Start Astro dev server on `:4321`              |
| `build`           | `astro build`           | Production build → `dist/`                     |
| `preview`         | `astro preview`         | Preview the production build locally           |
| `storybook`       | `storybook dev -p 6006` | Storybook dev on `:6006`                       |
| `build-storybook` | `storybook build`       | Static Storybook → `storybook-static/`         |
| `test`            | `vitest run`            | Unit tests (single run)                        |
| `test:watch`      | `vitest`                | Unit tests (watch mode)                        |
| `test:coverage`   | `vitest run --coverage` | Unit tests with coverage report                |
| `test:e2e`        | `playwright test`       | Playwright E2E (headless)                      |
| `test:e2e:ui`     | `playwright test --ui`  | Playwright E2E (interactive UI)                |
| `lint`            | `eslint .`              | Lint all files                                 |
| `lint:fix`        | `eslint . --fix`        | Lint and auto-fix                              |
| `format`          | `prettier --write .`    | Format all files                               |
| `format:check`    | `prettier --check .`    | Check formatting (no writes)                   |
| `typecheck`       | `astro check`           | TypeScript type checking                       |
| `prepare`         | `husky`                 | Install git hooks (auto-run on `pnpm install`) |

---

## Using This as a Template for a New App

1. **Clone / use as template** on GitHub (`Use this template` button).
2. **Update `package.json`**: change `name`, `version`, and `description`.
3. **Update `BaseLayout.astro`**: update the default `description` meta value.
4. **Update `src/pages/index.astro`**: replace the component showcase with your app's home page.
5. **Install and set up browsers**: `pnpm install && pnpm playwright install chromium`.
6. **Verify everything works**:
   ```bash
   pnpm build        # Astro build passes
   pnpm test         # unit tests pass
   pnpm lint         # no ESLint errors
   pnpm typecheck    # no type errors
   ```
7. **Build your first feature**: create a component in `src/components/`, add a story, write tests.

---

## Ignored Paths

The following are excluded from version control (`.gitignore`) and from ESLint/coverage:

- `dist/` — Astro build output
- `storybook-static/` — Storybook build output
- `playwright-report/` + `test-results/` — Playwright output
- `coverage/` — Vitest coverage output
- `.astro/` — generated Astro type declarations
- `node_modules/`
