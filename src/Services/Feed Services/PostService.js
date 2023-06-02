import {loggedInAccount} from "./FeedDrawerService";
import {storage} from "../../Modules/Firebase/FirebaseIntegration";
import {displayUploadSnackBar} from "../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import {getDownloadURL} from "firebase/storage";
import {renderUploadFailedToast, renderUploadSuccessfulToast} from "../../Modules/Posts/PostModule";
import {getFileType} from "../../Modules/Validation/PostUploadFileFormatValidator";
import {generateUuid} from "../../Modules/Common Functionality/CommonFunctionality";
import {markNewPost} from "../Firebase Service/Feed/FirebaseFeedService";
import {setFirebasePostReactionsCollection} from "../Firebase Service/Post Service/FirebasePostService";

const uploadPostPayload = `http://localhost:8080/feed/post`;
let uploadPostPayloadBody = {
    "accountIdentifier": loggedInAccount.userFirebaseIdentifier,
    "likes": 0,
    "dislikes": 0,
    "location": "",
    "postDescription": "",
    "postIdentifier": generateUuid(),
    "timestamp": Date.now(),
    "uploadedMediaHref": "",
    "postOwnersProfilePicture": loggedInAccount.profilePhotoHref,
    "postOwner": "",
    "postType": "",
}

let uploadPostRequestOptions = {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: "",
}

export const uploadPost = async (postObject) => {
    const postType = getFileType(postObject.file);
    let subPathType = "Text";

    if (postType === "text") {
        uploadPostPayloadBody.postType = postType;
        await savePost(postObject);
        await markNewPost("text", postObject.description, uploadPostPayloadBody.postIdentifier);
        await setFirebasePostReactionsCollection(uploadPostPayloadBody.postIdentifier);
        return;
    }

    if (postType === "photo") {
        subPathType = "Photos";
    }

    if (postType === "video") {
        subPathType = "Videos";
    }

    const uploadTask = storage.ref(`Posts/${loggedInAccount.userFirebaseIdentifier}/${subPathType}`)
        .child(postObject.file.name)
        .put(postObject.file);

    uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred) / (snapshot.totalBytes) * 100;
            displayUploadSnackBar(`Uploading post on ReachMe (${Math.floor(progress)}% complete)`);
            setTimeout(() => {
            }, 120);
        },
        (error) => {
            renderUploadFailedToast("An error occurred while uploading your post. " +
                "We're trying the solve the problem as soon as possible. Please try again later." +
                "More details: " + error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                uploadPostPayloadBody.uploadedMediaHref = downloadURL;
                uploadPostPayloadBody.postType = postType;
                savePost(postObject);
                markNewPost(postType, downloadURL, uploadPostPayloadBody.postIdentifier);
            });
        });
}


const configurePost = (postObject) => {
    uploadPostPayloadBody.postIdentifier = generateUuid();
    uploadPostPayloadBody.timestamp = Date.now();
    uploadPostPayloadBody.accountIdentifier = postObject.owner.userFirebaseIdentifier;
    uploadPostPayloadBody.location = postObject.location;
    uploadPostPayloadBody.postDescription = postObject.description;
    uploadPostPayloadBody.postOwner = `${postObject.owner.userRealName} (${postObject.owner.userName})`;
    uploadPostPayloadBody.postOwnersProfilePicture = loggedInAccount.profilePhotoHref;

    uploadPostRequestOptions.body = JSON.stringify(uploadPostPayloadBody);
}

const savePost = async (postObject) => {
    configurePost(postObject);

    fetch(uploadPostPayload, uploadPostRequestOptions)
        .then(response => response.json())
        .then(async () => {
            renderUploadSuccessfulToast("Your post was successfully uploaded!");
        })
        .catch(error => {
            renderUploadFailedToast("An error occurred while attempting to upload your post. We're sorry for this" +
                "inconvenient. Please try again later. More details: " + error);
        });



}
