import {doc, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

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
