// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { TodoDTO } from "../../../types/todoDTO";
import { verify } from "jsonwebtoken";
import { SessionToken } from "../../../types/session";

const prisma = new PrismaClient();

type Message = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>
) => {
  const { headers, body } = req;
  console.log("body", body);

  if (!headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { uid: userId } = verify(
    headers.authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET!
  ) as SessionToken;

  if (req.method === "POST") {
    const todoDTO: TodoDTO = JSON.parse(req.body);
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
    const todos: ToDo[] = await prisma.toDo.findMany();
    return res.status(200).json(todos);
  }
  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
