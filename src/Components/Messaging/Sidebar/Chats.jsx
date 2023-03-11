import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useContext, useEffect, useState} from "react";
import {fadeInChats, getConversationId} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";
import {OpenContext} from "../../../Context/OpenContext";
import notificationSound from '../../../Media/Sound/notification.mp3';
import {v4 as uuid} from "uuid";
import {
    clearMessageNotificationsForLoggedUser
} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const {dispatch} = useContext(ConversationContext);
    const {conversationOpened, setConversationOpened} = useContext(OpenContext);
    const [contextMenu, setContextMenu] = useState(null);
    const [targetUser, setTargetUser] = useState({});

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "userConversations", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    setChats(doc.data());
                });

            return () => {
                unsubscribe();
            };
        }

        const getNotifications = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "messagesNotifications", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    setNotifications(Object.entries(doc.data()));
                    const res = Object.entries(doc.data());
                    res.forEach(notification => {
                        if (notification[1]['notificationDetails'].length !== 0) {
                            new Audio(notificationSound).play().then(() => {
                            });
                        }
                    })
                });

            return () => {
                unsubscribe();
            };
        }
        loggedInAccount.userFirebaseIdentifier && getChats() && getNotifications();
    }, [loggedInAccount.userFirebaseIdentifier]);

    useEffect(() => {
        fadeInChats();
    }, []);

    const handleConversationOpen = async (target) => {
        document.querySelector('.searchNameDetails').style.width = `${70}%`;
        setConversationOpened(true);
        dispatch({type: "CHANGE_USER", payload: target});
        const convId = getConversationId(loggedInAccount, target);
        await clearMessageNotificationsForLoggedUser(convId);
    }

    useEffect(() => {
        if (conversationOpened) {
            (async () => {
                console.log("CLEANUP!");
                await clearMessageNotificationsForLoggedUser(getConversationId(loggedInAccount, targetUser));
            })();
        }

    }, [targetUser, conversationOpened]);


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
                                            conv[1].lastMessageInConversation?.lastMessageType === 'text' ?
                                                (conv[1].senderIdentifier === loggedInAccount.userFirebaseIdentifier
                                                    ? `You: ${conv[1].lastMessageInConversation?.lastMessage}`
                                                    : conv[1].lastMessageInConversation?.lastMessage) :
                                                (conv[1].senderIdentifier === loggedInAccount.userFirebaseIdentifier
                                                    ? `You sent a voice message.`
                                                    : `${conv[1].userDetails?.userRealName} sent you a voice message.`)
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
                                    notifications.map(notification => (
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