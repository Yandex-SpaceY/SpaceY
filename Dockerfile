FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

EXPOSE 80

CMD node --max-old-space-size=6144 dist/server.js
