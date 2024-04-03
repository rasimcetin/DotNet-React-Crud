import {
  deleteTodo,
  fetchTodos,
  TodoItem,
  updateTodo,
} from "@/redux/todo-slice";
import { useAppDispatch } from "@/hooks";

export interface TodoListProps {
  todoList: TodoItem[];
}

function TodoList({ todoList }: TodoListProps) {
  // const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   setTodos(todoList);
  // }, [todoList]);

  const update = async (todo: TodoItem) => {
    todo = { ...todo, isCompleted: !todo.isCompleted };
    await dispatch(updateTodo(todo));
    //dispatch(fetchTodos());
  };

  const deleteItem = async (id: string) => {
    await dispatch(deleteTodo(id));
    dispatch(fetchTodos());
  };

  return (
    <>
      {" "}
      {/* <TodoList /> */}
      <ul className="mt-4 space-y-2">
        {todoList.map((todo) => (
          <li key={todo.id} className="h-9">
            <div className="flex items-center justify-between space-x-3 w-96  border rounded-md">
              <input
                className="h-5 w-5 text-blue-500 ml-2 rounded-md"
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => update(todo)}
              />
              <div className="text-xl">{todo.title}</div>
              <button
                onClick={() => deleteItem(todo.id)}
                className="ml-2 bg-red-600 hover:bg-red-700 active:border-2 text-white border-1 rounded-md w-16 h-8"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
