FROM node:15.8.0-alpine3.10

WORKDIR /root

COPY . .

RUN npm install 
RUN npx tsc 

ENV NODE_ENV production

EXPOSE 8090

CMD ["node", "./dist/main.js"]