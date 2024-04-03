import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface TodoItemCreatorProps {
  createTodoItem: (title: string) => void;
}

function TodoItemCreator({ createTodoItem }: TodoItemCreatorProps) {
  const [title, setTitle] = useState("");
  const handleClick = () => {
    createTodoItem(title);
    setTitle("");
  };

  return (
    <div className="flex flex-row mt-4">
      <Input
        type="text"
        className=""
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <Button
        className=" bg-blue-700 hover:bg-blue-800 active:border-2 ml-3"
        onClick={handleClick}
      >
        {"Add"}
      </Button>
    </div>
  );
}

export default TodoItemCreator;
