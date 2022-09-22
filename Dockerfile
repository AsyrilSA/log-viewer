FROM asyril-registry:5556/node:16-alpine as init-stage
WORKDIR /app

# Use NPM proxy
RUN npm config set registry http://asyril-registry:8787/repository/npm/

# Use latest NPM version available (at time of build)
RUN npm update -g npm

COPY package*.json ./
RUN npm install
COPY . .

# build stage
FROM init-stage as build-stage
RUN npm run build

# production stage
FROM asyril-registry:5556/nginx:1.22-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
