import {displaySignUpFailedAlert, displaySignUpSuccessAlert} from "../../Modules/Sign Up/SignUpUtils";
import {signUpCredentials} from "../../Modules/Validation/SignUpValidation";
import {getAuth, signOut} from "firebase/auth";

const postEndpoint = `http://localhost:8080/account`;
const testConnectionEndpoint = `http://localhost:8080/connectionAvailable`;

const postMethodRequestOpt = {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: ''
}

const setRequestOptions = (payload) => {
    postMethodRequestOpt.body = JSON.stringify(payload);
}

const testLocalServerConnection = async () => {
    try {
        await fetch(testConnectionEndpoint);
    } catch (error) {
        return false;
    }
    return true;
}

export const isConnectionAvailable = async () => {
    const connectionSucceeded = await testLocalServerConnection();

    if (!connectionSucceeded) {
        displaySignUpFailedAlert(`Server down for maintenance. We are apologizing for this inconvenient and we're trying
            out best to solve the problem as soon as possible so you can use ReachMe App again.
            Best regards,
            ReachMe development team`);
        return false;
    }
    return true;
}

export const accountWithSameCredentialsAlreadyExists = (username) => {
    fetch(`http://localhost:8080/account/username=${username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.userName === null) {
                return false;
            }
            if (data.userName === signUpCredentials.username) {
                throw new Error();
            }
        })
        .catch(() => {
            displaySignUpFailedAlert("The username you have provided is already used by another ReachMe account!");
            return true;
        })

    return false;
}

export const saveUserAccountMetadata = (user) => {
    const payloadBody = {
        "userFirebaseIdentifier": user.uid,
        "userName": signUpCredentials.username,
        "profilePhotoHref": "",
        "userRealName": signUpCredentials.fullName,
        "emailAddress": signUpCredentials.emailAddress
    };

    setRequestOptions(payloadBody);
    fetch(postEndpoint, postMethodRequestOpt)
        .then(response => response.json())
        .then(() => {
            displaySignUpSuccessAlert(`Account created successfully, ${signUpCredentials.fullName}! Enjoy the ReachMe app and
                    stay surrounded only by wonderful people!&nbsp;You will be automatically redirected to the Log In
                    page where you can enter your credentials and access your profile.`);

        })
        .catch(() => {
            displaySignUpFailedAlert(`Sign up failed due to an internal server error!\nPlease try again later.`);
        })
}

export const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            localStorage.removeItem("currentlyLoggedInUser");
        })
        .catch((error) => {
            console.log(error);
        });
}