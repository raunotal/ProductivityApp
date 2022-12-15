import { ToDo } from "@prisma/client";
import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionToken } from "../types/session";
import { TodoDTO } from "../types/todoDTO";

export type Message = {
  message: string;
};

const apiMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | TodoDTO | TodoDTO[] | Message>,
  callback: (
    req: NextApiRequest,
    res: NextApiResponse<ToDo | TodoDTO | TodoDTO[] | Message>,
    userId: string
  ) => Promise<void>
) => {
  const { headers } = req;

  if (!headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const { uid: userId } = verify(
      headers.authorization!.replace("Bearer ", ""),
      process.env.JWT_SECRET!
    ) as SessionToken;
    await callback(req, res, userId);
  } catch (e) {
    return res.status(400).json({ message: "Invalid request" });
  }
};

export default apiMiddleware;
