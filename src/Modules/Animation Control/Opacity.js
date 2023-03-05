export const increaseTheOpacity = (element) => {
    const opacityArray = ["0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1"];
    let index = 0;

    (function next() {
        element.style.opacity = opacityArray[index];
        if (index++ < opacityArray.length) {
            setTimeout(next, 40);
        }
    })();
}

export const decreaseTheOpacity = (element) => {
    let opacityArray = ["0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];
    let index = 0;
    (function next() {
        element.style.opacity = opacityArray[index];
        if (index++ < opacityArray.length) {
            setTimeout(next, 40);
        }
    })();
}