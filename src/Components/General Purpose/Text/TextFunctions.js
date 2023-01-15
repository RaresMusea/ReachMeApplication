export const containsUppercase = (text) => {
    for (let ch in text) {
        if (ch === ch.toUpperCase()) {
            return true;
        }
    }
    return false;
}

export const containsSymbols = (text) => {
    return text.includes("$") ||
        text.includes("_") ||
        text.includes("%") ||
        text.includes("@") ||
        text.includes("&") ||
        text.includes("-") ||
        text.includes("*") ||
        text.includes("+");
}

export const containsLowercase = (text) => {
    for (let ch in text) {
        if (ch.toLowerCase() === ch) {
            return true;
        }
    }
    return false;
}

export const constainsWhiteSpaces = (text) => {
    return text.includes(" ");
}