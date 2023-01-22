import {useState} from "react";
import {Backdrop, Fade, Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {signOutUser} from "../../../Services/Authentication Services/SignUpService";
import "../../../Styles/Authentication/Sign Out/SignOutModal.scss";
import {destroyModal} from "../../../Modules/FeedModule";

const styles={
    position:'absolute',
    top:'50%',
    left:'50%',
    transform:'translateX(-50%,50%)',
    width:500,
    boxShadow:10,
    p:4
};

export default function SignOutModal(props){
    const [open, setOpen]=useState(props.isOpen);

    const handleOpen=()=>setOpen(true);

    const handleClose=()=>setOpen(false);

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={styles} className='Box'>
                    <div className='LogoContainer'>
                        <img src={props.image}
                             alt='Logo'
                             className="ReachMeLogo"/>
                        <h1 className="Logo">
                            ReachMe
                        </h1>
                    </div>
                    <Typography id="transition-modal-title"
                                variant="h6"
                                component="h2">
                        Log Out
                    </Typography>
                    <Typography id="transition-modal-description"
                                sx={{mt: 2}}>
                        Are you sure that you want to log out?
                    </Typography>
                    <div className='FlexContainer'>
                        <button className='LogOutButton'
                                onClick={() => {
                                    signOutUser();
                                    destroyModal();
                                    props.navigator('/authentication');
                                }}>Yes
                        </button>
                        <button className='StayOnPageButton'
                                onClick={handleClose}>No
                        </button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}