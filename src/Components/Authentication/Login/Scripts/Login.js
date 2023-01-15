import {useEffect, useState} from "react";
import '../../Sign Up/Stylesheets/SignUp.scss';
import ImageInput from "../../../General Purpose/Inputs/ImageInput";
import {AlternateEmail, Lock} from "@mui/icons-material";
import PasswordImageInput from "../../../General Purpose/Inputs/PasswordImageInput";


export default function Login() {

    const [inputType, setInputType] = useState("");
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        document.title = 'ReachMe - Log In'
    }, []);

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
                        placeholder={'Username or Email'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <PasswordImageInput classname='password'
                                className='password'
                                error={passwordError}
                                icon={Lock}
                                placeholder='Password'
                                adornmentPosition={'start'}
                                getInputText={getInputText}/>

            <button className='AuthButton'
                    onClick={onLogInButtonPressed}
            >Log In</button>
        </div>
    );
}