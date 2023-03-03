import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import IconButton from "@mui/joy/IconButton";
import {Call, MoreVert, VideoCall} from "@mui/icons-material";

export default function ConversationHeader() {
    return (
        <div className="ConversationHeader">
            <div className="UserDetails">
                <Avatar src={loggedInAccount.profilePhotoHref}
                        title={`${loggedInAccount.userRealName}'s profile picture`}
                        className="ConversationAvatar"/>
                <span>{loggedInAccount.userName}</span>
            </div>
            <div className="ConversationHeaderIcons">
                <IconButton
                    className="ConversationHeaderIconButton"
                    title={`Reach Out ${loggedInAccount.userRealName} via voice call`}>
                    <Call className="Icon"/>
                </IconButton>
                <IconButton
                    className="ConversationHeaderIconButton"
                    title={`Reach Out ${loggedInAccount.userRealName} via video call`}>
                    <VideoCall className="Icon"/>
                </IconButton>
                <IconButton
                    className="ConversationHeaderIconButton"
                    title={"More conversation options"}>
                    <MoreVert className="Icon"/>
                </IconButton>
            </div>
        </div>
    );
}