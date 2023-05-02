import {createContext, useState} from "react";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({children}) => {
    const [messageNotifications, setMessageNotifications] = useState([]);
    let previousState = [];

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
                previousState,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
