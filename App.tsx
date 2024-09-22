import { useEffect, useState } from "react";
import AddNewModal from "./components/AddNewModal";
import Todo, { url } from "./components/Todo";
import { TodoResponse } from "./lib/types/TodoTypes";
import EditTodo from "./components/EditTodo";

const App = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const handleEditClick = (id: string) => {
    setCurrentId(id);

    setShowEdit(true);
  };

  const [todos, setTodos] = useState<TodoResponse | null>(null);

  const fetchTodos = async () => {
    const response = await fetch(url);

    const data: TodoResponse = await response.json();

    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="h-screen grid place-items-center mx-64">
      <Todo
        handleEdit={handleEditClick}
        showModal={() => setShow(true)}
        todos={todos}
      />
      {show && (
        <AddNewModal refetch={fetchTodos} onClose={() => setShow(false)} />
      )}

      {showEdit && currentId && (
        <EditTodo
          refetch={fetchTodos}
          onClose={() => setShowEdit(false)}
          id={currentId}
        />
      )}
    </main>
  );
};

export default App;
