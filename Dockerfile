FROM node:12-alpine as build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

ARG REACT_APP_PORT

ENV REACT_APP_PORT=$REACT_APP_PORT

FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]