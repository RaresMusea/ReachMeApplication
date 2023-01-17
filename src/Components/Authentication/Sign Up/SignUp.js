import React, {useEffect, useState} from 'react'
import '../../../Styles/Authentication/Sign Up/SignUp.scss'
import '../../../Modules/Sign Up/SignUpUtils';
import ImageInput from "../../Forms/Inputs/ImageInput";
import MailIcon from "@mui/icons-material/Mail";
import {Lock, Person2, Tag,} from "@mui/icons-material";
import PasswordImageInput from "../../Forms/Inputs/PasswordImageInput";
import {
    displayFirebaseAuthFailureAlert,
    displaySignUpFailedAlert,
    setSignUpCredentialFromFormValue,
} from "../../../Modules/Sign Up/SignUpUtils";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {authentication} from "../../../Modules/Firebase/FirebaseIntegration";
import {
    accountWithSameCredentialsAlreadyExists,
    isConnectionAvailable,
    saveUserAccountMetadata
} from "../../../Services/Authentication Services/SignUpService";
import {signUpCredentials, validateName} from "../../../Modules/Validation/SignUpValidation";
import {validateEmailAddress, validatePassword, validateUsername} from "../../../Modules/Validation/AuthValidationBase";

export default function SignUp(props) {

    const [emailError, setEmailError] = useState({});
    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [userNameError, setUserNameError] = useState({});
    let canSignUp = true;
    let userInUse = false;

    useEffect(() => {
        document.title = 'ReachMe - Sign Up';
    },);

    const getInputText = (event, className) => {
        setSignUpCredentialFromFormValue(className, event.target.value);
    }

    const validateSignUpCredentials = () => {
        const nameValidation = validateName(signUpCredentials.fullName);
        if (!isObjectEmpty(nameValidation)) {
            setNameError(nameValidation);
            canSignUp = false;
        }
        const emailValidation = validateEmailAddress(signUpCredentials.emailAddress);
        if (!isObjectEmpty(emailValidation)) {
            setEmailError(emailValidation);
            canSignUp = false;
        }

        const usernameValidation = validateUsername(signUpCredentials.username);
        if (!isObjectEmpty(usernameValidation)) {
            setUserNameError(usernameValidation);
            canSignUp = false;
        }

        const passwordValidation = validatePassword(signUpCredentials.pass);
        if (!isObjectEmpty(passwordValidation)) {
            setPasswordError(passwordValidation);
            canSignUp = false;
        }
    }

    const signUp = async () => {
        if (await isConnectionAvailable()) {
            if (!accountWithSameCredentialsAlreadyExists()) {
                userInUse = false;
                authentication.createUserWithEmailAndPassword(signUpCredentials.emailAddress, signUpCredentials.pass)
                    .then((userCredential) => {
                        const response = userCredential.user;
                        saveUserAccountMetadata(response);
                        setTimeout(() => {
                            props.switchAuthState();
                            props.updateLoginCredentials({
                                "email": signUpCredentials.emailAddress,
                                "pass": signUpCredentials.pass
                            })
                        }, 7000);
                    })
                    .catch(err => {
                        displayFirebaseAuthFailureAlert(err.code);
                    })
            } else {
                userInUse = true;
            }
        }
    }

    const onSignUpButtonPressed = async (e) => {
        e.preventDefault();
        validateSignUpCredentials();
        if (canSignUp) {
            await signUp();
        } else {
            if (!(localStorage.getItem("connection") === "false") && !userInUse) {
                displaySignUpFailedAlert(`Sign up failed due to an input mismatch!`);
            }
            canSignUp = true;
        }

    }

    return (<div className='SignUp'>
        <form>
            <ImageInput classname='fullName'
                        className='fullName'
                        type={2}
                        error={nameError}
                        inputValue={""}
                        icon={Person2}
                        placeholder={'First name & Last name'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <ImageInput classname='email'
                        className='email'
                        type={2}
                        inputValue={""}
                        error={emailError}
                        icon={MailIcon}
                        placeholder={'Email address'}
                        adornmentPosition={'start'}
                        fontFamily={'PT Sans'}
                        getInputText={getInputText}/>

            <ImageInput classname='username'
                        className='username'
                        type={2}
                        inputValue={""}
                        error={userNameError}
                        icon={Tag}
                        placeholder={'ReachMe username'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <PasswordImageInput classname='password'
                                className='password'
                                inputValue={""}
                                placeholder={'Password'}
                                icon={Lock}
                                error={passwordError}
                                adornmentPosition={'start'}
                                getInputText={getInputText}/>
            <button className='AuthButton'
                    onClick={onSignUpButtonPressed}>
                Sign Up
            </button>
        </form>
    </div>)
}





