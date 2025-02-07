import * as React from "react";
import {useContext, useRef} from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import "../../Styles/Messaging/MessagingFrame.scss";
import {defaultMessagingIcon} from "../../Modules/Object/ComponentProps";
import MessagingFrameSideBar from "./Sidebar/MessagingFrameSideBar";
import Conversation from "./Conversation/Conversation";
import {OpenContext} from "../../Context/OpenContext";

export const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessagingFrame() {
    const {conversationOpened, setConversationOpened, closeMessaging, messagingOpened, setMessagingOpened} =
        useContext(OpenContext);
    const sideBarRef = useRef(null);
    const effectRan = useRef(false);
    /*  useEffect(() => {
      if (open) {
        document.title = `ReachMe Messaging`;
      } else {
        document.title = `ReachMe - Feed`;
      }
    }, [open]);*/

    const handleClickOpen = () => {
        setMessagingOpened(true);
        localStorage.setItem("lastMessagesComponentOpening", Date.now());
    };

    const handleClose = () => {
        if (!closeMessaging) {
            return;
        }
        //props.resetPageTitleToFeedState();
        setConversationOpened(false);
        setMessagingOpened(false);
    };

    return (
        <div>
            <img
                src={defaultMessagingIcon}
                className="Icon"
                style={{marginRight: "1em"}}
                id="SearchIcon3"
                onClick={handleClickOpen}
                alt="Search Button Icon"
                title="Messages"
            />
            <Dialog
                fullScreen
                open={messagingOpened}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <div className="ReachMeMessagingWrapper">
                    <MessagingFrameSideBar ref={sideBarRef} close={handleClose}/>
                    {conversationOpened && <Conversation/>}
                </div>
            </Dialog>
        </div>
    );
}
