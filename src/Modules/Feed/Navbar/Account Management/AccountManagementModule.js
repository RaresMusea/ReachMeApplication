import {renderAlert} from "../../../Alerts/AlertUtil";
import MessageBox from "../../../../Components/Dialog/MessageBox";
import ReactDOM from 'react-dom/client';
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import defaultProfilePicture from "../../../../Media/Images/defaultprofilepic.png";

export const displayRemovalSuccessfulAlert = (dialogConfig) => {

    const alertConfig = {
        severity: dialogConfig.severity,
        class: dialogConfig.style,
        message: dialogConfig.message,
        targetId: dialogConfig.target,
        alertType: 'success',
        fadeOutTimeout: 3000,
        removeTimeout: 4500,
    }
    renderAlert(alertConfig);
}

export const getProfilePictureForLoggedInUser = () => {
    return (loggedInAccount.profilePhotoHref === "" ? defaultProfilePicture : loggedInAccount.profilePhotoHref);
}
