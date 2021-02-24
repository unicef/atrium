FROM node:10.2.1

WORKDIR /usr/src/app

COPY /build ./build

RUN ls 

RUN npm install --global serve

COPY . . 

EXPOSE 3000

CMD ["npm", "start"]