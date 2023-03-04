import {doc, setDoc, updateDoc} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export const storeRequiredUserDataToFirestore = async (data) => {
    await setDoc(doc(firebaseFirestore, "userData", data.userFirebaseIdentifier), {
        "userFirebaseIdentifier": data.userFirebaseIdentifier,
        "userRealName": data.userRealName,
        "userName": data.userName,
        "profilePhotoHref": data.profilePhotoHref,
    });
}

export const updateUserIdentityDataInFirestore = async (accountFirebaseIdentifier, newRealName, newUsername) => {
    await updateDoc(doc(firebaseFirestore, "userData", accountFirebaseIdentifier), {
        "userRealName": newRealName,
        "userName": newUsername,
    })
}