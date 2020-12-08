FROM node:13.3.0 AS build-step

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . /app

RUN npm run build --prod

FROM nginx:1.19.5-alpine

COPY --from=build-step /app/dist/emp-management-app /usr/share/nginx/html


