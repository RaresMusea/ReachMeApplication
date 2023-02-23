import SignOutModal from "../Components/Authentication/Sign Out/SignOutModal";
import ReactDOM from 'react-dom/client';
import {loggedInAccount, updateBio} from "../Services/Feed Services/FeedDrawerService";
import {credentialsWereModified, textareaBio} from "../Components/Feed/Drawer/ProfileInfoManager";
import {displayFailAlert} from "./Feed/Navbar/Account Management/AccountManagementModule";
import {modifiedAccountDetails} from "./Object/AccountInfoManagementObjects";
import {buildError} from "./Sign Up/SignUpUtils";
import {isEmptyString} from "./Text/TextModule";

export const destroyModal = () => {
    document.getElementById('wrapper').remove();
}


export const renderSignOutModal = (config) => {
    const signOutModal = <SignOutModal image={config.image}
                                       isOpen={config.isOpen}
                                       navigator={config.navigator}/>

    const wrapper = document.createElement('div');
    wrapper.id = 'wrapper';
    const target = document.querySelector(config.targetId);
    wrapper.id = 'ModalContent';
    target.appendChild(wrapper);
    const root = ReactDOM.createRoot(document.getElementById(wrapper.id));
    root.render(signOutModal);
}

export const updateBioForUser = async () => {
    if (loggedInAccount.bio === textareaBio.trim()) {
        const alertConfiguration = {
            message: "Your new bio cannot coincide with your old one!",
            severity: "error",
            target: "#ProfileInfoManagementAlerts",
            style: "ErrorAlert",
        };

        displayFailAlert(alertConfiguration);
        return;
    }
    console.log("textAreaBio:" + textareaBio);
    await updateBio(textareaBio);
}

export const validateUserBio = () => {
    if (isEmptyString(textareaBio)) {
        return buildError("Your bio cannot be empty!");
    }
    return {};
}

export const checkForIdenticalRealNamesBeforeUpdate = () => {
    if (modifiedAccountDetails.userRealName === loggedInAccount.userRealName && !credentialsWereModified) {
        return buildError("The provided name already coincides with your old one!");
    }
    return {};
}

export const checkForIdenticalUserNamesBeforeUpdate = () => {
    if (modifiedAccountDetails.username === loggedInAccount.userName && !credentialsWereModified) {
        return buildError("The provided username already coincides with your old one!");
    }
    return {};
}

export const renderFailureAlertWhenCredentialsAreIdentical = () => {
    const alertConfiguration = {
        message: "The name and username should be different from your existing account credentials!",
        severity: "error",
        target: "#ProfileInfoManagementAlerts",
        style: "ErrorAlert",
    };
    displayFailAlert(alertConfiguration);
}