import {
    displayAlertBox,
    displayFailAlert,
    displayRemovalSuccessfulAlert,
    displaySuccessAlert,
    displayUploadStatusAlertBox
} from "../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {storage} from "../../Modules/Firebase/FirebaseIntegration";
import {isConnectionAvailable} from "../Authentication Services/SignUpService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";
import {getDownloadURL} from "firebase/storage";
import {getAuth, signOut} from "firebase/auth";
import {modifiedAccountDetails} from "../../Modules/Object/AccountInfoManagementObjects";
import {removeProfilePictureHrefFromFirestore} from "../Firebase Service/Feed/FirebaseFeedService";
import {updateUserIdentityDataInFirestore} from "../Firebase Service/Authentication/FirebaseAuthService";

export let update = false;
export let loggedInAccount = {};
export const allowedProfilePicturesTypes = "image/png,image/jpeg,image/svg,image/jpg";
const uploadProfilePictureEndpoint = `http://localhost:8080/account/${localStorage.getItem(`currentlyLoggedInUser`)}
/RemoveProfilePicture`;
const updateBioEndpoint = `http://localhost:8080/account/updateBio/accountIdentifier=${localStorage.getItem(`currentlyLoggedInUser`)}`;
const updateUserIdentityEndpoint = `http://localhost:8080/account/updateUserIdentity/accountIdentifier=${localStorage.getItem(`currentlyLoggedInUser`)}`;

export const setUpdate = (value) => {
    update = value;
}

const getCurrentUserInfo = (identifier) => {
    fetch(`http://localhost:8080/account/${identifier}`)
        .then(response => response.json())
        .then(data => {
            loggedInAccount = data;
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getRequiredMetadata = (identifier) => {
    getCurrentUserInfo(identifier);
}

export const removeProfilePictureForUser = async () => {

    const imageHref = loggedInAccount.profilePhotoHref;
    const patchRequestConfig = {
        method: "PATCH",
        body: "",
        headers: {
            'Content-type': `text/html;`,
            "Accept": "application/json",
        }
    }

    fetch(uploadProfilePictureEndpoint, patchRequestConfig)
        .then(response => response.json())
        .then(() => {
            const alertConfiguration = {
                message: "The picture was deleted successfully!",
                severity: "success",
                target: "#ProfilePictureManagementAlerts",
                style: "ProfilePictureSuccessAlert"
            };
            displayRemovalSuccessfulAlert(alertConfiguration);
        })
        .catch((err) => {
            console.log(err);

        });
    deletePictureFromFirebaseStorage(imageHref);
}

const deletePictureFromFirebaseStorage = async (url) => {
    const pictureReference = storage.refFromURL(url);
    await removeProfilePictureHrefFromFirestore(loggedInAccount.userFirebaseIdentifier);
    pictureReference.delete()
        .then(() => console.log("Deletion from firebase successfully"))
        .catch(err => console.log(err));
}

const uploadLocalProfilePicture = async (payload) => {
    const fileName = payload.name;

    const uploadTask = storage.ref("ProfilePictures")
        .child(currentlyLoggedInUser)
        .child(fileName)
        .put(payload);

    uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            displayUploadStatusAlertBox(`Your new profile picture is being uploaded on ReachMe - 
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
                console.log(downloadURL);
                saveUploadedProfilePictureDataLocally(downloadURL);
                loggedInAccount.profilePhotoHref = downloadURL;
            });
        }
    );
}

const saveUploadedProfilePictureDataLocally = async (href) => {
    const patchRequestOptions = {
        method: `PATCH`,
        body: href,
        headers: {
            'Content-Type': `text/html`,
            "Accept": "application/json",
        }
    };

    fetch(`http://localhost:8080/account/${localStorage.getItem('currentlyLoggedInUser')}/ChangeProfilePicture`, patchRequestOptions)
        .then(response => response.json())
        .then((data) => {
            loggedInAccount.profilePhotoHref = data.profilePhotoHref;
        })
        .catch(() => {
            const alertConfiguration = {
                message: "Cannot process your request due to an internal server error. Please try again later.",
                severity: "error",
                target: "#ProfilePictureManagementAlerts",
                style: "ProfilePictureErrorAlert",
            };
            displayFailAlert(alertConfiguration);
        });
}

export const saveLocalStoredProfilePicture = async (file) => {
    if (await isConnectionAvailable()) {
        if (loggedInAccount.profilePhotoHref !== "") {
            await deletePictureFromFirebaseStorage(loggedInAccount.profilePhotoHref);
        }
        await uploadLocalProfilePicture(file);
    } else {
        const alertConfiguration = {
            message: "The server is down for maintenance. Your picture upload could not be processed.",
            severity: "error",
            target: "#ProfilePictureManagementAlerts",
            style: "ProfilePictureErrorAlert",
        };
        displayFailAlert(alertConfiguration);
    }
}

export const signOutUser = async () => {
    const currentAuth = getAuth();

    signOut(currentAuth).then(() => {
        localStorage.removeItem('currentlyLoggedInUser');
        displayAlertBox("You are being logged out...");
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }).catch(err => {
        console.log(err);
    });
}

export const updateBio = async (newBio) => {
    const patchRequestConfig = {
        method: "PATCH",
        body: newBio === "" ? "empty" : newBio,
        headers: {
            'Content-type': `text/html;`,
            "Accept": "application/json",
        }
    }

    fetch(updateBioEndpoint, patchRequestConfig)
        .then(response => response.json())
        .then(data => {
            loggedInAccount = data;
            const successAlertConfig = {
                message: 'Successfully updated your bio!',
                severity: "success",
                target: "#ProfileInfoManagementAlerts",
                style: "SuccessAlert",
            };
            displaySuccessAlert(successAlertConfig);

        })
        .catch((err) => {
            console.log(err);
            const alertConfiguration = {
                message: "Cannot process your request due to an internal server error!",
                severity: "error",
                target: "#ProfileInfoManagementAlerts",
                style: "ErrorAlert",
            };
            displayFailAlert(alertConfiguration);
        })
}

export const updateUserIdentity = async () => {
    const patchRequestConfig = {
        method: "PATCH",
        body: JSON.stringify({
            userName: modifiedAccountDetails.username,
            userRealName: modifiedAccountDetails.userRealName,
        }),
        headers: {
            'Content-type': `application/json;`,
            "Accept": "application/json",
        }
    }
    console.log(patchRequestConfig.body);
    fetch(updateUserIdentityEndpoint, patchRequestConfig)
        .then(response => response.json())
        .then(data => {
            loggedInAccount = data;
            const successAlertConfig = {
                message: 'Your name and username were updated successfully!',
                severity: "success",
                target: "#ProfileInfoManagementAlerts",
                style: "SuccessAlert",
            };
            updateUserIdentityDataInFirestore(
                loggedInAccount.userFirebaseIdentifier,
                modifiedAccountDetails.userRealName,
                modifiedAccountDetails.username);
            displaySuccessAlert(successAlertConfig);

        })
        .catch(err => {
            console.log(err);
            const alertConfiguration = {
                message: "Cannot process your request due to an internal server error!",
                severity: "error",
                target: "#ProfileInfoManagementAlerts",
                style: "ErrorAlert",
            };
            displayFailAlert(alertConfiguration);
        })

}

