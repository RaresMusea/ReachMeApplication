export const userWasLoggedInPreviously=()=>{
    const result= localStorage.getItem("currentlyLoggedInUser");
    return result === undefined || result === null;
}