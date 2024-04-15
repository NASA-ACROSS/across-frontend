FROM node:20.10-bookworm-slim as build

ARG GIT_VERSION

# internal public static env var for propagating version to frontend client
ENV PUBLIC_BUILD_VERSION=$GIT_VERSION

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --include=dev

COPY . ./

RUN npm run build

FROM node:20.10-bookworm-slim

WORKDIR /app
COPY --from=build /app .

ENV NODE_ENV=production

# ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["node","build"]