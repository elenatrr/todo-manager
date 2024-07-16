import { useContext } from "react"
import { FontContext } from "../context/FontContext"
import { FontFamilyType } from "../types/common"

export default function SwitchFont() {
  const fontFamilyOptions: FontFamilyType[] = ["sans", "serif", "mono"]
  const {font, switchFont} = useContext(FontContext)

  return (
    <div>
      {fontFamilyOptions.map((fontFamilyItem) => {
        return <button key={fontFamilyItem} onClick={() => switchFont(fontFamilyItem)} className={`${fontFamilyItem === "serif" ? "font-serif" : fontFamilyItem === "mono" ? "font-mono" : "font-sans"} text-text p-2 hover:bg-neutral-300 hover:bg-opacity-50 rounded min-w-20`}>
          <p className={`${fontFamilyItem === font.family && "text-link"} text-2xl`}>Ag</p>
          <p className="capitalize">{fontFamilyItem === 'sans' ? "default" : fontFamilyItem}</p>
        </button>
      })}
    </div>
  )
}