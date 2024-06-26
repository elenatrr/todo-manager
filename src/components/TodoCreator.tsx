import { useState, useEffect, useRef, useCallback } from "react";
import { TodoCreatorProps, TodoItemType } from "../types/common";

export default function TodoCreator({ todos, setTodos, sectionName }: TodoCreatorProps) {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [isError, setIsError] = useState(false);
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
    setIsError(false);
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
      setIsError(true);
      setNewTodo({
        id: new Date().getTime(),
        text: "",
        completed: false,
        priority: "none",
      });
      setTimeout(() => {
        setIsError(false);
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
    <div className={`${isError && "animate-shake"} ${isFieldActive && "bg-background"} hover:bg-background p-0.5 transition-colors flex gap-2 items-center text-text rounded flex-1`}>
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
    </div>
  );
}
