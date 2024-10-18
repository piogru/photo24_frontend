import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastCloseButton from "./features/core/components/ToastCloseButton";

export default function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        limit={4}
        transition={Slide}
        className={() => "fixed bottom-0 z-50 w-full"}
        toastClassName={() =>
          "relative flex p-2 min-h-10 justify-between overflow-hidden border-t border-slate-300 dark:border-slate-600 shadow-xl bg-white dark:bg-gray-900 dark:text-gray-200"
        }
        closeButton={ToastCloseButton}
      />

      <div className="h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
        <Outlet />
      </div>
    </>
  );
}
