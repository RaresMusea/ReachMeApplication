import * as React from 'react';
import {useContext} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";
import ImageInput from "../../Forms/Inputs/ImageInput";
import {Cancel, Description, Share} from "@mui/icons-material";
import '../../../Styles/Dialog/ShareImageDialog.scss';
import IconButton from "@mui/joy/IconButton";
import {Transition} from "../../Messaging/MessagingFrame";
import {sendMessage} from "../../../Services/Firebase Service/Messaging/FirebaseMessagingService";
import useInputValue from "../../../Hooks/Forms/useInputValue";

export default function MediaShareDialog(props) {
    const {
        isSharable,
        setIsSharable,
        setResource,
        resource,
        type,
        extra,
        setExtra
    } = useContext(ResourceSharingContext);
    const {setInputValue} = useInputValue("");
    let message = "";

    const getInputMessageText = (e) => {
        message = e.target.value;
        console.log(message);
    }

    const handleClose = () => {
        setResource(null);

        if (type === "video") {
            document.querySelector(".VideoPreview").pause();
        }
        setExtra({});
        setIsSharable(false);

    };

    const handleImageMessageSending = async () => {
        const messageContent = message ? message : ``;
        setInputValue("");
        setIsSharable(false);
        await sendMessage("image",
            messageContent,
            props.convId,
            props.data.user.userFirebaseIdentifier,
            resource);
        message = "";
    }

    return (
        <div>
            <Dialog
                open={isSharable}
                keepMounted
                maxWidth={'lg'}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="DialogTitle">{`Share ${type} with ${props.receiver}`}</DialogTitle>
                <DialogContent>
                    {
                        type === "image" &&
                        <img className="ImagePreview" src={resource} alt="ImageToSend" width={600} height={400}/>
                    }
                    {
                        type === "video" &&
                        <video controls
                               className="VideoPreview">
                            <source src={resource}/>
                        </video>
                    }
                    {
                        type === "file/document" &&
                        <>
                            <img src={extra.source}
                                 alt="File Type Icon"/>
                            <span>{extra.fileName}</span>
                        </>
                    }
                    <div className="DescriptionWrapper">
                        <ImageInput className='DescriptionInput'
                                    type={2}
                                    error={{}}
                                    icon={Description}
                                    placeholder={'Message'}
                                    adornmentPosition={'start'}
                                    getInputText={getInputMessageText}/>
                    </div>
                </DialogContent>
                <div className="ButtonsArea">
                    <IconButton
                        title="Share"
                        className="Button ShareButton"
                        onClick={handleImageMessageSending}>
                        Share
                        <Share className="Icon"/>
                    </IconButton>
                    <IconButton className="Button CancelButton"
                                onClick={handleClose}>
                        Cancel
                        <Cancel className="Icon"/>
                    </IconButton>
                </div>
            </Dialog>
        </div>
    );
}