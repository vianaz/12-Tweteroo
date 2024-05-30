FROM node:20.14.0-alpine3.20 as base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base as prod-deps
RUN npm install --omit=dev

FROM base
COPY --from=prod-deps /app/node_modules ./node_modules
COPY ./src /app/src
ENV PORT=3000
CMD [ "npm", "start" ]


