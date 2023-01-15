import {React} from "react";
import {authentication} from "../../Misc/Firebase/FirebaseIntegration";
import AlertBox from "../../../General Purpose/Alert/Scripts/AlertBox";
import ReactDOM from "react-dom/client";
import {containsLowercase, containsSymbols, containsUppercase} from "../../../General Purpose/Text/TextFunctions";

const POSTAuthEndpoint = `http://localhost:8080/account`;
let successfullySignedUp = false;


export const emptyForm = {
    fullName: ``,
    email: ``,
    username: ``,
    pass: ``
}

const isStringEmpty = (email) => {
    return email === "" || email === null;
}

const isEmailValid = (email) => {
    const regexp =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

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
    if (name[0] === name[0].toUpperCase() && name.length > 3) {
        return true;
    }
}

const isNameValid = (fullName) => {
    const tokens = fullName.split(' ');

    if (tokens.length > 2 || tokens.length < 2) {
        return false;
    }

    return true
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

    if (password.length > 15) {
        return buildError("The password should have at most 15 characters!");
    }

    return validatePasswordSyntactically(password);
}


export const buildError = (message) => {
    return {
        'message': message,
        'hasErrors': true
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

export const signUpUser = (name, username, pass, email) => {
    authentication.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            const user = userCredential.user;

            const payloadBody = {
                "userFirebaseIndentifier": user.uid,
                "userName": username,
                "profilePhotoHref": "",
                "userRealName": name,
                "emailAddress": email
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payloadBody),
            };

            fetch(POSTAuthEndpoint, requestOptions)
                .then(response => response.json())
                .then(() => {
                })
                .catch(console.log);

            successfullySignedUp = true;
        })
        .catch(error => {
            const errorCode = error.code;
            console.log(errorCode);
            const div = document.createElement('div');
            const signUp = (document.querySelector('.SignUp'));
            signUp.appendChild(div);
            div.id = 'errors';
            const elem = document.getElementById('errors');
            const message = generateAlertsDependingOnStates(errorCode);
            const alertBox = <AlertBox isOpen={true} message={message}/>
            const root = ReactDOM.createRoot(document.getElementById('errors'));
            root.render(alertBox);
            setTimeout(() => elem.remove(), 6000);
        });
}
