import '../../../Styles/Messaging/Messages/Message.scss';
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {useContext, useState} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import useScroll from "../../../Hooks/useScroll";
import {fromStringBase64EncodedAudioToLocalUrl} from "../../../Modules/Messaging/Voice Recoder/VoiceRecorder";

export default function Message(props) {
    const [showDate, setShowDate] = useState(false);
    const {data} = useContext(ConversationContext);
    const scrollRef = useScroll(props.message)
    const messageStatus = props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier ? `LoggedUsersMessage` : ``;
    const messageType = props.message.messageType;
    const profileImageSrc = props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier
        ? loggedInAccount.profilePhotoHref
        : data.user.profilePhotoHref;


    const displayDateAndTimeOfTheMessage = () => {
        setShowDate(!showDate)
    }

    return (
        <div className={`Message ${messageStatus}`}
             ref={scrollRef}
        >
            <div className="MessageDetails">
                <Avatar src={profileImageSrc}
                        className="ConversationProfilePic"
                        onClick={displayDateAndTimeOfTheMessage}/>
                {showDate &&
                    <span className="SendReceivedDate">{parseDateAndTime(props.message?.date.toDate())}</span>
                }
            </div>
            <div className="MessageContent">
                {messageType === "text" &&
                    <p>{props.message.content}</p>
                }
                {
                    messageType === "voice recording" &&
                    <audio controls className={`Message ${messageStatus}`}>
                        <source src={fromStringBase64EncodedAudioToLocalUrl(props.message.additionalHref)}/>
                    </audio>
                }
            </div>
        </div>
    );
}