import "../../../Styles/Messaging/Form/ConversationForm.scss";
import IconButton from "@mui/joy/IconButton";
import {
  ArrowUpward,
  CloseSharp,
  MicNone,
  MoreHorizOutlined,
  Pause,
  PlayArrow,
  Send,
  StopCircle,
} from "@mui/icons-material";
import {useContext} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import {sendMessage} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {resetMessageInputValues} from "../../../Modules/Messaging/MessagingModule";
import {Slide} from "@mui/material";
import useVoiceRecorder from "../../../Hooks/useVoiceRecorder";
import MediaShareDialog from "../../Dialog/Messaging/MediaShareDialog";
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";
import {OpenContext} from "../../../Context/OpenContext";
import SharableResourceSelector from "../Conversation/Selection/SharableResourceSelector";
import {NotificationContext} from "../../../Context/NotificationContext";

export default function ConversationForm() {
  const { data } = useContext(ConversationContext);
  const { updateNotificationsList } = useContext(NotificationContext);

  const { setIsSharable, setResource, setPreview } = useContext(
    ResourceSharingContext
  );
  const { target } = useContext(OpenContext);
  const {
    recordingRequested,
    isRecording,
    requestVoiceRecording,
    handleVoiceRecording,
    formatTimer,
    closeRecorder,
    playPauseVoiceRecord,
    isListenable,
    isPlaying,
    voiceMessageAudio,
    voiceMessageText,
    setIsPlaying,
  } = useVoiceRecorder();

  let textToSend = "";

  const handleTextChange = (e) => {
    textToSend = e.target.value;
  };

  const handleMessageSend = async () => {
    resetMessageInputValues();
    await sendMessage(
      "text",
      textToSend,
      data.conversationIdentifier,
      data.user.userFirebaseIdentifier,
      null
    );

    updateNotificationsList(data.conversationIdentifier);
  };

  const handleMessageSendFromKey = async (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await handleMessageSend();
    }
  };

  const handleVoiceMessageSending = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      voiceMessageAudio.pause();
    }
    closeRecorder();
    await sendMessage(
      "voice recording",
      ``,
      data.conversationIdentifier,
      data.user.userFirebaseIdentifier,
      voiceMessageText
    );
  };

  const parseClipboardData = async () => {
    const clipboardItems = await navigator.clipboard.read().catch(console.log);

    for (let clipboardItem of clipboardItems) {
      for (let itemType of clipboardItem.types) {
        if (itemType.startsWith("image/")) {
          clipboardItem.getType(itemType).then((imageBlob) => {
            const imageUrl = URL.createObjectURL(imageBlob);

            const reader = new FileReader();
            let base64StringBlob;
            reader.readAsDataURL(imageBlob);
            reader.addEventListener("load", (ev) => {
              base64StringBlob = ev.target.result;
              setResource(base64StringBlob);
            });

            setPreview(imageUrl);
            setIsSharable(true);
          });
        }
      }
    }
  };

  return (
    <>
      {!recordingRequested ? (
        <div className="ConversationFormWrapper">
          <textarea
            className="MessageInput"
            placeholder="Message..."
            onPaste={parseClipboardData}
            onKeyDown={handleMessageSendFromKey}
            onChange={handleTextChange}
          />
          <IconButton
            title="Send message"
            className="MessageSenderIconButton"
            onClick={handleMessageSend}
          >
            <Send className="SendIcon" />
          </IconButton>
          <IconButton
            title="Record audio"
            className="MessageSenderIconButton"
            onClick={requestVoiceRecording}
          >
            <MicNone className="SendIcon" />
          </IconButton>
          {/* <IconButton title="Attach media"
                                    className="MessageSenderIconButton">
                            <AttachFile className="AttachIcon"/>
                        </IconButton>*/}
          <SharableResourceSelector
            receiver={data.user.userFirebaseIdentifier}
          />
          <IconButton title="More" className="MessageSenderIconButton">
            <MoreHorizOutlined className="MoreOptionsIcon" />
          </IconButton>
        </div>
      ) : (
        <Slide
          direction="left"
          in={recordingRequested}
          mountOnEnter
          unmountOnExit
        >
          <div className="RecorderWrapper">
            <div className="RecordingTimeInfo">
              {isRecording ? (
                <>
                  <div className="RecordIcon">{}</div>
                  <div>{`Recording audio ${formatTimer()}`}</div>
                </>
              ) : (
                <div className="RecorderInfoText">
                  {isListenable
                    ? "Voice record captured. Use the play/pause button to preview. Use the send " +
                      "button to send the record as a message. "
                    : "In order to start a voice recording, press the record button." +
                      "To go back, press the red button."}
                </div>
              )}
            </div>
            <div className="IconList">
              <IconButton
                title={isRecording ? "Stop audio recording" : "Record audio"}
                className={`RecordButton ${
                  isRecording ? `StopRecordingButton` : ``
                }`}
                onClick={handleVoiceRecording}
              >
                {isRecording ? (
                  <StopCircle className="RecordMuiIcon" />
                ) : (
                  <MicNone className="RecordMuiIcon" />
                )}
              </IconButton>
              {
                <>
                  {!isRecording && (
                    <IconButton
                      title="Close voice recorder"
                      className="CloseRecordButton"
                      onClick={closeRecorder}
                    >
                      <CloseSharp className="RecordMuiIcon" />
                    </IconButton>
                  )}
                  {isListenable && (
                    <>
                      <IconButton
                        title="Play your recorded message"
                        className="RecordButton"
                        onClick={playPauseVoiceRecord}
                      >
                        {!isPlaying ? (
                          <PlayArrow className="RecordMuiIcon" />
                        ) : (
                          <Pause classes="RecordMuiIcon" />
                        )}
                      </IconButton>
                      <IconButton
                        title="Send recorded voice message"
                        className="RecordButton"
                        onClick={handleVoiceMessageSending}
                      >
                        <ArrowUpward className="RecordMuiIcon" />
                      </IconButton>
                    </>
                  )}
                </>
              }
            </div>
          </div>
        </Slide>
      )}
      <MediaShareDialog
        data={data}
        convId={data.conversationIdentifier}
        receiver={target}
      />
    </>
  );
}
