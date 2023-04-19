import {storage} from "../../../Modules/Firebase/FirebaseIntegration";
import {displayFailAlert} from "../../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {getDownloadURL} from "firebase/storage";
import {displayUploadSnackBar} from "../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import {sendMessage} from "./FirebaseMessagingService";
import {isEmptyString} from "../../../Modules/Text/TextModule";

let uploadedPhotoUrl;
const alertConfiguration = {
    message: "Cannot process your request due to an internal server error." +
        "More details: ",
    severity: "error",
    target: "#UploadSnackbar",
    style: "ProfilePictureErrorAlert",
};

const sendMediaMessage = async (payload, messageConfiguration, type, path) => {
    const fileName = payload.name;
    let messageType = null;
    if (type.includes("file/")) {
        messageType = type.split("/")[1];
    }

    const uploadTask = storage.ref(`Conversations/${messageConfiguration.conversationId}`)
        .child(path)
        .child(fileName)
        .put(payload);

    uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            displayUploadSnackBar(`Sending ${messageType === null ? type : messageType} 
            to ${messageConfiguration.receiver.userRealName} - 
        ${Math.floor(progress)}% complete`);

            setTimeout(() => {
            }, 120);
        },
        (error) => {
            alertConfiguration.message += error;
            displayFailAlert(alertConfiguration);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                uploadedPhotoUrl = downloadURL;
                sendMessage(type,
                    isEmptyString(messageConfiguration.messageContent) ? ''
                        : messageConfiguration.messageContent,
                    messageConfiguration.conversationId,
                    messageConfiguration.receiver.userFirebaseIdentifier,
                    uploadedPhotoUrl,
                    payload.name
                );
            });
        }
    );
}

const sendMultipleMediaMessages = async (payload, messageConfiguration, type, path) => {
    displayUploadSnackBar(`Sending ${payload.length} ${type} to ${messageConfiguration.receiver.userRealName}.
     Overall progress: 0 out of ${payload.length} photos sent (0%)`);
    let uploadCount = 0;

    for (let file of payload) {
        let fileName = file.name;

        const uploadTask = storage.ref(`Conversations/${messageConfiguration.conversationId}`)
            .child(path)
            .child(fileName)
            .put(file);

        uploadTask.on('state_changed', (snapshot) => {
            },
            (error) => {
                alertConfiguration.message += error;
                displayFailAlert(alertConfiguration);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadedPhotoUrl = downloadURL;
                    sendMessage(type,
                        uploadCount === 0 && !isEmptyString(messageConfiguration.messageContent) ?
                            messageConfiguration.messageContent : '',
                        messageConfiguration.conversationId,
                        messageConfiguration.receiver.userFirebaseIdentifier,
                        uploadedPhotoUrl,
                        payload.name
                    );
                    displayUploadSnackBar(`Sending ${payload.length} ${type}s to ${messageConfiguration.receiver.userRealName}.
     Overall progress: ${uploadCount + 1} out of ${payload.length} ${type}s sent 
     (${(uploadCount + 1) / payload.length * 100}%).`);
                    setTimeout(() => {
                    }, 120);
                    uploadCount++;
                });
            }
        );
    }
}

export const sendPhoto = async (payload, messageConfiguration) => {
    await sendMediaMessage(payload, messageConfiguration, "photo", "Photos");
}

export const sendVideo = async (payload, messageConfiguration) => {
    await sendMediaMessage(payload, messageConfiguration, "video", "Videos");
}

export const sendFileOrDocument = async (payload, messageConfiguration, type) => {
    await sendMediaMessage(payload, messageConfiguration, type, "Files");
}

export const sendMultiplePhotos = async (payload, messageConfiguration) => {
    await sendMultipleMediaMessages(payload, messageConfiguration, "photo", "Photos");
}

export const sendMultipleVideos = async (payload, messageConfiguration) => {
    await sendMultipleMediaMessages(payload, messageConfiguration, "video", "Videos");
}

export const sendMultipleFiles = async (payload, messageConfiguration) => {
    await sendMultipleMediaMessages(payload, messageConfiguration, "file", "Files");
}

