import {Dialog, DialogActions, DialogContent, Slide} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import React, {useState} from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function GenericModal(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <button onClick={handleClickOpen}
                    className={props.triggerButtonClassName}>{props.triggerButtonText}
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="SignOutModalTitle">{props.modalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className="SignOutModalContentText">
                        <div>
                            <p>{props.modalQuestion}</p>
                            <p>{props.additionalInformation}</p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="SignOutModalButton SignOutModalCancelButton"
                            onClick={handleClose}>{props.cancelButtonText}
                    </button>
                    <button className="SignOutModalButton SignOutModalProceedButton"
                            onClick={() => {
                                props.action();
                                handleClose()
                            }}>{props.actionButtonText}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}