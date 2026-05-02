FROM node:22-slim AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/

RUN pnpm install --frozen-lockfile

COPY apps/web/ apps/web/

WORKDIR /app/apps/web
RUN pnpm build

EXPOSE 4324
ENV HOST=0.0.0.0
ENV PORT=4324
CMD ["node", "dist/server/entry.mjs"]
