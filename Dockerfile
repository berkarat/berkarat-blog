# ---- Build stage: Astro sitesini pnpm ile derle ----
FROM node:20-alpine AS build
WORKDIR /app

# pnpm'i corepack ile etkinleştir
RUN corepack enable

# Bağımlılıkları önce kopyala (cache için)
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

# Kaynak kodu kopyala ve derle (astro build + pagefind)
COPY . .
RUN pnpm build

# ---- Runtime stage: statik dosyaları nginx ile yayınla ----
FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
