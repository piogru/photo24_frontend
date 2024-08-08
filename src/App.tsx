import { Outlet, useLoaderData } from "react-router-dom";
import { testGet } from "./features/core/api/queries";

export async function testLoader() {
  return testGet();
}

function App() {
  const response = useLoaderData();

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
