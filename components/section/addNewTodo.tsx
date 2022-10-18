import { ToDo } from "@prisma/client";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { TodoDTO } from "../../types/todoDTO";
import { fromMinutesToString } from "../../utils/helpers";

async function saveTodo(todo: TodoDTO) {
  const response = await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const AddNewTodo = () => {
  const [todoTimeMinutes, setTodoTimeMinutes] = useState(1);
  const [todoName, setTodoName] = useState("");

  const durationChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTimeMinutes(e.target.valueAsNumber);
  };

  const todoSaveHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const todo: TodoDTO = {
      name: todoName,
      totalTimeInSeconds: todoTimeMinutes * 60,
    };
    saveTodo(todo);
  };

  const durationText = fromMinutesToString(todoTimeMinutes);
  return (
    <div className="row mt-5">
      <div className="col">
        <form onSubmit={todoSaveHandler}>
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
              min="1"
              max="360"
              step="1"
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
