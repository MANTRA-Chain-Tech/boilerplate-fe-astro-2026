# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                  |
| :--------------------- | :------------------------------------------------------ |
| `pnpm install`         | Installs dependencies                                   |
| `pnpm dev`             | Starts local dev server at `localhost:4321`             |
| `pnpm build`           | Build your production site to `./dist/`                 |
| `pnpm preview`         | Preview your build locally, before deploying            |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check`        |
| `pnpm astro -- --help` | Get help using the Astro CLI                            |
| `pnpm deploy`          | Build and deploy to Cloudflare Pages (production)       |
| `pnpm deploy:preview`  | Build and deploy to a Cloudflare Pages preview          |
| `pnpm cf-typegen`      | Generate Cloudflare runtime types from `wrangler.jsonc` |

## ☁️ Deploying to Cloudflare Pages

This boilerplate ships with a [`wrangler.jsonc`](./wrangler.jsonc) so it can be
deployed to [Cloudflare Pages](https://developers.cloudflare.com/pages/) in two
ways:

### 1. Via the CLI

```sh
# Authenticate once
pnpm wrangler login

# Deploy the production branch
pnpm deploy

# Or deploy a preview build
pnpm deploy:preview
```

The first deployment will create the Pages project (using the `name` field in
`wrangler.jsonc`). Subsequent deployments push to the same project.

### 2. Via the Cloudflare dashboard (GitHub App integration)

1. In the Cloudflare dashboard go to **Workers & Pages → Create → Pages →
   Connect to Git** and select this repository.
2. Set the build command to `pnpm build` and the build output directory to
   `dist`.
3. Cloudflare will pick up [`wrangler.jsonc`](./wrangler.jsonc) automatically.

Every non-production branch and pull request gets its own preview URL
(`<branch>.<project>.pages.dev`). The production branch is served from
`<project>.pages.dev`.

### Custom domains

Custom domains for the production environment are commented out by default in
`wrangler.jsonc`. Uncomment the `env.production` block and edit the `routes`
array, or add the domain through the Cloudflare dashboard
(**Pages → your project → Custom domains**).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
