import * as React from "react";
import {useContext} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  allowedProfilePicturesTypes,
  loggedInAccount,
  removeProfilePictureForUser,
} from "../../../Services/Feed Services/FeedDrawerService";
import "../../../Styles/Navbar/FeedDrawer.scss";
import "../../../Styles/Navbar/ProfilePictureManagerDialog.scss";
import {Avatar, Divider, ListItem, Slide} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CameraAlt, Cancel, DeleteForever, Upload} from "@mui/icons-material";
import {
  getProfilePictureForLoggedInUser,
  updateProfilePictureWithLocalFileUpload,
  verifyPictureUpload,
} from "../../../Modules/Feed/Navbar/Account Management/AccountManagementModule";
import {ConversationContext} from "../../../Context/ConversationContext";
import {StateManagementContext} from "../../../Context/StateManagementContext";
import {markProfilePhotoRemovalActivity} from "../../../Services/Firebase Service/Feed/FirebaseFeedService";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfilePhotoManager(props) {
  const [open, setOpen] = React.useState(false);
  const {setJoinedUserUpdate} = useContext(StateManagementContext);
  const { dispatch } = useContext(ConversationContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setJoinedUserUpdate(true);
    setOpen(false);
  };

  const removeProfilePicture = async () => {
    await removeProfilePictureForUser();
    props.update();
    setJoinedUserUpdate(true);
    await markProfilePhotoRemovalActivity();
    setTimeout(() => handleClose(), 700);
  };

  const uploadProfilePictureUsingLocalResource = async (e) => {
    const fileToUpload = verifyPictureUpload(e);
    if (fileToUpload !== undefined) {
      await updateProfilePictureWithLocalFileUpload(fileToUpload);
      setJoinedUserUpdate(true);
      props.update();
      const extension = fileToUpload.name.split(`.`)[1].toLowerCase();
      setTimeout(() => handleClose(), 1500);
      if (extension === "jpg") props.update();
    }
  };

  return (
    <div>
      <span
        className="DrawerProfilePicWrapper"
        title="Manage your profile picture"
      >
        <Avatar
          className="DrawerProfilePic"
          onClick={handleClickOpen}
          src={getProfilePictureForLoggedInUser()}
          alt="Profile picture"
          title="Manage your profile picture"
        />
      </span>
      <Dialog
        className="ProfilePictureManagerDialog"
        open={open}
        TransitionComponent={Transition}
        maxWidth="md"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="ManagerDialogTitle">
          {"Manage profile picture"}
        </DialogTitle>
        <DialogContent>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Upload />
              </ListItemIcon>
              <label htmlFor="ChangeProfilePictureInput">
                <input
                  type="file"
                  id="ChangeProfilePictureInput"
                  accept={allowedProfilePicturesTypes}
                  onChange={uploadProfilePictureUsingLocalResource}
                />
                <p className="UploadButton">
                  Upload a picture from your device
                </p>
              </label>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CameraAlt colorRendering={"red"} />
              </ListItemIcon>
              <p className="UploadButton">Upload an instant picture</p>
            </ListItemButton>
          </ListItem>
          <Divider />
          {loggedInAccount.profilePhotoHref === "" ? null : (
            <>
              <ListItem disablePadding onClick={removeProfilePicture}>
                <ListItemButton>
                  <ListItemIcon>
                    <DeleteForever />
                  </ListItemIcon>
                  <p className="DeleteButton">Remove Existing Picture</p>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          )}
          <Divider />
          <ListItem disablePadding onClick={handleClose}>
            <ListItemButton>
              <ListItemIcon>
                <Cancel />
              </ListItemIcon>
              <p className="Cancel">Cancel</p>
            </ListItemButton>
          </ListItem>
          <Divider />
        </DialogContent>
        <div id="ProfilePictureManagementAlerts" />
      </Dialog>
    </div>
  );
}
