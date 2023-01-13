import {React, useState} from 'react'
import '../Stylesheets/SignUp.scss'
import './SignUpUtils';
//@TODO import alertBox
import ImageInput from "../../../General Purpose/Inputs/ImageInput";
import MailIcon from "@mui/icons-material/Mail";
import {Lock, Person2, Tag,} from "@mui/icons-material";


export default function SignUp() {

    const [name, setName] = useState("");
    const [inputType, setInputType] = useState("");
    const [emailError, setEmailError] = useState({});
    const [nameError, setNameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [userNameError, setUserNameError] = useState({});

    const getInputText = (event, className) => {
        setInputType(className);
        if (inputType === 'email') {
            setName(event.target.value);
            console.log(name);
        }
    }

    const resetForm = () => {
        setEmailError({});
    }

    const simError = () => {
        const errorRef = {
            'message': 'Invalid email address',
            'hasErrors': true
        };
        setEmailError(errorRef);
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
    return (
        <div className='SignUp'>
            {/* <input type='email'
                   className='AuthenticationInput'
                   placeholder='Email address'
                   />

            <input type='text'
                   className='AuthenticationInput'
                   placeholder='First Name & Last Name'
                   />*/}
            <ImageInput classname='fullName'
                        className='fullName'
                        type={2}
                        error={nameError}
                        icon={Person2}
                        placeholder={'First name & Last name'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <ImageInput classname='email'
                        className='email'
                        type={2}
                        error={emailError}
                        icon={MailIcon}
                        placeholder={'Email address'}
                        adornmentPosition={'start'}
                        fontFamily={'PT Sans'}
                        getInputText={getInputText}/>

            <ImageInput classname='username'
                        className='username'
                        type={2}
                        error={userNameError}
                        icon={Tag}
                        placeholder={'ReachMe username'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>

            <ImageInput classname='password'
                        className='password'
                        type={2}
                        error={passwordError}
                        icon={Lock}
                        placeholder={'Password'}
                        adornmentPosition={'start'}
                        getInputText={getInputText}/>
            <button style={{backgroundColor: "#108e8e", borderRadius: '15px', marginRight: '1em'}}
                    onClick={resetForm}>toggle error
            </button>
            <button style={{backgroundColor: "#108e8e", borderRadius: '15px'}} onClick={simError}>simulate error
            </button>
            <p>{name}</p>
        </div>
    )
}





