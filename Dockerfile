FROM node:lts-alpine3.19
RUN mkdir -p /home/node/app/node_modules
WORKDIR /home/node/app
COPY package*.json ./
RUN chown -R node:node /home/node/app
USER node
RUN npm install
COPY --chown=node:node . .
RUN npm run build
RUN rm -rf node_modules index.js route.js package-lock.json models external controllers services

RUN cd client && npm install && npm run build
RUN mv client/dist dist
RUN rm -rf client
RUN mkdir client
RUN mv dist client/dist

EXPOSE 3000
CMD ["npm", "start"]