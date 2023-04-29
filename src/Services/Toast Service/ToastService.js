export let toastProfilePicture;
const retrievalEndpoint = `http://localhost:8080/account/`;

export const getUserPhoto = async (userId) => {
  fetch(retrievalEndpoint + userId)
    .then((response) => response.json())
    .then((data) => (toastProfilePicture = data.profilePhotoHref))
    .catch((err) => console.log(err));
};
