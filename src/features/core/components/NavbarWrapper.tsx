import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarWrapper() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <section className="min-h-full max-h-screen w-full xl:w-[calc(100%-240px)] flex flex-col overflow-y-auto">
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}
