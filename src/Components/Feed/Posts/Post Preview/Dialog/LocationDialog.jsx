import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import location from "../../../../../Media/Images/map.svg";
import '../../../../../Styles/Feed/Posts/Post Preview/Dialog/LocationDialog.scss'
import ImageInput from "../../../../Forms/Inputs/ImageInput";
import {LocationOn} from "@mui/icons-material";
import {buildError} from "../../../../../Modules/Sign Up/SignUpUtils";

export default function LocationDialog(props) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({});
    const [input, setInput] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getLocationInput = (e) => {
        setInput(e.target.value);
    }

    const handleLocationSubmit = () => {
        if (input.length < 2) {
            const err = buildError("The provided location is invalid!");
            setError(err);
            return;
        }
        props.setLocation(input);
        handleClose();
    }

    return (
        <div>
            <div className="ClickableObject"
                 onClick={handleClickOpen}>
                <span>Add location</span>
                <img src={location} alt="Attach an image or a video as a post"
                     className="ClickableIcon"/>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className="LocationDialogTitle">
                    Add Location
                </DialogTitle>
                <DialogContent>
                    <p className="Paragraph">
                        Don't let the others guess where you've been when you upload the post!</p>
                    <p className="Paragraph"> Share your location, in order to let them know the
                        location at which you were at that time!
                        Still there? Use our geo-location service in order to get localized even more faster!
                    </p>
                    <div className="LocationForm">
                        <ImageInput
                            classname="location"
                            className='location'
                            type={2}
                            error={error}
                            inputValue={""}
                            icon={LocationOn}
                            placeholder={'Location'}
                            adornmentPosition={'start'}
                            getInputText={getLocationInput}/>
                    </div>
                </DialogContent>
                <DialogActions className="DialogActions">
                    <button
                        onClick={handleLocationSubmit}
                        className="AddLocation">Add location
                    </button>
                    <button className="UseGeolocationButton">Use geo-location</button>
                    <button className="CloseButton"
                            onClick={handleClose}>Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}