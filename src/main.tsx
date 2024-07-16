import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { FontProvider } from './context/FontContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <FontProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FontProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
