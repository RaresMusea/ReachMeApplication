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

export const startsWithVowel = (word) => {
    const firstWord = word[0];
    return firstWord === 'a' || firstWord === 'e' || firstWord === 'i' || firstWord === 'o' || firstWord === 'u';
}

export const endsWithVowel = (input) => {
    if (isEmptyString(input)) {
        return false;
    }
    const lastChar = input[input.length - 1]
    return lastChar === 'a' || lastChar === 'e' || lastChar === 'i' || lastChar === 'o' || lastChar === 'u';
}