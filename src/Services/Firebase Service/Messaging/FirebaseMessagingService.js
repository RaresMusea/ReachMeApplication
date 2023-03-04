import {doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {displayUserSearcherAlert} from "../../../Modules/Messaging/MessagingModule";

export const createConversationListForUser = async (userFirebaseIdentifier) => {
    await setDoc(doc(firebaseFirestore, "userConversations", userFirebaseIdentifier), {});
}

export const createConversationBetween = async (person1, person2) => {
    if (person1.userFirebaseIdentifier === person2.userFirebaseIdentifier) {
        displayUserSearcherAlert("You cannot initiate a conversation with yourself!");
        return;
    }

    const conversationId = (person1.userFirebaseIdentifier > person2.userFirebaseIdentifier)
        ? (person1.userFirebaseIdentifier + `-` + person2.userFirebaseIdentifier)
        : (person2.userFirebaseIdentifier + `-` + person1.userFirebaseIdentifier);

    const conversation = await getDoc(doc(firebaseFirestore, "conversationsCollection", conversationId));

    if (!conversation.exists()) {
        await setDoc(doc(firebaseFirestore, "conversationsCollection", conversationId), {messages: []});
    }

    await updateDoc(doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            identifier: person2.userFirebaseIdentifier,
            userName: person2.userName,
            userRealName: person2.userRealName,
            profilePhotoHref: person2.profilePhotoHref,
        },
        [conversationId + ".date"]: serverTimestamp()
    });

    await updateDoc(doc(firebaseFirestore, "userConversations", person2.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            identifier: person1.userFirebaseIdentifier,
            userName: person1.userName,
            userRealName: person1.userRealName,
            profilePhotoHref: person1.profilePhotoHref,
        },
        [conversationId + ".date"]: serverTimestamp()
    });
}


export const retrieveChatListInRealTimeForCurrentUser = (currentUserIdentifier) => {
    let chatList = [];
    const chats = onSnapshot(doc(firebaseFirestore, "userConversations", currentUserIdentifier), (doc) => {
        chatList = (doc.data());
    });

    chats();
    return chatList;
}