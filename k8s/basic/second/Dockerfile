FROM node:22-alpine AS builder
WORKDIR /app/usr/src
COPY package.json .

FROM builder AS development
RUN npm i
COPY . .
EXPOSE 3000
CMD [ "node", "src/index.js" ]