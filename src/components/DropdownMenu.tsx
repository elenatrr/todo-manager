import { useEffect, useRef } from "react"
import { DropdownMenuProps, PriorityType } from "../types/common"

export default function DropdownMenu({ menuBtnRef, sectionName, task, onPriorityChange, setIsMenuShown }: DropdownMenuProps) {
  const priorities: PriorityType[] = ["high", "medium", "low", "none"]
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node) && menuBtnRef.current && !menuBtnRef.current.contains(event.target as Node)) {
        setIsMenuShown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setIsMenuShown, menuBtnRef])

  return (
    <div ref={dropDownRef} className="absolute right-0 -top-24 z-10 p-2 bg-primary border-2 border-accent border-opacity-50 rounded-xl">
      <p className="text-accent mb-2">Priority:</p>
      {priorities.map((newPriority) => {
        return <button key={newPriority} aria-label={`${newPriority} Priority"`} onClick={() => onPriorityChange(sectionName, task, newPriority)} className={`${newPriority === "high" ? "text-high" : newPriority === "medium" ? "text-medium" : newPriority === "low" ? "text-low" : "text-accent"} p-0.5 hover:bg-slate-200 hover:bg-opacity-50 rounded`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
          </svg>
        </button>
      })}
    </div>
  )
}