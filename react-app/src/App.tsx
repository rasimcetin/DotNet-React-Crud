import TodoItemCreator from "./components/TodoItemCreator";
import { useAppDispatch, useAppSelector } from "./hooks";

import {
  postTodo,
  fetchTodos,
  NewTodoItem,
  todoSelector,
} from "./redux/todo-slice";
import TodoList from "./components/TodoList";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();

  const todoList = useAppSelector(todoSelector).todos;

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  async function createTodo(title: string) {
    if (!title) return;
    const newTodo: NewTodoItem = {
      // id: uuidv4(),
      title: title,
      isCompleted: true,
    };

    await dispatch(postTodo(newTodo));
    dispatch(fetchTodos());
  }

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h1 className="text-4xl font-bold">Todos</h1>
      <div className="flex flex-col w-96">
        <TodoItemCreator createTodoItem={createTodo} />
        <TodoList todoList={todoList} />
      </div>
    </div>
  );
}

export default App;
