import { ReactNode } from "react";

export type PriorityType = "high" | "medium" | "low";

export type ThemeType = "light" | "dark";

export type FontFamilyType = "sans" | "mono" | "serif";

export type FontSizeType = "small" | "medium" | "large";

export type TodoItemType = {
  id: number;
  text: string;
  completed: boolean;
  priority: PriorityType;
};

export type SectionType = {
  id: number;
  sectionTitle: string;
  todoList: TodoItemType[];
};

export type TodoAppDataType = SectionType[];

export type SetTodoAppDataType = React.Dispatch<
  React.SetStateAction<TodoAppDataType | null>
>;

export type TodoListProps = {
  todoAppData: TodoAppDataType | null;
  setTodoAppData: SetTodoAppDataType;
};

export type ContextProviderProps = {
  children: ReactNode;
};

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export type FontType = {
  family: FontFamilyType;
  size: FontSizeType;
};

export type FontContextType = {
  font: FontType;
  switchFont: (family?: FontFamilyType, size?: FontSizeType) => void;
};

export type TodoItemProps = {
  todoItem: TodoItemType;
  sectionId: number;
  onComplete: (currentSectionId: number, currentTodo: TodoItemType) => void;
  onEdit: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    currentSectionId: number,
    currentTodo: TodoItemType
  ) => void;
  onPriorityChange: (
    currentSectionId: number,
    currentTodo: TodoItemType,
    newPriority: PriorityType
  ) => void;
  onTextInputBlur: (
    currentSectionId: number,
    currentTodo: TodoItemType
  ) => void;
  onDelete: (currentSectionId: number, currentTodo: TodoItemType) => void;
};

export type TodoCreatorProps = {
  setTodoAppData: SetTodoAppDataType;
  sectionId: number;
};

export type SectionCreatorProps = {
  setTodoAppData: SetTodoAppDataType;
};

export type DropdownMenuProps = {
  menuBtnRef: React.RefObject<HTMLButtonElement>;
  sectionId: number;
  todoItem: TodoItemType;
  onPriorityChange: (
    currentSectionId: number,
    currentTodo: TodoItemType,
    newPriority: PriorityType
  ) => void;
  setIsMenuShown: React.Dispatch<React.SetStateAction<boolean>>;
};
