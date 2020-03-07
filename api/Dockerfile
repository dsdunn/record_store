FROM node:12

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 8080

CMD node_modules/nodemon/bin/nodemon.js index.js