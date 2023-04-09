import '../../../Styles/Messaging/Conversation/Conversation.scss';
import ConversationHeader from "../Header/ConversationHeader";
import ConversationContent from "./ConversationContent";
import {useContext} from "react";
import {OpenContext} from "../../../Context/OpenContext";
import {Slide} from "@mui/material";
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";


export default function Conversation() {

    const {conversationOpened, setConversationOpened} = useContext(OpenContext);
    const {setIsSharable, setResource} = useContext(ResourceSharingContext);
    let uploadInput;

    const closeConversation = () => {
        document.querySelector('.searchNameDetails').style.width = `${100}%`;
        setConversationOpened(false);
    }

    const handleDragOver = (e) => {
        uploadInput = document.querySelector('.FileSelect');
        const dropZoneElement = uploadInput.closest(".DropZone");
        uploadInput.disabled = false;
        e.preventDefault();
    }

    const handleFileDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            uploadInput.files = e.dataTransfer.files;
            setResource(URL.createObjectURL(uploadInput.files[0]));
            setIsSharable(true);
            uploadInput.disabled = true;
            uploadInput = null;
        }
    }

    return (
        <Slide direction="down" in={conversationOpened} mountOnEnter unmountOnExit>
            {
                <div className="ConversationWrapper">
                    <label htmlFor="FileSelector"
                           onDragOver={handleDragOver}
                           onDrop={handleFileDrop}
                           className="DropZone">
                        <ConversationHeader closeConversation={closeConversation}/>
                        <ConversationContent/>
                        <input type="file"
                               style={{display: "none"}}
                               disabled={true}
                               id="FileSelector"
                               className="FileSelect"/>
                    </label>
                </div>
            }
        </Slide>
    )
}