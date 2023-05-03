import {createContext, useState} from "react";

export const StateManagementContext = createContext();

export const StateManagementContextProvider = ({children}) => {
    const [joinedUserUpdate, setJoinedUserUpdate] = useState(false);
    const [conversationEmpty, setConversationEmpty] = useState(true);

    return (
        <StateManagementContext.Provider
            value={{joinedUserUpdate, setJoinedUserUpdate, conversationEmpty, setConversationEmpty}}>
            {children}
        </StateManagementContext.Provider>
    );

};