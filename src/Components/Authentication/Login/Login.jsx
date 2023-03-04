import {useEffect, useState} from "react";
import '../../../Styles/Authentication/Sign Up/SignUp.scss';
import ImageInput from "../../Forms/Inputs/ImageInput";
import {AlternateEmail, Lock} from "@mui/icons-material";
import PasswordImageInput from "../../Forms/Inputs/PasswordImageInput";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {signUpCredentials} from "../../../Modules/Validation/SignUpValidation";
import {determineLoginType, logInCredentials} from "../../../Modules/Validation/LogInValidation";
import {wasLoginProcessRedirected} from "../../../Modules/Log In/LogInModule";
import {buildError} from "../../../Modules/Sign Up/SignUpUtils";
import {validatePassword} from "../../../Modules/Validation/AuthValidationBase";
import {logInUser} from "../../../Services/Authentication Services/LogInService";


export default function Login(props) {
    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    let canLogIn = true;

    useEffect(() => {
        document.title = 'ReachMe - Log In';
        logInCredentials.name.userOrEmail = props.loginCredentials.email;
        logInCredentials.name.type = `email`;
        logInCredentials.pass = props.loginCredentials.pass;
        console.log(`I'm in the hook`);
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

    const validateLoginCredentials = () => {
        determineLoginType();
        if (logInCredentials.name.type === 'unknown') {
            canLogIn = false;
            const error = buildError("Invalid email or username provided!");
            setNameError(error);
        }

        const passValidation = validatePassword(logInCredentials.pass);
        if (!isObjectEmpty(passValidation)) {
            canLogIn = false;
            setPasswordError(passValidation);
        }
    }

    const onLogInButtonPressed = async (e) => {
        e.preventDefault();
        if (!wasLoginProcessRedirected()) {
            validateLoginCredentials();
        }

        if (canLogIn) {
            await logInUser();
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