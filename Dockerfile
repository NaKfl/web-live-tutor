FROM node:14-alpine as builder

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json yarn.lock ./
RUN npm install -g yarn --force && yarn install --prod

COPY . ./
RUN yarn build

FROM nginx:alpine
RUN apk add --no-cache bash

EXPOSE 80
COPY manifest/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
