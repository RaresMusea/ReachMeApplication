import {collection, doc, getDocs, query, setDoc, where} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export const createConversationListForUser = async (userFirebaseIdentifier) => {
    await setDoc(doc(firebaseFirestore, "userConversations", userFirebaseIdentifier), {});
}

export const searchForUser = async (searchQuery) => {
    const usersQuery = query(collection(firebaseFirestore, "userData")
        , where("userName", "==", searchQuery));

    const snapshot = await getDocs(usersQuery);
    snapshot.forEach(doc => {
        console.log(doc.data());
    })

}