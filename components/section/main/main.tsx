import { ToDo } from "@prisma/client";
import { Session } from "next-auth";
import { ChangeEvent, useState } from "react";
import TodosClientService from "../../../service/todoClientService";
import { TodoDTO } from "../../../types/todoDTO";
import AddNewTodo from "./addNewTodo";
import TodosList from "./todosList";

interface MainProps {
  todos: TodoDTO[];
  session: Session;
}

const Main = (props: MainProps) => {
  const { todos, session } = props;
  const [todoList, setTodoList] = useState(todos);

  const todoAddHandler = async (newTodo: TodoDTO) => {
    setTodoList((prevState) => {
      return [...prevState, newTodo];
    });
  };

  return (
    <div className="container">
      <AddNewTodo {...{ session, onTodoAdd: todoAddHandler }} />
      <hr className="p-3" />
      <h1>Tegevused</h1>
      <TodosList {...{ todos: todoList, session }} />
    </div>
  );
};

export default Main;
