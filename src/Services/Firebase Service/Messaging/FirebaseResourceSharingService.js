import {storage} from "../../../Modules/Firebase/FirebaseIntegration";
import {displayFailAlert} from "../../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {getDownloadURL} from "firebase/storage";
import {displayUploadSnackBar} from "../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import {sendMessage} from "./FirebaseMessagingService";
import {isEmptyString} from "../../../Modules/Text/TextModule";

let uploadedPhotoUrl;

export const sendPhotoMessage = async (payload, messageConfiguration) => {
    const fileName = payload.name;

    const uploadTask = storage.ref(`Conversations/${messageConfiguration.conversationId}`)
        .child('Photos')
        .child(fileName)
        .put(payload);

    uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            displayUploadSnackBar(`Sending photo to ${messageConfiguration.receiver.userRealName} - 
        ${Math.floor(progress)}% complete`);

            setTimeout(() => {
            }, 120);
        },
        (error) => {
            const alertConfiguration = {
                message: "Cannot process your request due to an internal server error." +
                    "More details: " + error,
                severity: "error",
                target: "#ProfilePictureManagementAlerts",
                style: "ProfilePictureErrorAlert",
            };
            displayFailAlert(alertConfiguration);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                uploadedPhotoUrl = downloadURL;
                sendMessage("photo",
                    isEmptyString(messageConfiguration.messageContent) ? ''
                        : messageConfiguration.messageContent,
                    messageConfiguration.conversationId,
                    messageConfiguration.receiver.userFirebaseIdentifier,
                    uploadedPhotoUrl
                )
            });
        }
    );
}

export const sendMultiplePhotoMessages = async (payload, messageConfiguration) => {
    displayUploadSnackBar(`Sending ${payload.length} images to ${messageConfiguration.receiver.userRealName}.
     Overall progress: 0 out of ${payload.length} photos sent (0%)`);

    let uploadCount = 0;

    for (let file of payload) {
        let fileName = file.name;

        const uploadTask = storage.ref(`Conversations/${messageConfiguration.conversationId}`)
            .child('Photos')
            .child(fileName)
            .put(file);

        uploadTask.on('state_changed', (snapshot) => {
            },
            (error) => {
                const alertConfiguration = {
                    message: "Cannot process your request due to an internal server error." +
                        "More details: " + error,
                    severity: "error",
                    target: "#ProfilePictureManagementAlerts",
                    style: "ProfilePictureErrorAlert",
                };
                displayFailAlert(alertConfiguration);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    uploadedPhotoUrl = downloadURL;
                    sendMessage("photo",
                        uploadCount === 0 && !isEmptyString(messageConfiguration.messageContent) ?
                            messageConfiguration.messageContent : '',
                        messageConfiguration.conversationId,
                        messageConfiguration.receiver.userFirebaseIdentifier,
                        uploadedPhotoUrl
                    );
                    displayUploadSnackBar(`Sending ${payload.length} images to ${messageConfiguration.receiver.userRealName}.
     Overall progress: ${uploadCount + 1} out of ${payload.length} photos sent 
     (${(uploadCount + 1) / payload.length * 100}%).`);
                    setTimeout(() => {
                    }, 120);
                    uploadCount++;
                });
            }
        );
    }
}
