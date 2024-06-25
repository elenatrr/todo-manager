import { TodoItemType, TodoListType } from "../types/common";
import { TodoListProps } from "../types/common";
import TodoCreator from "./TodoCreator";

export default function TodoList({ todos, setTodos }: TodoListProps) {

  if (!todos) {
    return <div>Loading todos...</div>
  }

  const updateTasks = (section: string, taskId: number, undateFn: (todo: TodoItemType) => TodoItemType) => {
    setTodos((currentTodos) => {
      if (!currentTodos) {
        return null
      }

      const updatedTasks = currentTodos[section as keyof TodoListType].map((todo) => {
        return todo.id === taskId ? undateFn(todo) : todo
      })

      return { ...currentTodos, [section]: updatedTasks }
    })
  }

  const handleComplete = (section: string, task: TodoItemType) => {
    updateTasks(section, task.id, (todo: TodoItemType) => ({
      ...todo, completed: !todo.completed
    }))
  }

  const editTodo = (event: React.ChangeEvent<HTMLInputElement>, section: string, task: TodoItemType) => {
    updateTasks(section, task.id, (todo: TodoItemType) => ({
      ...todo, text: event.target.value
    }))
  }

  const deleteTodo = (section: string, task: TodoItemType) => {
    setTodos((currentTodos) => {
      if (!currentTodos) {
        return null
      }
      const updatedTasks = currentTodos[section as keyof TodoListType].filter((todo) => {
        return todo.id !== task.id
      })

      return { ...currentTodos, [section]: updatedTasks }
    })
  }

  return (
    <div>
      {Object.entries(todos).map(([section, tasks]) => (
        <section
          key={section}
          className="bg-secondary p-5 rounded-lg border-2 border-text"
        >
          <div className="flex gap-2">
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
            <h2 className="capitalize text-lg mb-4">{section}</h2>
          </div>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex gap-2 items-center mb-3 justify-between hover:bg-background px-1"
              >
                <input
                  name="todoCheckbox"
                  type="checkbox"
                  onChange={() => handleComplete(section, task)}
                  checked={task.completed}
                  className={`${task.priority} appearance-none flex-shrink-0 cursor-pointer h-5 w-5 border-2 rounded-md focus:outline-none hover:opacity-70 transition-opacity checkbox`}
                />
                <input
                  name="todoText"
                  type="text"
                  value={task.text}
                  maxLength={100}
                  onChange={(event) => editTodo(event, section, task)}
                  className="flex-1 bg-inherit outline-none"
                />
                <button
                  aria-label="Delete Todo"
                  className="opacity-50 hover:text-error hover:opacity-100"
                  onClick={() => deleteTodo(section, task)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
          <TodoCreator todos={todos} setTodos={setTodos} sectionName={section} />
        </section>
      ))}
    </div>
  );
}