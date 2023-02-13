import {renderAlert} from "../../../Alerts/AlertUtil";
import {loggedInAccount, saveLocalStoredProfilePicture} from "../../../../Services/Feed Services/FeedDrawerService";
import defaultProfilePicture from "../../../../Media/Images/defaultprofilepic.png";
import AlertBox from "../../../../Components/AlertBox/AlertBox";
import ReactDOM from "react-dom/client";

export const displayRemovalSuccessfulAlert = (config) => {

    const alertConfig = {
        severity: config.severity,
        class: config.style,
        message: config.message,
        targetId: config.target,
        alertType: 'success',
        fadeOutTimeout: 3000,
        removeTimeout: 4500,
    }
    renderAlert(alertConfig);
}

export const displayFailAlert = (config) => {
    const alertConfig = {
        severity: config.severity,
        class: config.style,
        message: config.message,
        targetId: config.target,
        alertType: 'error',
        fadeOutTimeout: 3000,
        removeTimeout: 4000,
    }
    renderAlert(alertConfig);
}

export const displayUploadStatusAlertBox = (message) => {
    displayAlertBox(message);
}

export const displayAlertBox = (message) => {
    const div = document.createElement('div');
    const profilePictureAlertContainer = document.getElementById('ProfilePictureManagementAlerts');
    profilePictureAlertContainer.appendChild(div);
    div.id = 'Progress';

    const alertBox = <AlertBox isOpen={true}
                               message={message}/>

    const root = ReactDOM.createRoot(div);
    root.render(alertBox);
}

export const getProfilePictureForLoggedInUser = () => {
    return (loggedInAccount.profilePhotoHref === "" ? defaultProfilePicture : loggedInAccount.profilePhotoHref);
}

export const verifyPictureUpload = (e) => {
    const [file] = e.target.files;
    const supportedFileTypes = ["jpg", "png", "jpeg", "svg", "JPEG"];
    if (!(supportedFileTypes.includes(file.name.split(".")[1]))) {
        const alertConfiguration = {
            message: "The file format of the chosen file is not suitable for a picture file!",
            severity: "error",
            target: "#ProfilePictureManagementAlerts",
            style: "ProfilePictureErrorAlert",
        };

        displayFailAlert(alertConfiguration);
        return;
    }

    return file;
}

export const updateProfilePictureWithLocalFileUpload = async (file) => {
    await saveLocalStoredProfilePicture(file);
}
