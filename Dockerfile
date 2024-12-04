FROM node:20.13.1-alpine3.20 as BUILD

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production

FROM node:20.13.1-alpine3.20 as PROD

WORKDIR /app

COPY --from=BUILD /app/dist ./dist
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/package.json ./package.json

EXPOSE 3000

CMD ["npx", "cross-env", "NODE_ENV=production", "node", "dist/main"]

