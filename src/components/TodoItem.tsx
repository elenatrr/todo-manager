import { useRef, useState } from "react"
import { TodoItemProps } from "../types/common"
import DropdownMenu from "./DropdownMenu"
import useAutosizeTextArea from "../hooks/useAutosizeTextArea"

export default function TodoItem({ task, section, onComplete, onEdit, onPriorityChange, onTextInputBlur, onDelete }: TodoItemProps) {
  const [isMenuShown, setIsMenuShown] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const textAreaRef = useAutosizeTextArea(task.text)

  const handleMenuToggle = () => {
    setIsMenuShown(!isMenuShown)
  }

  return (
    <li
      key={task.id}
      className="relative flex gap-2 items-start mb-3 justify-between hover:bg-background px-1"
    >
      <input
        name="todoCheckbox"
        type="checkbox"
        onChange={() => onComplete(section, task)}
        checked={task.completed}
        className={`${task.priority} mt-0.5 appearance-none flex-shrink-0 cursor-pointer h-5 w-5 border-2 rounded-md focus:outline-none checkbox`}
      />
      <textarea
        ref={textAreaRef}
        value={task.text}
        maxLength={100}
        name="todoText"
        onChange={(event) => onEdit(event, section, task)}
        onBlur={() => onTextInputBlur(section, task)}
        className="flex-1 bg-inherit outline-none resize-none overflow-hidden"
        rows={1}
      />
      <button ref={menuBtnRef} onClick={handleMenuToggle} className="text-accent hover:text-text" aria-label="More Todo Settings">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </button>
      <button
        aria-label="Delete Todo"
        className="text-accent hover:text-error"
        onClick={() => onDelete(section, task)}
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
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
      {isMenuShown && <DropdownMenu menuBtnRef={menuBtnRef} sectionName={section} task={task} onPriorityChange={onPriorityChange} setIsMenuShown={setIsMenuShown} />}
    </li>
  )
}