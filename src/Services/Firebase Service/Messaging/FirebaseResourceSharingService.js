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
