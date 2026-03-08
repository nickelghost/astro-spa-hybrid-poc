# Astro SPA Hybrid PoC

A proof-of-concept demonstrating how to combine Astro's server-side routing with React Router's client-side routing on the same site, with full SSR support. No Next nor fancy other frameworks required.

## What it demonstrates

Most pages (`/`, `/about`) are standard Astro pages rendered server-side on every request. The `/generator` subtree is handled differently: Astro renders a single shell page, and React Router takes over client-side navigation within that subtree (`/generator`, `/generator/:name`), behaving like a traditional SPA.

The key challenge is SSR: when a user deep-links directly to `/generator/alice`, the server must render the correct React Router view. This is solved by:

1. Caddy rewrites all `/generator/*` paths to `/generator` before forwarding to Astro, while preserving the original path in an `X-Forwarded-Path` header. This can be done inside of Astro, but Caddy is used here for demonstration purposes.
2. The Astro page reads that header and passes it to `GeneratorApp` as a `path` prop.
3. `GeneratorApp` uses `StaticRouter` on the server and `BrowserRouter` on the client, both initialized with the correct path, producing consistent SSR output.

To make the routing boundary visually obvious, every full-page (SSR) navigation briefly flashes the background blue. Client-side React Router navigations within `/generator` do not trigger a full reload, so no flash occurs.

## Tech stack

- [Astro](https://astro.build/) — framework & SSR adapter (`@astrojs/node` standalone mode)
- [React](https://react.dev/) + [React Router v6](https://reactrouter.com/) — client-side SPA routing
- [Caddy](https://caddyserver.com/) — reverse proxy that handles path rewriting
- [Docker Compose](https://docs.docker.com/compose/) — container orchestration
- [pnpm](https://pnpm.io/) — package manager
- TypeScript

## Project structure

```
src/
  layout.astro          # Shared layout with nav and SSR flash effect
  pages/
    index.astro         # Home page (SSR)
    about.astro         # About page (SSR)
    generator.astro     # SPA shell — mounts GeneratorApp
  react/
    GeneratorApp.tsx    # React Router setup (BrowserRouter / StaticRouter)
    GeneratorIndex.tsx  # /generator — input form
    GeneratorResult.tsx # /generator/:name — result view
Caddyfile               # Proxy config: rewrites /generator/* and forwards X-Forwarded-Path
Dockerfile              # Builds and runs the Astro Node.js server
docker-compose.yml      # Wires up the web + proxy services
```

## Running locally

**Prerequisites:** Node.js 22+, pnpm

```bash
pnpm install
pnpm dev
```

The development server starts at `http://localhost:4321`. Note that without the Caddy proxy, deep-linking into `/generator/:name` will return a 404 in dev mode.

## Running with Docker

```bash
docker compose up --build
```

The app is available at `http://localhost:8080`. Caddy handles path rewriting, so deep-links like `http://localhost:8080/generator/alice` render correctly via SSR.
