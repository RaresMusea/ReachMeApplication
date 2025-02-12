import {Avatar} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {ArrowBackIos, Call, MoreVert, VideoCall} from "@mui/icons-material";
import {useContext} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";

export default function ConversationHeader(props) {

    const {data} = useContext(ConversationContext);

    return (
        <div className="ConversationHeader">
            <div className="UserDetails">
                <IconButton title="Back to conversations list"
                            onClick={props.closeConversation}>
                    <ArrowBackIos className="IconButtonBack"/>
                </IconButton>
                <Avatar src={data.user?.profilePhotoHref}
                        title={`${data.user?.userRealName}'s profile picture`}
                        className="ConversationAvatar"/>
                <span>{data.user?.userName}</span>
            </div>
            <div className="ConversationHeaderIcons">
                <IconButton
                    className="ConversationHeaderIconButton"
                    title={`Reach Out ${data.user?.userRealName} via voice call`}>
                    <Call className="Icon"/>
                </IconButton>
                <IconButton
                    className="ConversationHeaderIconButton"
                    title={`Reach Out ${data.user?.userRealName} via video call`}>
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