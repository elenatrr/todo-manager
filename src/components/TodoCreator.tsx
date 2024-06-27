import { useState, useEffect, useRef, useCallback } from "react";
import { TodoCreatorProps, TodoItemType } from "../types/common";

export default function TodoCreator({ todos, setTodos, sectionName }: TodoCreatorProps) {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [showTodoError, setShowTodoError] = useState(false);
  const [newTodo, setNewTodo] = useState<TodoItemType>({
    id: new Date().getTime(),
    text: "",
    completed: false,
    priority: "none",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);

  const handleFocus = () => {
    setIsFieldActive(true);
    setShowTodoError(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((currentTodo) => ({
      ...currentTodo,
      text: event.target.value,
    }));
  }

  const createNewTodo = useCallback(() => {
    const sectionTodos = todos[sectionName as keyof TodoItemType];

    if (newTodo.text.trim()) {
      setTodos((currentTodos) => {
        return { ...currentTodos, [sectionName]: [...sectionTodos, newTodo] };
      });
      setNewTodo({
        id: new Date().getTime(),
        text: "",
        completed: false,
        priority: "none",
      });
    } else {
      setShowTodoError(true);
      setNewTodo({
        id: new Date().getTime(),
        text: "",
        completed: false,
        priority: "none",
      });
      setTimeout(() => {
        setShowTodoError(false);
      }, 1000);
    }
  }, [newTodo, sectionName, setTodos, todos])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createNewTodo();
    }
  }

  const clearInput = () => {
    setNewTodo((currentTodo) => ({
      ...currentTodo,
      text: "",
    }));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
        clearButtonRef.current && !clearButtonRef.current.contains(event.target as Node)) {
        if (newTodo.text) {
          createNewTodo();
        }
        setIsFieldActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newTodo, createNewTodo]);

  return (
    <div className={`${showTodoError && "animate-shake"} ${isFieldActive && "bg-background"} hover:bg-background p-0.5 px-1 transition-colors flex gap-2 items-center text-text rounded flex-1`}>
      <button aria-label="Clear Input" ref={clearButtonRef} onClick={clearInput} className={`${newTodo.text ? "rotate-45 text-error" : "pointer-events-none text-accent"} transition-transform`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <input
        ref={inputRef}
        name="newTodo"
        maxLength={100}
        value={newTodo.text}
        type="text"
        placeholder="Type here to create a new to-do and then hit ENTER"
        autoComplete="off"
        className="bg-inherit w-full focus:outline-none text-ellipsis"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onChange={handleInputChange}
      />
      {newTodo.text.trim() && <button aria-label="Submit Section Title" className="text-accent hover:text-green-600" onClick={createNewTodo}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>}
    </div>
  );
}
