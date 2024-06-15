import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Settings from "./pages/Settings"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
