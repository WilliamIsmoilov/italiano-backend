FROM node:22.11.0-alpine AS builder

WORKDIR /var/www/html


COPY *.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22.11.0-alpine 

WORKDIR /var/www/html

COPY --from=builder /var/www/html ./

EXPOSE 3000

CMD [ "node", "dist/server.js" ]