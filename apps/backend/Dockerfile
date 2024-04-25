# BUILD
FROM registry.access.redhat.com/ubi9/nodejs-20:1-34 AS builder

WORKDIR /build

# Copy only files required to build the application
COPY --chown=root:root --chmod=755 nx.json package.json package-lock.json tsconfig.json ./
COPY --chown=root:root --chmod=755 libs/common ./libs/common
COPY --chown=root:root --chmod=755 apps/backend ./apps/backend

# Allow write permissions to the 'dist' folder
USER root
RUN mkdir /build/dist
RUN chown -R default:root /build/dist

# Reduce privileges (user from base image)
USER default

# Build the application
RUN npm ci --ignore-scripts
RUN npx nx build apps/backend --verbose --batch

# Keep only production packages
COPY --chown=root:root --chmod=755 package-lock.json ./dist/
COPY --chown=root:root --chmod=755 apps/backend/package.json ./dist/
RUN cd dist && npm ci --omit=dev --ignore-scripts

# TARGET
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal:1-37

WORKDIR /app

# Copy production files
COPY --from=builder --chown=root:root --chmod=755 /build/dist ./

# Reduce privileges (user from base image)
USER nobody

# Start the application
CMD ["node", "apps/backend/src/main.js"]
