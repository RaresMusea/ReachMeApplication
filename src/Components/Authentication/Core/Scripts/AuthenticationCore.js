import React, {Component, useEffect, useRef} from "react";
import Grid from '@mui/material/Grid';
import connection from '../../../../Media/Images/logoPic.jpg';
import '../Stylesheets/AuthenticationCore.scss';
import SignUp from "../../Sign Up/Scripts/SignUp";
import logoPic from '../../../../Media/Images/logoPic.svg';
import googleLogo from '../../../../Media/Images/google.svg';
import {setRef} from "@mui/material";
import Login from "../../Login/Scripts/Login";

export default function AuthenticationCore(props) {

    const [userLogged, setUserLogged] = React.useState(false);

    const switchAuthState = () => {
        setUserLogged(!userLogged);
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
                    <div className='AuthContainer'>
                        <div className='LogoWrapper'>
                            <img src={logoPic}
                                 alt='Logo'
                                 className="ReachMeLogoImage"/>
                            <h1 className='LogoText'>ReachMe</h1>
                        </div>
                        <h3 className="Subtitle">The social media app that fulfills your needs.</h3>
                        <h4 className="InfoMessage">{userLogged?"Sign in to continue":"Register on ReachMe"}</h4>
                        <section className="Authentication">
                            {userLogged ? <Login/> : <SignUp/>}
                            <div className="SeparatorContainer">
                                <div className="LineSeparator"/>
                                <div className="Or">OR</div>
                                <div className="LineSeparator"/>
                            </div>
                            {userLogged?
                            <section>
                                <h4 className="HeadingFour">Forgot password?</h4>
                            </section>
                                :
                                <div className="FlexWrapper">
                                    <img src={googleLogo} alt="Google Logo" className="GoogleLogo"/>
                                    <h4 className="HeadingFour">Sign up using your Google Account</h4>
                                </div>
                            }
                        </section>
                        <section className="DynamicAuth">
                            {userLogged?
                            <p className='Up'>Don't you have an account?<span> Sign up!</span></p>
                            :null
                            }
                        </section>
                    </div>
                </main>
            </Grid>
            <Grid item xs={1}/>
        </Grid>
    )

}