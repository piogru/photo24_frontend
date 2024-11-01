import { QueryClient } from "@tanstack/react-query";
import { LoaderFunction } from "react-router-dom";

type TestOptions = {
  route?: string;
  url?: string;
  loader?: (client: QueryClient) => LoaderFunction;
};

export default TestOptions;
