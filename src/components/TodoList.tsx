import { useState } from "react";
import { PriorityType, SectionType, TodoItemType } from "../types/common";
import { TodoListProps } from "../types/common";
import SectionCreator from "./SectionCreator";
import TodoCreator from "./TodoCreator";
import TodoItem from "./TodoItem";

export default function TodoList({ todoAppData, setTodoAppData }: TodoListProps) {
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [editedSectionTitle, setEditedSectionTitle] = useState("");

  if (!todoAppData) {
    return <div>Loading todos...</div>;
  }

  const updateTodos = (currentSectionId: number, currentTodoId: number, updateFn: (todo: TodoItemType) => TodoItemType) => {
    setTodoAppData((currentData) => {
      if (!currentData) {
        return null;
      }

      const updatedSections = currentData.map((section) => {
        if (section.id === currentSectionId) {
          const updatedTodos = section.todoList.map((todoItem) =>
            todoItem.id === currentTodoId ? updateFn(todoItem) : todoItem
          );
          return { ...section, todoList: updatedTodos };
        } else {
          return section;
        }
      });
      return updatedSections;
    });
  };

  const handleComplete = (currentSectionId: number, currentTodo: TodoItemType) => {
    updateTodos(currentSectionId, currentTodo.id, (todoItem) => ({
      ...todoItem,
      completed: !todoItem.completed,
    }));
  };

  const deleteTodoItem = (currentSectionId: number, currentTodo: TodoItemType) => {
    setTodoAppData((currentData) => {
      if (!currentData) {
        return null;
      }
      const updatedSections = currentData.map((section) => {
        if (section.id === currentSectionId) {
          const updatedTodos = section.todoList.filter((todoItem) => todoItem.id !== currentTodo.id);
          return { ...section, todoList: updatedTodos };
        } else {
          return section;
        }
      });
      return updatedSections;
    });
  };

  const editTodoItem = (event: React.ChangeEvent<HTMLTextAreaElement>, currentSectionId: number, currentTodo: TodoItemType) => {
    updateTodos(currentSectionId, currentTodo.id, (todoItem) => ({
      ...todoItem,
      text: event.target.value,
    }));
  };

  const handleTextInputBlur = (currentSectionId: number, currentTodo: TodoItemType) => {
    const isTodoEmpty = !currentTodo.text.trim()

    if (isTodoEmpty) {
      deleteTodoItem(currentSectionId, currentTodo);
    }
  };

  const handlePriorityChange = (currentSectionId: number, currentTodo: TodoItemType, newPriority: PriorityType) => {
    updateTodos(currentSectionId, currentTodo.id, (todoItem) => ({
      ...todoItem,
      priority: newPriority,
    }));
  };

  const deleteSection = (currentSectionId: number) => {
    setTodoAppData((currentData) => {
      if (!currentData) {
        return null;
      }
      const updatedSections = currentData.filter((section) => section.id !== currentSectionId);
      return updatedSections;
    });
  };

  const handleSectionTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedSectionTitle(event.target.value);
  };

  const submitEditedSectionTitle = (currentSectionId: number) => {
    if (editedSectionTitle.trim()) {
      setActiveSectionId(null);
      setTodoAppData((currentData) => {
        if (!currentData) {
          return null;
        }

        const updatedSections = currentData.map((section) =>
          section.id === currentSectionId ? { ...section, sectionTitle: editedSectionTitle } : section
        );

        return updatedSections;
      });
    }
  };

  const editTitle = (currentSection: SectionType) => {
    setActiveSectionId(currentSection.id);
    setEditedSectionTitle(currentSection.sectionTitle);
  };

  return (
    <div>
      {todoAppData.map((section) => (
        <section key={section.id} className="section mb-6">
          <div className={`${activeSectionId === section.id ? "bg-background rounded" : ""} flex gap-2 mb-4 px-1`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
            {activeSectionId === section.id ? (
              <div className="flex flex-1 items-start">
                <input
                  name="sectionTitle"
                  type="text"
                  maxLength={50}
                  value={editedSectionTitle}
                  placeholder={section.sectionTitle}
                  className="flex-1 capitalize text-lg outline-none bg-inherit"
                  autoFocus
                  onChange={handleSectionTitleChange}
                />
                <button
                  aria-label="Submit New Title"
                  className="hover:text-green-600"
                  onClick={() => submitEditedSectionTitle(section.id)}
                  onKeyDown={() => submitEditedSectionTitle(section.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-start">
                <h2 className="capitalize text-lg flex-1">{section.sectionTitle}</h2>
                <button aria-label="Edit Title" onClick={() => editTitle(section)} className="text-accent hover:text-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>
            )}
            <button
              aria-label="Delete Section"
              onClick={() => deleteSection(section.id)}
              className="text-accent hover:text-error self-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
          <ul>
            {section.todoList.map((todoItem) => (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                sectionId={section.id}
                onComplete={handleComplete}
                onEdit={editTodoItem}
                onPriorityChange={handlePriorityChange}
                onTextInputBlur={handleTextInputBlur}
                onDelete={deleteTodoItem}
              />
            ))}
          </ul>
          <TodoCreator setTodoAppData={setTodoAppData} sectionId={section.id} />
        </section>
      ))}
      <SectionCreator setTodoAppData={setTodoAppData} />
    </div>
  );
}
