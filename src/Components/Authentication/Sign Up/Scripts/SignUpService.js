import {signUpCredentials} from "./SignUp";

const postEndpoint = `http://localhost:8080/account`;
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
        })
        .catch(err => {
            console.log(err);
        })
}