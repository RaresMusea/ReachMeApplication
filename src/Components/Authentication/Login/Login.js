import {useState} from "react";
import '../../../Styles/Authentication/Sign Up/SignUp.scss';
import ImageInput from "../../Forms/Inputs/ImageInput";
import {AlternateEmail, Lock} from "@mui/icons-material";
import PasswordImageInput from "../../Forms/Inputs/PasswordImageInput";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {signUpCredentials} from "../../../Modules/Validation/SignUpValidation";
import {logInCredentials} from "../../../Modules/Validation/LogInValidation";


export default function Login(props) {

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");


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

    const onLogInButtonPressed=()=>{

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
            >Log In</button>
        </div>
    );
}