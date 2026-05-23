# Development stage
FROM node:22-alpine AS development
WORKDIR /app/usr/src
COPY package.json .
RUN yarn install
COPY . .
ENV NODE_ENV=development
EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]

# production stage
FROM node:22-alpine AS builder
WORKDIR /app/usr/src
COPY --from=development /app/usr/src/node_modules ./node_modules
COPY . .
RUN yarn run build
ENV NODE_ENV=production
RUN yarn install --production && yarn cache clean

FROM builder AS production
COPY --from=builder /app/usr/src/node_modules ./node_modules
COPY --from=builder /app/usr/src/dist ./dist
EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]