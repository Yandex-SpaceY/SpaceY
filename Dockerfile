FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

EXPOSE 80

CMD node dist/server.js
