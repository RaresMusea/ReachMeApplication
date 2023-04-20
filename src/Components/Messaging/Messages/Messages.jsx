import Message from "./Message";
import "../../../Styles/Messaging/Messages/Message.scss";
import { useContext, useEffect, useState } from "react";
import { ConversationContext } from "../../../Context/ConversationContext";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseFirestore } from "../../../Modules/Firebase/FirebaseIntegration";
import { loggedInAccount } from "../../../Services/Feed Services/FeedDrawerService";
import { parseDateAndTime } from "../../../Modules/Date/DatePipeModule";
import { OpenContext } from "../../../Context/OpenContext";
import { MediaContext } from "../../../Context/MediaContext";
import {
  buildFileResourceAttributes,
  buildMediaResourceAttributes,
} from "../../../Modules/LightBox/LightBoxModule";
import { getFileIcon } from "../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ConversationContext);
  const { target } = useContext(OpenContext);
  const [firstInConversation, setFirstInConversation] = useState("");
  const [conversationStartDate, setConversationStartDate] = useState(null);
  const { setPhotos, setVideos, setFiles, setPhotosAndVideos } =
    useContext(MediaContext);

  useEffect(() => {
    const getConversations = () => {
      const unsubscribe = onSnapshot(
        doc(
          firebaseFirestore,
          "conversationsCollection",
          data.conversationIdentifier
        ),
        (doc) => {
          if (doc.exists()) {
            setMessages(doc.data().messages);
            const mess = doc.data().messages;
            if (mess.length === 0) {
              setFirstInConversation(loggedInAccount.userRealName);
              setConversationStartDate(parseDateAndTime(new Date()));
            } else {
              setFirstInConversation(
                mess[0]?.senderIdentifier ===
                  loggedInAccount.userFirebaseIdentifier
                  ? loggedInAccount.userRealName
                  : target
              );
              setConversationStartDate(
                parseDateAndTime(mess[0]?.date.toDate())
              );

              loadMedia(mess);
            }
          }
        }
      );

      return () => {
        unsubscribe();
      };
    };

    data.conversationIdentifier && getConversations();
  }, [data.conversationIdentifier]);

  const loadMedia = (messages) => {
    const photos = [];
    const videos = [];
    const files = [];
    const photosAndVideos = [];

    messages.forEach((message) => {
      if (message.messageType === "photo") {
        const imageAttributes = buildMediaResourceAttributes(
          message.additionalHref,
          message.date,
          message.senderIdentifier
        );

        photos.push(imageAttributes);
        photosAndVideos.push(imageAttributes);
      } else if (message.messageType === "video") {
        const videoAttributes = buildMediaResourceAttributes(
          message.additionalHref,
          message.date,
          message.senderIdentifier
        );

        videos.push(videoAttributes);
        photosAndVideos.push(videoAttributes);
      } else if (message.messageType.includes("file/")) {
        const fileExtension = message.messageType.split("/")[1];
        const fileName = message.sharedFile;
        const icon = getFileIcon(fileExtension);

        files.push(
          buildFileResourceAttributes(
            fileName,
            icon,
            message.date,
            message.additionalHref,
            message.senderIdentifier
          )
        );
      }
    });

    setPhotos(photos);
    setVideos(videos);
    setFiles(files);
    setPhotosAndVideos(photosAndVideos);
    console.log(photosAndVideos);
  };

  return (
    <>
      <div className="Messages">
        <div className="MessagesHeading">
          {`${firstInConversation} started this conversation 
                    ${conversationStartDate}.`}
        </div>
        {messages &&
          messages.map((msg, index) => (
            <Message key={msg.messageIdentifier} message={msg} index={index} />
          ))}
        <div id="UploadSnackbar" />
      </div>
    </>
  );
}
