import {arrayUnion, doc, serverTimestamp, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../../Feed Services/FeedDrawerService";

export const removeProfilePictureHrefFromFirestore = async (userFirebaseIdentifier) => {
    await updateDoc(doc(firebaseFirestore, "userData", userFirebaseIdentifier), {
        profilePhotoHref: "",
    });
}

export const updateProfilePictureHrefInFirestore = async (userFirebaseIdentifier, newHref) => {
    await updateDoc(doc(firebaseFirestore, "userData", userFirebaseIdentifier), {
        profilePhotoHref: newHref
    });
}

export const markProfilePhotoUpdateAsActivity = async (newPhoto) => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "activityType": "added a new profile picture.",
            "activityDate": Date.now(),
            "resource": newPhoto,
        })
    });
}

export const markProfilePhotoRemovalActivity = async () => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"),
        {
            ["activities"]: arrayUnion({
                "activityInitiator": loggedInAccount.userRealName,
                "initiatorId": loggedInAccount.userFirebaseIdentifier,
                "activityType": "removed the profile picture.",
                "activityDate": serverTimestamp(),
                "resource": null,
            })
        });
}
