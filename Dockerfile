# Use a imagem oficial do Node.js
FROM node:16.14-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm cache clean --force && rm -rf node_modules && npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "start:dev"] 