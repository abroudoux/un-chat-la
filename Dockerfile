FROM node:20 as cats-client-builder
WORKDIR /apps/cats-client
COPY /apps/cats-client/package*.json ./
COPY /apps/cats-client .

FROM node:20 as cats-api-builder
WORKDIR /apps/cats-api
COPY /apps/cats-api/package*.json ./
COPY /apps/cats-api .

FROM node:20
WORKDIR /apps
RUN npm install

COPY --from=apps/cats-client-builder /apps/cats-client/dist /apps/cats-client/dist

COPY --from=apps/cats-api-builder /apps/cats-api/dist /apps/cats-api/dist

COPY package*.json ./
RUN npm install --production

EXPOSE 8080

CMD ["npm", "run", "start"]
