import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import {defaultProfilePic} from "../../../../Modules/Exporters/ImageExporter";
import IconButton from "@mui/joy/IconButton";
import {MessageRounded} from "@mui/icons-material";
import {conversationExists} from "../../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import {useContext, useEffect, useState} from "react";
import {OpenContext} from "../../../../Context/OpenContext";

export default function NewUser(props) {
    const {handleUserSelection, handleConversationOpen, setMessagingOpened} = useContext(OpenContext);
    const [currentTarget, setCurrentTarget] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:8080/account/${props.newUser.lastUserId}`)
            .then(response => response.json())
            .then(data => {
                setCurrentTarget(data);
            })
            .catch(() => console.error);
    },[])

    const openConversation = async () => {
        const exists = await conversationExists(loggedInAccount.userFirebaseIdentifier,
            props.newUser.lastUserId);

        if (!exists) {
            await handleUserSelection(currentTarget);
        }

        setMessagingOpened(true);
        localStorage.setItem("lastMessagesComponentOpening", Date.now());
        await handleConversationOpen(currentTarget);
    }

    return (
        <div className="NewUser">
            <div className="NewUserLeftSide">
                <Avatar
                    src={props.newUser.lastUserPhoto === undefined ? defaultProfilePic : props.newUser.lastUserPhoto}/>
                <div className="NameDetailsColumn">
                    <p className="UserRealName">{props.newUser.usersList}</p>
                    <p>{props.newUser.latestRegistration}</p>
                    <p>{`Joined ${parseDateAndTime(new Date(props.newUser.lastLogTimeStamp))}`}</p>
                </div>
            </div>
            <div className="NewUserRightSide">
                {
                    props.newUser.lastUserId !== loggedInAccount.userFirebaseIdentifier &&
                    <IconButton
                        onClick={openConversation}
                        className="SendMessageButton"
                        title={`Message ${props.newUser.usersList}`}>
                        <span>Message</span>
                        <MessageRounded className="MessageRoundedButton"/>
                    </IconButton>
                }
            </div>
        </div>
    );
}