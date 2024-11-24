until nc -z -v -w30 db 3306
do
  echo "Aguardando banco de dados iniciar..."
  sleep 1
done

npx prisma migrate dev --name init

npm run seed

npm run dev
