import { doc, onSnapshot } from "firebase/firestore";
import { firebaseFirestore } from "../Modules/Firebase/FirebaseIntegration";
import { loggedInAccount } from "../Services/Feed Services/FeedDrawerService";
import notificationSound from "../Media/Sound/notification.mp3";
import { useEffect, useState } from "react";
import { compareDates } from "../Modules/Date/DatePipeModule";
import { toast } from "react-toastify";
import MessageNotificationToast from "../Components/Toast/MessageNotificationToast";

export default function useMessageNotifications() {
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  let currentMessagesCount;
  let previousMessagesCount = 0;
  let validatedNotifications = [];

  useEffect(() => {
    const getNotifications = () => {
      const unsubscribe = onSnapshot(
        doc(
          firebaseFirestore,
          "messagesNotifications",
          loggedInAccount.userFirebaseIdentifier
        ),
        (doc) => {
          const res = Object.entries(doc.data());
          validatedNotifications = validateNotifications(res);
          setMessageNotifications(validatedNotifications);
          setTimeout(() => {}, 200);
          res.forEach((notification) => {
            if (notification) {
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
              }
            }
          });
          currentMessagesCount = getNewMessagesCount(validatedNotifications);
          if (previousMessagesCount !== currentMessagesCount) {
            previousMessagesCount = newMessagesCount;
            setNewMessagesCount(currentMessagesCount);
          }
        }
      );

      return () => {
        unsubscribe();
      };
    };
    loggedInAccount.userFirebaseIdentifier && getNotifications();
  }, []);

  const notify = (component) =>
    toast(component, {
      className: "ReachMeToast",
      theme: "success",
    });

  const getNewMessagesCount = () => {
    let newMessages = 0;
    for (let notifications in validatedNotifications) {
      newMessages += notifications.length;
    }
    return newMessages;
  };

  useEffect(() => {
    if (messageNotifications.length !== 0) {
      renderNotifications();
    }
  }, [messageNotifications]);

  const renderNotifications = () => {
    const lastNotification =
      messageNotifications[messageNotifications.length - 1];
    notify(
      <MessageNotificationToast
        profilePic={loggedInAccount.profilePhotoHref}
        sender={lastNotification[messageNotifications.length - 1].senderName}
        senderId={lastNotification[messageNotifications.length - 1].senderId}
      />
    );
  };

  const validateNotifications = (notificationsArray) => {
    if (notificationsArray.length === 0) {
      return [];
    }

    const result = [];
    for (let notification of notificationsArray) {
      if (notification[0] === "null") {
        continue;
      }

      if (notification[1]["notificationDetails"].length !== 0) {
        for (
          let i = 0;
          i < notification[1]["notificationDetails"].length;
          i++
        ) {
          notification[1]["notificationDetails"][i].convId = notification[0];
        }

        result.push(notification[1]["notificationDetails"]);
      }
    }
    return result;
  };
  return { messageNotifications, newMessagesCount };
}
