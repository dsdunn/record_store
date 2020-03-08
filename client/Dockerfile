FROM node:12.2.0-alpine

WORKDIR /client

ENV PATH /client/node_modules/.bin:$PATH

COPY package*.json /client/

RUN npm install
RUN npm install react-scripts@3.0.1 -g 

COPY . /client/

EXPOSE 3000

CMD ["npm", "start"]
