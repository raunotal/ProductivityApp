import { ToDo } from "@prisma/client";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { fromSecondsToString } from "../../utils/helpers";

interface TodoRowProps {
  todo: ToDo;
  isActive: boolean;
  setActiveId: (id: number) => void;
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

  console.log("RENDER");
  const activationToggleHandler = () => {
    const callbackInput = isActive ? -1 : todo.id;
    setActiveId(callbackInput);
  };

  const timeEveryDay = fromSecondsToString(todo.totalTime);
  const timeSoFar = todo.progressInSeconds
    ? fromSecondsToString(todo.progressInSeconds + timer)
    : 0;
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
