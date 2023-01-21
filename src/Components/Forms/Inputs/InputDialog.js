import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import '../../../Styles/Forms/Input/InputDialog.scss';
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {useEffect, useState} from "react";
import {theme} from "../../../Modules/Themes/InputTheme";
import {ThemeProvider} from "@mui/material";

export default function InputDialog(props) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(props.error);
    const [value, setValue] = useState("");
    useEffect(() => {

        if(!isObjectEmpty(props.error)){
            setError(props.error);
        }
        if(props.forceClose){
            handleClose();
        }
    },[props.error, props.forceClose]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFocus=()=>{
        if(error['hasErrors']){
            setValue("");
        }
    }

    return (
        <div>
            <h4 className="TriggerResetButton"
                onClick={handleClickOpen}>
                Forgot password?
            </h4>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='DialogTitle'>{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className='DialogContentText'>
                        {props.dialogMessage}
                    </DialogContentText>
                    <ThemeProvider theme={theme}>
                        <TextField
                            className='DialogTextField'
                            autoFocus
                            margin="dense"
                            error={isObjectEmpty(error) ? undefined : true}
                            helperText={(isObjectEmpty(error) || !error['hasErrors']) ? undefined : error['message']}
                            id="name"
                            label="Your email address here"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={value}
                            onFocus={handleFocus}
                            onChange={(e) => {
                                props.retrieveValue(e);
                                setValue(e.target.value);

                                if(error['hasErrors']){
                                    setError({});
                                }
                            }}
                        />
                    </ThemeProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                    className="CancelButton">Cancel</Button>
                    <Button className="ActionButton"
                        onClick={props.task}>{props.actionName}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}