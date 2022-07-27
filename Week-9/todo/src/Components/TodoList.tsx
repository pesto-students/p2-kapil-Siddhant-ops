import { Dispatch, SetStateAction } from "react";
import taskStyles from "../Styles/Task.module.scss";
import { getTasks } from "../Utils/Encryption";
import { setLocalStorage, TaskInterface } from "../Utils/Helper";

const TodoList = ({
  tasks,
  setTasks,
}: {
  tasks: TaskInterface[] | null;
  setTasks: Dispatch<SetStateAction<TaskInterface[] | null>>;
}) => {
  return (
    <section className={taskStyles.tasksContainer}>
      <ul>
        {tasks &&
          getTasks()?.filter((task) => task.state === "active")?.length !==
            0 && (
            <li className={taskStyles.listHeader}>
              <div>
                <h2>Incomplete Task</h2>
                <small>
                  {
                    getTasks()?.filter((task) => task.state === "active")
                      ?.length
                  }{" "}
                  result
                  {getTasks()!.filter((task) => task.state === "active")!
                    .length > 1 && "s"}{" "}
                  found
                </small>
              </div>
            </li>
          )}
        {tasks &&
          getTasks()?.map((task, index) => {
            if (task.state === "active") {
              return (
                <li key={index}>
                  <div className={taskStyles.content}>
                    <h5>{task.taskContent}</h5>
                    <small>Task created on : {task.taskDate}</small>
                  </div>
                  <div className={taskStyles.iconContainer}>
                    <button
                      onClick={() => {
                        setTasks((prevTasks) => {
                          let updatedTasks = [...prevTasks!];
                          updatedTasks[index].state = "completed";
                          console.log("updatedTasks", updatedTasks);
                          setLocalStorage(updatedTasks);
                          return updatedTasks;
                        });
                      }}
                    >
                      <span className={taskStyles.btnText}>done</span>
                      <span className="material-symbols-outlined">
                        check_circle
                      </span>
                    </button>
                  </div>
                </li>
              );
            }
          })}
        {tasks &&
          getTasks()?.filter((task) => task.state !== "active")?.length !==
            0 && (
            <li className={taskStyles.listHeader}>
              <div>
                <h2>Completed Task</h2>
                <small>
                  {
                    getTasks()?.filter((task) => task.state !== "active")
                      ?.length
                  }{" "}
                  result
                  {getTasks()!.filter((task) => task.state !== "active")!
                    .length > 1 && "s"}{" "}
                  found
                </small>
              </div>
            </li>
          )}
        {tasks &&
          getTasks()?.map((task, index) => {
            if (task.state !== "active") {
              return (
                <li key={index}>
                  <div className={taskStyles.content}>
                    <h5>{task.taskContent}</h5>
                    <small>Task created on : {task.taskDate}</small>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </section>
  );
};

export default TodoList;
