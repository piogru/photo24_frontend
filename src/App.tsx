import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-center" autoClose={6000} limit={4} />

      <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <Outlet />
      </div>
    </>
  );
}
