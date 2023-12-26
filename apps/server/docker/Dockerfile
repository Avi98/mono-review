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
ARG APP_NAME=@pr/server
ENV APP_NAME=${APP_NAME}
WORKDIR /apps
COPY . .

RUN pnpm install --offline --frozen-lockfile
RUN pnpm turbo build --filter=${APP_NAME}

FROM builder as pruned
WORKDIR /apps

RUN pnpm --filter=${APP_NAME} deploy --prod --ignore-scripts ./out

FROM base as runner
WORKDIR /apps

RUN addgroup --system --gid 1001 nestGroup
RUN adduser --system --uid 1001 nest
USER nest

COPY --chown=nest:nestGroup --from=pruned  /apps/out/package.json . 
COPY --chown=nest:nestGroup --from=pruned  /apps/out/node_modules ./node_modules
COPY --chown=nest:nestGroup --from=pruned  /apps/out/dist ./dist

WORKDIR /apps/dist
CMD ["node", "main.js"]

