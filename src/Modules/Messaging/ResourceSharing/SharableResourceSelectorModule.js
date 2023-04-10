import {renderAlert} from "../../Alerts/AlertUtil";
import {
    areSelectedFileOrDocumentFormatsValid,
    areSelectedPhotosFormatValid,
    areSelectedVideosFormatValid,
    isSelectedFileOrDocumentValid,
    isSelectedPhotoFormatValid,
    isSelectedVideoFormatValid
} from "../../Validation/SharableResourceValidator";

import txtFile from '../../../Media/Images/txt-file.svg';
import pdfFile from '../../../Media/Images/pdf-file.svg';
import docxFile from '../../../Media/Images/docx-file.svg';
import docFile from '../../../Media/Images/doc-file.svg';
import xlsxFile from '../../../Media/Images/xlsx-file.svg';
import unknownFileFormat from '../../../Media/Images/document.svg';

const fileExtensionsIcons = {
    "txt": txtFile,
    "pdf": pdfFile,
    "doc": docFile,
    "docx": docxFile,
    "xlsx": xlsxFile,
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


export const isFileOrDocumentProcessingSuccessful = (files) => {
    if (!isGenericProcessingSuccessful(files)) {
        return false;
    }

    if (files.length === 1) {
        const file = files[0];
        if (!isSelectedFileOrDocumentValid(file)) {
            alertConfiguration.message = `The specified file or document was not supported because of its format!`;
            displayResourceSharingAlert(alertConfiguration);
            return false;
        }
        return true;
    }

    if (!areSelectedFileOrDocumentFormatsValid(files)) {
        alertConfiguration.message = `One or more selected files/documents were not supported due to an invalid file format!`;
        displayResourceSharingAlert(alertConfiguration);
        return false;
    }

    return true;
}

export const displayResourceSharingAlert = (alertConfig) => {
    renderAlert(alertConfig);
}

export const getFileIconBasedOnFile = (file) => {
    const fileName = file.name;
    const fileExtension = fileName.split(".")[1];

    if (fileExtension in fileExtensionsIcons) {
        return fileExtensionsIcons[fileExtension];
    }

    /*console.log(fileExtensionsIcons[fileExtension]);
    console.log(fileExtension)*/
    return unknownFileFormat;
}