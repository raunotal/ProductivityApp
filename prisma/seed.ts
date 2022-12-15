import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const currentDate = new Date();

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
      start: new Date(new Date().setHours(currentDate.getHours() - 1)),
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

// export type TodoDTO = {
//   id: number;
//   name: string;
//   totalTimeInSeconds: number;
//   progressInSeconds: number;
//   isRunning: number;
// };

// export type NewTodoDTO = {
//   name: string;
//   totalTimeInSeconds: number;
// };

// export type UpdateTodoDTO = {
//   id: number;
//   isRunning: boolean;
//   dateTime: Date;
// }
