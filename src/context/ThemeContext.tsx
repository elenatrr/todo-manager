import { createContext, useEffect, useState } from "react";
import { ContextProviderProps, ThemeContextType, ThemeType } from "../types/common";

export const ThemeContext = createContext<ThemeContextType>({ theme: "light", toggleTheme: () => { } })

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

export const ThemeProvider = ({ children }: ContextProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? "dark" : "light"
  })

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)

    if (theme === "dark") {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
