const userWasPreviouslyLoggedIn = () => {
    return localStorage.getItem('currentlyLoggedInAccount') === undefined || localStorage.getItem('currentlyLoggedInAccount') === null;
}

export default userWasPreviouslyLoggedIn;