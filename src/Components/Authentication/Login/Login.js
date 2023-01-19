import {useEffect, useState} from "react";
import '../../../Styles/Authentication/Sign Up/SignUp.scss';
import ImageInput from "../../Forms/Inputs/ImageInput";
import {AlternateEmail, Lock} from "@mui/icons-material";
import PasswordImageInput from "../../Forms/Inputs/PasswordImageInput";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {signUpCredentials} from "../../../Modules/Validation/SignUpValidation";
import {logInCredentials} from "../../../Modules/Validation/LogInValidation";
import {isConnectionAvailable} from "../../../Services/Authentication Services/SignUpService";
import {authentication} from "../../../Modules/Firebase/FirebaseIntegration";
import {displayLogInSuccessAlert, markCurrentUserAsLoggedIn} from "../../../Modules/Log In/LogInModule";
import {displayFirebaseAuthFailureAlert} from "../../../Modules/Sign Up/SignUpUtils";


export default function Login() {
    /*const navigator = useNavigate();*/
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        document.title = 'ReachMe - Log In';
    },);

    const getInputText = (event, className) => {
        switch (className) {
            case 'userOrEmail': {
                logInCredentials.name.userOrEmail = event.target.value;
                break;
            }
            case 'password': {
                logInCredentials.pass = event.target.value;
                break;
            }
            default: {
                return;
            }
        }
    }

    const onLogInButtonPressed = async (e) => {
        e.preventDefault();
        /*if (!wasLoginProcessRedirected()) {
            console.log("nu aici ba");
        }*/

        await logIn();
    }

    const logIn = async () => {
        if (await isConnectionAvailable()) {
            authentication.signInWithEmailAndPassword(logInCredentials.name.userOrEmail, logInCredentials.pass)
                .then(userCredential => {
                    const accountUid = userCredential.user.uid;
                    console.log(accountUid);
                    markCurrentUserAsLoggedIn(accountUid);
                    displayLogInSuccessAlert("You've been logged in successfully!");
                    //navigator('/feed');
                })
                .catch(error => {
                    const errorCode = error.code;
                    console.log(error);
                    displayFirebaseAuthFailureAlert(errorCode);
                });
        }
    }

    return (
        <div className='SignUp'>
            <ImageInput classname='userOrEmail'
                        className='email'
                        type={2}
                        error={nameError}
                        icon={AlternateEmail}
                        inputValue={isObjectEmpty(signUpCredentials) ? '' : signUpCredentials.emailAddress}
                        placeholder={'Username or Email'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <PasswordImageInput classname='password'
                                className='password'
                                error={passwordError}
                                icon={Lock}
                                inputValue={isObjectEmpty(signUpCredentials) ? '' : signUpCredentials.pass}
                                placeholder='Password'
                                adornmentPosition={'start'}
                                getInputText={getInputText}/>

            <button className='AuthButton'
                    onClick={onLogInButtonPressed}
            >Log In
            </button>
        </div>
    );
}