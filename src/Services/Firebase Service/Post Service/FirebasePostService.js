import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../../Feed Services/FeedDrawerService";

export const setFirebasePostReactionsCollection = async (postId) => {
    await updateDoc(
        doc(firebaseFirestore, "postReactions", loggedInAccount.userFirebaseIdentifier),
        {
            [postId + ".notificationDetails"]: arrayUnion({
                likes: [],
                dislikes: [],
                comments: [],
            }),
        }
    );
};

/*
export const setLikeReactionGlobal = async (postId, postOwner) => {

    const currentReactions = await getDoc(doc(firebaseFirestore, "postReactions", postOwner));
    let likeReactions = (currentReactions.data()[postId].notificationDetails.likes);
    let dislikeReactions = (currentReactions.data()[postId].notificationDetails.dislikes);
    let commentReactions = (currentReactions.data()[postId].notificationDetails.comments);

    if (likeReactions !== undefined) {
        if (likeReactions.includes(loggedInAccount.userRealName)) {
            const temp = [];
            likeReactions.forEach(elem=>{
                if(elem !== loggedInAccount.userRealName){
                    temp.push(elem);
                }
            });
            likeReactions = temp;
        } else {
            likeReactions.push(loggedInAccount.userRealName);
        }
    }
    else{
        likeReactions = [loggedInAccount.userRealName];
    }

    await updateDoc(doc(firebaseFirestore, "postReactions", postOwner),
        {
            [postId + ".notificationDetails"]: {
                likes :likeReactions,
                dislikes : dislikeReactions === undefined? [] : dislikeReactions,
                comments: commentReactions === undefined? [] : commentReactions,
            }
        });
}*/
