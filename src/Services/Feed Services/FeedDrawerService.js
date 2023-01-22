export let currentLoggedInUser = {};

const getCurrentUserInfo = (identifier) => {
    fetch(`http://localhost:8080/account/${identifier}`)
        .then(response => response.json())
        .then(data => {
            currentLoggedInUser = data;
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getRequiredMetadata = (identifier) => {
    getCurrentUserInfo(identifier);
}
