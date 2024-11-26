import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../../core/components/Footer";

export default function NavbarWrapper() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <section
        className="flex max-h-screen min-h-full w-full flex-col overflow-y-auto
          xl:w-[calc(100%-240px)]"
      >
        <main className="grow pb-14 sm:pb-2">
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}
