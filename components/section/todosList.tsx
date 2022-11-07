import { ToDo } from "@prisma/client";
import { useState } from "react";
import { StoragedTodo } from "../../types/storagedTodo";
import { TodoDTO } from "../../types/todoDTO";
import { UpdateTodoDTO } from "../../types/updateTodoDTO";
import { fromSecondsToString } from "../../utils/helpers";
import TodoRow from "./todoRow";

interface TodoListProps {
  todos: ToDo[];
}

async function updateTodo(todo: UpdateTodoDTO) {
  const response = await fetch(`/api/todo/${todo.id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: todo.id,
      sessionDuration: todo.sessionDuration,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const updateTodoHandler = (activeTodo: StoragedTodo) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const todoTimestamp = Math.floor(new Date(activeTodo.activatedDateTime).getTime() / 1000);
  const updatedTodo = {
    id: activeTodo.todo.id,
    sessionDuration: currentTimestamp - todoTimestamp,
  };
  updateTodo(updatedTodo);
};

const TodosList = (props: TodoListProps) => {
  const { todos } = props;
  const [activeTodoId, setActiveTodoId] = useState(-1);
  const setActiveTodoItemHandler = (id: number) => {
    setActiveTodoId(id);

    if (id !== -1) {
      const localStorageTodo = localStorage.getItem("active_todo");
      if (localStorageTodo) {
        const activeTodo: StoragedTodo = JSON.parse(localStorageTodo);
        updateTodoHandler(activeTodo);
      }
      const activatedTodo = todos.find((t) => t.id === id)!;
      const storageItem: StoragedTodo = {
        todo: activatedTodo,
        activatedDateTime: new Date(),
      };
      localStorage.setItem("active_todo", JSON.stringify(storageItem));
    } else {
      const localStorageTodo = localStorage.getItem("active_todo");
      if (localStorageTodo) {
        const activeTodo: StoragedTodo = JSON.parse(localStorageTodo);
        updateTodoHandler(activeTodo);
      }
      localStorage.removeItem("active_todo");
    }
  };

  return (
    <div className="row mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Tegevus</th>
            <th scope="col">Igapäevaselt</th>
            <th scope="col">Hetkeseis</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TodoRow
              key={todo.id}
              {...{
                todo,
                isActive: todo.id === activeTodoId,
                setActiveId: setActiveTodoItemHandler,
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodosList;
