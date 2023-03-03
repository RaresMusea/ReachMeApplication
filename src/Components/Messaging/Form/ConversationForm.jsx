import '../../../Styles/Messaging/Form/ConversationForm.scss';
import IconButton from "@mui/joy/IconButton";
import {AttachFile, MoreHorizOutlined, Send} from "@mui/icons-material";

export default function ConversationForm() {
    return (
        <div className="ConversationFormWrapper">
            <textarea className="MessageInput"
                      placeholder="Message..."/>
            <IconButton title="Send message"
                        className="MessageSenderIconButton">
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