# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Copy only files required to build the application
COPY --chown=root:root --chmod=755 nx.json package.json tsconfig.base.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=root:root --chmod=755 libs/nestjs-common/package.json libs/nestjs-common/project.json  libs/nestjs-common/tsconfig.json libs/nestjs-common/tsconfig.build.json ./libs/nestjs-common/
COPY --chown=root:root --chmod=755 libs/nestjs-common/src ./libs/nestjs-common/src
COPY --chown=root:root --chmod=755 apps/backend/package.json apps/backend/project.json apps/backend/nest-cli.json apps/backend/tsconfig.json apps/backend/tsconfig.build.json ./apps/backend/
COPY --chown=root:root --chmod=755 apps/backend/src ./apps/backend/src

# Allow permissions to default user in this folder
USER root
RUN chown -R default:root .

# Reduce privileges
USER default

# Build the application
RUN npm install -g --ignore-scripts pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts --reporter=append-only
RUN npx nx build apps/backend
RUN rm -rf ./node_modules
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --reporter=append-only

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Reduce privileges (user from the base image)
USER nobody

# Set the version of the application
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

# Copy production files
COPY --from=builder /build/node_modules/ ./node_modules/
COPY --from=builder /build/apps/backend/ ./apps/backend/

# Start the application
CMD ["node", "apps/backend/dist/apps/backend/src/main.js"]
