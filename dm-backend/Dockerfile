FROM node:16-alpine3.11

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

CMD [ "yarn", "dev" ]