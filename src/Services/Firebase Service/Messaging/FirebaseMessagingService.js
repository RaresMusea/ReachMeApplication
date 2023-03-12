import {arrayUnion, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {buildMessagePayload, displayUserSearcherAlert} from "../../../Modules/Messaging/MessagingModule";
import {loggedInAccount} from "../../Feed Services/FeedDrawerService";
import {v4 as uuid} from 'uuid';

export let conversationAlreadyExists = false;

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
    conversationAlreadyExists = conversation.exists();


    if (!conversationAlreadyExists) {
        await setDoc(doc(firebaseFirestore, "conversationsCollection", conversationId), {messages: []});
        await setDoc(doc(firebaseFirestore, "unreadMessages", conversationId), {
            [person1.userFirebaseIdentifier]: 0,
            [person2.userFirebaseIdentifier]: 0,
        })
        await updateConversationDocBetween(person1, person2, conversationId);
        await updateConversationDocBetween(person2, person1, conversationId);
    }
}

const createConversationDocBetween = async (person1, person2, conversationId) => {
    await setDoc(doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            userFirebaseIdentifier: person2.userFirebaseIdentifier,
            userName: person2.userName,
            userRealName: person2.userRealName,
            profilePhotoHref: person2.profilePhotoHref,
        },
        [conversationId + ".date"]: serverTimestamp()
    });
}

const updateConversationDocBetween = async (person1, person2, conversationId) => {
    await updateDoc(doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier), {
        [conversationId + ".userDetails"]: {
            userFirebaseIdentifier: person2.userFirebaseIdentifier,
            userName: person2.userName,
            userRealName: person2.userRealName,
            profilePhotoHref: person2.profilePhotoHref,
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

export const sendMessage = async (messageType, messageContent, conversationIdentifier, receiverIdentifier, additionalHref) => {
    await clearMessageNotificationsForLoggedUser(conversationIdentifier);
    await updateDoc(doc(firebaseFirestore, "conversationsCollection", conversationIdentifier), {
        messages: arrayUnion(buildMessagePayload(messageType, messageContent, additionalHref))
    });

    //Update last message sent for both users engaged in that conversation
    await updateLastMessageDetailsFor(additionalHref,
        conversationIdentifier,
        messageType,
        messageContent,
        loggedInAccount.userFirebaseIdentifier,
    );
    await updateLastMessageDetailsFor(additionalHref, conversationIdentifier, messageType, messageContent, receiverIdentifier);
    await updateMessageNotificationsFor(receiverIdentifier, messageType, conversationIdentifier);
}

const updateLastMessageDetailsFor = async (additionalHref, conversationIdentifier, lastMessageType, lastMessage, userIdentifier) => {
    await updateDoc(doc(firebaseFirestore, "userConversations", userIdentifier), {
        [conversationIdentifier + ".lastMessageInConversation"]: {
            lastMessageType,
            lastMessage,
            additionalHref,
            conversationIdentifier,
        },
        [conversationIdentifier + ".date"]: serverTimestamp(),
        [conversationIdentifier + ".senderIdentifier"]: loggedInAccount.userFirebaseIdentifier
    });
}

const updateMessageNotificationsFor = async (receiverIdentifier, messageType, conversationIdentifier) => {

    await updateDoc(doc(firebaseFirestore, "messagesNotifications", receiverIdentifier), {
        [conversationIdentifier + ".notificationDetails"]: arrayUnion({
            "notificationsId": uuid(),
            messageType,
            "senderId": loggedInAccount.userFirebaseIdentifier,
            "senderName": loggedInAccount.userRealName,
            "senderUsername": loggedInAccount.userName,
        })
    });
}

export const clearMessageNotificationsForLoggedUser = async (conversationIdentifier) => {
    const conversationRef = doc(firebaseFirestore, "messagesNotifications", loggedInAccount.userFirebaseIdentifier);
    await updateDoc(conversationRef, {
        [conversationIdentifier + ".notificationDetails"]: []
    });
}

export const createMessageNotificationsCollection = async (userId) => {
    await setDoc(doc(firebaseFirestore, "messagesNotifications", userId), {});
}
