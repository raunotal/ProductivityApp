import { Session } from "next-auth";
import { useEffect, useState } from "react";
import TodosClientService from "../../../service/todoClientService";
import { TodoDTO, UpdateTodoDTO } from "../../../types/todoDTO";
import TodoRow from "./todoRow";

interface TodoListProps {
  todos: TodoDTO[];
  session: Session;
}

const TodosList = (props: TodoListProps) => {
  const { todos, session } = props;
  const [activeTodoId, setActiveTodoId] = useState(-1);

  useEffect(() => {
    for (const todo of todos) {
      if (todo.isRunning) {
        setActiveTodoId(todo.id);
        break;
      }
    }
  }, [todos]);

  const setActiveTodoItemHandler = async (id: number, isRunning: boolean) => {
    if (activeTodoId === id) {
      await TodosClientService.updateTodo({ id, isRunning }, session);
      return setActiveTodoId(-1);
    }

    await TodosClientService.updateTodos(
      { id: activeTodoId, isRunning: false },
      { id, isRunning },
      session
    );
    setActiveTodoId(id);
    return;
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
