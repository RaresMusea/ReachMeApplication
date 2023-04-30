import {createContext, useState} from "react";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [messageNotifications, setMessageNotifications] = useState([]);

  const updateNotificationsList = (conversationIdentifier) => {
    const result = [];
    messageNotifications.forEach((notification) => {
      if (!notification.conversationId.includes(conversationIdentifier)) {
        result.push(notification);
      }
    });

    setMessageNotifications(result);
  };

  return (
    <NotificationContext.Provider
      value={{
        messageNotifications,
        setMessageNotifications,
        updateNotificationsList,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
