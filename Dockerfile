
# DOCKER ANNULE
# on prend un serveur node AWS

# Use the docker image node:9.4
FROM node:9.6.1 as builder

# Create app directory
WORKDIR /app

# Get dependencies
COPY package*.json /app/

# install and cache app dependencies
RUN npm install -g --silent
RUN npm install -g npm-install-peers --silent

# Copy source code
COPY ./ /app/

# Build app
RUN REACT_APP_STAGE=staging CI=true npm run build

FROM nginx:1.15

# Move app to nginx working directory
COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]

# docker build -t cliprfront .
# docker run -d -it -p 3000:3000 cliprfront /bin/bash
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <CONTAINER_ID>