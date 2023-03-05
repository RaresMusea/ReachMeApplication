import {arrayUnion, doc, getDoc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc} from 'firebase/firestore';
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {displayUserSearcherAlert} from "../../../Modules/Messaging/MessagingModule";
import {v4 as uuid} from 'uuid';
import {loggedInAccount} from "../../Feed Services/FeedDrawerService";

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

/*
export const useMessages = () => {
    let messages = ["ana"];
    const {data} = useContext(ConversationContext);



    return messages;
}*/

export const sendTextMessage = async (messageContent, conversationIdentifier, receiverIdentifier) => {
    await updateDoc(doc(firebaseFirestore, "conversationsCollection", conversationIdentifier), {
        messages: arrayUnion({
            messageIdentifier: uuid(),
            senderIdentifier: loggedInAccount.userFirebaseIdentifier,
            content: messageContent,
            date: Timestamp.now(),
        })
    });

    //Update last message sent for both users engaged in that conversation
    await updateLastMessageDetailsFor(conversationIdentifier, messageContent, loggedInAccount.userFirebaseIdentifier);
    await updateLastMessageDetailsFor(conversationIdentifier, messageContent, receiverIdentifier);
}

const updateLastMessageDetailsFor = async (conversationIdentifier, lastMessage, userIdentifier) => {
    console.log(conversationIdentifier + "\t" + lastMessage + "\t" + userIdentifier + "\n");

    await updateDoc(doc(firebaseFirestore, "userConversations", userIdentifier), {
        [conversationIdentifier + ".lastMessageInConversation"]: {
            lastMessage
        },
        [conversationIdentifier + ".date"]: serverTimestamp()
    });
}
