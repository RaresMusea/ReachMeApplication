const userSearchEndpoint = `http://localhost:8080/account/searchUser/q=`;
export let foundUsers = [];

export const searchForUsersByIdentity = async (searchQuery) => {
    if (searchQuery === "") {
        return;
    }

    fetch(userSearchEndpoint + searchQuery)
        .then(response => response.json())
        .then(data => {
            foundUsers = data;
            console.log(foundUsers);
        })
        .catch(error => {
            console.log(error);
        });
}