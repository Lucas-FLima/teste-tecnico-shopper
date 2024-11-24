FROM node:20.11.1

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE ${PORT}

CMD ["/app/entrypoint.sh"]