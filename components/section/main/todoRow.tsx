import { ToDo } from "@prisma/client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { TodoDTO } from "../../../types/todoDTO";
import { fromSecondsToString } from "../../../utils/helpers";

interface TodoRowProps {
  todo: TodoDTO;
  isActive: boolean;
  setActiveId: (id: number, isRunning: boolean) => void;
}

const TodoRow = (props: TodoRowProps) => {
  const { todo, isActive, setActiveId } = props;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let counter: undefined | NodeJS.Timer;
    if (isActive) {
      counter = setInterval(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);
    }

    return () => {
      if (counter) {
        return clearInterval(counter);
      }
    };
  }, [isActive, setActiveId, todo.id]);

  const activationToggleHandler = () => {
    setActiveId(todo.id, !isActive);
  };

  const timeEveryDay = fromSecondsToString(todo.totalTimeInSeconds);
  let timeSoFar = fromSecondsToString(todo.progressInSeconds + timer);

  return (
    <tr>
      <th scope="row">{todo.name}</th>
      <td>{timeEveryDay}</td>
      <td>{timeSoFar}</td>
      <td>
        <button
          type="button"
          className={classNames("btn", isActive ? "btn-danger" : "btn-success")}
          onClick={activationToggleHandler}
        >
          {isActive ? "Peata" : "Käivita"}
        </button>
      </td>
    </tr>
  );
};

export default TodoRow;
