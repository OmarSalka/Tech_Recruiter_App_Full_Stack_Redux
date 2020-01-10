FROM node:alpine
RUN apk update && apk add bash
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]