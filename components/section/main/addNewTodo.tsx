import { ToDo } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { Session } from "next-auth";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import TodosClientService from "../../../service/todoClientService";
import { NewTodoDTO, TodoDTO } from "../../../types/todoDTO";
import { fromMinutesToString } from "../../../utils/helpers";

interface IAddNewTodo {
  session: Session;
  onTodoAdd: (todo: TodoDTO) => void;
}

async function saveTodo(
  name: string,
  totalTimeInSeconds: number,
  session: Session
) {
  const toDoDTO: NewTodoDTO = {
    name,
    totalTimeInSeconds,
  };
  return await TodosClientService.newTodo(toDoDTO, session);
}

const AddNewTodo = (props: IAddNewTodo) => {
  const { session, onTodoAdd } = props;
  const [todoTimeMinutes, setTodoTimeMinutes] = useState(5);
  const [todoName, setTodoName] = useState("");

  const durationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTimeMinutes(e.target.valueAsNumber);
  };

  const addTodoHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const totalTimeInSeconds = todoTimeMinutes * 60;
    const todo = await saveTodo(todoName, totalTimeInSeconds, session);
    onTodoAdd(todo);
  };

  const durationText = fromMinutesToString(todoTimeMinutes);
  return (
    <div className="row mt-5">
      <div className="col">
        <form onSubmit={addTodoHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Tegevus
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={todoName}
              required
              onChange={(e) => setTodoName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Kestus
            </label>
            <input
              type="range"
              className="form-range"
              id="time"
              name="time"
              min="5"
              max="360"
              step="5"
              onChange={durationChangeHandler}
              value={todoTimeMinutes}
            />
          </div>
          <div className="mb-3">{durationText}</div>
          <button type="submit" className="btn btn-primary">
            Lisa uus
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTodo;
