import {renderAlert} from "../../Alerts/AlertUtil";
import {areSelectedPhotosValid, isSelectedPhotoFormatValid} from "../../Validation/SharableResourceValidator";

export const isImageProcessingSuccessful = (files) => {
    const alertConfiguration = buildAlertConfiguration('error',
        "ErrorAlert",
        "At least one file must be chosen!",
        "#Alerts",
        "error",
        3000,
        3500);

    if (files.length === 0) {
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    if (files.length === 1) {
        const file = files[0];
        if (!isSelectedPhotoFormatValid(file)) {
            alertConfiguration.message = `The specified file is not supported as a valid photo format!`;
            displayResourceSharingAlert(alertConfiguration);
            return false;
        }
        return true;
    }

    if (!areSelectedPhotosValid(files)) {
        alertConfiguration.message = `One or more selected files are not supported as a valid photo format!`;
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    return true;
}

const buildAlertConfiguration = (severitySpec, className, text, id, type, fadeOut, removalTimeout) => {
    return {
        severity: severitySpec,
        class: className,
        message: text,
        targetId: id,
        alertType: type,
        fadeOutTimeout: fadeOut,
        removeTimeout: removalTimeout,
    };
}

export const displayResourceSharingAlert = (alertConfig) => {
    renderAlert(alertConfig);
}