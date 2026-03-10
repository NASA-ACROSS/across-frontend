FROM node:20.10-bookworm-slim AS build

# Declare the build arguments
ARG BUILD_ENV=local
# set the build version to the build environment by default, can be overridden by passing a different value during build time
ARG BUILD_VERSION=$BUILD_ENV

RUN echo "BUILD_ENV: $BUILD_ENV"
RUN echo "BUILD_VERSION: $BUILD_VERSION"

WORKDIR /app

ENV PUBLIC_BUILD_VERSION=$BUILD_VERSION
ENV PUBLIC_RUNTIME_ENV=$BUILD_ENV
ENV NODE_ENV=development

# Copy only the necessary files for dependency installation first
COPY package*.json ./

# Install dependencies
# RUN --mount=type=ssh npm ci

RUN npm ci --include=dev

# Copy source for build (needed for action and deploy)
COPY . .

# Build the app
RUN npm run build


FROM node:20.10-bookworm-slim AS local

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json ./

ENV NODE_ENV=development

EXPOSE 3000


# For GHA like test, lint, types
FROM node:20.10-bookworm-slim AS action
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/tests /app/tests
COPY --from=build /app/package*.json ./

# Copy source code for linting/testing
COPY . .

ENV NODE_ENV=production


FROM node:20.10-bookworm-slim AS deploy
WORKDIR /app

COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
RUN useradd -m -u 5678 appuser && chown -R appuser /app
USER appuser

CMD ["node", "build"]