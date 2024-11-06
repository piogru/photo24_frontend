import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toaster from "../utils/toaster";
import AxiosErrorResponse from "../types/axiosErrorResponse";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<AxiosErrorResponse>;
  }
}

const onTooManyRequests = (error: AxiosError<AxiosErrorResponse>) => {
  toaster.error(
    {
      title: "",
      text: error.response?.data ? error.response.data.message : error.message,
    },
    {
      toastId: "error-429",
    },
  );
};

const onUnauthorized = () => {
  toaster.error(
    {
      title: "",
      text: "You must be logged in to access this feature.",
    },
    {
      toastId: "error-401",
    },
  );
};

const handleQueryError = (error: AxiosError<AxiosErrorResponse>) => {
  switch (error.status) {
    case 429:
      onTooManyRequests(error);
      break;
  }
};

const handleMutationError = (error: AxiosError<AxiosErrorResponse>) => {
  switch (error.status) {
    case 401:
      onUnauthorized();
      break;
    case 429:
      onTooManyRequests(error);
      break;
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleQueryError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleMutationError(error);
    },
  }),
});

export default queryClient;
