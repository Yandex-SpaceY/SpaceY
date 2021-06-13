FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npx webpack --config webpack.server.config.js

FROM node:12-alpine
COPY --from=build /app/dist /dist
COPY --from=build /app/index.js /
CMD node index.js 
