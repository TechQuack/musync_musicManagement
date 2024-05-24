FROM node:20.9.0-alpine3.18

WORKDIR /opt/project

COPY package.json package-lock.json /opt/project/

RUN npm install

COPY . /opt/project

EXPOSE 4000