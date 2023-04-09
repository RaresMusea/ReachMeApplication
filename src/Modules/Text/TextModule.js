export const isEmptyString = (str) => {
    return (str === undefined) || str && str.length === 0;
}

export const containsWhitespaces = (text) => {
    if (isEmptyString(text)) {
        return false;
    }
    return text.includes(" ");
}

export const containsUppercase = (text) => {
    for (const chr in text) {
        if (chr === chr.toUpperCase()) {
            return true;
        }
    }
    return false;
}

export const containsLowercase = (text) => {
    for (const chr in text) {
        if (chr === chr.toLowerCase()) {
            return true;
        }
    }
    return false;
}

export const containsSymbols = (text) => {
    return text.includes("$") ||
        text.includes("%") ||
        text.includes("^") ||
        text.includes("&") ||
        text.includes("_");
}