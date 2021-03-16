FROM node
WORKDIR /app
COPY package.json .
RUN npm install
RUN apt-get update
RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
RUN apt-get install git python openssl curl bash redis
CMD node server.js
