import {
    displayAlertBox,
    displayFailAlert,
    displayRemovalSuccessfulAlert,
    displayUploadStatusAlertBox
} from "../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {storage} from "../../Modules/Firebase/FirebaseIntegration";
import {isConnectionAvailable} from "../Authentication Services/SignUpService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";
import {getDownloadURL} from "firebase/storage";
import {getAuth, signOut} from "firebase/auth";

export let update = false;
export let loggedInAccount = {};
export const allowedProfilePicturesTypes = "image/png,image/jpeg,image/svg,image/jpg";
const uploadProfilePictureEndpoint = `http://localhost:8080/account/${localStorage.getItem(`currentlyLoggedInUser`)}
/RemoveProfilePicture`;


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

const deletePictureFromFirebaseStorage = (url) => {
    const pictureReference = storage.refFromURL(url);

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

