import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useContext, useEffect, useState} from "react";
import {determineChatLastMessage, fadeInChats, getConversationId} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";
import {OpenContext} from "../../../Context/OpenContext";
import {v4 as uuid} from "uuid";
import {
    clearMessageNotificationsForLoggedUser
} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import useMessageNotifications from "../../../Hooks/useMessageNotifications";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const {messageNotifications} = useMessageNotifications();
    const {dispatch} = useContext(ConversationContext);
    const {conversationOpened, setConversationOpened, setTarget} = useContext(OpenContext);
    const [targetUser, setTargetUser] = useState({});

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "userConversations", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    const chatData = Object.entries(doc.data()).sort((a, b) => b[1].date - a[1].date);
                    setTimeout(() => {
                        setChats(chatData)
                    }, 200);
                });

            return () => {
                unsubscribe();
            };
        }

        loggedInAccount.userFirebaseIdentifier && getChats()
    }, []);

    useEffect(() => {
        fadeInChats();
    }, []);

    const handleConversationOpen = async (target) => {
        document.querySelector('.searchNameDetails').style.width = `${70}%`;
        setTarget(target.userRealName);
        setConversationOpened(true);
        dispatch({type: "CHANGE_USER", payload: target});
        const convId = getConversationId(loggedInAccount, target);
        await clearMessageNotificationsForLoggedUser(convId);
    }

    useEffect(() => {
        if (conversationOpened) {
            (async () => {
                await clearMessageNotificationsForLoggedUser(getConversationId(loggedInAccount, targetUser));
            })();
        }

    }, [targetUser, conversationOpened]);


    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            {
                chats.map((conv) => (
                    <div className="ConversationDetailsFlexWrapper"
                         key={uuid()}
                         onClick={async () => {
                             setTargetUser(conv[1].userDetails);
                             await handleConversationOpen(conv[1].userDetails)
                         }}>
                        <div className="UserChats">
                            <Avatar
                                src={conv[1].userDetails.profilePhotoHref}
                                className="UserProfilePic"/>
                            <div className="SearchResultNames">
                                <div
                                    className="searchUsernameDetails First">{`${conv[1].userDetails.userRealName}
                             (${conv[1].userDetails.userName})`}</div>
                                <div
                                    className="searchNameDetails">
                                    {
                                        determineChatLastMessage(conv[1])
                                    }

                                </div>
                            </div>
                        </div>
                        <div
                            className="MessageDate">{conv[1].date ? parseDateAndTime(conv[1].date.toDate()) : ``}
                            {/*{notifications[0][0]===conv[1]?.lastMessageInConversation?.conversationIdentifier && notifications[0][1]?.notificationDetails.length!==0 &&
                                        <div className="Notification">
                                            {notifications[0][1]?.notificationDetails.length}
                                        </div>
                                    }*/}
                            {
                                messageNotifications.map(notification => (
                                    notification[0] === conv[1]?.lastMessageInConversation?.conversationIdentifier
                                    && notification[1]['notificationDetails'].length !== 0 &&
                                    <div
                                        className="Notification">{notification[1]['notificationDetails'].length}</div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}