import {decreaseTheOpacity, increaseTheOpacity} from "../Animation Control/Opacity";
import {renderAlert} from "../Alerts/AlertUtil";

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

export const resetMessageInputValues = () => {
    const textarea = document.querySelector('.MessageInput');
    textarea.value = ``;
}