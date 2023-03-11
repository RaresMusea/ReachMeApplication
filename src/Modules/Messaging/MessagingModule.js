import {decreaseTheOpacity, increaseTheOpacity} from "../Animation Control/Opacity";
import {renderAlert} from "../Alerts/AlertUtil";
import {v4 as uuid} from "uuid";
import {loggedInAccount} from "../../Services/Feed Services/FeedDrawerService";
import {Timestamp} from "firebase/firestore";

export const renderLogoDependingOnScreenDimension = () => {
    if (window.innerWidth > 1200)
        return "ReachMe Messaging";

    if (window.innerWidth < 1200 && window.innerWidth > 980)
        return "ReachMe";

    return "";
}

export const closeUserSearcher = () => {
    const element = document.querySelector('.Searcher');
    element.style.display = `none`;
    setTimeout(() => {
        decreaseTheOpacity(element)
    }, 30);

}

export const fadeInChats = () => {
    const chats = document.querySelector('.ChatsWrapper');
    setTimeout(() => {
        increaseTheOpacity(chats)
    }, 30);
}

export const moveMessageToTheRight = () => {
    const message = document.querySelector('.MessageContent');
    message.style.transform = `translateX(${20}px)"`;
}

export const displayUserSearcherAlert = (message) => {
    const alertConfig = {
        severity: 'error',
        class: 'UserSearcherFailAlert',
        message: message,
        targetId: '#UserSearcherAlerts',
        alertType: 'error',
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    };

    renderAlert(alertConfig);
}

export const displayUserSearcherInfoAlert = (message) => {
    const alertConfig = {
        severity: 'info',
        class: 'UserSearcherInfoAlert',
        message: message,
        targetId: '#UserSearcherAlerts',
        alertType: 'info',
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    };

    renderAlert(alertConfig);
}

export const resetMessageInputValues = () => {
    const textarea = document.querySelector('.MessageInput');
    textarea.value = ``;
}

export const buildMessagePayload = (messageType, messageContent) => {
    return {
        messageType: messageType,
        messageIdentifier: uuid(),
        senderIdentifier: loggedInAccount.userFirebaseIdentifier,
        content: messageContent,
        date: Timestamp.now(),
    }
}

export const getConversationId = (loggedUser, targetUser) => {
    return loggedUser.userFirebaseIdentifier > targetUser.userFirebaseIdentifier
        ? `${loggedUser.userFirebaseIdentifier}-${targetUser.userFirebaseIdentifier}`
        : `${targetUser.userFirebaseIdentifier}-${loggedUser.userFirebaseIdentifier}`;
}