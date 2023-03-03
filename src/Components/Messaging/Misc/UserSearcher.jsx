import {Avatar} from "@mui/joy";
import {defaultProfilePic} from "../../../Modules/Exporters/ImageExporter";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import '../../../Styles/Messaging/Misc/UserSearcher.scss';
import {closeUserSearcher} from "../../../Modules/Messaging/MessagingModule";

export default function UserSearcher() {
    return (
        <>
            <div className="Searcher">
                <h2 className="Subtitle">Start a new conversation</h2>
                <form>
                    <input type="text"
                           placeholder="Type the name or username of the user you want to start a conversation with"/>
                </form>
                <div className="ResultsText">Results matching your search</div>
                <div className="SearchResults">
                    <Avatar src={defaultProfilePic}
                            className="UserProfilePic"/>
                    <div className="SearchResultNames">
                        <div className="searchUsernameDetails First">{loggedInAccount.userName}</div>
                        <div className="searchNameDetails">{loggedInAccount.userRealName}</div>
                    </div>
                </div>
                <button className="HideButton"
                        onClick={closeUserSearcher}>Hide
                </button>
            </div>
        </>
    );
}