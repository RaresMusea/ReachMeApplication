import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useEffect} from "react";
import {fadeInChats} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {defaultProfilePic} from "../../../Modules/Exporters/ImageExporter";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDate} from "../../../Modules/Date/DatePipeModule";

export default function Chats() {
    const date = new Date(2023, 2, 1, 16, 45);
    useEffect(() => {
        fadeInChats();
        console.log(date);
    }, [])

    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            <div className="ConversationDetailsFlexWrapper">
                <div className="UserChats">
                    <Avatar src={defaultProfilePic}
                            className="UserProfilePic"/>
                    <div className="SearchResultNames">
                        <div
                            className="searchUsernameDetails First">{`${loggedInAccount.userRealName} (${loggedInAccount.userName})`}</div>
                        <div
                            className="searchNameDetails">{"This is a very important message so we need to talk as soon as possible"}</div>
                    </div>
                </div>
                <div className="MessageDate">{parseDate(date)}</div>
            </div>
        </div>
    );
}