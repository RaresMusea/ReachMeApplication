import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useEffect, useState} from "react";
import {fadeInChats} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const date = new Date(2023, 1, 2, 16, 45);

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
    }, [])

    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            {Object.entries(chats)?.map((conv) => (
                <div className="ConversationDetailsFlexWrapper" key={conv[0]}>
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
                    <div className="MessageDate">{parseDateAndTime(date)}</div>
                </div>
            ))
            }
        </div>
    );
}