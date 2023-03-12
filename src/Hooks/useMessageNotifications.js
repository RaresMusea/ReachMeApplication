import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../Modules/Firebase/FirebaseIntegration";
import {loggedInAccount} from "../Services/Feed Services/FeedDrawerService";
import notificationSound from "../Media/Sound/notification.mp3";
import {useEffect, useState} from "react";

export default function useMessageNotifications() {
    const [messageNotifications, setMessageNotifications] = useState([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    useEffect(() => {
        const getNotifications = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "messagesNotifications", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    setMessageNotifications(Object.entries(doc.data()));
                    const res = Object.entries(doc.data());
                    res.forEach(notification => {
                        if (notification[1]['notificationDetails'].length !== 0) {
                            new Audio(notificationSound).play().then(() => {
                            });

                            const count = getNewMessagesCount();
                            setNewMessagesCount(count);
                        }
                    })


                });

            return () => {
                unsubscribe();
            };
        }
        loggedInAccount.userFirebaseIdentifier && getNotifications();
    }, []);

    const getNewMessagesCount = () => {
        let newMessages = 0;
        messageNotifications.forEach(messageNotification => {
            if (messageNotification[0].contains(loggedInAccount.userFirebaseIdentifier) &&
                messageNotification[1]['notificationDetails'].length > 0) {
                newMessages += messageNotification[1]['notificationDetails'].length;
            }

        });
        return newMessages;
    }


    return {messageNotifications, newMessagesCount};
}