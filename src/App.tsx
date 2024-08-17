import { Outlet } from "react-router-dom";
// import { testGet } from "./features/core/api/queries";

// export async function testLoader() {
//   return testGet();
// }

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 h-screen dark:text-slate-200">
      <Outlet />
    </div>
  );
}

export default App;
