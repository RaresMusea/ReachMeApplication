import {renderAlert} from "../Alerts/AlertUtil";
import {signUpCredentials} from "../Validation/SignUpValidation";

export const buildError = (message) => {
    return {
        'message': message, 'hasErrors': true
    };
}

const generateErrorMessagesDependingOnStates = (errorCode) => {
    switch (errorCode) {
        case (`auth/email-already-in-use`): {
            return "Sign up failed! The email address you have provided is already used by another ReachMe account! Try another email address!";
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

export const displayFirebaseAuthFailureAlert = (errorCode) => {
    const message = generateErrorMessagesDependingOnStates(errorCode);
    displaySignUpFailedAlert(message);
}

export const setSignUpCredentialFromFormValue = (type, formValue) => {
    switch (type) {
        case `email`:
            signUpCredentials.emailAddress = formValue;
            return;
        case `password`:
            signUpCredentials.pass = formValue;
            return;
        case `fullName`:
            signUpCredentials.fullName = formValue;
            return;
        case `username`:
            signUpCredentials.username = formValue;
            return;
        default:
            return;
    }
}