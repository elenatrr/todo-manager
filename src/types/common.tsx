import { ReactNode } from "react";

export type TodoItemType = {
  id: number;
  text: string;
  status: "not started" | "in progress" | "done";
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export type TodoListType = {
  [section: string]: TodoItem[]
}

export type ThemeProviderProps = {
  children: ReactNode
}

export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export type TodoListProps = {
  todos: TodoListType | null;
  setTodos: React.Dispatch<React.SetStateAction<TodoListType | null>>;
};