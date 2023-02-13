import {Dialog, DialogActions, DialogContent, Slide} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import React from 'react';
import {signOutUser} from "../../Services/Feed Services/FeedDrawerService";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function SignOutModal() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const signOut = async () => {
        await signOutUser();
    }

    return (
        <>
            <button onClick={handleClickOpen} className="SignOutButton">Sign Out</button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="SignOutModalTitle">{"ReachMe - Sign Out"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" className="SignOutModalContentText">
                        <p>Are you sure that you want to sign out?</p><p>
                        You'll be automatically redirected to the authentication page where you'll need to log in
                        again.</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className="SignOutModalButton SignOutModalCancelButton"
                            onClick={handleClose}>Cancel
                    </button>
                    <button className="SignOutModalButton SignOutModalProceedButton"
                            onClick={signOut}>Proceed
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}