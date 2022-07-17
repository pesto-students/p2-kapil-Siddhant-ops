import inputStyles from "../Styles/input.module.css";

const TodoInput = () => {
  return (
    <section className={inputStyles.inputContainer}>
      <form>
        <input type="text" name="input" placeholder="What needs to be done?" />
        <button type="submit">Add task</button>
      </form>
    </section>
  );
};

export default TodoInput;
