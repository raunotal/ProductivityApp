import { PrismaClient } from "@prisma/client";
import { TodoDTO } from "../types/todoDTO";

const prisma = new PrismaClient();

const getTodos = async (userId: string): Promise<TodoDTO[]> => {
  const currentDate = new Date();
  const result: TodoDTO[] = [];

  const todos = await prisma.toDo.findMany({
    where: { userId: { equals: userId } },
    include: { toDoLogs: true },
  });

  for (const todo of todos) {
    let isRunning = false;
    let progressInSeconds = 0;

    for (const todoLog of todo.toDoLogs) {
      if (!todoLog.end) {
        isRunning = true;
        continue;
      }

      const progressMilliSeconds =
        todoLog.end.getTime() - todoLog.start.getTime();
      const progressSeconds = Math.round(progressMilliSeconds / 1000);
      progressInSeconds += progressSeconds;
    }

    const todoDTO: TodoDTO = {
      id: todo.id,
      name: todo.name,
      totalTimeInSeconds: todo.totalTimeInSeconds,
      isRunning,
      progressInSeconds,
    };
    console.log("todoDTO", todoDTO)
    result.push(todoDTO);
  }

  return result;
};

const TodoBackendService = {
  getTodos,
};

export default TodoBackendService;
