import { Outlet } from "react-router-dom";
import { testGet } from "./features/core/api/queries";

export async function testLoader() {
  return testGet();
}

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
