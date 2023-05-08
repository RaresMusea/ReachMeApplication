const acceptedPhotoFormats = ["svg",
    "png",
    "webp",
    "jpg",
    "jpeg",
    "gif",
];

const acceptedVideoFormats = ["webm",
    "mp4",
    "flv",
    "avi",
]

export const isSelectedFileValid = (file) => {
    const fileExtension = file.name.split(".")[1];
    return acceptedPhotoFormats.includes(fileExtension) ||
        acceptedVideoFormats.includes(fileExtension);
}

export const getFileType = (file) => {
    if (file === null) {
        return "text";
    }

    const fileExtension = file.name.split(".")[1];
    if (acceptedVideoFormats.includes(fileExtension)) {
        return "video";
    }

    if (acceptedPhotoFormats.includes(fileExtension)) {
        return "photo";
    }

    return "text";
}