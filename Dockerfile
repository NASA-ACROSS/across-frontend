FROM node:24-bookworm-slim AS build

# set the build version to local environment by default, can be overridden by passing a different value during build time
ARG BUILD_VERSION=docker

# set svelte public env vars
ENV PUBLIC_BUILD_VERSION=$BUILD_VERSION
ENV PUBLIC_RUNTIME_ENV=local

RUN echo "PUBLIC_BUILD_VERSION: $PUBLIC_BUILD_VERSION"

WORKDIR /app

# Copy only the necessary files for dependency installation first
COPY package*.json ./

# Install dependencies
# RUN --mount=type=ssh npm ci

RUN npm ci --include=dev

# Copy source for build (needed for action and deploy)
COPY . .

# Build the app
RUN npm run build


FROM node:24-bookworm-slim AS local

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3000


# For GHA like test, lint, types
FROM node:24-bookworm-slim AS action
WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
COPY --from=build /app/tests /app/tests
COPY --from=build /app/package*.json ./

# Copy source code for linting/testing
COPY . .


FROM node:24-bookworm-slim AS deploy
WORKDIR /app

COPY --from=build /app/build /app/build
COPY --from=build /app/package*.json ./

ENV PORT=3000

EXPOSE 3000

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
RUN useradd -m -u 5678 appuser && chown -R appuser /app
USER appuser

CMD ["node", "build"]