// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { UpdateTodoDTO } from "../../../types/updateTodoDTO";
import apiMiddleware from "../../../service/apiMiddleware";

const prisma = new PrismaClient();

type Message = {
  message: string;
};

const callback = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>,
  userId: string
) => {
  const { query, headers } = req;
  const { todoId } = query;

  if (req.method === "PUT") {
    if (!todoId) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const currentTodo = await prisma.toDo.findFirst({
      where: { id: +todoId, userId },
    });

    if (!currentTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const todo: UpdateTodoDTO = JSON.parse(req.body);
    const progressInSecondsTotal =
      (currentTodo.progressInSeconds || 0) + todo.sessionDuration;
    const updatedTodo = await prisma.toDo.update({
      where: { id: todo.id },
      data: { progressInSeconds: progressInSecondsTotal },
    });
    return res.status(201).json(updatedTodo);
  }

  res.status(405).json({ message: "Method not allowed" });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>
) => {
  await apiMiddleware(req, res, callback);
};

export default handler;
