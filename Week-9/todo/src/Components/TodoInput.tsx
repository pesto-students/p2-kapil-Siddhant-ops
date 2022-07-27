import { Dispatch, SetStateAction, useState } from "react";
import inputStyles from "../Styles/Input.module.scss";
import { getDateTime, setLocalStorage, TaskInterface } from "../Utils/Helper";

const TodoInput = ({
  tasks,
  setTasks,
}: {
  tasks: TaskInterface[] | null;
  setTasks: Dispatch<SetStateAction<TaskInterface[] | null>>;
}) => {
  const [inputState, setInputState] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputState.trim() === "") {
      return;
    }
    const newTask: TaskInterface = {
      taskContent: inputState,
      taskDate: getDateTime(),
      state: "active",
    };
    setTasks((prevTasks) => {
      const returningArr = prevTasks && [...prevTasks, newTask];
      setLocalStorage(returningArr ?? [newTask]);
      return returningArr ?? [newTask];
    });
    setInputState("");
  };

  return (
    <section className={inputStyles.inputContainer}>
      <form onSubmit={(e) => formSubmit(e)}>
        <input
          type="text"
          name="input"
          value={inputState}
          onChange={(e) => handleInputChange(e)}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add task</button>
      </form>
    </section>
  );
};

export default TodoInput;
