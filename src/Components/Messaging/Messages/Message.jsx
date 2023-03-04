import '../../../Styles/Messaging/Messages/Message.scss';
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {useState} from "react";
import hardCodedImage from '../../../Media/Images/logoPic.jpg';

export default function Message(props) {
    const [showDate, setShowDate] = useState(false);
    const messageType = props.loggedUserIsSender ? `LoggedUsersMessage` : ``;
    const displayDateAndTimeOfTheMessage = () => {
        setShowDate(!showDate)
    }

    return (
        <div className={`Message ${messageType}`}>
            <div className="MessageDetails">
                <Avatar src={loggedInAccount.profilePhotoHref}
                        className="ConversationProfilePic"
                        onClick={displayDateAndTimeOfTheMessage}/>
                {showDate ?
                    <span className="SendReceivedDate">{parseDateAndTime(new Date())}</span>
                    : null
                }
            </div>
            <div className="MessageContent">
                <p>Hello!</p>
                <img src={hardCodedImage} alt="Sent Or Received Image"/>
            </div>
        </div>
    )
}