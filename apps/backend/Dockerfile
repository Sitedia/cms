# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Copy only files required to build the application
COPY --chown=root:root --chmod=755 nx.json package.json tsconfig.base.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=root:root --chmod=755 libs/nestjs-common/package.json libs/nestjs-common/project.json  libs/nestjs-common/tsconfig.json libs/nestjs-common/tsconfig.lib.json ./libs/nestjs-common/
COPY --chown=root:root --chmod=755 libs/nestjs-common/src ./libs/nestjs-common/src
COPY --chown=root:root --chmod=755 apps/backend/package.json apps/backend/project.json apps/backend/nest-cli.json apps/backend/tsconfig.json apps/backend/tsconfig.app.json ./apps/backend/
COPY --chown=root:root --chmod=755 apps/backend/src ./apps/backend/src

# Allow write permissions to 'default' user in this folder
USER root
RUN chown -R default:root /build

# Reduce privileges (user from base image)
USER default

# Build the application
RUN npm install -g --ignore-scripts pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts --reporter=append-only
RUN npx nx build libs/nestjs-common --verbose --batch
RUN npx nx build apps/backend --verbose --batch

# Keep only production packages (recreate node_modules folders to make them smaller)
RUN rm -rf ./apps/backend/node_modules
RUN rm -rf ./libs/nestjs-common/node_modules
RUN rm -rf ./node_modules
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --reporter=append-only

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Set the version of the application
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

# Copy production files
COPY --from=builder --chown=root:root --chmod=755 /build/node_modules/ ./node_modules/
COPY --from=builder --chown=root:root --chmod=755 /build/apps/backend/ ./apps/backend/
COPY --from=builder --chown=root:root --chmod=755 /build/libs/nestjs-common/ ./libs/nestjs-common/

# Reduce privileges (user from base image)
USER nobody

# Start the application
CMD ["node", "apps/backend/dist/apps/backend/src/main.js"]
