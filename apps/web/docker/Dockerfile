FROM node:18-alpine as base

ARG APP_NAME=@pr/server
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /apps

# for turbo - https://turbo.build/repo/docs/handbook/deploying-with-docker#example
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /apps
# enable corepack for pnpm
RUN corepack enable
RUN pnpm add -g turbo 


FROM base as fetcher
# pnpm fetch only requires lockfile, but we'll need to build workspaces
COPY pnpm*.yaml ./
# mount pnpm store as cache & fetch dependencies
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm-store \
	pnpm fetch --ignore-scripts

FROM fetcher as builder
ARG APP_NAME=@pr/web
ENV APP_NAME=${APP_NAME}
WORKDIR /apps
COPY . .
RUN turbo prune ${APP_NAME} --docker

FROM builder as installer
WORKDIR /apps
COPY --from=builder /apps/out/json/ .
COPY --from=builder /apps/out/pnpm*.yaml  ./

RUN pnpm install --no-frozen-lockfile
RUN pnpm build --filter=${APP_NAME}

FROM builder as pruned
WORKDIR /apps
RUN pnpm --filter=${APP_NAME} deploy --prod --ignore-scripts ./out

FROM base as runner
WORKDIR /apps

RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=pruned --chown=nextjs:nextjs /apps/apps/web/public ./public
COPY --from=pruned --chown=nextjs:nextjs /apps/out/next.config.js  ./
COPY --from=pruned --chown=nextjs:nextjs /apps/out/tailwind.config.js  ./
COPY --from=pruned --chown=nextjs:nextjs /apps/out/postcss.config.js  ./

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nextjs /apps/apps/web/.next/standalone/apps/web ./
COPY --from=installer --chown=nextjs:nextjs /apps/apps/web/.next/static ./.next/static

# Pnpm uses symlinked packages
COPY --from=pruned --chown=nextjs:nextjs /apps/out/node_modules  ./node_modules

CMD ["node", "server.js"]