FROM node:18-alpine as base

ARG APP_NAME=@pr/server
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /apps
# install turbo and pnpm
RUN corepack enable
RUN pnpm install turbo --global

FROM base as setup-app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /apps
COPY . .
RUN turbo prune ${APP_NAME} --docker

# Add lockfiles and install only packages that for the app
FROM setup-app as install-app
WORKDIR /apps

COPY .gitignore .gitignore
COPY --from=setup-app /apps/out/json/ .
COPY --from=setup-app /apps/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=setup-app /apps/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

# Build the project
COPY --from=setup-app /apps/out/full/ .
RUN pnpm install --frozen-lockfile --offline --silent

COPY turbo.json turbo.json
RUN turbo run build --filter=${APP_NAME}...

FROM install-app as runner

WORKDIR /apps
# Don't run production as root

RUN addgroup --system --gid 1001 nest
RUN adduser --system --uid 1001  nest
USER nest

# copy files needed to run the app
COPY --chown=nest:nest --from=install-app /apps/apps/server/dist ./
COPY --chown=nest:nest --from=install-app /apps/apps/server/package.json .
COPY --chown=nest:nest --from=install-app /apps/apps/server/node_modules ./node_modules

CMD [ "node", "dist/main.js" ]



