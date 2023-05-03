import {createContext, useContext, useState} from "react";
import {
    clearMessageNotificationsForLoggedUser,
    conversationAlreadyExists,
    createConversationBetween
} from "../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {ConversationContext} from "./ConversationContext";
import {loggedInAccount} from "../Services/Feed Services/FeedDrawerService";
import {displayUserSearcherInfoAlert} from "../Modules/Messaging/MessagingModule";
import {StateManagementContext} from "./StateManagementContext";

export const OpenContext = createContext(undefined);

export const OpenContextProvider = ({children}) => {
    const [messagingOpened, setMessagingOpened] = useState(false);
    const [targetUser, setTargetUser] = useState({});
    const [conversationOpened, setConversationOpened] = useState(false);
    const [target, setTarget] = useState("");
    const [closeMessaging, setCloseMessaging] = useState(true);
    const {dispatch, data} = useContext(ConversationContext);
    const {setConversationEmpty} = useContext(StateManagementContext);

    const handleConversationOpen = async (target) => {
        if (conversationOpened) {
            setConversationOpened(false);
        }
        dispatch({type: "CHANGE_USER", payload: target});
        localStorage.setItem(
            "currentOngoingConversation",
            data.conversationIdentifier
        );
        /*document.querySelector(".searchNameDetails").style.width = `${70}%`;*/
        setTarget(target.userRealName);
        await clearMessageNotificationsForLoggedUser(data.conversationIdentifier);
        setConversationOpened(true);
        setConversationEmpty(false);
    };

    const handleUserSelection = async (targetUser) => {
        await createConversationBetween(loggedInAccount, targetUser);
        if (conversationAlreadyExists) {
            displayUserSearcherInfoAlert(`The conversation between you and ${targetUser.userRealName} already exists. 
            You are being redirected to that conversation.`);
            setConversationOpened(true);
            dispatch({ type: "CHANGE_USER", payload: targetUser });
        }
        setConversationEmpty(true);
    };

    return (
        <OpenContext.Provider
            value={{
                messagingOpened,
                targetUser,
                setTargetUser,
                setMessagingOpened,
                conversationOpened,
                setConversationOpened,
                setTarget,
                target,
                closeMessaging,
                setCloseMessaging,
                handleConversationOpen,
                handleUserSelection
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
