import {validateEmailAddress, validateUsername} from "./AuthValidationBase";
import {isObjectEmpty} from "../Object/ObjectModule";

export const logInCredentials = {
    name: {
        "userOrEmail": ``,
        "type": ``
    },
    pass: ``
};

export const isUsername = false;

export const determineLoginType = () => {
    if (isObjectEmpty(validateEmailAddress(logInCredentials.name.userOrEmail))) {
        logInCredentials.name.type = "email";
        return;
    }

    if (validateUsername(logInCredentials.name.userOrEmail) === {}) {
        logInCredentials.name.type = "username";
        return;
    }
    logInCredentials.name.type = "unknown";
}