import "../../../Styles/Navbar/Notifications/Notification.scss";
import {useContext, useEffect, useRef, useState} from "react";
import {
    clearMessageNotificationsForLoggedUser
} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {OpenContext} from "../../../Context/OpenContext";
import {Avatar} from "@mui/joy";


export default function Notification(props) {
    const dynamicNoun = props.content.numberOfUnreadMessages === 1 ? "message" : "messages";
    const [target, setTarget] = useState({});
    const {setMessagingOpened, handleConversationOpen} = useContext(OpenContext);
    const fadeRef = useRef(null);


    useEffect(() => {
        fetch(`http://localhost:8080/account/${props.content.senderId}`)
            .then(response => response.json())
            .then(data => setTarget(data))
            .catch(console.error);
    }, []);

    const dismissNotification = async () => {
        await clearMessageNotificationsForLoggedUser(props.content.conversationId);
    }

    const handleConversationNavigation = async () => {
        setMessagingOpened(true);
        localStorage.setItem("lastMessagesComponentOpening", Date.now());
        await handleConversationOpen(target);
        props.handleClose();
    }

    return (
        <div className="Notification"
             ref={fadeRef}>
            <div className="LeftNotificationFlex">
                <Avatar src={target.profilePhotoHref}
                     className="NotificationImage"/>
                <p className="NotificationText">You
                    have {props.content.numberOfUnreadMessages} unread {dynamicNoun} from {props.content.sender}.</p>
            </div>
            <div className="RightNotificationFlex">
                <button className={"GoToButton"}
                        onClick={handleConversationNavigation}>
                    Go to conversation
                </button>
                <button className={"DismissButton"}
                        onClick={dismissNotification}>
                    Dismiss
                </button>
            </div>
        </div>
    )
}