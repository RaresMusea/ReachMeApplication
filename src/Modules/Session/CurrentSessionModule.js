import {displaySignUpFailedAlert} from "../Sign Up/SignUpUtils";
import {retrieveUserAccountDetailsByEmail} from "../../Services/Authentication Services/LogInService";
import {emailForPassReset} from "../../Components/Authentication/Core/AuthenticationCore";

export const userWasLoggedInPreviously = () => {
    const result = localStorage.getItem("currentlyLoggedInUser");
    return result === undefined || result === null;
}

export const handleFailedPasswordReset = () => {
    /*forceClose=true;*/
    displaySignUpFailedAlert("We were unable to find any user having that email address!" +
        " Please make sure that you've typed it in correctly and please try again.");
    localStorage.setItem("userRequestingPasswordResetExists", "false");
}

export const userExists = () => {
    retrieveUserAccountDetailsByEmail(emailForPassReset);
    return localStorage.getItem("userRequestingPasswordResetExists") === "true";
}