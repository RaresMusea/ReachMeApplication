import {decreaseTheOpacity} from "../Animation Control/Opacity";

export const renderLogoDependingOnScreenDimension = () => {
    if (window.innerWidth > 1200)
        return "ReachMe Messaging";

    if (window.innerWidth < 1200 && window.innerWidth > 980)
        return "ReachMe";

    return "";
}

export const closeUserSearcher = () => {
    const element = document.querySelector('.Searcher');
    setTimeout(() => {
        decreaseTheOpacity(element)
    }, 30);
}