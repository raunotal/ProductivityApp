import { Session } from "next-auth";
import { useState } from "react";
import TodosClientService from "../../../service/todoClientService";
import { TodoDTO, UpdateTodoDTO } from "../../../types/todoDTO";
import TodoRow from "./todoRow";

interface TodoListProps {
  todos: TodoDTO[];
  session: Session;
}

async function updateTodo(todo: UpdateTodoDTO, session: Session) {
  const response = await TodosClientService.updateTodo(todo, session);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const TodosList = (props: TodoListProps) => {
  const { todos, session } = props;
  const [activeTodoId, setActiveTodoId] = useState(-1);

  const setActiveTodoItemHandler = (id: number) => {
    setActiveTodoId(id);

    if (id !== -1) {
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
