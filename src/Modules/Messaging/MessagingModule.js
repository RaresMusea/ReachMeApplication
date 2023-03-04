import {decreaseTheOpacity, increaseTheOpacity} from "../Animation Control/Opacity";

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