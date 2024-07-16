import { createContext, useEffect, useState } from "react";
import { ContextProviderProps, FontContextType, FontFamilyType, FontSizeType, FontType } from "../types/common";

export const FontContext = createContext<FontContextType>({ font: { family: "sans", size: "medium" }, switchFont: () => { } })

export const FontProvider = ({ children }: ContextProviderProps) => {
  const [font, setFont] = useState<FontType>(() => {
    return localStorage.font ? JSON.parse(localStorage.font) : { family: "sans", size: "medium" }
  })

  const switchFont = (family?: FontFamilyType, size?: FontSizeType) => {
    setFont((currentFont) => ({ family: family || currentFont.family, size: size || currentFont.size }))
  }

  useEffect(() => {
    localStorage.setItem("font", JSON.stringify(font))
  }, [font])

  return (
    <FontContext.Provider value={{ font, switchFont }}>
      {children}
    </FontContext.Provider>
  )
}
