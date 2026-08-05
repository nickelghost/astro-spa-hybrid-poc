FROM node:22-alpine

WORKDIR /opt/astro-spa-hybrid-poc

COPY . .

RUN corepack enable && corepack install && pnpm i && pnpm build

ENV HOST=0.0.0.0

CMD ["node", "dist/server/entry.mjs"]
