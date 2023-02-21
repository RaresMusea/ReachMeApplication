import SignOutModal from "../Components/Authentication/Sign Out/SignOutModal";
import ReactDOM from 'react-dom/client';
import {loggedInAccount, updateBio} from "../Services/Feed Services/FeedDrawerService";
import {textareaBio} from "../Components/Feed/Drawer/ProfileInfoManager";
import {displayFailAlert} from "./Feed/Navbar/Account Management/AccountManagementModule";

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
    console.log(loggedInAccount.bio);
    console.log(textareaBio);
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
    await updateBio(textareaBio);
}

export const validateStandardCredentialsForUpdate = () => {

}