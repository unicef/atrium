FROM node
WORKDIR /app
COPY package.json .
RUN npm install
RUN apt-get update
RUN apt-get install -y git python openssl curl bash redis-tools
RUN npm install -g web3 truffle
