import {createContext, useContext, useState} from "react";
import {clearMessageNotificationsForLoggedUser} from "../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {ConversationContext} from "./ConversationContext";

export const OpenContext = createContext(undefined);

export const OpenContextProvider = ({children}) => {
    const [messagingOpened, setMessagingOpened] = useState(false);
    const [targetUser, setTargetUser] = useState({});
    const [conversationOpened, setConversationOpened] = useState(false);
    const [target, setTarget] = useState("");
    const [closeMessaging, setCloseMessaging] = useState(true);
    const {dispatch, data} = useContext(ConversationContext);

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
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
