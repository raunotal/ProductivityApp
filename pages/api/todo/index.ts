// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NewTodoDTO, TodoDTO } from "../../../types/todoDTO";
import apiMiddleware, { Message } from "../../../service/apiMiddleware";
import TodoBackendService from "../../../service/todoBackendService";

const prisma = new PrismaClient();

const callback = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | TodoDTO | TodoDTO[] | Message>,
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
        totalTimeInSeconds: todoDTO.totalTimeInSeconds,
      },
    });
    return res.json(savedTodo);
  }

  if (req.method === "GET") {
    const todos: TodoDTO[] = await TodoBackendService.getTodos(userId);
    return res.status(200).json(todos);
  }
  return res.status(405).json({ message: "Method not allowed" });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | TodoDTO | TodoDTO[] | Message>
) => {
  await apiMiddleware(req, res, callback);
};

export default handler;
