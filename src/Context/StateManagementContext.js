import {createContext, useState} from "react";

export const StateManagementContext = createContext();

export const StateManagementContextProvider = ({children}) => {
    const [joinedUserUpdate, setJoinedUserUpdate] = useState(false);

    return (
        <StateManagementContext.Provider value={{joinedUserUpdate, setJoinedUserUpdate}}>
            {children}
        </StateManagementContext.Provider>
    );

};