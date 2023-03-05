import {createContext, useState} from "react";

export const OpenContext = createContext(undefined);

export const OpenContextProvider = ({children}) => {
    const [conversationOpened, setConversationOpened] = useState(false);

    return (
        <OpenContext.Provider value={{conversationOpened, setConversationOpened}}>
            {children}
        </OpenContext.Provider>
    );

};
