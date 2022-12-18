import { prisma } from "../config/prisma";
import { TodoDTO, UpdateTodoDTO } from "../types/todoDTO";

const getTodos = async (userId: string): Promise<TodoDTO[]> => {
  const result: TodoDTO[] = [];
  const dateStartOfDay = new Date();
  dateStartOfDay.setUTCHours(0, 0, 0, 0);

  const todos = await prisma.toDo.findMany({
    where: { userId },
    include: { toDoLogs: { where: { start: { gte: dateStartOfDay } } } },
  });

  for (const todo of todos) {
    let isRunning = false;
    let progressInSeconds = 0;

    for (const todoLog of todo.toDoLogs) {
      let progressMilliSeconds = 0;
      if (!todoLog.end) {
        isRunning = true;
        progressMilliSeconds = new Date().getTime() - todoLog.start.getTime();
      } else {
        progressMilliSeconds = todoLog.end.getTime() - todoLog.start.getTime();
      }

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

const updateTodo = async (todo: UpdateTodoDTO, userId: string) => {
  const dateStartOfDay = new Date();
  dateStartOfDay.setUTCHours(0, 0, 0, 0);

  const todoLogs = await prisma.todoLog.findMany({
    where: { start: { gte: dateStartOfDay }, toDoId: todo.id },
    orderBy: { start: "desc" },
  });

  const lastTodoLog = todoLogs[0];

  if (!lastTodoLog || lastTodoLog.end) {
    return await prisma.todoLog.create({
      data: {
        toDoId: todo.id,
        start: new Date(),
      },
    });
  }

  if (!lastTodoLog.end) {
    return await prisma.todoLog.update({
      where: { id: lastTodoLog.id },
      data: {
        end: new Date(),
      },
    });
  }
};

const TodoBackendService = {
  getTodos,
  getTodo,
  updateTodo,
};

export default TodoBackendService;
