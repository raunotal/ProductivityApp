import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tmpDate = new Date();
  const currentDate = new Date(new Date().setDate(tmpDate.getDate() - 1));

  const todo1 = await prisma.toDo.create({
    data: {
      name: "1",
      totalTimeInSeconds: 1800,
      userId: "110859258405407504523",
    },
  });

  const todo2 = await prisma.toDo.create({
    data: {
      name: "2",
      totalTimeInSeconds: 10800,
      userId: "110859258405407504523",
    },
  });

  await prisma.todoLog.create({
    data: {
      start: new Date(
        new Date(new Date().setHours(currentDate.getHours() - 1)).setDate(
          tmpDate.getDate() - 1
        )
      ),
      end: currentDate,
      toDoId: todo1.id,
    },
  });

  await prisma.todoLog.createMany({
    data: [
      {
        start: new Date(new Date().setHours(currentDate.getHours() - 4)),
        end: new Date(new Date().setHours(currentDate.getHours() - 3)),
        toDoId: todo2.id,
      },
      {
        start: new Date(new Date().setHours(currentDate.getHours() - 2)),
        toDoId: todo2.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
