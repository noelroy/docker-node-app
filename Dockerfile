FROM node:15-alpine3.10

ENV MONGO_DB_USERNAME=admin MONGO_DB_PWD=admin

RUN mkdir -p /home/app

COPY ./app /home/app

WORKDIR /home/app

RUN npm install

EXPOSE 3000

CMD ["npm","start"]