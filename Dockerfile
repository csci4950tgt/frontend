### Stage 1 - the build process
# Base image
FROM node:alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --production --silent
COPY . ./

# build app
RUN npm run build


### Stage 2 - the production environment
FROM nginx:alpine

# Copy built frontend to be served by nginx
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy nginx.conf to fix nginx/react-router conflict
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start nginx server
EXPOSE 80
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
