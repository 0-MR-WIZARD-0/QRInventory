FROM node:20-alpine as builder
WORKDIR /dist
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . ./
RUN npm run build

FROM nginx:1.16.0-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /dist/build /usr/share/nginx/html

# EXPOSE 80 443
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]