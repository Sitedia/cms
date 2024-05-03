# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Reduce privileges (user from base image)
USER default

# Copy only files required to build the application
COPY --chown=root:root package.json package-lock.json tsconfig.json tsconfig.build.json ./
COPY --chown=root:root libs/common ./libs/common
COPY --chown=root:root apps/backend ./apps/backend

# Build the application
RUN npm ci --omit=optional --ignore-scripts
RUN npx tsc --build apps/backend/tsconfig.build.json

# Install production dependencies in the 'dist' folder
COPY --chown=root:root package-lock.json apps/backend/package.json ./dist/
RUN cd dist && npm ci --ignore-scripts

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

# Reduce privileges (user from base image)
USER nobody

# Copy production files
COPY --from=builder --chown=root:root /build/dist ./

# Start the application
CMD ["node", "apps/backend/main.js"]
