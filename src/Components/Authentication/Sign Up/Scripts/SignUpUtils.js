import {React, useState} from "react";
import {authentication} from "../../Misc/Firebase/FirebaseIntegration";
import AlertBox from "../../../General Purpose/Alert/Scripts/AlertBox";
import ReactDOM from "react-dom/client";
const POSTAuthEndpoint=`http://localhost:8080/account`;
let successfullySignedUp=false;


export const resetAuthenticationForm=()=>{
    document.querySelectorAll('.signUpInput').forEach(input=>input.value=``);
}

export const generateAlertsDependingOnStates=(errorCode)=>{
    switch (errorCode){
        case (`auth/email-already-in-use`):{
            return "Sign up failed! The email address you have entered is already used by another ReachMe account! Try another email address!";
        }
        case(`auth/invalid-email`):{
            return "Sign up failed! The email address you have entered is invalid!";
        }
        case (`auth/weak-password`):{
            return "Sign up failed! The password you have chosen is way too waek! We highly recommend you to use a password that contains at least one capital letter (A-Z), one lowercase character (a-z), one symbol (@$#^&) and one numeric character (0-9).";
        }
        default:{
            return `Sign up failed due to an unexpected error. Please try again later.`;
        }
    }
}

export const signUpUser=(name,username,pass,email)=>{
    authentication.createUserWithEmailAndPassword(email,pass)
        .then((userCredential)=>{
            const user=userCredential.user;

            const payloadBody={
                "userFirebaseIndentifier":user.uid,
                "userName":username,
                "profilePhotoHref":"",
                "userRealName":name,
                "emailAddress":email
            };

            const requestOptions={
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payloadBody),
            };

            fetch(POSTAuthEndpoint,requestOptions)
                .then(response=>response.json())
                .then(()=>{})
                .catch(console.log);

            successfullySignedUp=true;
        })
        .catch(error=>{
            const errorCode=error.code;
            console.log(errorCode);
            const div=document.createElement('div');
            const signUp=(document.querySelector('.SignUp'));
            signUp.appendChild(div);
            div.id='errors';
            const elem=document.getElementById('errors');
            const message=generateAlertsDependingOnStates(errorCode);
            const alertBox=<AlertBox isOpen={true} message={message}/>
            const root=ReactDOM.createRoot(document.getElementById('errors'));
            root.render(alertBox);
            setTimeout(()=>elem.remove(),6000);
        });
}
