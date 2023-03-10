import useTimer from "./useTimer";
import {useEffect, useState} from "react";

export let recordingStatus;

export default function useVoiceRecorder() {
    const {formatTimer, toggleTimer, resetTimer} = useTimer();
    const [recordingRequested, setRecordingRequested] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    let [voiceMessageAudio, setVoiceMessageAudio] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [isListenable, setIsListenable] = useState(false);
    const [voiceMessageText, setVoiceMessageText] = useState("");
    let audioChunks = [];

    useEffect(() => {
        if (voiceMessageAudio) {
            setIsListenable(true);
            voiceMessageAudio.addEventListener("ended", () => {
                setIsPlaying(false);
            })
        }
    }, [voiceMessageAudio]);

    const requestVoiceRecording = () => {
        setRecordingRequested(true);
    }

    const handleVoiceRecording = () => {
        recordingStatus = !isRecording;

        if (recordingStatus) {
            if (isPlaying) {
                voiceMessageAudio.pause();
                setIsPlaying(false);
            }
            setIsListenable(false);
            setIsRecording(true);
            startRecording();
            toggleTimer();
            return;
        }

        resetTimer();
        setIsListenable(true);
        setIsRecording(false);
    }

    const closeRecorder = () => {
        if (isPlaying) {
            voiceMessageAudio.pause();
            setIsPlaying(false);
        }
        setRecordingRequested(false);
        setIsListenable(false);
    }

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, {
                        type: 'audio/ogg'
                    });

                    const audioUrl = URL.createObjectURL(audioBlob);
                    setVoiceMessageAudio(new Audio(audioUrl));
                    const reader = new FileReader();
                    let base64StringBlob;
                    reader.readAsDataURL(audioBlob);

                    reader.addEventListener("load", (ev) => {
                        base64StringBlob = ev.target.result;
                        setVoiceMessageText(base64StringBlob);
                    });

                    audioChunks = [];
                })

                document.querySelector('.StopRecordingButton').addEventListener('click', () => {
                    mediaRecorder.stop();
                    console.log("stopped");
                });
            });
    }

    const playPauseVoiceRecord = () => {
        const actualStatus = !isPlaying;
        setIsPlaying(!isPlaying);

        if (actualStatus) {
            voiceMessageAudio.play();
        } else {
            voiceMessageAudio.pause();
        }
    }

    return {
        requestVoiceRecording,
        handleVoiceRecording,
        isRecording,
        recordingRequested,
        closeRecorder,
        formatTimer,
        voiceMessageAudio,
        voiceMessageText,
        playPauseVoiceRecord,
        isPlaying,
        isListenable,
        setIsPlaying
    };
}