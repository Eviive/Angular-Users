FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci && \
    npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist/tp2/browser /usr/share/nginx/html
COPY /docker/nginx/nginx.conf  /etc/nginx/conf.d/default.conf
