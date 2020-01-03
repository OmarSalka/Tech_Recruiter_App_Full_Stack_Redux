FROM node:alpine as builder

WORKDIR /app

#copying the package files and moving them to working directory
COPY package.json ./

RUN npm install

# copy what's in here into the container
COPY . .

RUN npm run build



FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html


