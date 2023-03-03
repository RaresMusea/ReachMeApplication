import '../../../Styles/Messaging/Conversation/Conversation.scss';
import ConversationHeader from "../Header/ConversationHeader";
import ConversationContent from "./ConversationContent";

export default function Conversation() {
    return (
        <div className="ConversationWrapper">
            <ConversationHeader/>
            <ConversationContent/>
        </div>
    )
}