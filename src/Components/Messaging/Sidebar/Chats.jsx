import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useContext, useEffect, useState} from "react";
import {fadeInChats} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";
import {OpenContext} from "../../../Context/OpenContext";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const {dispatch} = useContext(ConversationContext);
    const {setConversationOpened} = useContext(OpenContext);

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "userConversations", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    setChats(doc.data());
                    console.log("doc.data()[0]:");
                    console.log(doc.data()[0])
                });

            return () => {
                unsubscribe();
            };
        }
        loggedInAccount.userFirebaseIdentifier && getChats();
    }, [loggedInAccount.userFirebaseIdentifier]);

    useEffect(() => {
        fadeInChats();
    }, []);

    const handleConversationOpen = (targetUser) => {
        setConversationOpened(true);
        dispatch({type: "CHANGE_USER", payload: targetUser});
    }

    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            {
                Object.entries(chats)
                    ?.sort((a, b) =>
                        b[1].date - a[1].date
                    )
                    .map((conv) => (
                        <div className="ConversationDetailsFlexWrapper"
                             key={conv[0]}
                             onClick={() => handleConversationOpen(conv[1].userDetails)}>
                            <div className="UserChats">
                                <Avatar
                                    src={conv[1].userDetails.profilePhotoHref}
                                    className="UserProfilePic"/>
                                <div className="SearchResultNames">
                                    <div
                                        className="searchUsernameDetails First">{`${conv[1].userDetails.userRealName}
                             (${conv[1].userDetails.userName})`}</div>
                                    <div
                                        className="searchNameDetails">{conv[1].lastMessageInConversation?.lastMessage}</div>
                                </div>
                            </div>
                            <div
                                className="MessageDate">{conv[1].date ? parseDateAndTime(conv[1].date.toDate()) : ``}</div>
                        </div>
                    ))
            }
        </div>
    );
}