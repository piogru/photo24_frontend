import { Id, toast, ToastOptions } from "react-toastify";
import ToastMessage from "../components/ToastMessage";

type ToastMessageProps = {
  title?: string;
  text: string;
};

const toaster = (messageProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast(<ToastMessage {...messageProps} />, { ...toastProps });

toaster.success = (messageProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast.success(<ToastMessage {...messageProps} />, { ...toastProps });

toaster.error = (messageProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast.error(<ToastMessage {...messageProps} />, { ...toastProps });

export default toaster;
