import { ToDo } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import AddNewTodo from "./addNewTodo";
import TodosList from "./todosList";

interface MainProps {
  todos: ToDo[];
}

const Main = (props: MainProps) => {
  return (
    <div className="container">
      <AddNewTodo />
      <hr className="p-3" />
      <h1>Tegevused</h1>
      <TodosList {...props} />
    </div>
  );
};

export default Main;
