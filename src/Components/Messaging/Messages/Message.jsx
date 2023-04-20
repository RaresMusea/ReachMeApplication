import "../../../Styles/Messaging/Messages/Message.scss";
import { Avatar } from "@mui/joy";
import { loggedInAccount } from "../../../Services/Feed Services/FeedDrawerService";
import { parseDateAndTime } from "../../../Modules/Date/DatePipeModule";
import { useContext, useState } from "react";
import { ConversationContext } from "../../../Context/ConversationContext";
import useScroll from "../../../Hooks/useScroll";
import { fromStringBase64EncodedAudioToLocalUrl } from "../../../Modules/Messaging/Voice Recoder/VoiceRecorder";
import { getFileIcon } from "../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import IconButton from "@mui/joy/IconButton";
import { Download } from "@mui/icons-material";
import { getDownloadLink } from "../../../Modules/Common Functionality/CommonFunctionality";
import Divider from "@mui/material/Divider";

export default function Message(props) {
  const [showDate, setShowDate] = useState(false);
  const { data } = useContext(ConversationContext);
  const scrollRef = useScroll(props.message);
  const messageStatus =
    props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier
      ? `LoggedUsersMessage`
      : ``;
  const messageType = props.message.messageType;
  const profileImageSrc =
    props.message.senderIdentifier === loggedInAccount.userFirebaseIdentifier
      ? loggedInAccount.profilePhotoHref
      : data.user.profilePhotoHref;

  const displayDateAndTimeOfTheMessage = () => {
    setShowDate(!showDate);
  };

  return (
    <div className={`Message ${messageStatus}`} ref={scrollRef}>
      <div className="MessageDetails">
        <Avatar
          src={profileImageSrc}
          className="ConversationProfilePic"
          onClick={displayDateAndTimeOfTheMessage}
        />
        {showDate && (
          <span className="SendReceivedDate">
            {parseDateAndTime(props.message?.date.toDate())}
          </span>
        )}
      </div>
      <div className="MessageContent">
        {messageType === "text" && <p>{props.message.content}</p>}
        {messageType === "voice recording" && (
          <audio controls className={`Message ${messageStatus}`}>
            <source
              src={fromStringBase64EncodedAudioToLocalUrl(
                props.message.additionalHref
              )}
            />
          </audio>
        )}
      </div>
      {messageType === "photo" && (
        <div
          className={`ImageMessage ${messageStatus}`}
          style={{
            paddingBottom: props.message.content !== "" ? "0" : ".5em",
            marginBottom: props.message.content !== "" ? "0" : "0",
          }}
        >
          <img
            className="SourceImage"
            src={props.message.additionalHref}
            alt="Image message"
          />
          {props.message.content !== "" && <span>{props.message.content}</span>}
        </div>
      )}
      {messageType === "video" && (
        <div
          className={`VideoMessage ${messageStatus}`}
          style={{
            paddingBottom: props.message.content !== "" ? "0" : ".5em",
            marginBottom: props.message.content !== "" ? "0" : "0",
          }}
        >
          <video
            controls
            src={props.message.additionalHref}
            className="VideoSource"
          />
          {props.message.content !== "" && <span>{props.message.content}</span>}
        </div>
      )}
      {messageType.includes("file/") && (
        <div
          className={`FileMessageColumn ${messageStatus}`}
          style={{
            paddingBottom: props.message.content !== "" ? "0" : ".5em",
            marginBottom: props.message.content !== "" ? "0" : "0",
          }}
        >
          <div className="FileMessageRow">
            <div className="FileMessageLeft">
              <img
                src={getFileIcon(props.message.messageType.split("/")[1])}
                alt="File Icon"
                className="FileIcon"
              />
              <p>{props.message.sharedFile}</p>
            </div>
            <IconButton
              className="DownloadButton"
              title="Download file"
              onClick={() => {
                //requestFileDownload(props.message.sharedFile, props.message.additionalHref);
                getDownloadLink(
                  props.message.sharedFile,
                  props.message.additionalHref
                );
              }}
            >
              <Download className="DownloadIcon" />
            </IconButton>
          </div>
          {props.message.content !== `` && (
            <div className="FileMessageContent">
              <Divider />
              <p>{props.message.content}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
