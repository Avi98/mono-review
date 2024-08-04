FROM  node@sha256:17e6738cb7ac3d65860d51533372dad098c00d15bdfdb0b5f3897824eb9e11a5 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as build
COPY . ./usr/src/app
WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@pr/server --prod /server

FROM base as runner
WORKDIR /usr/src/app

# Don't run production as root
RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node
USER node

COPY --from=build --chown=node:node  /usr/src/app/apps/server  dockmz-server

CMD [ "node", "./dockmz-server/dist/main.js" ]

