import {toast} from "react-toastify";
import RechargeToast from "../../Components/RechargeToast/RechargeToast";

export const buildPostObject = (location, description, file, owner) => {
    return {
        "location": location,
        "description": description,
        "file": file,
        "owner": owner,
    }
}

const notifyErrorToast = (message) => toast.error(message);

const notifyToast = (message) => toast.success(message);

export const renderUploadFailedToast = (message) => {
    notifyErrorToast(message);
}

export const renderUploadSuccessfulToast = (message) => {
    notifyToast(message);
}

const notifyRechargePost = (component) => toast.info(component, {autoClose:10000});

export const renderRechargeToast = () =>{
    notifyRechargePost(<RechargeToast/>);
}
