import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col p-4 min-h-screen text-text transition-colors bg-background">
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