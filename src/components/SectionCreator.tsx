import { useState } from "react"
import { SectionCreatorProps } from "../types/common"

export default function SectionCreator({ setTodoAppData }: SectionCreatorProps) {
  const [newSection, setNewSection] = useState("")
  const [isWrongFormat, setIsWrongFormat] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSection(event.target.value)
  }

  const createNewSection = () => {
    const newSectionName = newSection.trim().toLowerCase()
    if (newSection.trim()) {
      setTodoAppData((currentData) => {
        if (!currentData) {
          return null;
        }

        return [...currentData, {
          id: new Date().getTime(),
          sectionTitle: newSectionName,
          todoList: []
        }];
      });
      setNewSection("");
    } else {
      setIsWrongFormat(true);
      setNewSection("");
      setTimeout(() => {
        setIsWrongFormat(false);
      }, 1000);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createNewSection();
    }
  }

  return (
    <section className="section flex gap-2 flex-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 ml-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
        />
      </svg>
      <input
        name="newSection"
        maxLength={50}
        value={newSection}
        type="text"
        placeholder="Untitled"
        autoComplete="off"
        className={`${isWrongFormat && "animate-shake"} bg-inherit flex-1 focus:outline-none text-ellipsis text-lg`}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      {newSection.trim() && <button aria-label="Submit Section Title" className="text-accent hover:text-green-600" onClick={createNewSection}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </button>}
    </section>
  )
}