import { Outlet } from "react-router-dom";
// import { testGet } from "./features/core/api/queries";

// export async function testLoader() {
//   return testGet();
// }

function App() {
  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <Outlet />
    </div>
  );
}

export default App;
