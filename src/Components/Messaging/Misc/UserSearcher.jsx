import {Avatar} from "@mui/joy";
import '../../../Styles/Messaging/Misc/UserSearcher.scss';
import {closeUserSearcher} from "../../../Modules/Messaging/MessagingModule";
import {useEffect, useState} from "react";
import {foundUsers, searchForUsersByIdentity} from "../../../Services/Firebase Service/Messaging/UserSearcherService";
import {createConversationBetween} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";

export default function UserSearcher() {

    const [queryText, setQueryText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    let recipient = {};

    useEffect(() => {
        (async () => {
            if (!queryText) {
                setSuggestions([]);
                return;
            }
            await searchForUsersByIdentity(queryText);
            setSuggestions(foundUsers);
        })();
    }, [queryText]);

    const handleClose = () => {
        setQueryText("");
        setSuggestions([]);
        closeUserSearcher();
    }

    const handleUserSelection = async () => {
        await createConversationBetween(loggedInAccount, recipient);
    }

    return (
        <>
            <div className="Searcher">
                <h2 className="Subtitle">Start a new conversation</h2>
                <form>
                    <input type="text"
                           className="SearcherInput"
                           value={queryText}
                           onChange={(e) => setQueryText(e.target.value)}
                           placeholder="Name or username of the user you want to chat with"/>
                </form>
                <div className="ResultsText">
                    {suggestions.length ? `Found ${suggestions.length}
                     ${suggestions.length === 1 ? `result` : `results`}
                      matching your search` : ``}
                </div>
                <div className="ResultsText">
                    {queryText && suggestions.length === 0 ? `No results found` : ``}
                </div>
                {suggestions.map((account) => (
                    <div className="SearchResults"
                         key={account.userFirebaseIdentifier}
                         onClick={async () => {
                             recipient = account;
                             await handleUserSelection();
                         }}>
                        <Avatar src={account.profilePhotoHref}
                                className="UserProfilePic"/>
                        <div className="SearchResultNames">
                            <div className="searchUsernameDetails First">{account.userName}</div>
                            <div className="searchNameDetails">{account.userRealName}</div>
                        </div>
                    </div>))
                }
                <button className="HideButton"
                        onClick={handleClose}>Hide
                </button>
            </div>
        </>
    );
}