FROM node
WORKDIR /app
COPY package.json .
RUN npm install
CMD node server.js
