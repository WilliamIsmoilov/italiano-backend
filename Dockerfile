FROM node:22.11.0-alpine AS builder

WORKDIR /app


COPY *.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22.11.0-alpine 

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD [ "node", "dist/server.js" ]