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

