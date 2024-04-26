# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Reduce privileges (user from base image)
USER default

# Copy only files required to build the application (jest.config.js is required by nx.json)
COPY --chown=root:root --chmod=755 nx.json package.json package-lock.json tsconfig.json tsconfig.build.json jest.config.js ./
COPY --chown=root:root --chmod=755 libs/common ./libs/common
COPY --chown=root:root --chmod=755 apps/backend ./apps/backend

# Build the application
RUN npm ci --ignore-scripts
RUN npx nx build apps/backend --verbose --batch

# Install production dependencies in the 'dist' folder
COPY --chown=root:root --chmod=755 apps/backend/package.json ./dist/
COPY --chown=root:root --chmod=755 package-lock.json ./dist/
RUN cd dist && npm ci --ignore-scripts

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Reduce privileges (user from base image)
USER nobody

# Copy production files
COPY --from=builder --chown=root:root --chmod=755 /build/dist ./

# Start the application
CMD ["node", "apps/backend/src/main.js"]
