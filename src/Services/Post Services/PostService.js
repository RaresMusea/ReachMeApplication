import {generateUuid} from "../../Modules/Common Functionality/CommonFunctionality";
import {loggedInAccount} from "../Feed Services/FeedDrawerService";

export const configureCommentAddingPayload = (commentContent, postId) => {
    const payloadBody = {
        commentIdentifier: generateUuid(),
        timestamp: Date.now(),
        content: commentContent,
        accountIdentifier: loggedInAccount.userFirebaseIdentifier,
        postIdentifier: postId,
        commentAuthor: loggedInAccount.userName,
    };

    return {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadBody),
    };
}