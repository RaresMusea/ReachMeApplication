import '../../../Styles/Messaging/Sidebar/Chats.scss';
import {useContext, useEffect, useState} from "react";
import {fadeInChats} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {deleteField, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";
import {OpenContext} from "../../../Context/OpenContext";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Archive, Delete} from "@mui/icons-material";
import Divider from "@mui/material/Divider";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const {dispatch, data} = useContext(ConversationContext);
    const {setConversationOpened} = useContext(OpenContext);

    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                  // Other native context menus might behave different.
                  // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const deleteConversation = async () => {
        setConversationOpened(false);
        //await deleteDoc(doc(firebaseFirestore, "conversationsCollection", data.conversationIdentifier));
        const loggedRef = doc(firebaseFirestore, 'userConversations', loggedInAccount.userFirebaseIdentifier);
        /*const otherRef = doc(firebaseFirestore, 'userConversations', data.user.userFirebaseIdentifier);*/

        await updateDoc(loggedRef, {
            [data.conversationIdentifier + "lastMessageInConversation"]: deleteField(),
        });
        /*await updateDoc(otherRef,{
            [data.conversationIdentifier]:deleteField(),
        })*/
    }

    useEffect(() => {
        const getChats = () => {
            const unsubscribe = onSnapshot(doc(firebaseFirestore, "userConversations", loggedInAccount.userFirebaseIdentifier),
                (doc) => {
                    setChats(doc.data());
                });

            return () => {
                unsubscribe();
            };
        }
        loggedInAccount.userFirebaseIdentifier && getChats();
    }, [loggedInAccount.userFirebaseIdentifier]);

    useEffect(() => {
        fadeInChats();
    }, []);

    const handleConversationOpen = (targetUser) => {
        document.querySelector('.searchNameDetails').style.width = `${70}%`;
        setConversationOpened(true);
        dispatch({type: "CHANGE_USER", payload: targetUser});
    }

    return (
        <div className="ChatsWrapper">
            <h2 className="Subtitle">Conversations</h2>
            {
                Object.entries(chats)
                    ?.sort((a, b) =>
                        b[1].date - a[1].date
                    )
                    .map((conv) => (
                        <div onContextMenu={handleContextMenu} style={{cursor: 'context-menu'}}>
                            <div className="ConversationDetailsFlexWrapper"
                                 key={conv[0]}
                                 onClick={() => handleConversationOpen(conv[1].userDetails)}>
                                <div className="UserChats">
                                    <Avatar
                                        src={conv[1].userDetails.profilePhotoHref}
                                        className="UserProfilePic"/>
                                    <div className="SearchResultNames">
                                        <div
                                            className="searchUsernameDetails First">{`${conv[1].userDetails.userRealName}
                             (${conv[1].userDetails.userName})`}</div>
                                        <div
                                            className="searchNameDetails">
                                            {
                                                conv[1].senderIdentifier === loggedInAccount.userFirebaseIdentifier
                                                    ? `You: ${conv[1].lastMessageInConversation?.lastMessage}`
                                                    : conv[1].lastMessageInConversation?.lastMessage
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="MessageDate">{conv[1].date ? parseDateAndTime(conv[1].date.toDate()) : ``}</div>
                            </div>
                            <Menu
                                open={contextMenu !== null}
                                onClose={handleClose}
                                className="ContextualMenu"
                                anchorReference="anchorPosition"
                                anchorPosition={
                                    contextMenu !== null
                                        ? {top: contextMenu.mouseY, left: contextMenu.mouseX}
                                        : undefined
                                }
                            >
                                <h4 style={{textAlign: "center", fontWeight: "bold"}}>Chat
                                    with {conv[1].userDetails.userRealName} options</h4>
                                <Divider style={{marginBottom: '1.5em'}}/>
                                <MenuItem className="ChatMenuItem" onClick={deleteConversation} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>Delete conversation</div>
                                    <Delete style={{
                                        color: 'red',
                                        marginLeft: '3em'
                                    }}/>
                                </MenuItem>
                                <MenuItem className="ChatMenuItem"
                                          style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>Archive</div>
                                    <Archive/>
                                </MenuItem>
                            </Menu>
                        </div>
                    ))
            }
        </div>
    );
}