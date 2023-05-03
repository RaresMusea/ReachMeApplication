import {decreaseTheOpacity, increaseTheOpacity,} from "../Animation Control/Opacity";
import {renderAlert} from "../Alerts/AlertUtil";
import {v4 as uuid} from "uuid";
import {loggedInAccount} from "../../Services/Feed Services/FeedDrawerService";
import {Timestamp} from "firebase/firestore";
import {startsWithVowel} from "../Text/TextModule";

export const renderLogoDependingOnScreenDimension = () => {
    if (window.innerWidth > 1200) return "ReachMe Messaging";

    if (window.innerWidth < 1200 && window.innerWidth > 980) return "ReachMe";

    return "";
};

export const closeUserSearcher = () => {
    const element = document.querySelector(".Searcher");
    element.style.display = `none`;
    setTimeout(() => {
        decreaseTheOpacity(element);
    }, 30);
};

export const fadeInChats = () => {
    const chats = document.querySelector(".ChatsWrapper");
    setTimeout(() => {
        increaseTheOpacity(chats);
    }, 60);
};

export const moveMessageToTheRight = () => {
    const message = document.querySelector(".MessageContent");
    message.style.transform = `translateX(${20}px)"`;
};

export const displayUserSearcherAlert = (message) => {
    const alertConfig = {
        severity: "error",
        class: "UserSearcherFailAlert",
        message: message,
        targetId: "#UserSearcherAlerts",
        alertType: "error",
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    };

    renderAlert(alertConfig);
};

export const displayUserSearcherInfoAlert = (message) => {
    const alertConfig = {
        severity: "info",
        class: "UserSearcherInfoAlert",
        message: message,
        targetId: "#UserSearcherAlerts",
        alertType: "info",
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    };

    renderAlert(alertConfig);
};

export const resetMessageInputValues = () => {
    const textarea = document.querySelector(".MessageInput");
    textarea.value = ``;
};

export const buildMessagePayload = (
    messageType,
    messageContent,
    additionalHref,
    fileName = ""
) => {
    return {
        additionalHref: additionalHref,
        messageType: messageType,
        messageIdentifier: uuid(),
        senderIdentifier: loggedInAccount.userFirebaseIdentifier,
        content: messageContent,
        sharedFile: fileName,
        date: Timestamp.now(),
    };
};

export const getConversationId = (loggedUserId, targetUserId) => {
    return loggedUserId > targetUserId
        ? `${loggedUserId}-${targetUserId}`
        : `${targetUserId}-${loggedUserId}`;
};

export const determineChatLastMessage = (chat) => {
    if (chat.lastMessageInConversation?.lastMessageType === `text`) {
        if (chat.senderIdentifier === loggedInAccount.userFirebaseIdentifier) {
            return `You: ${chat.lastMessageInConversation?.lastMessage}`;
        } else {
            return chat.lastMessageInConversation?.lastMessage;
        }
    }
    if (chat.lastMessageInConversation?.lastMessageType === "voice recording") {
        if (chat.senderIdentifier === loggedInAccount.userFirebaseIdentifier) {
            return "You sent a voice message.";
        } else {
            return `${chat.userDetails?.userRealName} sent you a voice message.`;
        }
    }
    if (chat.lastMessageInConversation?.lastMessageType === "photo") {
        if (chat.senderIdentifier === loggedInAccount.userFirebaseIdentifier) {
            return "You sent a photo.";
        } else {
            return `${chat.userDetails?.userRealName} sent you a photo.`;
        }
    }

    if (chat.lastMessageInConversation?.lastMessageType === "video") {
        if (chat.senderIdentifier === loggedInAccount.userFirebaseIdentifier) {
            return "You sent a video.";
        } else {
            return `${chat.userDetails?.userRealName} sent you a video.`;
        }
    }

    if (chat.lastMessageInConversation?.lastMessageType.includes("file/")) {
        const extension =
            chat.lastMessageInConversation?.lastMessageType.split("/")[1];
        if (chat.senderIdentifier === loggedInAccount.userFirebaseIdentifier) {
            return `You shared ${
                startsWithVowel(extension) ? "an" : "a"
            } ${extension} file.`;
        }
        return `${chat.use?.userRealName} shared ${
            startsWithVowel(extension) ? "an" : "a"
        } ${extension} file.`;
    }

    return ``;
};

export const extractUserIdentifiersFromChatsDoc = (chatsDoc) => {
    const userIdentifiers = [];
    chatsDoc.forEach((entry) => {
        userIdentifiers.push(entry[1].userDetails.userFirebaseIdentifier);
    });

    return userIdentifiers;
};

export const reloadProfilePictures = (doc, profilePictures) => {
    doc.forEach((entry, index) => {
        entry[1].userDetails.profilePhotoHref = profilePictures[index];
        console.log(entry[1].userDetails);
    });
};

export const getMissedNotificationsForChat = (notificationsArray, convId) => {
    let count = 0;

    if (notificationsArray.length === 0) {
        return count;
    }

    notificationsArray.forEach(notification => {
        if (notification.conversationId === convId) {
            count = notification.numberOfUnreadMessages;
        }
    });

    return count;
}
