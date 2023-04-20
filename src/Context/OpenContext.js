import { createContext, useState } from "react";

export const OpenContext = createContext(undefined);

export const OpenContextProvider = ({ children }) => {
  const [conversationOpened, setConversationOpened] = useState(false);
  const [target, setTarget] = useState("");
  const [closeMessaging, setCloseMessaging] = useState(true);

  return (
    <OpenContext.Provider
      value={{
        conversationOpened,
        setConversationOpened,
        setTarget,
        target,
        closeMessaging,
        setCloseMessaging,
      }}
    >
      {children}
    </OpenContext.Provider>
  );
};
