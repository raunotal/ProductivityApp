import { ToDo } from "@prisma/client";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import AddNewTodo from "./addNewTodo";
import TodosList from "./todosList";

interface MainProps {
  todos: ToDo[];
  session: Session;
}

const Main = (props: MainProps) => {
  const { todos, session } = props;
  const [todoList, setTodoList] = useState(todos);

  const todoAddHandler = (todo: ToDo) => {
    setTodoList((prevState) => [todo, ...prevState]);
  };
  return (
    <div className="container">
      <AddNewTodo {...{ session, onTodoAdd: todoAddHandler }} />
      <hr className="p-3" />
      <h1>Tegevused</h1>
      <TodosList {...{ todos: todoList }} />
    </div>
  );
};

export default Main;
