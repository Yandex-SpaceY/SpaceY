FROM node:13

COPY . .

RUN npm install && npm run build

EXPOSE 80

CMD node server.js
