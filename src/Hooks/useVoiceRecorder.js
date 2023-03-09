import useTimer from "./useTimer";
import {useEffect, useState} from "react";

export let recordingStatus;

export default function useVoiceRecorder() {
    const {formatTimer, toggleTimer, resetTimer} = useTimer();
    const [recordingRequested, setRecordingRequested] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceMessageAvailable, setVoiceMessageAvailable] = useState(false);
    let [voiceMessageAudio, setVoiceMessageAudio] = useState(null);
    let [isPlaying, setIsPlaying] = useState(false);
    let [isListenable, setIsListenable] = useState(false);
    let audioChunks = [];
    let voiceMessage = null;

    useEffect(() => {
        if (voiceMessageAudio) {
            setIsListenable(true);
            voiceMessageAudio.addEventListener("ended", () => {
                setIsPlaying(false);
            })
        }
    }, [voiceMessageAudio]);

    useEffect(() => {
        /*if(voiceMessageAudio === null || voiceMessageAudio === undefined){
            return;
        }*/
        /*
                if(!voiceMessageAudio.paused || !voiceMessageAudio.currentTime){
                    setIsPlaying(false);
                }*/

    }, [voiceMessageAudio])


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
                })

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setVoiceMessageAudio(audioBlob);
                    voiceMessage = new Audio(audioUrl);
                    setVoiceMessageAudio(new Audio(audioUrl));
                    console.log(voiceMessage);
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
            //setTimeout(()=>setIsPlaying(false),voiceMessageAudio.duration*1000);
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
        voiceMessageAvailable,
        voiceMessageAudio,
        playPauseVoiceRecord,
        isPlaying,
        isListenable
    };
}