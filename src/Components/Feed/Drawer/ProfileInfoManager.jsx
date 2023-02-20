import {Dialog, Divider, ListItem, ListItemIcon, Slide} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import {AccountBox, Email} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {forwardRef, useState} from "react";
import '../../../Styles/Navbar/FeedDrawer.scss';
import ImageInput from "../../Forms/Inputs/ImageInput";
import {modifiedAccountDetails} from "../../../Modules/Object/AccountInfoManagementObjects";
import {loggedInAccount} from "../../../Services/Feed Services/FeedDrawerService";
import TextArea from "../../Forms/Inputs/TextArea";

const RightMoveTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props}/>;
});

export default function ProfileInfoManager(props) {

    const [open, setOpen] = useState(false);
    const [nameError, setNameError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [usernameError, setUsernameError] = useState({});
    let textareaBio = ``;

    const handleClickOpen = () => {
        setOpen(true);
        props.toggleOption();
    };

    const handleClose = (event, reason) => {
        if (reason && (reason === "backdropClick" || reason === "keyPress")) {
            return;
        }
        setOpen(false);
    };

    const getInputValue = (event, className) => {
        switch (className) {
            case `name`: {
                modifiedAccountDetails.userRealName = event.target.value;
                break;
            }
            case `username`: {
                modifiedAccountDetails.username = event.target.value;
                break;
            }
        }
    }

    const getTextAreaValue = (event) => {
        textareaBio = event.target.value;
    }

    return (
        <>
            <ListItem key="accountManagement" disablePadding
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ListItemButton alignItems="center" onClick={handleClickOpen}>
                    <ListItemIcon>
                        <AccountBox/>
                    </ListItemIcon>
                    <div className="ListItemText">Manage Account Info</div>
                </ListItemButton>
            </ListItem>
            <Dialog
                className='ProfileInfoManagementDialog'
                open={open}
                TransitionComponent={RightMoveTransition}
                maxWidth="md"
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="ManagerDialogTitle">
                    {"Manage your account info"}
                </DialogTitle>
                <DialogContent>
                    <Divider style={{marginBottom: '1em'}}/>
                    <ImageInput classname='name'
                                type={2}
                                error={nameError}
                                icon={AccountBox}
                                inputValue={loggedInAccount.userRealName}
                                placeholder={'Name'}
                                adornmentPosition={'start'}
                                getInputText={getInputValue}/>
                    <ImageInput classname='username'
                                type={2}
                                error={usernameError}
                                icon={Email}
                                inputValue={loggedInAccount.userName}
                                placeholder={'Username'}
                                adornmentPosition={'start'}
                                getInputText={getInputValue}
                    />
                    <TextArea textareaLabel={"Add a bio to your profile"}
                              textareaPlaceholder={"Type your bio here"}
                              textareaButtonText={"Add bio"}
                              getText={getTextAreaValue}
                    />

                    <button style={{marginTop: '5em'}}>Save changes</button>
                    <br/>
                    <button>Reset</button>
                    <br/>
                    <button>More account settings</button>
                    <br/>
                    <Divider/>
                </DialogContent>
                <div id="ProfilePictureManagementAlerts"/>
            </Dialog>
        </>
    );
}