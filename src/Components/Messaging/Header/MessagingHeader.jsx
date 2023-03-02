import '../../../Styles/Messaging/Header/MessagingHeader.scss';
import {reachMeLogo} from "../../../Modules/Exporters/ImageExporter";
import {ArrowBack, Tune} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {Avatar} from "@mui/joy";
import NewConversation from "../Conversation/NewConversation";

export default function MessagingHeader(props) {
    return (
        <div className="MessagingHeaderWrapper">
            <div className="HeaderLeftSide">
                <img className="MessagingHeaderLogoImage"
                     src={reachMeLogo}
                     alt="ReachMe application logo"/>
                <h1 className="LogoText">ReachMe Messaging</h1>
            </div>
            <div className="HeaderRightSide">
                <Avatar src={loggedInAccount.profilePhotoHref}
                        title={loggedInAccount.userRealName}
                        className="RightSideAvatar"/>
                <NewConversation enableSearch={props.enableSearch}/>
                <IconButton title="More messaging options"
                            className="IconButton">
                    <Tune className="RightSideHeaderIcon"/>
                </IconButton>
                <IconButton title="Close"
                            className="IconButton"
                            onClick={props.close}>
                    <ArrowBack className="RightSideHeaderIcon"/>
                </IconButton>
            </div>
        </div>
    );
}