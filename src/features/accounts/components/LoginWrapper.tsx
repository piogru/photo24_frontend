import { Outlet } from "react-router-dom";
import Footer from "../../core/components/Footer";

export default function LoginWrapper() {
  return (
    <section className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-grow h-full items-center">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
