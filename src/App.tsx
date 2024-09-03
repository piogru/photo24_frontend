import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Outlet />
    </div>
  );
}
