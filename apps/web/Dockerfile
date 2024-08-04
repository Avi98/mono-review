FROM node@sha256:17e6738cb7ac3d65860d51533372dad098c00d15bdfdb0b5f3897824eb9e11a5 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base as build
COPY . ./usr/src/app
WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@pr/web --prod /web

FROM base as runner
WORKDIR /usr/src/app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=build usr/src/app/apps/web/next.config.js .
COPY --from=build usr/src/app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=build --chown=nodejs:nodejs usr/src/app/apps/web/.next/standalone ./
COPY --from=build --chown=nodejs:nodejs usr/src/app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nodejs:nodejs usr/src/app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]