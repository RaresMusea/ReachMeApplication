import {createContext, useReducer} from "react";
import {loggedInAccount} from "../Services/Feed Services/FeedDrawerService";

export const ConversationContext = createContext();

export const ConversationContextProvider = ({children}) => {
    const initialState = {
        conversationIdentifier: "null",
        user: {}
    };

    const conversationReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER": {
                return {
                    user: action.payload,
                    conversationIdentifier: loggedInAccount.userFirebaseIdentifier > action.payload.userFirebaseIdentifier
                        ? loggedInAccount.userFirebaseIdentifier + `-` + action.payload.userFirebaseIdentifier
                        : action.payload.userFirebaseIdentifier + `-` + loggedInAccount.userFirebaseIdentifier,
                };
            }
            default: {
                return state;
            }
        }
    };

    const [state, dispatch] = useReducer(conversationReducer, initialState);
    return (
        <ConversationContext.Provider value={{data: state, dispatch}}>
            {children}
        </ConversationContext.Provider>
    )
}