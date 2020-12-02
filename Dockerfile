FROM node:12.16.1

WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["/app/npm", "start"]