import {Dialog, Divider, ListItem, ListItemIcon, Slide} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import {AccountBox, TagFaces} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {forwardRef, useState} from "react";
import '../../../Styles/Navbar/FeedDrawer.scss';
import ImageInput from "../../Forms/Inputs/ImageInput";
import {modifiedAccountDetails} from "../../../Modules/Object/AccountInfoManagementObjects";
import {loggedInAccount, updateUserIdentity} from "../../../Services/Feed Services/FeedDrawerService";
import TextArea from "../../Forms/Inputs/TextArea";
import {
    checkForIdenticalRealNamesBeforeUpdate,
    checkForIdenticalUserNamesBeforeUpdate,
    renderFailureAlertWhenCredentialsAreIdentical,
    updateBioForUser
} from "../../../Modules/FeedModule";
import {validateName} from "../../../Modules/Validation/SignUpValidation";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {validateUsername} from "../../../Modules/Validation/AuthValidationBase";
import GenericModal from "../../Modals/GenericModal";

const RightMoveTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props}/>;
});

export let textareaBio;
export let canPerformIdentityUpdate = false;
export let credentialsWereModified = false;
modifiedAccountDetails.userRealName = loggedInAccount.userRealName;
modifiedAccountDetails.username = loggedInAccount.userName;

export default function ProfileInfoManager(props) {

    const [open, setOpen] = useState(false);
    const [reset, setReset] = useState(false);
    const [nameError, setNameError] = useState({});
    const [usernameError, setUsernameError] = useState({});
    const [bioAdded, setBioAdded] = useState(loggedInAccount.bio !== "empty");
    const [formTouched, setFormTouched] = useState(false);
    textareaBio = loggedInAccount.bio;

    const handleClickOpen = () => {
        setOpen(true);
        props.toggleOption();
    };

    const handleClose = (event, reason) => {
        if (reason && (reason === "backdropClick" || reason === "keyPress")) {
            return;
        }
        resetFields();
        setOpen(false);
        props.toggleOption();
    };

    const getInputValue = (event, className) => {
        switch (className) {
            case `name`: {
                modifiedAccountDetails.userRealName = event.target.value;
                credentialsWereModified = true;
                setFormTouched(true);
                break;
            }
            case `username`: {
                modifiedAccountDetails.username = event.target.value;
                credentialsWereModified = true;
                setFormTouched(true);
                break;
            }
        }
    }
    const getTextAreaValue = (event) => {
        textareaBio = event.target.value;
        console.log(textareaBio === loggedInAccount.bio);
    }

    const updateBio = async () => {

        await updateBioForUser();
        props.scheduleUpdate();
        console.log("bio after update: " + textareaBio);
        if (textareaBio === "") {
            setBioAdded(false);
            return;
        }
        setBioAdded(true);
    }

    const resetFields = () => {
        setUsernameError({});
        setNameError({});
        setReset(true);
        setFormTouched(false);
        credentialsWereModified = false;
    }

    const turnOffReset = () => {
        setReset(false);
    }

    const saveChanges = async () => {
        validateCredentials();

        if (canPerformIdentityUpdate) {
            await updateUserIdentity();
            props.scheduleUpdate();
            setTimeout(() => handleClose(), 1000);
        }
    }

    const validateCredentials = () => {
        canPerformIdentityUpdate = true;

        const sameRealNameValidation = checkForIdenticalRealNamesBeforeUpdate();
        if (!isObjectEmpty(sameRealNameValidation)) {
            setNameError(sameRealNameValidation);
            canPerformIdentityUpdate = false;
        }

        const sameUserNameValidation = checkForIdenticalUserNamesBeforeUpdate();
        if (!isObjectEmpty(sameUserNameValidation)) {
            setUsernameError(sameUserNameValidation);
            canPerformIdentityUpdate = false;
        }

        if (!isObjectEmpty(sameRealNameValidation) || !isObjectEmpty(sameUserNameValidation)) {
            renderFailureAlertWhenCredentialsAreIdentical();
            return;
        }

        const realNameValidation = validateName(modifiedAccountDetails.userRealName);
        if (!isObjectEmpty(realNameValidation)) {
            setNameError(realNameValidation);
            canPerformIdentityUpdate = false;
        }

        const usernameValidation = validateUsername(modifiedAccountDetails.username);
        if (!isObjectEmpty(usernameValidation)) {
            setUsernameError(usernameValidation);
            canPerformIdentityUpdate = false;
        }

    }

    return (
        <div className='ProfileInfoManager'>
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
                                reset={reset}
                                turnOffReset={turnOffReset}
                                icon={AccountBox}
                                inputValue={loggedInAccount.userRealName}
                                placeholder={'Name'}
                                adornmentPosition={'start'}
                                getInputText={getInputValue}/>
                    <ImageInput classname='username'
                                type={2}
                                error={usernameError}
                                icon={TagFaces}
                                reset={reset}
                                turnOffReset={turnOffReset}
                                inputValue={loggedInAccount.userName}
                                placeholder={'Username'}
                                adornmentPosition={'start'}
                                getInputText={getInputValue}
                    />
                    {bioAdded ?
                        <TextArea textareaLabel={"Your account bio"}
                                  textareaPlaceholder={"Update your bio here"}
                                  textareaButtonText={"Update bio"}
                                  value={loggedInAccount.bio}
                                  reset={reset}
                                  turnOffReset={turnOffReset}
                                  getText={getTextAreaValue}
                                  action={updateBio}
                        />
                        :
                        <TextArea textareaLabel={"Add a bio to your profile"}
                                  textareaPlaceholder={"Type your bio here"}
                                  textareaButtonText={"Add bio"}
                                  value={""}
                                  reset={reset}
                                  turnOffReset={turnOffReset}
                                  getText={getTextAreaValue}
                                  action={updateBio}
                        />
                    }

                    <div className="Buttons">
                        <button className="AdditionalManagementButton"
                                style={{marginTop: '5em'}}
                                onClick={saveChanges}
                        >Save changes
                        </button>
                        <button className="AdditionalManagementButton" onClick={resetFields}>Revert changes</button>
                        {
                            formTouched ?
                                <GenericModal triggerButtonClassName={"AdditionalManagementButton"}
                                              triggerButtonText={"Close"}
                                              modalTitle={"ReachMe - Account Info Management"}
                                              modalQuestion={"There are some modifications that were not applied yet."}
                                              additionalInformation={"Are you sure that you want to close this window? " +
                                                  "All of your modifications will be lost."}
                                              cancelButtonText={"Cancel"}
                                              actionButtonText={"Close anyway"}
                                              action={handleClose}/>
                                :
                                <button className="AdditionalManagementButton" onClick={() => {
                                    handleClose()
                                }}>Close
                                </button>
                        }
                        <button className="AdditionalManagementButton LastAdditionalButton">More account settings
                        </button>
                    </div>
                    <Divider/>
                </DialogContent>
                <div id="ProfileInfoManagementAlerts"/>
                <div id="ProfileInfoSuccessAlerts"/>
            </Dialog>
        </div>
    );
}