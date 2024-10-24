import { Outlet } from "react-router-dom";
import Footer from "../../core/components/Footer";

export default function LoginWrapper() {
  return (
    <section className="flex min-h-screen flex-col">
      <main className="flex h-full flex-grow flex-col items-center pt-6">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
