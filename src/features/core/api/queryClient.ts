import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toaster from "../utils/toaster";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const onTooManyRequests = (error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.status === 429) {
      toaster.error(
        {
          title: "",
          text:
            error.response?.data ? error.response.data.message : error.message,
        },
        {
          toastId: "status-429",
        },
      );
    }
  } else {
    toaster.error(
      {
        title: "",
        text: error.message,
      },
      {
        toastId: "status-429",
      },
    );
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      onTooManyRequests(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      onTooManyRequests(error);
    },
  }),
});

export default queryClient;
