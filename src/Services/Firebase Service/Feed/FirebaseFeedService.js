import {arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../../Feed Services/FeedDrawerService";
import {defaultProfilePic} from "../../../Modules/Exporters/ImageExporter";
import {sortActivitiesDescending} from "../../../Modules/Common Functionality/CommonFunctionality";

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

export const checkForActivities = async () => {
    const currentActivities = await getDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"));
    let activityList = currentActivities.data().activities;
    if (activityList.length === 0) {
        return;
    }
    sortActivitiesDescending(activityList);

    if (activityList.length > 3) {
        activityList = activityList.slice(0, 3);
        await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
            ["activities"]: activityList,
        })
    }
}

const updateActivityProfilePicturesForUser = async (newPhotoHref) => {
    const currentActivities = await getDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"));
    let activitiesList = currentActivities.data().activities;

    if (activitiesList.length === 0) {
        return;
    }

    activitiesList.forEach(activity => {
        if (activity.initiatorId === loggedInAccount.userFirebaseIdentifier) {
            activity.initiatorProfilePicture = newPhotoHref;
        }
    });

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"),
        {
            ["activities"]: activitiesList,
        });

}

const updateActivitiesRegardingBioChange = async (newBio) => {
    const currentActivities = await getDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"));
    let activitiesList = currentActivities.data().activities;

    if (activitiesList.length === 0) {
        return;
    }

    activitiesList.forEach(activity => {
        if (activity.initiatorId === loggedInAccount.userFirebaseIdentifier) {
            activity.initiatorBio = newBio;
        }
    });

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"),
        {
            ["activities"]: activitiesList,
        });
}

export const markProfilePhotoUpdateAsActivity = async (newPhoto) => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": newPhoto,
            "activityType": "added a new profile picture.",
            "activityDate": Date.now(),
            "resource": "",
        })
    });

    await checkForActivities();
    await updateActivityProfilePicturesForUser(newPhoto);
}

export const markProfilePhotoRemovalActivity = async () => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": defaultProfilePic,
            "activityType": "removed the profile picture.",
            "activityDate": Date.now(),
            "resource": null,
        })
    });

    await checkForActivities();
    await updateActivityProfilePicturesForUser(defaultProfilePic);
}

export const markBioRemoval = async () => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": null,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "activityType": "removed the profile bio.",
            "activityDate": Date.now(),
            "resource": null,
        })
    });

    await checkForActivities();
    await updateActivitiesRegardingBioChange(null);
}

export const markNewBio = async (newBio) => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": newBio,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "activityType": "updated the profile bio.",
            "activityDate": Date.now(),
            "resource": null,
        })
    });

    await checkForActivities();
    await updateActivitiesRegardingBioChange(newBio);
}

export const markNewPost = async (postType, resource, postId) => {
    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "postIdentifier": postId,
            "activityType": `uploaded a new ${postType === "text" ? "post" : postType}.`,
            "activityDate": Date.now(),
            "resource": resource,
        })
    });

    await checkForActivities();
}

export const markLike = async (postOwnerName, postOwnerId, postType, postId) => {
    let activityType;

    if (postOwnerName === loggedInAccount.userRealName) {
        activityType = `liked his/her post.`;
    } else {
        activityType = `liked the ${postType === "text" ? "post" : postType} uploaded by ${postOwnerName}`;
    }

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "postId": postId,
            "postOwner": postOwnerName,
            "postOwnerId": postOwnerId,
            "activityType": activityType,
            "activityDate": Date.now(),
            "resource": null,
        })
    });
    await checkForActivities();
}

export const markDislike = async (postOwnerName, postOwnerId, postType, postId) => {
    let activityType;

    if (postOwnerName === loggedInAccount.userRealName) {
        activityType = `disliked his/her post.`;
    } else {
        activityType = `disliked the ${postType === "text" ? "post" : postType} uploaded by ${postOwnerName}`;
    }

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "postId": postId,
            "postOwner": postOwnerName,
            "postOwnerId": postOwnerId,
            "activityType": activityType,
            "activityDate": Date.now(),
            "resource": null,
        })
    });
    await checkForActivities();
}

export const unmarkReaction = async (postIdentifier) => {
    const currentActivities = await getDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"));
    let activitiesList = currentActivities.data().activities;

    if (activitiesList.length === 0) {
        return;
    }

    const newActivities = [];
    activitiesList.forEach(activity => {
        if (activity.postId !== postIdentifier) {
            newActivities.push(activity);
        }
    });

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"),
        {
            ["activities"]: newActivities,
        });

    await checkForActivities();
}

export const markCommentActivity = async (postAuthor, commentText) => {
    let activityType;

    if (postAuthor === loggedInAccount.userRealName) {
        activityType = `added a new comment to his/her post.`;
    } else {
        activityType = `added a new comment to ${postAuthor}'s post.`
    }

    await updateDoc(doc(firebaseFirestore, "userActivity", "reachmeActivities"), {
        ["activities"]: arrayUnion({
            "activityInitiator": loggedInAccount.userRealName,
            "initiatorId": loggedInAccount.userFirebaseIdentifier,
            "initiatorBio": loggedInAccount.bio,
            "initiatorProfilePicture": loggedInAccount.profilePhotoHref,
            "commentAuthor": postAuthor,
            "activityType": activityType,
            "activityDate": Date.now(),
            "resource": commentText,
        })
    });

    await checkForActivities();
}


