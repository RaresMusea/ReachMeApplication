import {doc, getDoc, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export const createConversationListForUser = async (userFirebaseIdentifier) => {
    await setDoc(doc(firebaseFirestore, "userConversations", userFirebaseIdentifier), {});
}

/*export const searchForUser = async (searchQuery) => {
    const usersQuery = query(collection(firebaseFirestore, "userData")
        , where("userName", "==", searchQuery));

    const snapshot = await getDocs(usersQuery);
    snapshot.forEach(doc => {
        console.log(doc.data());
    })
}*/

export const createConversationBetween = async (person1, person2) => {
    console.log(person1);
    console.log(person2);
    const conversationId = (person1.userFirebaseIdentifier > person2.userFirebaseIdentifier)
        ? (person1.userFirebaseIdentifier + `-` + person2.userFirebaseIdentifier)
        : (person2.userFirebaseIdentifier + `-` + person1.userFirebaseIdentifier);

    const conversation = await getDoc(doc(firebaseFirestore, "conversationsCollection", conversationId));

    if (!conversation.exists()) {
        await setDoc(doc(firebaseFirestore, "conversationsCollection", conversationId), {messages: []});
    }

    await updateDoc(doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            identifier: person1.userFirebaseIdentifier,
            userName: person1.userName,
            userRealName: person1.userRealName,
            profilePhotoHref: person1.profilePhotoHref,
        },
        [conversationId + ".date"]: serverTimestamp()
    });

    await updateDoc(doc(firebaseFirestore, "userConversations", person2.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            identifier: person2.userFirebaseIdentifier,
            userName: person2.userName,
            userRealName: person2.userRealName,
            profilePhotoHref: person2.profilePhotoHref,
        },
        [conversationId + ".date"]: serverTimestamp()
    });

}