import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useContext, useEffect, useState} from "react";
import {fadeInChats} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const {dispatch} = useContext(ConversationContext);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(firebaseFirestore, "userConversations", loggedInAccount.userFirebaseIdentifier),
            (doc) => {
                console.log(doc.data());
                setChats(doc.data());
            });

        return () => {
            unsubscribe();
        }
    }, [loggedInAccount.userFirebaseIdentifier]);

    useEffect(() => {
        fadeInChats();
    }, []);

    const handleConversationOpen = (targetUser) => {
        dispatch({type: "CHANGE_USER", payload: targetUser});
    }

    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            {Object.entries(chats)?.map((conv) => (
                <div className="ConversationDetailsFlexWrapper"
                     key={conv[0]}
                     onClick={() => handleConversationOpen(chat[1].userDetails)}>
                    <div className="UserChats">
                        <Avatar src={conv[1].userDetails.profilePhotoHref}
                                className="UserProfilePic"/>
                        <div className="SearchResultNames">
                            <div
                                className="searchUsernameDetails First">{`${conv[1].userDetails.userRealName}
                             (${conv[1].userDetails.userName})`}</div>
                            <div
                                className="searchNameDetails">{conv[1].lastMessage?.text}</div>
                        </div>
                    </div>
                    <div className="MessageDate">{parseDateAndTime(conv[1].date.toDate())}</div>
                </div>
            ))
            }
        </div>
    );
}