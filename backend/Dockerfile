FROM public.ecr.aws/docker/library/node:20-alpine AS builder


WORKDIR /app

COPY package.json package-lock.json .

RUN npm ci

COPY . .

RUN npm run build



FROM public.ecr.aws/docker/library/node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
  ARTICLES_PATH=/app/data/articles.json

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "dist/server.js"] 
