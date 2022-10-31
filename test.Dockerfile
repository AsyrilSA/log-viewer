FROM registry.company.asyril.com:5556/node:16-alpine
WORKDIR /app

# Use NPM proxy
RUN npm config set registry http://registry.company.asyril.com:8787/repository/npm/

# Use latest NPM version available (at time of build)
RUN npm update -g npm

COPY . .
RUN npm ci

CMD npm run test:unit:ci
