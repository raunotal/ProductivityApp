import { PrismaClient } from "@prisma/client";
import { TodoDTO, UpdateTodoDTO } from "../types/todoDTO";

const prisma = new PrismaClient();

const getTodos = async (userId: string): Promise<TodoDTO[]> => {
  const result: TodoDTO[] = [];

  const todos = await prisma.toDo.findMany({
    where: { userId },
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
    result.push(todoDTO);
  }

  return result;
};

const getTodo = async (id: number, userId: string) => {
  return await prisma.toDo.findFirst({
    where: { id, userId },
  });
};

const updateTodo = async (todo: UpdateTodoDTO) => {
  console.log("==========================")
  console.log("todo", todo)
  const dateStartOfDay = new Date();
  dateStartOfDay.setUTCHours(0, 0, 0, 0);
  const todoLogs = await prisma.todoLog.findMany({
    where: { start: { gte: dateStartOfDay }, toDoId: todo.id },
    orderBy: { start: "desc" },
  });
  if (todo.isRunning) {
    console.log("todoLogs - isRunning", todoLogs);
  } else {
    // await prisma.todoLog.upsert({where: {id: t}})
    console.log("todoLogs - isRunning NOT", todoLogs);
  }
};

const TodoBackendService = {
  getTodos,
  getTodo,
  updateTodo,
};

export default TodoBackendService;
