import {createContext, useState} from "react";

export const ResourceSharingContext = createContext(undefined);

export const ResourceSharingContextProvider = ({children}) => {
    const [isSharable, setIsSharable] = useState(false);

    return (
        <ResourceSharingContext.Provider value={{isSharable, setIsSharable}}>
            {children}
        </ResourceSharingContext.Provider>
    );

};