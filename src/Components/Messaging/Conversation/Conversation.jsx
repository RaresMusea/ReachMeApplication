import '../../../Styles/Messaging/Conversation/Conversation.scss';
import ConversationHeader from "../Header/ConversationHeader";
import ConversationContent from "./ConversationContent";
import {useContext} from "react";
import {OpenContext} from "../../../Context/OpenContext";
import {Slide} from "@mui/material";


export default function Conversation() {

    const {conversationOpened} = useContext(OpenContext);


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