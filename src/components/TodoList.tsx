import { PriorityType, TodoItemType, TodoListType } from "../types/common";
import { TodoListProps } from "../types/common";
import TodoCreator from "./TodoCreator";
import TodoItem from "./TodoItem";

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

  const editTodo = (event: React.ChangeEvent<HTMLInputElement>, section: string, task: TodoItemType) => {
    updateTasks(section, task.id, (todo: TodoItemType) => ({
      ...todo, text: event.target.value
    }))
  }

  const handleTextInputBlur = (section: string, task: TodoItemType) => {
    if (!task.text.trim()) {
      deleteTodo(section, task)
    }
  }

  const handlePriorityChange = (section: string, task: TodoItemType, newPriority: PriorityType) => {
    updateTasks(section, task.id, (todo: TodoItemType) => ({
      ...todo, priority: newPriority,
    }))
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
            {tasks.map((task) => ( <TodoItem  key={task.id} task={task} section={section} onComplete={handleComplete} onEdit={editTodo} onPriorityChange={handlePriorityChange} onTextInputBlur={handleTextInputBlur} onDelete={deleteTodo}/>))}
          </ul>
          <TodoCreator todos={todos} setTodos={setTodos} sectionName={section} />
        </section>
      ))}
    </div>
  );
}