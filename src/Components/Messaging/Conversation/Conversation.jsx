import '../../../Styles/Messaging/Conversation/Conversation.scss';
import ConversationHeader from "../Header/ConversationHeader";
import ConversationContent from "./ConversationContent";
import {useContext, useEffect} from "react";
import {OpenContext} from "../../../Context/OpenContext";
import {Slide} from "@mui/material";


export default function Conversation() {

    const {conversationOpened, setConversationOpened} = useContext(OpenContext);
    //const conversationWrapper = document.querySelector('.ConversationWrapper');
    const closeConversation = () => {
        document.querySelector('.searchNameDetails').style.width = `${100}%`;
        setConversationOpened(false);
    }

    useEffect(() => {
        //increaseTheOpacity(conversationWrapper, 5);
    }, []);

    return (
        <Slide direction="down" in={conversationOpened} mountOnEnter unmountOnExit>
            {
                <div className="ConversationWrapper">
                    <ConversationHeader closeConversation={closeConversation}/>
                    <ConversationContent/>
                </div>
            }
        </Slide>
    )
}