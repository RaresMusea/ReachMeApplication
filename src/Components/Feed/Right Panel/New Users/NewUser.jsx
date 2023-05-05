import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import {conversationExists} from "../../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import {useContext, useEffect, useState} from "react";
import {OpenContext} from "../../../../Context/OpenContext";
import UserHoverCard from "../../../User/Hover Card/UserHoverCard";
import {StateManagementContext} from "../../../../Context/StateManagementContext";

export default function NewUser(props) {
    const {handleUserSelection, handleConversationOpen, setMessagingOpened} = useContext(OpenContext);
    const [currentTarget, setCurrentTarget] = useState({});
    const {joinedUserUpdate, setJoinedUserUpdate} = useContext(StateManagementContext);

    useEffect(() => {
        fetch(`http://localhost:8080/account/${props.newUser.lastUserId}`)
            .then(response => response.json())
            .then(data => {
                setCurrentTarget(data);
            })
            .catch(() => console.error);
        setTimeout(() => {
        }, 200);
        setJoinedUserUpdate(false);
    }, [joinedUserUpdate])

    const openConversation = async () => {
        const exists = await conversationExists(loggedInAccount.userFirebaseIdentifier,
            props.newUser.lastUserId);

        if (!exists) {
            await handleUserSelection(currentTarget);
        }

        setMessagingOpened(true);
        localStorage.setItem("lastMessagesComponentOpening", Date.now());
        await handleConversationOpen(currentTarget);
    }

    return (
        <div className="NewUser">
            <div className="NewUserLeftSide">
                <UserHoverCard
                    openConversation={openConversation}
                    currentProfilePhoto={props.newUser.lastUserPhoto}
                    additionalInfo={`Joined 
                    ${parseDateAndTime(new Date(props.newUser.lastLogTimeStamp))}`}
                    userInfo={currentTarget}/>
                <div className="NameDetailsColumn">
                    {
                        props.newUser.lastUserId !== loggedInAccount.userFirebaseIdentifier ?
                            <p className="UserRealName">{props.newUser.usersList}</p>
                            :
                            <p className="UserRealName">
                                {props.newUser.usersList}
                                <span style={{
                                    fontWeight: "bolder",
                                    color: "#108e8e"
                                }}>
                                    {` (You)`}
                                </span>
                            </p>
                    }
                </div>
            </div>
        </div>
    );
}