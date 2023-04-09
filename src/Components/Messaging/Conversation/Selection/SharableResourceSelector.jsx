import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {AttachFile, InsertDriveFile, Photo, VideoCameraFrontSharp} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import {List} from "@mui/joy";
import PropTypes from "prop-types";
import '../../../../Styles/Messaging/Conversation/Conversation.scss';
import '../../../../Styles/Messaging/Conversation/SharableResourceSelector.scss';
import {useState} from "react";
import {Transition} from "../../MessagingFrame";
import {
    isImageProcessingSuccessful
} from "../../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const {onClose, selectedValue} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const onImageSelection = (e) => {
        const files = e.target.files;
        console.log(files);
        if (isImageProcessingSuccessful(files)) {

        }

        document.querySelector('#PhotoPicker').files = null;
    }

    return (
        <Dialog onClose={handleClose}
                open={props.open}
                TransitionComponent={Transition}>
            <DialogTitle className='DialogTitle'>{`Select the file type that you want to share`}</DialogTitle>
            <List className="SelectionOptions">
                <ListItemButton className="SelectionElement">
                    <label htmlFor="PhotoPicker">
                        Photo
                        <input type="file"
                               name="PhotoPicker"
                               id="PhotoPicker"
                               onChange={onImageSelection}
                               multiple={true}
                               style={{display: 'none'}}
                               accept="image/svg+xml, image/gif, image/jpg, image/png, image/jpeg, image/webp"/>
                        <Photo/>
                    </label>
                </ListItemButton>
                <ListItemButton className="SelectionElement">
                    <label htmlFor="PhotoPicker">Video
                        <input type="file"
                               name="PhotoPicker"
                               accept="video/mp4, video/x-m4v, video/*"
                               id="VideoPicker"
                               style={{display: 'none'}}/>
                        <VideoCameraFrontSharp/>
                    </label>
                </ListItemButton>
                <ListItemButton className="SelectionElement">
                    <label htmlFor="DocumentPicker">Document
                        <input type="file"
                               name="DocumentPicker"
                               id="DocumentPicker"
                               style={{display: 'none'}}/>
                        <InsertDriveFile/>
                    </label>
                </ListItemButton>
            </List>
            <div id="Alerts"/>
        </Dialog>
    )
        ;
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SharableResourceSelector() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <>
            <IconButton title="Attach media"
                        onClick={handleClickOpen}
                        className="MessageSenderIconButton">
                <AttachFile className="AttachIcon"/>
            </IconButton>
            <div>
                <SimpleDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}