FROM node:20 as cats-client-builder
WORKDIR /apps/cats-client
COPY cats-client/package*.json ./
RUN npm install
COPY cats-client .
RUN npm run build

FROM node:20 as cats-api-builder
WORKDIR /apps/cats-api
COPY cats-api/package*.json ./
RUN npm install
COPY cats-api .
RUN npm run build

FROM node:20
WORKDIR /app

COPY --from=cats-client-builder /apps/cats-client/dist /apps/cats-client/dist

COPY --from=cats-api-builder /apps/cats-api/dist /apps/cats-api/dist

COPY package*.json ./
RUN npm install --production

EXPOSE 8080

CMD ["npm", "run", "start"]
