import "../../../Styles/Messaging/Sidebar/Chats.scss";
import {useContext, useEffect, useState} from "react";
import {determineChatLastMessage, fadeInChats,} from "../../../Modules/Messaging/MessagingModule";
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import {parseDateAndTime} from "../../../Modules/Date/DatePipeModule";
import {doc, onSnapshot} from "firebase/firestore";
import {firebaseFirestore} from "../../../Modules/Firebase/FirebaseIntegration";
import {ConversationContext} from "../../../Context/ConversationContext";
import {OpenContext} from "../../../Context/OpenContext";
import {v4 as uuid} from "uuid";
import {
  clearMessageNotificationsForLoggedUser
} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import emptyConversationSvg from "../../../Media/Images/undraw_social_networking_re_i1ex.svg";
import {MessageRounded} from "@mui/icons-material";
import {increaseTheOpacity} from "../../../Modules/Animation Control/Opacity";

export default function Chats() {
  const [chats, setChats] = useState([]);
  //const { messageNotifications } = useMessageNotifications();
  const { dispatch, data } = useContext(ConversationContext);
  const { conversationOpened, setConversationOpened, setTarget } =
    useContext(OpenContext);
  const [targetUser, setTargetUser] = useState({});

  useEffect(() => {
    const getChats = () => {
      const unsubscribe = onSnapshot(
        doc(
          firebaseFirestore,
          "userConversations",
          loggedInAccount.userFirebaseIdentifier
        ),
        (doc) => {
          const chatData = Object.entries(doc.data()).sort(
            (a, b) => b[1].date - a[1].date
          );
          setChats(chatData);
          setTimeout(() => {}, 200);
        }
      );

      return () => {
        unsubscribe();
      };
    };

    loggedInAccount.userFirebaseIdentifier && getChats();
  }, []);

  useEffect(() => {
    fadeInChats();
  }, []);

  useEffect(() => {
    if (chats.length === 0) {
      setTimeout(() => {
        increaseTheOpacity(document.querySelector(".EmptyConversation"), 50);
      }, 500);
    }
  }, [targetUser, conversationOpened, chats.length]);

  const handleConversationOpen = async (target) => {
    if (conversationOpened) {
      setConversationOpened(false);
    }
    dispatch({ type: "CHANGE_USER", payload: target });
    localStorage.setItem(
      "currentOngoingConversation",
      data.conversationIdentifier
    );
    document.querySelector(".searchNameDetails").style.width = `${70}%`;
    setTarget(target.userRealName);
    await clearMessageNotificationsForLoggedUser(data.conversationIdentifier);
    setConversationOpened(true);
  };

  return (
    <div className="ChatsWrapper">
      {chats.length === 0 ? (
        <div className="EmptyConversation">
          <img
            src={emptyConversationSvg}
            alt="EmptyConversation"
            className="EmptyConversationImage"
          />
          <h2>No conversations.</h2>
          <h3>
            In order to start a conversation, press the <MessageRounded />{" "}
            button.
          </h3>
        </div>
      ) : (
        <>
          <h2 className="Subtitle">Conversations</h2>
          {chats.map((conv) => (
            <div
              className="ConversationDetailsFlexWrapper"
              key={uuid()}
              onClick={async () => {
                await handleConversationOpen(conv[1].userDetails);
              }}
            >
              <div className="UserChats">
                <Avatar
                  src={conv[1].userDetails.profilePhotoHref}
                  className="UserProfilePic"
                />
                <div className="SearchResultNames">
                  <div className="searchUsernameDetails First">{`${conv[1].userDetails.userRealName}
                             (${conv[1].userDetails.userName})`}</div>
                  <div
                    title={determineChatLastMessage(conv[1])}
                    className="searchNameDetails"
                  >
                    {determineChatLastMessage(conv[1])}
                  </div>
                </div>
              </div>
              <div className="MessageDate">
                {conv[1].date ? parseDateAndTime(conv[1].date.toDate()) : ``}
                {/* {messageNotifications.map(
                  (notification) =>
                    notification.conversationId ===
                      conv[1]?.lastMessageInConversation
                        ?.conversationIdentifier &&
                    notification.length !== 0 && (
                      <div className="Notification">
                        {notification["notificationDetails"].length}
                      </div>
                    )
                )}*/}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
