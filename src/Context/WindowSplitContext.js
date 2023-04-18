import {createContext, useState} from "react";

export const WindowSplitContext = createContext(undefined);

export const WindowSplitContextProvider = ({children}) => {
    const [split, setSplit] = useState(false);

    return (
        <WindowSplitContext.Provider value={{split, setSplit}}>
            {children}
        </WindowSplitContext.Provider>
    );
};
