// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ToDo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import apiMiddleware from "../../../service/apiMiddleware";
import { TodoDTO, UpdateTodoDTO } from "../../../types/todoDTO";
import TodoBackendService from "../../../service/todoBackendService";

type Message = {
  message: string;
};

const callback = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | TodoDTO | TodoDTO[] | Message>,
  userId: string
) => {
  const { query } = req;
  const { todoId } = query;

  if (req.method === "PUT") {
    if (!todoId) {
      return res.status(400).json({ message: "Todo not found" });
    }

    const currentTodo = await TodoBackendService.getTodo(+todoId, userId);

    if (!currentTodo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    const todo: UpdateTodoDTO = JSON.parse(req.body);
    await TodoBackendService.updateTodo(todo);
    return res.status(201).json({message: "Updated!"});
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
