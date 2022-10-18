import { ToDo } from "@prisma/client";

export type StoragedTodo = {
  todo: ToDo;
  activatedDateTime: Date;
};
