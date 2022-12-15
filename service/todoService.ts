import { Session } from "next-auth";
import { NewTodoDTO, UpdateTodoDTO } from "../types/todoDTO";

const getTodos = async (session: Session) => {
  const res = await fetch(`${process.env.HOST}/api/todo`, {
    headers: new Headers({ Authorization: `Bearer ${session.token}` }),
  });
  return await res.json();
};

const newTodo = async (todo: NewTodoDTO, session: Session) => {
  const response = await fetch("/api/todo", {
    method: "POST",
    headers: new Headers({ Authorization: `Bearer ${session.token}` }),
    body: JSON.stringify(todo),
  });
  return await response.json();
};

const updateTodo = async (todo: UpdateTodoDTO, session: Session) => {
  const res = await fetch(`${process.env.HOST}/api/todo/${todo.id}`, {
    method: "PUT",
    headers: new Headers({ Authorization: `Bearer ${session.token}` }),
    body: JSON.stringify(todo),
  });
  return await res.json();
};

const TodosService = {
  getTodos,
  newTodo,
  updateTodo,
};

export default TodosService;
