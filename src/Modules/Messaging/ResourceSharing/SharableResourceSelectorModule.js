import {renderAlert} from "../../Alerts/AlertUtil";
import {
    areSelectedPhotosFormatValid,
    areSelectedVideosFormatValid,
    isSelectedPhotoFormatValid,
    isSelectedVideoFormatValid
} from "../../Validation/SharableResourceValidator";

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

const alertConfiguration = buildAlertConfiguration('error',
    "ErrorAlert",
    "",
    "#Alerts",
    "error",
    3000,
    3500);

const isGenericProcessingSuccessful = (files) => {
    if (files.length === 0) {
        alertConfiguration.message = `At least one file must be chosen!`;
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    return true;
}

export const isImageProcessingSuccessful = (files) => {

    if (!isGenericProcessingSuccessful(files)) {
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

    if (!areSelectedPhotosFormatValid(files)) {
        alertConfiguration.message = `One or more selected files are not supported as a valid photo format!`;
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    return true;
}

export const isVideoProcessingSuccessful = (files) => {
    if (!isGenericProcessingSuccessful(files)) {
        return false;
    }

    if (files.length === 1) {
        const file = files[0];
        if (!isSelectedVideoFormatValid(file)) {
            alertConfiguration.message = `The specified file is not supported as a valid photo format!`;
            displayResourceSharingAlert(alertConfiguration);
            return false;
        }
        return true;
    }

    if (!areSelectedVideosFormatValid(files)) {
        alertConfiguration.message = `One or more selected files are not supported as a valid photo format!`;
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    return true;


}

export const displayResourceSharingAlert = (alertConfig) => {
    renderAlert(alertConfig);
}