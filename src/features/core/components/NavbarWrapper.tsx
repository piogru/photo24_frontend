import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarWrapper() {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <section className="min-h-full w-full flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}
