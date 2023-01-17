import {isEmptyString} from "../Text/TextModule";
import {buildError} from "../Sign Up/SignUpUtils";

export const signUpCredentials = {
    emailAddress: '', username: '', fullName: '', pass: ''
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
    if (isEmptyString(name)) {
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
