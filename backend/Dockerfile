FROM node:20.11.1

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 8080

CMD ["/app/entrypoint.sh"]