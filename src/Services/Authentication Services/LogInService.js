import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {displayPasswordResetInfoAlert} from "../../Modules/Auth Core/AuthenticationCoreModule";
import {isConnectionAvailable} from "./SignUpService";
import {displayFirebaseAuthFailureAlert, displaySignUpFailedAlert} from "../../Modules/Sign Up/SignUpUtils";
import {emailForPassReset} from "../../Components/Authentication/Core/AuthenticationCore";
import {handleFailedPasswordReset} from "../../Modules/Session/CurrentSessionModule";
import {authentication} from "../../Modules/Firebase/FirebaseIntegration";
import {logInCredentials as loginCredentials, logInCredentials} from "../../Modules/Validation/LogInValidation";
import {displayLogInSuccessAlert, markCurrentUserAsLoggedIn} from "../../Modules/Log In/LogInModule";

export let errorsEncountered = false;
export let account = {};
export let retrievedEmailAddress = ``;

export const logInUser = async () => {
    if (await isConnectionAvailable()) {
        if (loginCredentials.name.type === 'email') {
            await logInWithEmailAndPassword();
        } else {
            await logInWithUsernameAndPassword();
        }
    } else {
        displaySignUpFailedAlert(`Server down for maintenance. We are apologizing for this inconvenient and we're trying
            out best to solve the problem as soon as possible so you can use ReachMe App again.
            Best regards,
            ReachMe development team`);
    }
}

const logInWithEmailAndPassword = async () => {
    authentication.signInWithEmailAndPassword(logInCredentials.name.userOrEmail, logInCredentials.pass)

        .then(userCredential => {
            const accountUid = userCredential.user.uid;
            console.log(accountUid);
            markCurrentUserAsLoggedIn(accountUid);
            displayLogInSuccessAlert("You've been logged in successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })

        .catch(error => {
            const errorCode = error.code;
            console.log(error);
            displayFirebaseAuthFailureAlert(errorCode);
        });
}


const logInWithUsernameAndPassword = async () => {
    fetch(`http://localhost:8080/account/username=${logInCredentials.name.userOrEmail}`)
        .then(response => response.json())
        .then(async (data) => {
            logInCredentials.name.userOrEmail = data.emailAddress;
            await logInWithEmailAndPassword();
        })
        .catch(() => {
            displaySignUpFailedAlert('The provided username does not describe any of the registered accounts within' +
                'the application!');
        });
}


export const retrieveUserAccountDetailsByEmail = (email) => {
    const passResetAccountDataObtainEndpoint = `http://localhost:8080/account/email=${email}`;
    fetch(passResetAccountDataObtainEndpoint)
        .then((response) => response.json())
        .then(data => {
            account = data;
            localStorage.setItem("userRequestingPasswordResetExists", "true");
        })
        .catch(error => {
            console.log(error);
            handleFailedPasswordReset();
            errorsEncountered = true;
        });
}

export const resetPasswordViaEmail = async () => {
    if (await isConnectionAvailable()) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, emailForPassReset)
            .then(() => {
                displayPasswordResetInfoAlert(`A password reset request has been made for user 
                ${account.userRealName}. We sent an email to the specified email address 
                (${account.emailAddress}) in order to reset the password. After reset, you can try to sign in back.
                 Enjoy the ReachMe App!`);
            })
    } else {
        errorsEncountered = true;
        displaySignUpFailedAlert("The server is now closed for maintenance and your request could not be accomplished." +
            "We are trying our best to solve the problem. Please come back later on.");
    }
}






