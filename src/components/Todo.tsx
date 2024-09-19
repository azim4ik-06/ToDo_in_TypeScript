import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { TodoResponse } from "../lib/types/TodoTypes";

const url = "http://localhost:3000/todos";

export default function Todo() {
  const [todos, setTodos] = useState<TodoResponse | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(url);

      const data: TodoResponse = await response.json();

      setTodos(data);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-center">ToDo</h1>

      <div className="bg-indigo-50 p-12 rounded-xl">
        <div className="flex gap-4">
          <SearchBar />
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white">
            Add new
          </button>
        </div>
        <div className="space-y-4 mt-4">
          {todos ? (
            todos.map((task) => (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" />
                  <p className="text-xl">{task.title}</p>{" "}
                  <p className="self-end">{task.date}</p>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-2 bg-blue-500 rounded-lg text-white">
                    Edit
                  </button>
                  <button className="px-3 py-2 bg-red-500 rounded-lg text-white">
                    Delete
                  </button>
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
}
