import {createContext, useEffect, useState} from "react";
import {onAuthStateChanged} from 'firebase/auth';
import {authentication} from "../Modules/Firebase/FirebaseIntegration";

export const UserContext = createContext(undefined);

export const UserContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect = (() => {
        const subscribe = onAuthStateChanged(authentication, (user) => {
            setCurrentUser(user);
        });
        return () => {
            subscribe();
        }

    }, []);

    return (
        <UserContext.Provider value={{currentUser}}>
            {children}
        </UserContext.Provider>
    );
};
