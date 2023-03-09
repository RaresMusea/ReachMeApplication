import {Avatar} from "@mui/joy";
import '../../../Styles/Messaging/Misc/UserSearcher.scss';
import {closeUserSearcher, displayUserSearcherInfoAlert} from "../../../Modules/Messaging/MessagingModule";
import {useContext, useEffect, useState} from "react";
import {foundUsers, searchForUsersByIdentity} from "../../../Services/Firebase Service/Messaging/UserSearcherService";
import {
    conversationAlreadyExists,
    createConversationBetween
} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {OpenContext} from "../../../Context/OpenContext";
import {ConversationContext} from "../../../Context/ConversationContext";

export default function UserSearcher() {

    const [queryText, setQueryText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const {setConversationOpened} = useContext(OpenContext);
    const {dispatch} = useContext(ConversationContext);

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

    const handleUserSelection = async (targetUser) => {
        await createConversationBetween(loggedInAccount, recipient);
        if (conversationAlreadyExists) {
            displayUserSearcherInfoAlert(`The conversation between you and ${targetUser.userRealName} already exists. 
            You are being redirected to that conversation.`);
            setConversationOpened(true);
            dispatch({type: "CHANGE_USER", payload: targetUser});
            setTimeout(() => {
                handleClose()
            }, 3000);
        }
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
                             await handleUserSelection(recipient);
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
                <div id="UserSearcherAlerts"/>
            </div>
        </>
    );
}