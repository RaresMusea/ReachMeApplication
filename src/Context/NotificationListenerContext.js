import { createContext, useState } from "react";

export const NotificationListenerContext = createContext();

export const NotificationListenerContextProvider = ({ children }) => {
  const [notificationListenerAvailable, setNotificationListenerAvailability] =
    useState(false);

  const [receiver, setReceiver] = useState("");

  return (
    <NotificationListenerContext.Provider
      value={{
        notificationListenerAvailable,
        setNotificationListenerAvailability,
        receiver,
        setReceiver,
      }}
    >
      {children}
    </NotificationListenerContext.Provider>
  );
};
