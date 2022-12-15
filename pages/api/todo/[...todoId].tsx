// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { UpdateTodoDTO } from "../../../types/updateTodoDTO";

const prisma = new PrismaClient();

type Message = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>
) => {
  const { query, headers } = req;
  const { todoId } = query;
  const currentTodo = await prisma.toDo.findFirst({ where: { id: +todoId! } });

  if (!currentTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (req.method === "PUT") {
    const todo: UpdateTodoDTO = JSON.parse(req.body);
    const progressInSecondsTotal =
    (currentTodo.progressInSeconds || 0) + todo.sessionDuration;
    const updatedTodo = await prisma.toDo.update({
      where: { id: todo.id },
      data: { progressInSeconds: progressInSecondsTotal },
    });
    return res.status(201).json(updatedTodo);
  }

  if (req.method === "GET") {
    return res.status(200).json(currentTodo);
  }
  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
