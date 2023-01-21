import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import connection from '../../../Media/Images/logoPic.jpg';
import '../../../Styles/Authentication/Core/AuthenticationCore.scss';
import SignUp from "../Sign Up/SignUp";
import logoPic from '../../../Media/Images/logoPic.svg';
import googleLogo from '../../../Media/Images/google.svg';
import Login from "../Login/Login";
import lottie from "lottie-web";
import lottieAnimation from "../../../Modules/Animation Control/Lottie/ReachMeAnimation.json";
import InputDialog from "../../Forms/Inputs/InputDialog";
import {resetPasswordDialogProps} from "../../../Modules/Object/ComponentProps";
import {validateEmailAddress} from "../../../Modules/Validation/AuthValidationBase";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {userExists} from "../../../Modules/Session/CurrentSessionModule";
import {resetPasswordViaEmail} from "../../../Services/Authentication Services/LogInService";

export let emailForPassReset;
export default function AuthenticationCore(props) {

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector('#LogoAnimation'),
            animationData: lottieAnimation
        });
        return () => lottie.destroy();
    }, []);

    const [userLogged, setUserLogged] = useState(false);
    const [passwordResetError, setPasswordResetError] = useState({});
    const [passwordModalForceClose, setPasswordModalForceClose] = useState(false);
    let loginInfo = {};

    const switchAuthState = () => {
        setUserLogged(!userLogged);
    }

    const updateLoginCredentials = (credentials) => {
        loginInfo = credentials;
        console.log(loginInfo);
    }

    const retrieveEmailAddressFromPasswordResetDialog = (event) => {
        emailForPassReset = event.target.value;
        console.log(emailForPassReset);
    }

    const requestPasswordReset = async () => {
        setPasswordModalForceClose(false);
        const emailValidation = validateEmailAddress(emailForPassReset);

        if (!isObjectEmpty(emailValidation)) {
            setPasswordResetError(emailValidation);
            return;
        }
        if (userExists()) {
            localStorage.removeItem("userRequestingPasswordResetExists");
            await resetPasswordViaEmail();
        }
        setPasswordModalForceClose(true);
    }

    return (
        <Grid container className='Wrapper'>
            <Grid item xs={1}/>
            <Grid item xs={10}>
                <main className='Main'>
                    <div className='AuthShowOff'>
                        <img src={connection}
                             alt='Landing Social'
                             className='AuthImage'/>
                    </div>
                    <div className='FlexColumnGroupMobile'>
                        <div className='AuthContainer'>
                            <div className='LogoWrapper'>
                                <div id="LogoAnimation">
                                    <img src={logoPic}
                                         alt='Logo'
                                         className="ReachMeLogoImage"/>
                                </div>
                                <h1 className='LogoText'>ReachMe</h1>
                            </div>
                            <h3 className="Subtitle">The social media app that fulfills your needs.</h3>
                            <h4 className="InfoMessage">{userLogged ? "Log in to continue" : "Register on ReachMe"}</h4>
                            <section className="Authentication">
                                {userLogged ?
                                    <Login loginCredentials={loginInfo}
                                           navigate={props.navigate}
                                           navigateToFeed={props.navigateToFeed}/> :
                                    <SignUp switchAuthState={switchAuthState}
                                            updateLoginCredentials={updateLoginCredentials}/>}
                                <div className="SeparatorContainer">
                                    <div className="LineSeparator"/>
                                    <div className="Or">OR</div>
                                    <div className="LineSeparator"/>
                                </div>
                                {userLogged ?
                                    <section className='ForgotPasswordSection'>
                                        {/*<h4 className="HeadingFour"
                                            style={{
                                                cursor: "pointer"
                                            }}>Forgot password?</h4>*/}
                                        <InputDialog dialogTitle={resetPasswordDialogProps.dialogTitle}
                                                     dialogMessage={resetPasswordDialogProps.dialogMessage}
                                                     actionName={resetPasswordDialogProps.actionName}
                                                     error={passwordResetError}
                                                     task={requestPasswordReset}
                                                     forceClose={passwordModalForceClose}
                                                     retrieveValue={retrieveEmailAddressFromPasswordResetDialog}/>
                                    </section>
                                    :
                                    <div className="FlexWrapper">
                                        <img src={googleLogo} alt="Google Logo" className="GoogleLogo"/>
                                        <h4 className="HeadingFour">Sign up using your Google Account</h4>
                                    </div>
                                }

                            </section>
                        </div>
                        <div id='errors'/>
                        <div className='AdditionalAuthContainer' style={{
                            marginTop: userLogged ? '4em' : '.5em'
                        }}>
                            {userLogged ?
                                <p className='ChangeContextText'>
                                    Don't you have an account?&nbsp;
                                    <span className="ContextOptions"
                                          onClick={switchAuthState}>
                                Sign Up!
                            </span>
                                </p>
                                :
                                <p className='ChangeContextText'>
                                    Have an account already?&nbsp;
                                    <span className="ContextOptions"
                                          onClick={switchAuthState}>
                                    Sign In!
                                </span>
                                </p>
                            }
                        </div>
                    </div>
                </main>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    )
}