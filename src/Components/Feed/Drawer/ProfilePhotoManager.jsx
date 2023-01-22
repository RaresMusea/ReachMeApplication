import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {loggedInAccount, removeProfilePictureForUser} from "../../../Services/Feed Services/FeedDrawerService";
import '../../../Styles/Navbar/FeedDrawer.scss';
import '../../../Styles/Navbar/ProfilePictureManagerDialog.scss';
import {Divider, ListItem} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CameraAlt, Cancel, DeleteForever, Upload} from "@mui/icons-material";
import {
    getProfilePictureForLoggedInUser
} from "../../../Modules/Feed/Navbar/Account Management/AccountManagementModule";


/*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom timeout={500} ref={ref} {...props}  children={{name:"John"}}/>;
});*/

export default function ProfilePhotoManager(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeProfilePicture = () => {
        removeProfilePictureForUser();
        props.update();
    }

    return (
        <div>
            <span className='DrawerProfilePicWrapper' title='Manage your profile picture'>
                <img className='DrawerProfilePic'
                     onClick={handleClickOpen}
                     src={getProfilePictureForLoggedInUser()}
                     alt='Circ'
                     title='Manage your profile picture'/>
            </span>
            <Dialog
                className='ProfilePictureManagerDialog'
                open={open}
                maxWidth="md"
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="ProfilePictureManagerTitle">
                    {"Manage profile picture"}
                </DialogTitle>
                <DialogContent>
                    <Divider/>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Upload/>
                            </ListItemIcon>
                            <p className="UploadButton">Upload a picture from your device</p>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CameraAlt colorRendering={"red"}/>
                            </ListItemIcon>
                            <p className="UploadButton">Upload an instant picture</p>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                    {loggedInAccount.profilePhotoHref === "" ? null :
                        <>
                            <ListItem disablePadding
                                      onClick={removeProfilePicture}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DeleteForever/>
                                    </ListItemIcon>
                                    <p className="DeleteButton">Remove Existing Picture</p>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </>
                    }
                    <Divider/>
                    <ListItem disablePadding
                              onClick={handleClose}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <Cancel/>
                            </ListItemIcon>
                            <p className="Cancel">Cancel</p>
                        </ListItemButton>
                    </ListItem>
                    <Divider/>
                </DialogContent>
                <div id="ProfilePictureManagementAlerts"/>
            </Dialog>
        </div>

    );
}