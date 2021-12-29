FROM node:alpine AS emulators
WORKDIR /usr/src/app
RUN apk add openjdk11
RUN npm install -g firebase-tools
COPY ./firebase.json firebase.json
RUN firebase setup:emulators:ui