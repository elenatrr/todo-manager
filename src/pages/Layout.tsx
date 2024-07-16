import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { FontContext } from "../context/FontContext";

export default function Layout() {
  const {fontFamily} = useContext(FontContext)

  return (
    <div className={`${fontFamily === "serif" ? "font-serif" : fontFamily === "mono" ? "font-mono" : "font-sans"} flex flex-col p-4 min-h-screen text-text transition-colors bg-background`}>
      <div className="flex flex-1 flex-col max-w-5xl w-full mx-auto">
        <Header />
        <main className="flex-1 mb-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}