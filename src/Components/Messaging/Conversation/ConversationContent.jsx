import Messages from "../Messages/Messages";
import ConversationForm from "../Form/ConversationForm";

export default function ConversationContent() {
    return (
        <div className="ConversationContentWrapper">
            <Messages/>
            <ConversationForm/>
        </div>
    );

}