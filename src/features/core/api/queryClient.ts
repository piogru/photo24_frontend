import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        // showToast("Something went wrong: ${error.message}");
        toast.error(`Something went wrong: ${error.message}`);
        console.log("error");
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      // const serverError = error as IServerError;
      delete error.stack;
      toast.error(`Mutation went wrong: ${error.message}`);
      console.log("muta cache", error);
      // toastError(serverError?.response?.data?.fullMessage);
    },
    onMutate: () => {
      console.log("mutation start");
    },
  }),
});

export default queryClient;
