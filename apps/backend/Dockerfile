# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Copy only files required to build the application
COPY --chown=root:root --chmod=755 nx.json package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json ./
COPY --chown=root:root --chmod=755 libs/common/package.json ./libs/common/
COPY --chown=root:root --chmod=755 libs/common/src ./libs/common/src
COPY --chown=root:root --chmod=755 apps/backend/project.json apps/backend/package.json apps/backend/tsconfig.json apps/backend/tsconfig.build.json apps/backend/nest-cli.json ./apps/backend/
COPY --chown=root:root --chmod=755 apps/backend/src ./apps/backend/src

# Allow write permissions to 'default' user in this folder
USER root
RUN chown -R default:root /build

# Reduce privileges (user from base image)
USER default

# Build the application
RUN npm install -g --ignore-scripts pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts
RUN npx nx build apps/backend --verbose --batch

# Keep only production packages (recreate node_modules folders to make them smaller)
RUN rm -rf ./node_modules
RUN rm -rf ./apps/backend/node_modules
RUN rm -rf ./libs/common/node_modules
RUN pnpm install --prod --filter ./apps/backend --frozen-lockfile --ignore-scripts

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Copy production files
COPY --from=builder --chown=root:root --chmod=755 /build/package.json ./
COPY --from=builder --chown=root:root --chmod=755 /build/node_modules/ ./node_modules
COPY --from=builder --chown=root:root --chmod=755 /build/apps/backend/package.json ./apps/backend/
COPY --from=builder --chown=root:root --chmod=755 /build/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=builder --chown=root:root --chmod=755 /build/apps/backend/dist ./apps/backend/dist

# Reduce privileges (user from base image)
USER nobody

# Start the application
CMD ["node", "apps/backend/dist/apps/backend/src/main.js"]
