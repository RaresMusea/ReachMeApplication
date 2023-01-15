import {
    constainsWhiteSpaces,
    containsLowercase,
    containsSymbols,
    containsUppercase
} from "../../../General Purpose/Text/TextFunctions";
import {renderAlert} from "../../../General Purpose/Alerts/AlertUtil";


export const emptyForm = {
    fullName: ``, email: ``, username: ``, pass: ``
}

const isStringEmpty = (email) => {
    return email === "" || email === null;
}

const isEmailValid = (email) => {
    const regexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return String(email).toLowerCase().match(regexp);
}

export const validateEmailAddress = (emailAddress) => {
    if (isStringEmpty(emailAddress)) {
        return buildError("The email address cannot be empty!");
    }
    if (!isEmailValid(emailAddress)) {
        return buildError("Invalid email address!");
    }

    return {};
}


const isNameWrittenCorrect = (name) => {
    const tokens = name.split(' ');
    const firstName = tokens[0];
    const lastName = tokens[1];

    return (firstName[0] === firstName[0].toUpperCase() && firstName.length > 3) && (lastName[0] === lastName[0].toUpperCase() && lastName.length > 3);
}

const isNameValid = (fullName) => {
    const tokens = fullName.split(' ');

    return !(tokens.length > 2 || tokens.length < 2);


}

export const validateName = (name) => {
    if (isStringEmpty(name)) {
        return buildError("Name cannot be marked as empty!");
    }

    if (!isNameValid(name)) {
        return buildError("Invalid name provided! It must contain both your first and your last name!");
    }

    if (!isNameWrittenCorrect(name)) {
        return buildError("The first name and last name should begin with a capital letter!");
    }

    return {};
}

const isUsernameValid = (username) => {
    return username.length >= 5 && username.length <= 30;
}

export const validateUsername = (username) => {
    if (isStringEmpty(username)) {
        return buildError("The username cannot be marked as empty!");
    }

    if (constainsWhiteSpaces(username)) {
        return buildError("The username cannot contain whitespaces!");
    }

    if (!isUsernameValid(username)) {
        return buildError("Invalid username! It must contain 5 characters at least and 30 at most!")
    }

    return {};
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

export const validatePassword = (password) => {
    if (isStringEmpty(password)) {
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


export const buildError = (message) => {
    return {
        'message': message, 'hasErrors': true
    };
}

export const generateAlertsDependingOnStates = (errorCode) => {
    switch (errorCode) {
        case (`auth/email-already-in-use`): {
            return "Sign up failed! The email address you have entered is already used by another ReachMe account! Try another email address!";
        }
        case(`auth/invalid-email`): {
            return "Sign up failed! The email address you have entered is invalid!";
        }
        case (`auth/weak-password`): {
            return "Sign up failed! The password you have chosen is way too weak! We highly recommend you to use a password that contains at least one capital letter (A-Z), one lowercase character (a-z), one symbol (@$#^&) and one numeric character (0-9).";
        }
        default: {
            return `Sign up failed due to an unexpected error. Please try again later.`;
        }
    }
}

export const displaySignUpSuccessAlert = (message) => {
    const alertConfig = {
        severity: 'success',
        class: 'AlertSuccess',
        message: message,
        targetId: '#errors',
        alertType: 'success',
        fadeOutTimeout: 3000,
        removeTimeout: 3500,
    }
    renderAlert(alertConfig);
}

export const displaySignUpFailedAlert = (message) => {
    const alertConfig = {
        severity: 'error',
        class: 'AlertError',
        message: message,
        targetId: '#errors',
        alertType: 'error',
        fadeOutTimeout: 4000,
        removeTimeout: 4500,
    }

    renderAlert(alertConfig);
}
