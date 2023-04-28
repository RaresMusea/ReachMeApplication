import { doc, onSnapshot } from "firebase/firestore";
import { firebaseFirestore } from "../Modules/Firebase/FirebaseIntegration";
import { loggedInAccount } from "../Services/Feed Services/FeedDrawerService";
import notificationSound from "../Media/Sound/notification.mp3";
import { useEffect, useState } from "react";
import { compareDates } from "../Modules/Date/DatePipeModule";

export default function useMessageNotifications() {
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  useEffect(() => {
    const getNotifications = () => {
      const unsubscribe = onSnapshot(
        doc(
          firebaseFirestore,
          "messagesNotifications",
          loggedInAccount.userFirebaseIdentifier
        ),
        (doc) => {
          setMessageNotifications(Object.entries(doc.data()));
          const res = Object.entries(doc.data());
          res.forEach((notification) => {
            const len = notification[1]["notificationDetails"].length;
            if (len !== 0) {
              const sendingDate =
                notification[1]["notificationDetails"][len - 1].sendingDate;
              if (
                compareDates(
                  localStorage.getItem("lastMessagesComponentOpening"),
                  sendingDate
                ) === -1
              )
                new Audio(notificationSound).play().then(() => {});

              const count = getNewMessagesCount();
              setNewMessagesCount(count);
            }
          });
        }
      );

      return () => {
        unsubscribe();
      };
    };
    loggedInAccount.userFirebaseIdentifier && getNotifications();
  }, []);

  const getNewMessagesCount = () => {
    let newMessages = 0;
    messageNotifications.forEach((messageNotification) => {
      if (
        messageNotification[0].contains(
          loggedInAccount.userFirebaseIdentifier
        ) &&
        messageNotification[1]["notificationDetails"].length > 0
      ) {
        newMessages += messageNotification[1]["notificationDetails"].length;
      }
    });
    return newMessages;
  };

  return { messageNotifications, newMessagesCount };
}
