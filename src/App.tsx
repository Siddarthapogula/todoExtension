import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  name: string;
  duration: string;
  completed: boolean;
}

function TodoApp() {
  // Initialize state with localStorage or default to empty array
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodos = [
        ...todos,
        { id: Date.now(), name: newTodo, duration: "1 hour", completed: false },
      ];
      setTodos(newTodos);
      setNewTodo("");
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };
  const deleteTodos = () => {
    localStorage.removeItem("todos");
    setTodos([]);
  };

  // Toggle the completion status of a todo
  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="p-4 w-80 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-center">Todo List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <div className=" flex justify-between">
          <button
            onClick={addTodo}
            className="mt-2 w-[50%] bg-blue-500 text-white p-2 m-2 rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
          <button
            onClick={deleteTodos}
            className="mt-2 w-[50%] bg-red-500 text-white p-2 m-2 rounded hover:bg-red-600"
          >
            Delete Todos
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 bg-white rounded shadow"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={`${todo.completed ? "line-through" : ""}`}>
                {todo.name}
              </span>
            </div>
            
            <span className={`${todo.completed ? "text-green-500" : "text-red-500"}`}>
              {todo.completed ? "done" : "doIt"}
            </span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
