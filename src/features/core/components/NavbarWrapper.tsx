import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarWrapper() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <section className="flex max-h-screen min-h-full w-full flex-col overflow-y-auto xl:w-[calc(100%-240px)]">
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}
