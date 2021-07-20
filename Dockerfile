FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install -f && npm run build
RUN npx webpack --config webpack.server.config.js

FROM node:12-alpine
COPY --from=build /app/dist /dist
COPY --from=build /app/src/sw.js /dist

EXPOSE 80

CMD node server.js
