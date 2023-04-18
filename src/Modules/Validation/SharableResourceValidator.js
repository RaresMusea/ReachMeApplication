import {isEmptyString} from "../Text/TextModule";

const acceptedPhotoFormats = ["jpg", "png", "svg", "gif", "jpeg", "webp"];
const acceptedVideoFormats = ["mp4", "avi", "flv", "mpeg", "mov", "avchd", "mkv", "webm"];
const acceptedFileOrDocumentFormats = ["docx", "doc", "rtf", "xlsx", "xls", "csv", "pdf", "txt",
    "rar", "zip", "iso", "cpp", "c", "h", "cs", "html", "css",
    "scss", "sass", "js", "jsx", "json", "ts", "tsx", "class", "java", "gradle", "maven", "xml", "xaml", "py"];

export const isSelectedPhotoFormatValid = (photo) => {
    const photoName = photo.name;
    const photoFormat = photoName.split(".")[1];
    if (isEmptyString(photoFormat)) {
        return false;
    }
    return acceptedPhotoFormats.includes(photoFormat);
}

export const areSelectedPhotosFormatValid = (photosList) => {
    for (let i = 0; i < photosList.length; i++) {
        if (!isSelectedPhotoFormatValid(photosList[i])) {
            return false;
        }
    }
    return true;
}

export const isSelectedVideoFormatValid = (video) => {
    const videoName = video.name;
    const videoFormat = videoName.split(".")[1];

    if (isEmptyString(videoFormat)) {
        return false;
    }

    return acceptedVideoFormats.includes(videoFormat);
}

export const areSelectedVideosFormatValid = (videosList) => {
    for (let i = 0; i < videosList.length; i++) {

        if (!isSelectedVideoFormatValid(videosList[i])) {
            return false;
        }
    }
    return true;
}

export const isSelectedFileOrDocumentValid = (file) => {
    const fileName = file.name;
    const fileFormat = fileName.split(".")[1];

    if (isEmptyString(fileFormat)) {
        return false;
    }

    return acceptedFileOrDocumentFormats.includes(fileFormat);
}

export const areSelectedFileOrDocumentFormatsValid = (files) => {
    for (let i = 0; i < files.length; i++) {
        if (!isSelectedFileOrDocumentValid(files[i])) {
            return false;
        }
    }

    return true;
}

