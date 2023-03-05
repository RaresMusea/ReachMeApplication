import '../../../Styles/Messaging/Conversation/Conversation.scss';
import ConversationHeader from "../Header/ConversationHeader";
import ConversationContent from "./ConversationContent";
import {useContext, useEffect} from "react";
import {OpenContext} from "../../../Context/OpenContext";
import {Slide} from "@mui/material";
import {increaseTheOpacity} from "../../../Modules/Animation Control/Opacity";


export default function Conversation() {

    const {conversationOpened} = useContext(OpenContext);

    useEffect(() => {
        const conversationWrapper = document.querySelector('.ConversationWrapper');
        increaseTheOpacity(conversationWrapper, 5);
    }, []);

    return (
        <Slide direction="down" in={conversationOpened} mountOnEnter unmountOnExit>
            {
                <div className="ConversationWrapper">
                    <ConversationHeader/>
                    <ConversationContent/>
                </div>
            }
        </Slide>
    )
}