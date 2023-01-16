import {useEffect, useState} from "react";
import '../../Sign Up/Stylesheets/SignUp.scss';
import ImageInput from "../../../General Purpose/Inputs/ImageInput";
import {AlternateEmail, Lock} from "@mui/icons-material";
import PasswordImageInput from "../../../General Purpose/Inputs/PasswordImageInput";
import isObjectEmpty from "../../../General Purpose/Objects";


export default function Login(props) {

    const [inputType, setInputType] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        document.title = 'ReachMe - Log In'
        if (!isObjectEmpty(props.loginCredentials)) {
            setCredentials(props.loginCredentials);
        }
    }, [props.loginCredentials]);

    const getInputText = (event, className) => {
        setInputType(className);
        if (inputType === 'email') {
            setName(event.target.value);
            console.log(name);
        }
    }

    const onLogInButtonPressed=()=>{

    }

    return (
        <div className='SignUp'>
            <ImageInput classname='email'
                        className='email'
                        type={2}
                        error={nameError}
                        icon={AlternateEmail}
                        inputValue={credentials.email}
                        placeholder={'Username or Email'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <PasswordImageInput classname='password'
                                className='password'
                                error={passwordError}
                                icon={Lock}
                                inputValue={credentials.pass}
                                placeholder='Password'
                                adornmentPosition={'start'}
                                getInputText={getInputText}/>

            <button className='AuthButton'
                    onClick={onLogInButtonPressed}
            >Log In</button>
        </div>
    );
}