FROM node:12-alpine as server-build
WORKDIR /app
COPY /server .
RUN npm install

FROM node:12-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:12-alpine
COPY --from=build /app/dist /dist
COPY --from=build /app/server/server.js /
COPY --from=server-build /app/node_modules /node_modules
EXPOSE 3000
CMD node server.js
