import React, {useEffect, useState} from 'react'
import '../Stylesheets/SignUp.scss'
import './SignUpUtils';
//@TODO import alertBox
import ImageInput from "../../../General Purpose/Inputs/ImageInput";
import MailIcon from "@mui/icons-material/Mail";
import {Lock, Person2, Tag,} from "@mui/icons-material";
import PasswordImageInput from "../../../General Purpose/Inputs/PasswordImageInput";
import {
    displaySignUpSuccessAlert,
    emptyForm, validateEmailAddress, validateName, validatePassword, validateUsername
} from "./SignUpUtils";
import isObjectEmpty from "../../../General Purpose/Objects";
import {authentication} from "../../Misc/Firebase/FirebaseIntegration";
import {saveUserAccountMetadata} from "./SignUpService";
import {Alert} from "@mui/material";
import ReactDOM from 'react-dom/client';

export const signUpCredentials = {
    emailAddress: '', username: '', fullName: '', pass: ''
}

export default function SignUp(props) {

    const [emailError, setEmailError] = useState({});
    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [userNameError, setUserNameError] = useState({});

    useEffect(() => {
        document.title = 'ReachMe - Sign Up';
    }, []);


    const [formValues, setFormValues] = useState(emptyForm);

    const getInputText = (event, className) => {
        switch (className) {
            case `email`:
                signUpCredentials.emailAddress = event.target.value;
                return;
            case `password`:
                signUpCredentials.pass = event.target.value;
                return;
            case `fullName`:
                signUpCredentials.fullName = event.target.value;
                return;
            case `username`:
                signUpCredentials.username = event.target.value;
                return;
            default:
                return;
        }
    }

    const validateSignUpCredentials = () => {
        const nameValidation = validateName(signUpCredentials.fullName);
        if (!isObjectEmpty(nameValidation)) {
            setNameError(nameValidation);
        }
        const emailValidation = validateEmailAddress(signUpCredentials.emailAddress);
        if (!isObjectEmpty(emailValidation)) {
            setEmailError(emailValidation);
        }

        const usernameValidation = validateUsername(signUpCredentials.username);
        if (!isObjectEmpty(usernameValidation)) {
            setUserNameError(usernameValidation);
        }

        const passwordValidation = validatePassword(signUpCredentials.pass);
        if (!isObjectEmpty(passwordValidation)) {
            setPasswordError(passwordValidation);
        }
    }

    const findErrors = () => {
        const errors = [];
        errors.push(emailError);
        errors.push(passwordError);
        errors.push(nameError);
        errors.push(userNameError);

        errors.forEach(err => {
            if (!isObjectEmpty(err)) {
                return true;
            }
        });

        return false;
    }


    const signUp = () => {
        authentication.createUserWithEmailAndPassword(signUpCredentials.emailAddress, signUpCredentials.pass)
            .then((userCredential) => {
                const response = userCredential.user;
                saveUserAccountMetadata(response);
                displaySignUpSuccessAlert();
                //@TODO reset auth form
                setTimeout(() => {
                    props.switchAuthState();
                }, 7000);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSignUpButtonPressed = (e) => {
        console.log(signUpCredentials);
        e.preventDefault();
        validateSignUpCredentials();
        if (!findErrors()) {
            signUp();
        }

    }


    // const [name, setName] = React.useState("");
    // const [username, setUsername] = React.useState("");
    // const [pass, setPass] = React.useState("");
    // const [inputType, setInputType] = React.useState("text");
    //
    // const retrieveEmailAddress = (e) => setEmailAddress(e.currentTarget.value);
    // const retrieveName = (e) => setName(e.currentTarget.value);
    // const retrievePass = (e) => setPass(e.currentTarget.value);
    // const retrieveUsername=(e)=>setUsername(e.currentTarget.value);
    // const showPassword = () => setInputType("password");
    // const hidePassword = () => setInputType("text");
    //
    //
    // //@TODO call this immediately after signUpUser() gets called
    // const generateSuccessSignUpAlert = () => {
    //     const signUpSuccessful = <AlertBox
    //         variant={"filled"}
    //         severity={'success'}
    //         className={'alert'}
    //     >
    //         Account created successfully, {name}! Enjoy the ReachMe app and stay surrounded only by wonderful
    //         people!<br/> You will be automatically redirected to the Log In page once the Sign Up process is complete.
    //         Don't worry, it won't take long!
    //     </AlertBox>
    //     const container = document.createElement('div');
    //     let signUp = document.querySelector('.SignUp');
    //     container.id = `success`;
    //     signUp.appendChild(container);
    //
    //     const root = ReactDOM.createRoot(document.getElementById('success'));
    //     root.render(signUpSuccessful);
    //     setTimeout(() => container.remove(), 8000);
    //     resetAuthenticationForm();
    //     setTimeout(window.location.reload(), 2000);
    // }
    //
    //
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

            {/*<button style={{backgroundColor: "#108e8e", borderRadius: '15px', marginRight: '1em'}}
                    onClick={resetForm}>toggle error
            </button>
            <button style={{backgroundColor: "#108e8e", borderRadius: '15px'}} onClick={simError}>simulate error
            </button>
            <button onClick={resetSignUpForm}>Reset Form</button>*/}
            <button className='AuthButton'
                    onClick={onSignUpButtonPressed}
            >Sign Up
            </button>
        </form>
    </div>)
}





