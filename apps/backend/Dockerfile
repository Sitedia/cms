# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Reduce privileges (user from base image)
USER default

# Copy only files required to build the application
COPY --chown=root:root nx.json project.json package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY --chown=root:root libs/common/project.json libs/common/tsconfig.build.json ./libs/common/
COPY --chown=root:root libs/common/src ./libs/common/src
COPY --chown=root:root apps/backend/project.json apps/backend/package.json apps/backend/tsconfig.build.json ./apps/backend/
COPY --chown=root:root apps/backend/src ./apps/backend/src

# Build the application
RUN npm ci --ignore-scripts
RUN npx nx build source

# Install production dependencies in the 'dist' folder
COPY --chown=root:root package-lock.json apps/backend/package.json ./dist/
RUN cd dist && npm ci --ignore-scripts

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

# Reduce privileges (user from base image)
USER nobody

# Set version
ARG DOCKER_TAG
ENV APP_VERSION=$DOCKER_TAG

# Copy production files
COPY --from=builder --chown=root:root /build/dist ./

# Start the application
CMD ["node", "--enable-source-maps", "."]
