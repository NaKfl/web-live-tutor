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

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Make our shell script executable
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
