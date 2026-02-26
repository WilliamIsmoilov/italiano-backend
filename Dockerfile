FROM node:22.11.0-alpine AS builder

WORKDIR /var/www/html


COPY *.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22.11.0-alpine 

WORKDIR /var/www/html

COPY --from=builder /var/www/html ./
COPY --from=builder /app/src/libs/sendMailer /app/dist/libs/sendMailer

EXPOSE 3000

CMD [ "node", "dist/server.js" ]