import { ReactNode } from "react";

export type PriorityType = "high" | "medium" | "low"

export type TodoItemType = {
  id: number;
  text: string;
  status: "not started" | "in progress" | "done";
  completed: boolean;
  priority: PriorityType;
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

export type TodoItemProps = {
  task: TodoItemType,
  section: string,
  onComplete: (section: string, task: TodoItemType) => void,
  onEdit: (event: React.ChangeEvent<HTMLInputElement>, section: string, task: TodoItemType) => void,
  onPriorityChange: (section: string, task: TodoItemType, newPriority: "high" | "medium" | "low") => void,
  onTextInputBlur: (section: string, task: TodoItemType) => void,
  onDelete: (section: string, task: TodoItemType) => void
}

export type TodoCreatorProps = {
  todos: TodoListType;
  setTodos: SetTodosType;
  sectionName: string
}

export type DropdownMenuProps = {
  menuBtnRef:  React.RefObject<HTMLButtonElement>,
  sectionName: string,
  task: TodoItemType,
  onPriorityChange: (section: string, task: TodoItemType, newPriority: "high" | "medium" | "low") => void,
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>
}