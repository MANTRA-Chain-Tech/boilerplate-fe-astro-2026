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
| `pnpm deploy`          | Build and deploy to Cloudflare Workers (production)     |
| `pnpm deploy:preview`  | Build and deploy to Cloudflare Workers preview env      |
| `pnpm cf-typegen`      | Generate Cloudflare runtime types from `wrangler.jsonc` |

## ☁️ Deploying to Cloudflare Workers

This boilerplate ships with a [`wrangler.jsonc`](./wrangler.jsonc) so it can be
deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/).

### Via the CLI

```sh
# Authenticate once
pnpm wrangler login

# Deploy production
pnpm deploy

# Deploy preview environment
pnpm deploy:preview
```

The first deployment creates the Worker using the `name` field in
`wrangler.jsonc`. Static output from `./dist` is served through Workers Assets.
Production deploys are available at:
`<worker-name>.<account-subdomain>.workers.dev`

Preview deploys use the `preview` environment and are available at:
`<worker-name>-preview.<account-subdomain>.workers.dev`

### Custom domains

Routes for custom domains are commented out by default in `wrangler.jsonc`.
Uncomment the `env.production` block and edit the `routes` array.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
