import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {},
  });

  console.log("Usuário criado:", user);

  const drivers = await prisma.driver.createMany({
    data: [
      {
        name: "Homer Simpson",
        description:
          "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        rating: "2/5",
        comment:
          "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        rating_km: 2.5,
        min_km: 1,
      },
      {
        name: "Dominic Toretto",
        description:
          "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
        vehicle: "Dodge Charger R/T 1970 modificado",
        rating: "4/5",
        comment:
          "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        rating_km: 5.0,
        min_km: 5,
      },
      {
        name: "James Bond",
        description:
          "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
        vehicle: "Aston Martin DB5 clássico",
        rating: "5/5",
        comment:
          "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        rating_km: 10.0,
        min_km: 10,
      },
    ],
  });

  console.log("Motoristas criados:", drivers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
