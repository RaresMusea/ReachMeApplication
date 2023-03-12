import {createContext, useState} from "react";

export const OpenContext = createContext(undefined);

export const OpenContextProvider = ({children}) => {
    const [conversationOpened, setConversationOpened] = useState(false);
    const [target, setTarget] = useState("");

    return (
        <OpenContext.Provider value={{conversationOpened, setConversationOpened, setTarget, target}}>
            {children}
        </OpenContext.Provider>
    );

};
