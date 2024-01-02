FROM node:alpine as base

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

# ########################################
# FROM base as unit-test


########################################
FROM base as prod

RUN npm run build

RUN rm -rf node_modules
RUN npm ci --production

USER node
CMD [ "npm", "start" ]