import {buildError} from "../Sign Up/SignUpUtils";
import {
    containsLowercase,
    containsSymbols,
    containsUppercase,
    containsWhitespaces,
    isEmptyString
} from "../Text/TextModule";

const isEmailValid = (email) => {
    const regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return String(email).toLowerCase().match(regexp);
}


export const validateEmailAddress = (emailAddress) => {
    if (isEmptyString(emailAddress)) {
        return buildError("The email address cannot be empty!");
    }
    if (!isEmailValid(emailAddress)) {
        return buildError("Invalid email address!");
    }
    return {};
}

const isUsernameValid = (username) => {
    return username.length >= 5 && username.length <= 30;
}

export const validateUsername = (username) => {
    if (isEmptyString(username)) {
        return buildError("The username/email cannot be marked as empty!");
    }

    if (containsWhitespaces(username)) {
        return buildError("The username cannot contain whitespaces!");
    }

    if (!isUsernameValid(username)) {
        return buildError("Invalid username! It must contain 5 characters at least and 30 at most!")
    }

    if (isEmailValid(username)) {
        return buildError("The username cannot be an email address!");
    }

    return {};
}

export const validatePassword = (password) => {
    if (isEmptyString(password)) {
        return buildError("The password cannot be empty!");
    }

    if (password.length < 5) {
        return buildError("The password is way too weak!");
    }

    if (password.length > 30) {
        return buildError("The password should have at most 30 characters!");
    }

    return validatePasswordSyntactically(password);
}

const validatePasswordSyntactically = (password) => {
    if (!containsLowercase(password)) {
        return buildError("The password should contain at least one lowercase character!");
    }

    if (!containsUppercase(password)) {
        return buildError("The password should contain at least one uppercase character!");
    }

    if (!containsSymbols(password)) {
        return buildError("The password should contain at least one symbol!");
    }

    return {};
}