import { ToDo } from "@prisma/client";
import { verify } from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { SessionToken } from "../types/session";

export type Message = {
  message: string;
};

const apiMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse<ToDo | ToDo[] | Message>,
  callback: (
    req: NextApiRequest,
    res: NextApiResponse<ToDo | ToDo[] | Message>,
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
    res.statusCode = 400;
    return res.json({ message: "Invalid request" });
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default apiMiddleware;
