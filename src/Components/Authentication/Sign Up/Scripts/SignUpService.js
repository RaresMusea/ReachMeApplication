import {signUpCredentials} from "./SignUp";
import {displaySignUpFailedAlert, displaySignUpSuccessAlert} from "./SignUpUtils";

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

export const isLocalServerAvailable = () => {
    let response = true;
    localStorage.setItem("connection", "true");

    if (localStorage.getItem("connection") === "false") {

        fetch(testConnectionEndpoint)
            .then(() => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch(() => {
                localStorage.setItem("connection", "false");
            })
        displaySignUpFailedAlert(`Server down for maintenance. We are apologizing for this inconvenient and we're trying
            out best to solve the problem as soon as possible so you can use ReachMe App again.
            Best regards,
            ReachMe development team`);
        return false;
    }
    return response;
}

export const accountWithSameCredentialsAlreadyExists = () => {
    fetch(`http://localhost:8080/account/username=${signUpCredentials.username}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.userName === null) {
                console.log("Account is new");
                return false;
            }
            if (data.userName === signUpCredentials.username) {
                throw new Error();
            }
        })
        .catch((err) => {
            console.log("ERROR CATCHED" + err);
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