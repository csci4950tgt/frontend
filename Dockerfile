# Base image
FROM node:alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install --silent
COPY . ./

# build app
# RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]
