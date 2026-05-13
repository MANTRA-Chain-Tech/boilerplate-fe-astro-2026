/**
 * Cloudflare Workers entry point.
 *
 * All incoming requests are forwarded to the ASSETS binding, which serves
 * the static files built by Astro into `./dist`. The binding is required
 * (rather than assets-only mode) so that environment variables and future
 * Worker logic can be co-located with the static site.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
