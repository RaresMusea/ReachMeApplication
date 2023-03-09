import '../../../Styles/Messaging/Form/ConversationForm.scss';
import IconButton from "@mui/joy/IconButton";
import {
    AttachFile,
    CloseSharp,
    MicNone,
    MoreHorizOutlined,
    Pause,
    PlayArrow,
    Send,
    StopCircle
} from "@mui/icons-material";
import {useContext} from "react";
import {ConversationContext} from "../../../Context/ConversationContext";
import {sendTextMessage} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import {resetMessageInputValues} from "../../../Modules/Messaging/MessagingModule";
import {Slide} from "@mui/material";
import useVoiceRecorder from "../../../Hooks/useVoiceRecorder";

export default function ConversationForm() {

    const {data} = useContext(ConversationContext);
    const {
        recordingRequested,
        isRecording,
        requestVoiceRecording,
        handleVoiceRecording,
        formatTimer,
        closeRecorder,
        voiceMessageAudio,
        playPauseVoiceRecord,
        isListenable,
        isPlaying
    } = useVoiceRecorder();

    let textToSend = "";
    let imageToSend = "";

    const handleTextChange = (e) => {
        textToSend = e.target.value;
    }

    const handleMessageSend = async () => {
        await sendTextMessage(textToSend, data.conversationIdentifier, data.user.userFirebaseIdentifier);
        resetMessageInputValues();
    }

    const handleMessageSendFromKey = async (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            await handleMessageSend();
        }

        if (e.keyCode === 13) {
            if (e.shiftKey) {
                textToSend += "<br/>";
            }
        }
    }


    return (
        <>
            {!recordingRequested ?
                <div className="ConversationFormWrapper">
                <textarea className="MessageInput"
                          placeholder="Message..."
                          onKeyDown={handleMessageSendFromKey}
                          onChange={handleTextChange}/>
                    <IconButton title="Send message"
                                className="MessageSenderIconButton"
                                onClick={handleMessageSend}>
                        <Send className="SendIcon"/>
                    </IconButton>
                    <IconButton title="Record audio"
                                className="MessageSenderIconButton"
                                onClick={requestVoiceRecording}
                    >
                        <MicNone className="SendIcon"/>
                    </IconButton>
                    <IconButton title="Attach media"
                                className="MessageSenderIconButton">
                        <AttachFile className="AttachIcon"/>
                    </IconButton>
                    <IconButton title="More"
                                className="MessageSenderIconButton">
                        <MoreHorizOutlined className="MoreOptionsIcon"/>
                    </IconButton>
                </div>
                :
                <Slide direction="left" in={recordingRequested} mountOnEnter unmountOnExit>
                    <div className="RecorderWrapper">
                        <div className="RecordingTimeInfo">
                            {isRecording ?
                                <>
                                    <div className="RecordIcon">{}</div>
                                    <div>{`Recording audio ${formatTimer()}`}</div>
                                </>
                                :
                                <div className="RecorderInfoText">
                                    {isListenable ?
                                        "Voice record captured. Use the play/pause button to preview. Use the send " +
                                        "button to send the record as a message. " :
                                        "In order to start a voice recording, press the record button." +
                                        "To go back, press the red button."
                                    }
                                </div>
                            }
                        </div>
                        <div className="IconList">
                            <IconButton title={isRecording ? "Stop audio recording" : "Record audio"}
                                        className={`RecordButton ${isRecording ? `StopRecordingButton` : ``}`}
                                        onClick={handleVoiceRecording}
                            >
                                {isRecording ?
                                    <StopCircle className="RecordMuiIcon"/> :
                                    <MicNone className="RecordMuiIcon"/>
                                }
                            </IconButton>
                            {
                                <>
                                    {!isRecording &&
                                        <IconButton title="Close voice recorder"
                                                    className="CloseRecordButton"
                                                    onClick={closeRecorder}>
                                            <CloseSharp className="RecordMuiIcon"/>
                                        </IconButton>
                                    }
                                    {
                                        isListenable &&
                                        <>
                                            <IconButton title="Play your recorded message"
                                                        className="RecordButton"
                                                        onClick={playPauseVoiceRecord}>
                                                {
                                                    !isPlaying ?
                                                        <PlayArrow className="RecordMuiIcon"/> :
                                                        <Pause classes="RecordMuiIcon"/>
                                                }
                                            </IconButton>
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </Slide>
            }
        </>
    )
}