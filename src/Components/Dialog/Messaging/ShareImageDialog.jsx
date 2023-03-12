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

export default function ShareImageDialog(props) {
    const {isSharable, setIsSharable, setResource, preview} = useContext(ResourceSharingContext);
    let message = "";

    const getInputMessageText = (e) => {
        message = e.target.value;
        console.log(message);
    }

    const handleClose = () => {
        setResource(null);
        setIsSharable(false);
    };

    return (
        <div>
            <Dialog
                open={isSharable}
                keepMounted
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="DialogTitle">{`Share image with ${props.receiver}`}</DialogTitle>
                <DialogContent>
                    <img className="ImagePreview" src={preview} alt="ImageToSend" width={600} height={400}/>
                    <div className="DescriptionWrapper">
                        <ImageInput className='DescriptionInput'
                                    type={2}
                                    error={{}}
                                    icon={Description}
                                    inputValue={message}
                                    placeholder={'Message'}
                                    adornmentPosition={'start'}
                                    getInputText={getInputMessageText}/>
                    </div>
                </DialogContent>
                <div className="ButtonsArea">
                    <IconButton
                        title="Share"
                        className="Button ShareButton"
                        onClick={handleClose}>
                        Share
                        <Share className="Icon"/>
                    </IconButton>
                    <IconButton className="Button CancelButton"
                                onClick={handleClose}>
                        Cancel
                        <Cancel clasName="Icon"/>
                    </IconButton>
                </div>
            </Dialog>
        </div>
    );
}