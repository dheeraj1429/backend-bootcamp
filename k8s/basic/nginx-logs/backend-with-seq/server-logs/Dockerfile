# Development stage
FROM node:22-alpine AS development
WORKDIR /usr/src/app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]