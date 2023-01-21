import {renderAlert} from "../Alerts/AlertUtil";
import {retrievedEmailAddress} from "../../Services/Authentication Services/LogInService";

export const displayPasswordResetInfoAlert = (message) => {
    const alertConfig = {
        severity: 'info',
        class: 'AlertError',
        message: message,
        targetId: '#errors',
        alertType: 'error',
        fadeOutTimeout: 5000,
        removeTimeout: 6500,
    }
    renderAlert(alertConfig);
}





