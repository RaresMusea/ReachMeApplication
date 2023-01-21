import {renderAlert} from "../Alerts/AlertUtil";

export const wasLoginProcessRedirected=()=>{
    return (localStorage.getItem("redirectedFromSignUp") === "true");
}

export const markCurrentUserAsLoggedIn=(accountUid)=>{
    localStorage.setItem("currentlyLoggedInUser", accountUid);
}

export const displayLogInSuccessAlert = (message) => {
    const alertConfig = {
        severity: 'success',
        class: 'AlertSuccess2',
        message: message,
        targetId: '#errors',
        alertType: 'success',
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    }
    renderAlert(alertConfig);
}