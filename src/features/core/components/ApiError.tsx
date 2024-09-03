import axios, { AxiosError } from "axios";

type ApiErrorProps = {
  error: Error | AxiosError;
};

function getErrorMessage(error: Error | AxiosError) {
  let message: string;
  if (axios.isAxiosError(error)) {
    message = error.response?.data.message;
  } else {
    message = error.message;
  }

  return message || "Error";
}

export default function ApiError({ error }: ApiErrorProps) {
  const message = getErrorMessage(error);

  return (
    <div className="text-center text-red-800 dark:text-red-600">{message}</div>
  );
}
