import { PriorityType, TodoItemType, TodoListType } from "../types/common";
import { TodoListProps } from "../types/common";
import SectionCreator from "./SectionCreator";
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

  const editTodo = (event: React.ChangeEvent<HTMLTextAreaElement>, section: string, task: TodoItemType) => {
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

  const deleteSection = (section: string) => {
    setTodos((currentTodos) => {
      if (!currentTodos) {
        return null
      }
      // eslint-disable-next-line
      const { [section]: _, ...rest } = currentTodos
      return rest
    })
  }

  return (
    <div>
      {Object.entries(todos).map(([section, tasks]) => (
        <section
          key={section}
          className="section mb-6"
        >
          <div className="flex gap-2 mb-4">
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
            <h2 className="capitalize text-lg flex-1">{section}</h2>
            <button aria-label="Delete Section" onClick={() => deleteSection(section)} className="hover:text-error mr-1 self-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
          <ul>
            {tasks.map((task) => (<TodoItem key={task.id} task={task} section={section} onComplete={handleComplete} onEdit={editTodo} onPriorityChange={handlePriorityChange} onTextInputBlur={handleTextInputBlur} onDelete={deleteTodo} />))}
          </ul>
          <TodoCreator todos={todos} setTodos={setTodos} sectionName={section} />
        </section>
      ))}
      <SectionCreator todos={todos} setTodos={setTodos} />
    </div>
  );
}