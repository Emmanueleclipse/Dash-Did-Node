FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]