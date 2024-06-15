import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { TodoListType } from "../types/common";

export default function Home() {
  const [todos, setTodos] = useState<TodoListType | null>(null)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    } else {
      fetch("/initialTodos.json")
        .then((response) => response.json())
        .then((data: TodoListType) => setTodos(data))
        .catch((err) => console.log("Error fetching todos:", err))
    }
  }, [])

  useEffect(() => {
    if (todos !== null) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

  return (
    <>
      <div className="flex gap-2 flex-col justify-between md:flex-row md:items-end mb-6">
        <h1 className="title">My Tasks</h1>
        <ul className="flex gap-6">
          <li className="dot before:bg-high">high</li>
          <li className="dot before:bg-medium">medium</li>
          <li className="dot before:bg-low">low</li>
        </ul>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}