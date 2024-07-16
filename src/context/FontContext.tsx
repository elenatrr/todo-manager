import { createContext, useEffect, useState } from "react";
import { ContextProviderProps, FontContextType, FontFamilyType } from "../types/common";

export const FontContext = createContext<FontContextType>({ fontFamily: "sans", switchFont: () => { } })

export const FontProvider = ({ children }: ContextProviderProps) => {
  const [fontFamily, setFontFamily] = useState<FontFamilyType>(() => {
    return localStorage.fontFamily ? JSON.parse(localStorage.fontFamily) : "sans"
  })

  const switchFont = (fontFamily: FontFamilyType) => {
    setFontFamily((fontFamily))
  }

  useEffect(() => {
    localStorage.setItem("fontFamily", JSON.stringify(fontFamily))
  }, [fontFamily])

  return (
    <FontContext.Provider value={{ fontFamily, switchFont }}>
      {children}
    </FontContext.Provider>
  )
}
