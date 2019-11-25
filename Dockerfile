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
COPY --from=builder /app/build /usr/share/nginx/html
# Copy nginx.conf to fix nginx/react-router conflict
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
