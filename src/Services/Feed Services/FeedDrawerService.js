import {displayRemovalSuccessfulAlert} from "../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {storage} from "../../Modules/Firebase/FirebaseIntegration";

export let update = false;
export let loggedInAccount = {};
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
            const dialogConfiguration = {
                message: "The picture was deleted successfully!",
                severity: "success",
                target: "#ProfilePictureManagementAlerts",
                style: "ProfilePictureSuccessAlert"
            };
            displayRemovalSuccessfulAlert(dialogConfiguration);
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

