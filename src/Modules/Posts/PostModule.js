import {toast} from "react-toastify";

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