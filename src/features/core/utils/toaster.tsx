import { Id, toast, ToastOptions } from "react-toastify";
import ToastMessage from "../components/ToastMessage";

type ToastMessageProps = {
  title: string;
  text: string;
};

const toaster = (myProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast(<ToastMessage {...myProps} />, { ...toastProps });

toaster.success = (myProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast.success(<ToastMessage {...myProps} />, { ...toastProps });

toaster.error = (myProps: ToastMessageProps, toastProps?: ToastOptions): Id =>
  toast.error(<ToastMessage {...myProps} />, { ...toastProps });

export default toaster;
