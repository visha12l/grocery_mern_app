import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster = ({ toastMessage }) => {
  return (
    <div>
      {toast(toastMessage)}
      <ToastContainer />
    </div>
  );
};

export default Toaster;
