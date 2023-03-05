import '../../../Styles/Messaging/Form/ConversationForm.scss';
import IconButton from "@mui/joy/IconButton";
import {AttachFile, MoreHorizOutlined, Send} from "@mui/icons-material";
import {useContext} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import {sendTextMessage} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {resetMessageInputValues} from "../../../Modules/Messaging/MessagingModule";

export default function ConversationForm() {

    const {data} = useContext(ConversationContext);
    let textToSend = "";
    let imageToSend = "";

    const handleTextChange = (e) => {
        textToSend = e.target.value;
    }

    const handleMessageSend = async () => {
        await sendTextMessage(textToSend, data.conversationIdentifier, data.user.userFirebaseIdentifier);
        resetMessageInputValues();
    }

    return (
        <div className="ConversationFormWrapper">
            <textarea className="MessageInput"
                      placeholder="Message..."
                      onChange={handleTextChange}/>
            <IconButton title="Send message"
                        className="MessageSenderIconButton"
                        onClick={handleMessageSend}>
                <Send className="SendIcon"/>
            </IconButton>
            <IconButton title="Attach file"
                        className="MessageSenderIconButton">
                <AttachFile className="AttachIcon"/>
            </IconButton>
            <IconButton title="More"
                        className="MessageSenderIconButton">
                <MoreHorizOutlined className="MoreOptionsIcon"/>
            </IconButton>
        </div>
    )
}