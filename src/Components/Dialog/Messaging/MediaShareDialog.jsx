import * as React from 'react';
import {useContext, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {ResourceSharingContext} from "../../../Context/ResourceSharingContext";
import ImageInput from "../../Forms/Inputs/ImageInput";
import {Cancel, Description, Share} from "@mui/icons-material";
import '../../../Styles/Dialog/ShareImageDialog.scss';
import IconButton from "@mui/joy/IconButton";
import {Transition} from "../../Messaging/MessagingFrame";
import useInputValue from "../../../Hooks/Forms/useInputValue";
import {
    sendMultiplePhotoMessages,
    sendPhotoMessage
} from "../../../Services/Firebase Service/Messaging/FirebaseResourceSharingService";
import {ConversationContext} from "../../../Context/ConversationContext";
import ImageCarouselPreview from "../../Messaging/Misc/ImageCarouselPreview";

export default function MediaShareDialog(props) {
    const {
        isSharable,
        setIsSharable,
        setResource,
        resource,
        type,
        extra,
        setExtra,
        fileList
    } = useContext(ResourceSharingContext);
    const {setInputValue} = useInputValue("");
    const {data} = useContext(ConversationContext);
    const [reset, setReset] = useState(false);
    let message = "";

    const getInputMessageText = (e) => {
        message = e.target.value;
        console.log(message);
    }

    const handleClose = () => {
        setReset(true);
        setResource([]);

        if (type === "video") {
            document.querySelector(".VideoPreview").pause();
        }
        setExtra({});
        setInputValue("");
        message = '';
        setIsSharable(false);
    };

    const turnOffReset = () => {
        setReset(false);
    }

    const handleMediaMessageSending = async () => {
        const messageConfiguration = {
            "conversationId": data.conversationIdentifier,
            "receiver": data.user,
            "messageContent": message,
        };

        switch (type) {
            case 'image': {
                fileList.length === 1 &&
                await sendPhotoMessage(fileList[0], messageConfiguration);
                handleClose();
                break;
            }
            case 'images': {
                await sendMultiplePhotoMessages(fileList, messageConfiguration);
                handleClose();
                break;
            }
            default: {
                break;
            }
        }


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
                        type === "images" &&
                        <ImageCarouselPreview/>
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
                                 className="FileTypePreview"
                                 alt="File Type Icon"/>
                            <span className="FileName">{extra.fileName}</span>
                        </>
                    }
                    <div className="DescriptionWrapper">
                        <ImageInput className='DescriptionInput'
                                    type={2}
                                    error={{}}
                                    reset={reset}
                                    inputValue={''}
                                    turnOffReset={turnOffReset}
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
                        onClick={handleMediaMessageSending}>
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