import '../../../Styles/Messaging/Messages/Message.scss';
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {useContext, useEffect, useRef, useState} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";

export default function Message(props) {
    const [showDate, setShowDate] = useState(false);
    const {data} = useContext(ConversationContext);

    const messageType = props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier ? `LoggedUsersMessage` : ``;
    const profileImageSrc = props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier
        ? loggedInAccount.profilePhotoHref
        : data.user.profilePhotoHref;

    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [props.message]);

    const displayDateAndTimeOfTheMessage = () => {
        setShowDate(!showDate)
    }

    return (
        <div className={`Message ${messageType}`}
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
                <p>{props.message.content}</p>
                {/*<img src={hardCodedImage} alt="Sent Or Received Image"/>*/}{/*<img src={hardCodedImage} alt="Sent Or Received Image"/>*/}
            </div>
        </div>
    )
}