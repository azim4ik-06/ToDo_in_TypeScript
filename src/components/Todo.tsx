import { useState } from "react";
import { TodoResponse } from "../lib/types/TodoTypes";
import DeleteTodo from "./DeleteTodo";
import SearchBar from "./SearchBar";

export const url = "http://localhost:3000/todos";

type Props = {
  showModal: () => void;
  todos: TodoResponse | null;
  handleEdit: (id: string) => void;
};

const Todo = ({ showModal, todos, handleEdit }: Props) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {}
  );

  const handleCheckboxChange = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-4 w-full">
      <h1 className="text-4xl font-bold">Todo App</h1>

      <div className="bg-indigo-50 p-12 rounded-xl">
        <div className="flex gap-4">
          <SearchBar />
          <button
            onClick={showModal}
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Add new
          </button>
        </div>
        <div className="space-y-4 mt-4">
          {todos ? (
            todos.map((task) => (
              <div className="flex justify-between items-center">
                <div
                  className={`flex gap-2 items-center ${
                    completedTasks[task.id]
                      ? "line-through text-green-600 font-semibold text-lg"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={completedTasks[task.id] ? true : false}
                    onChange={() => handleCheckboxChange(task.id)}
                  />
                  <p className="text-xl">{task.title}</p>{" "}
                  <p className="self-end">{task.date}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="px-3 text-white py-2 bg-blue-500 rounded-lg"
                  >
                    EDIT
                  </button>
                  <DeleteTodo id={task.id} />
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
