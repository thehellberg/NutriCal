FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt-get update -y && apt-get install -y openssl
RUN apt install ca-certificates -y && update-ca-certificates
COPY . .
EXPOSE 3000
CMD printenv > .env && npm install -g tsx && tsx server.ts