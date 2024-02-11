import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const errorHandler = (message) => {
  const error = () => {
    toast.error(message);
  };

  return error;
};
