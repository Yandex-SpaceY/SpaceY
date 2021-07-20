FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build

FROM node:12-alpine
COPY --from=build /app/dist /
COPY --from=build /app/src/sw.js /

EXPOSE 80

CMD node server.js
