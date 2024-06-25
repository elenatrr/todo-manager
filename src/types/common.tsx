import { ReactNode } from "react";

export type TodoItemType = {
  id: number;
  text: string;
  status: "not started" | "in progress" | "done";
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export type TodoListType = {
  [section: string]: TodoItemType[]
}

export type SetTodosType = React.Dispatch<React.SetStateAction<TodoListType | null>>;

export type TodoListProps = {
  todos: TodoListType | null;
  setTodos: SetTodosType;
};


export type ThemeProviderProps = {
  children: ReactNode
}

export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
}
