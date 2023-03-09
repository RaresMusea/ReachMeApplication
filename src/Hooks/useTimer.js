import {useEffect, useState} from "react";

export default function useTimer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const toggleTimer = () => {
        setIsTimerActive(!isTimerActive);
    }

    const resetTimer = () => {
        setMinutes(0);
        setSeconds(0);
        setIsTimerActive(false);
    }

    useEffect(() => {
        let interval = null;
        if (isTimerActive) {
            interval = setInterval(() => {
                if (seconds !== 59)
                    setSeconds(seconds + 1);
                else {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
            }, 1000);
        } else if (!isTimerActive && seconds === 0 && minutes === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);

    }, [isTimerActive, minutes, seconds]);

    const formatTimer = () => {
        let minutesString;
        let secondsString;
        if (minutes >= 0 && minutes <= 9) {
            minutesString = "0" + minutes;
        } else {
            minutesString = minutes;
        }

        if (seconds >= 0 && seconds <= 9) {
            secondsString = "0" + seconds;
        } else {
            secondsString = seconds;
        }

        return minutesString + ":" + secondsString;
    }

    return {formatTimer, toggleTimer, resetTimer, isTimerActive};

}