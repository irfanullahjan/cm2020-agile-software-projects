FROM node:alpine
RUN npm install -g concurrently

RUN mkdir -p /home/server
WORKDIR /home/server

COPY ./server /home/server

RUN npm install --verbose
RUN npm run build

WORKDIR /

RUN mkdir -p /home/client
WORKDIR /home/client

COPY ./client /home/client

RUN npm install --verbose
RUN npm run build

WORKDIR /home

EXPOSE 3000

CMD ["concurrently", "cd server && npm run start", "cd client && npm run start"]