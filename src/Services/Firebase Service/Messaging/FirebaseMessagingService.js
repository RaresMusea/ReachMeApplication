import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseFirestore } from "../../../Modules/Firebase/FirebaseIntegration";
import {
  buildMessagePayload,
  displayUserSearcherAlert,
} from "../../../Modules/Messaging/MessagingModule";
import { loggedInAccount } from "../../Feed Services/FeedDrawerService";
import { v4 as uuid } from "uuid";

export let conversationAlreadyExists = false;

export const createConversationListForUser = async (userFirebaseIdentifier) => {
  await setDoc(
    doc(firebaseFirestore, "userConversations", userFirebaseIdentifier),
    {}
  );
};

export const createConversationBetween = async (person1, person2) => {
  if (person1.userFirebaseIdentifier === person2.userFirebaseIdentifier) {
    displayUserSearcherAlert(
      "You cannot initiate a conversation with yourself!"
    );
    return;
  }

  const conversationId =
    person1.userFirebaseIdentifier > person2.userFirebaseIdentifier
      ? person1.userFirebaseIdentifier + `-` + person2.userFirebaseIdentifier
      : person2.userFirebaseIdentifier + `-` + person1.userFirebaseIdentifier;

  const conversation = await getDoc(
    doc(firebaseFirestore, "conversationsCollection", conversationId)
  );
  conversationAlreadyExists = conversation.exists();

  if (!conversationAlreadyExists) {
    await setDoc(
      doc(firebaseFirestore, "conversationsCollection", conversationId),
      { messages: [] }
    );
    await updateConversationDocBetween(person1, person2, conversationId);
    await updateConversationDocBetween(person2, person1, conversationId);
  }
};

const createConversationDocBetween = async (
  person1,
  person2,
  conversationId
) => {
  await setDoc(
    doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier),
    {
      [conversationId + ".userDetails"]: {
        userFirebaseIdentifier: person2.userFirebaseIdentifier,
        userName: person2.userName,
        userRealName: person2.userRealName,
        profilePhotoHref: person2.profilePhotoHref,
      },
      [conversationId + ".date"]: serverTimestamp(),
    }
  );
};

const updateConversationDocBetween = async (
  person1,
  person2,
  conversationId
) => {
  await updateDoc(
    doc(firebaseFirestore, "userConversations", person1.userFirebaseIdentifier),
    {
      [conversationId + ".userDetails"]: {
        userFirebaseIdentifier: person2.userFirebaseIdentifier,
        userName: person2.userName,
        userRealName: person2.userRealName,
        profilePhotoHref: person2.profilePhotoHref,
      },
      [conversationId + ".date"]: serverTimestamp(),
    }
  );
};

export const retrieveChatListInRealTimeForCurrentUser = (
  currentUserIdentifier
) => {
  let chatList = [];
  const chats = onSnapshot(
    doc(firebaseFirestore, "userConversations", currentUserIdentifier),
    (doc) => {
      chatList = doc.data();
    }
  );

  chats();
  return chatList;
};

export const sendMessage = async (
  messageType,
  messageContent,
  conversationIdentifier,
  receiverIdentifier,
  additionalHref,
  fileName = ""
) => {
  const sendDate = Date.now();
  await clearMessageNotificationsForLoggedUser(conversationIdentifier);
  await updateDoc(
    doc(firebaseFirestore, "conversationsCollection", conversationIdentifier),
    {
      messages: arrayUnion(
        buildMessagePayload(
          messageType,
          messageContent,
          additionalHref,
          fileName
        )
      ),
    }
  );

  //Update last message sent for both users engaged in that conversation
  await updateLastMessageDetailsFor(
    additionalHref,
    conversationIdentifier,
    messageType,
    messageContent,
    loggedInAccount.userFirebaseIdentifier
  );
  await updateLastMessageDetailsFor(
    additionalHref,
    conversationIdentifier,
    messageType,
    messageContent,
    receiverIdentifier
  );
  await updateMessageNotificationsFor(
    receiverIdentifier,
    messageType,
    conversationIdentifier,
    sendDate
  );
};

const updateLastMessageDetailsFor = async (
  additionalHref,
  conversationIdentifier,
  lastMessageType,
  lastMessage,
  userIdentifier
) => {
  await updateDoc(doc(firebaseFirestore, "userConversations", userIdentifier), {
    [conversationIdentifier + ".lastMessageInConversation"]: {
      lastMessageType,
      lastMessage,
      additionalHref,
      conversationIdentifier,
    },
    [conversationIdentifier + ".date"]: serverTimestamp(),
    [conversationIdentifier + ".senderIdentifier"]:
      loggedInAccount.userFirebaseIdentifier,
  });
};

const updateMessageNotificationsFor = async (
  receiverIdentifier,
  messageType,
  conversationIdentifier,
  sendDate
) => {
  await updateDoc(
    doc(firebaseFirestore, "messagesNotifications", receiverIdentifier),
    {
      [conversationIdentifier + ".notificationDetails"]: arrayUnion({
        notificationsId: uuid(),
        messageType,
        senderId: loggedInAccount.userFirebaseIdentifier,
        senderName: loggedInAccount.userRealName,
        senderUsername: loggedInAccount.userName,
        sendingDate: sendDate,
      }),
    }
  );
};

export const clearMessageNotificationsForLoggedUser = async (
  conversationIdentifier
) => {
  const conversationRef = doc(
    firebaseFirestore,
    "messagesNotifications",
    loggedInAccount.userFirebaseIdentifier
  );
  await updateDoc(conversationRef, {
    [conversationIdentifier + ".notificationDetails"]: [],
  });
};

export const createMessageNotificationsCollection = async (userId) => {
  await setDoc(doc(firebaseFirestore, "messagesNotifications", userId), {});
};

const filterDocsForImageUpload = async (profilePicture, userId) => {
  const userConversations = await getDocs(
    collection(firebaseFirestore, "userConversations")
  );

  const updatesList = [];

  userConversations.forEach((conversation) => {
    let currentData = Object.entries(conversation.data());
    if (currentData.length !== 0) {
      const currentId = conversation.id;
      const conversationId =
        currentData[0][0] === undefined ? "" : currentData[0][0];
      for (const elem of currentData) {
        if (
          elem[1].userDetails !== undefined &&
          elem[1].userDetails.userFirebaseIdentifier === userId
        ) {
          if (conversationId !== "") {
            elem[1].userDetails.profilePhotoHref = profilePicture;
            updatesList.push({
              payload: elem[1].userDetails,
              currentId: currentId,
              conversationId: elem[0],
            });
          }
        }
      }
    }
  });

  return updatesList;
};

export const updateImageInConversations = async (profilePicture, userId) => {
  const filteredDocs = await filterDocsForImageUpload(profilePicture, userId);
  console.log(filteredDocs[0]);
  console.log(filteredDocs[1]);

  await Promise.all(
    filteredDocs.map(async (document) => {
      const payload = document.payload;
      const id = document.currentId;
      const conversationId = document.conversationId;

      const docRef = doc(firebaseFirestore, "userConversations", id);
      await updateDoc(docRef, {
        [conversationId + ".userDetails" + ".profilePhotoHref"]:
          payload.profilePhotoHref,
      });
    })
  );
};
