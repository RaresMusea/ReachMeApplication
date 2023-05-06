import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {isSelectedFileValid} from "../Modules/Validation/PostUploadFileFormatValidator";

export default function usePostUploader() {
    const [start, setStart] = useState(false);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [valid, setValid] = useState(true);
    const [additionalMessage, setAdditionalMessage] = useState("");
    const [resource, setResource] = useState(null);
    const [location, setLocation] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    })

    useEffect(() => {
        if (description === "") {
            setStart(false);
            setResource(null);
        }
    }, [description]);

    useEffect(() => {
        if (!valid) {
            notifyErrorToast(additionalMessage);
            setValid(true);
        }
    }, [valid]);

    const handleInputChange = (e) => {
        if (e.target.value.length !== 3) {
            setStart(true);
        }
        setDescription(e.target.value);
    }

    const notifyErrorToast = (message) => toast.error(message);

    const handleFileSelection = (e) => {
        const file = e.target.files[0];

        if (file === null || file === undefined) {
            setAdditionalMessage("No file selected!");
            setValid(false);
            return;
        }

        if (!isSelectedFileValid(file)) {
            setAdditionalMessage("The provided file has a format which is not supported by the " +
                "ReachMe application!");
            setValid(false);
            return;
        }
        setResource(file);
    }

    return {
        handleInputChange,
        handleFileSelection,
        resource, setResource,
        start, setStart,
        loading, setLoading,
        location, setLocation,
        description, setDescription,
    }
}