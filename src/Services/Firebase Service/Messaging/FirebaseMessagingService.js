import {doc, setDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export const createConversationListForUser = async (userFirebaseIdentifier) => {
    await setDoc(doc(firebaseFirestore, "userConversations", userFirebaseIdentifier), {});
}