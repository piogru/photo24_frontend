import { AxiosError } from "axios";
import AxiosErrorResponse from "../../core/types/axiosErrorResponse";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

type QueryErrorMessageProps = {
  error: AxiosError<AxiosErrorResponse>;
};

export default function QueryError({ error }: QueryErrorMessageProps) {
  const message =
    error.response?.data ? error.response.data.message : error.message;

  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <ExclamationTriangleIcon className="size-14 text-gray-800 dark:text-gray-400" />
      <div className="mx-auto w-fit text-center">Error</div>
      <div className="mx-auto w-fit text-center">{message}</div>
    </div>
  );
}
