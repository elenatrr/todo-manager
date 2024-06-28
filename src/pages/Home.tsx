import { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { TodoAppDataType } from "../types/common";

export default function Home() {
  const [todoAppData, setTodoAppData] = useState<TodoAppDataType | null>(null)

  useEffect(() => {
    const savedTodos = localStorage.getItem("todoAppData")

    if (savedTodos) {
      setTodoAppData(JSON.parse(savedTodos))
    } else {
      fetch("/initialTodos.json")
        .then((response) => response.json())
        .then((data: TodoAppDataType) => setTodoAppData(data))
        .catch((err) => console.log("Error fetching todos:", err))
    }
  }, [])

  useEffect(() => {
    if (todoAppData !== null) {
      localStorage.setItem("todoAppData", JSON.stringify(todoAppData))
    }
  }, [todoAppData])

  return (
    <>
      <div className="flex gap-2 flex-col justify-between md:flex-row md:items-end mb-6">
        <h1 className="title">My Tasks</h1>
        <ul className="flex gap-4 md:gap-6">
          <li className="dot before:bg-high">high</li>
          <li className="dot before:bg-medium">medium</li>
          <li className="dot before:bg-low">low</li>
          <li className="dot before:bg-accent">none</li>
        </ul>
      </div>
      <TodoList todoAppData={todoAppData} setTodoAppData={setTodoAppData} />
    </>
  )
}