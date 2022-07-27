import { useState } from "react";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";
import "./Styles/App.scss";
import "./Styles/Responsive.scss";
import { getTasks } from "./Utils/Encryption";
import { TaskInterface } from "./Utils/Helper";

function App() {
  const [tasks, setTasks] = useState<TaskInterface[] | null>(getTasks());

  return (
    <main>
      <TodoInput tasks={tasks} setTasks={setTasks} />
      {tasks && <TodoList tasks={tasks} setTasks={setTasks} />}
    </main>
  );
}

export default App;
