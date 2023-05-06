import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import location from "../../../../../Media/Images/map.svg";
import '../../../../../Styles/Feed/Posts/Post Preview/Dialog/LocationDialog.scss'
import {LocationOn} from "@mui/icons-material";
import {buildError} from "../../../../../Modules/Sign Up/SignUpUtils";
import LocationInput from "../../../../Forms/Inputs/LocationInput";
import {isEmptyString} from "../../../../../Modules/Text/TextModule";
import useGeoLocation from "../../../../../Hooks/useGeoLocation";
import {isObjectEmpty} from "../../../../../Modules/Object/ObjectModule";

export default function LocationDialog(props) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({});
    const [input, setInput] = useState(` `);
    const [geoLocationResult, setGeoLocationResult] = useState("");
    const [geoLocationResultChanged, setGeoLocationResultChanged] = useState(false);
    const {geo, getCoordinates} = useGeoLocation();

    useEffect(() => {
        if (!isObjectEmpty(geo)) {
            setGeoLocationResult(`${geo.county}, ${geo.country}`);
            setInput(`${geo.county}, ${geo.country}`);
            props.setLocation(`${geo.county}, ${geo.country}`);
            setGeoLocationResultChanged(true);
        }
    }, [geo]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getLocation = (e) => {
        setInput(e.target.value);
    }

    const getGPSInferredLocation = (value) => {
        setInput(value);
    }

    const handleGPSLocalization = async () => {
        await getCoordinates();
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
                <span>{isEmptyString(input) || input === ` ` || input === `` ?
                    `Add location` : `Edit location`}
                </span>
                <img src={location} alt="Add location"
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
                        <LocationInput
                            classname="location"
                            className='location'
                            type={2}
                            error={error}
                            inputValue={input}
                            resetGeoLocationResult={setGeoLocationResultChanged}
                            geoLocationResultChanged={geoLocationResultChanged}
                            icon={LocationOn}
                            placeholder={'Location'}
                            geoLocationResult={geoLocationResult}
                            adornmentPosition={'start'}
                            getGPSInferredLocation={getGPSInferredLocation}
                            getInputText={getLocation}/>
                    </div>
                </DialogContent>
                <DialogActions className="DialogActions">
                    <button
                        onClick={handleLocationSubmit}
                        className="AddLocation">Add location
                    </button>
                    <button
                        onClick={handleGPSLocalization}
                        className="UseGeolocationButton">Use geo-location
                    </button>
                    <button className="CloseButton"
                            onClick={handleClose}>Close
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}