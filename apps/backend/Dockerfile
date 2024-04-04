# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

USER root

# Copy only files required to build the application
COPY nx.json package.json tsconfig.base.json pnpm-lock.yaml jest.preset.js jest.config.ts ./
COPY apps ./apps
COPY libs ./libs
RUN chown -R 1001:0 .

# Reduce privileges
# USER default

# Build the application
RUN npm install -g --ignore-scripts pnpm nx
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN nx build apps/backend --verbose
RUN ls -l ./dist/apps/backend
RUN cd ./dist/apps/backend && pnpm install
RUN cd ./dist/apps/backend && pnpm install tslib @nestjs/platform-express @nestjs/common @nestjs/core @nestjs/swagger @nestjs/terminus rxjs cli-color @nestjs/config js-yaml @nestjs/throttler

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Reduce privileges (user from the base image)
USER 1001

# Set the version of the application
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION

# Copy production files
COPY --from=builder /build/dist/apps/backend/ .
RUN ls -l

# Start the application
CMD ["node", "./main.js"]
