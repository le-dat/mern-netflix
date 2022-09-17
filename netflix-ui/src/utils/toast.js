import { toast } from "react-toastify";

export const getToast = ({ type = "warn", msg = "good" }) => {
  return toast[type](msg, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
