FROM node:12-alpine
WORKDIR /app
COPY ./server.js ./package*.json ./webpack.config.js ./tsconfig.json ./
COPY ./src ./src
COPY ./public ./public
RUN npm install && npm run build
RUN rm -rf ./src && rm -rf ./public
EXPOSE 3000
CMD node server.js 
