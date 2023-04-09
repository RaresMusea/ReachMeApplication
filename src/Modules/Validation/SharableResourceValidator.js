import {isEmptyString} from "../Text/TextModule";

const acceptedPhotoFormats = ["jpg", "png", "svg", "gif", "jpeg", "webp"];

export const isSelectedPhotoFormatValid = (photo) => {
    const photoName = photo.name;
    const photoFormat = photoName.split(".")[1];
    if (isEmptyString(photoFormat)) {
        return false;
    }
    return acceptedPhotoFormats.includes(photoFormat);
}

export const areSelectedPhotosValid = (photosList) => {
    console.log(photosList);
    for (let i = 0; i < photosList.length; i++) {
        const photoName = photosList[i].name;
        const photoExtension = photoName.split(".")[1];

        if (!acceptedPhotoFormats.includes(photoExtension)) {
            return false;
        }
    }
    return true;
}