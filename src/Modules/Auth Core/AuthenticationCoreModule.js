import {renderAlert} from "../Alerts/AlertUtil";

export const displayPasswordResetInfoAlert = (message) => {
    const alertConfig = {
        severity: 'info',
        class: 'ErrorAlert',
        message: message,
        targetId: '#errors',
        alertType: 'error',
        fadeOutTimeout: 5000,
        removeTimeout: 6500,
    }
    renderAlert(alertConfig);
}





