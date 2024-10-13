FROM node:18.19.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 2727

CMD ["npm", "run", "start"]