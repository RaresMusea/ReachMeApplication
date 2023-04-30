/*
import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseFirestore } from "../Modules/Firebase/FirebaseIntegration";
import { loggedInAccount } from "../Services/Feed Services/FeedDrawerService";
import notificationSound from "../Media/Sound/notification.mp3";

export const NotificationsContext = createContext();

export const NotificationsContextProvider = ({ children }) => {
  const [currentNotification, setCurrentNotification] = useState("");
  const [messageNotifications, setMessageNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const effectRan = useRef(false);
  const notify = () => toast(currentNotification);

  useEffect(() => {
    const getMessagesNotifications = () => {
      const unsubscribe = onSnapshot(
        doc(
          firebaseFirestore,
          "messagesNotifications",
          loggedInAccount.userFirebaseIdentifier
        ),
        (doc) => {
          setMessageNotifications(Object.entries(doc.data()));
          const temp = Object.entries(doc.data());
          temp.forEach((notification) => {
            const len = notification[1]["notificationDetails"].length;
            new Audio(notificationSound).play().then(() => {});

            const count = getNewMessagesCount();
            setNotificationsCount(count);
            buildNotification("Test", "text message");
          });
        }
      );

      return () => {
        unsubscribe();
      };
    };
    loggedInAccount.userFirebaseIdentifier && getMessagesNotifications();
  }, []);

  useEffect(() => {
    if (effectRan.current === false) {
      const displayNotification = () => {
        if (notificationsCount !== 0) {
          notify();
        }
      };

      displayNotification();
      return () => (effectRan.current = true);
    }
  }, [notificationsCount]);

  const buildNotification = (sender, content, contentType) => {
    setCurrentNotification(`${sender} sent you a new ${contentType}.`);
    setNotificationsCount(notificationsCount + 1);

    //const notificationsArrayTemp = notifications;
    //notificationsArrayTemp.push(currentNotification);
    //setNotifications(notificationsArrayTemp);
  };

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

  return (
    <NotificationsContext.Provider value={{}}>
      {children}
    </NotificationsContext.Provider>
  );
};
*/
