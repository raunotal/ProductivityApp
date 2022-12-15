// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NewTodoDTO } from "../../../types/todoDTO";
import apiMiddleware, { Message } from "../../../service/apiMiddleware";

const prisma = new PrismaClient();

const callback = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>,
  userId: string
) => {

  if (req.method === "POST") {
    const todoDTO: NewTodoDTO = JSON.parse(req.body);
    if (!todoDTO.name) {
      return res.status(400).json({ message: "No name" });
    }

    if (!todoDTO.totalTimeInSeconds || todoDTO.totalTimeInSeconds < 1) {
      return res.status(400).json({ message: "Wrong time" });
    }

    const savedTodo = await prisma.toDo.create({
      data: {
        userId,
        name: todoDTO.name,
        totalTime: todoDTO.totalTimeInSeconds,
      },
    });
    return res.json(savedTodo);
  }

  if (req.method === "GET") {
    const todos: ToDo[] = await prisma.toDo.findMany({
      where: { userId: { equals: userId } },
    });
    return res.status(200).json(todos);
  }
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>
) => {
  await apiMiddleware(req, res, callback);
};

export default handler;
