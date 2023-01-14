import {useEffect, useState} from "react";
import '../../Sign Up/Stylesheets/SignUp.scss';
import ImageInput from "../../../General Purpose/Inputs/ImageInput";
import {Person2} from "@mui/icons-material";


export default function Login(){

    const [inputType, setInputType]=useState("");
    const [name, setName]=useState("");
    const [nameError, setNameError]=useState("");

    useEffect(()=>{
        document.title='ReachMe - Log In'
    },[]);

    const getInputText = (event, className) => {
        setInputType(className);
        if (inputType === 'email') {
            setName(event.target.value);
            console.log(name);
        }
    }

    return(
    <div className='SignUp'>
        <ImageInput classname='fullName'
                    className='fullName'
                    type={2}
                    error={nameError}
                    icon={Person2}
                    placeholder={'First name & Last name'}
                    adornmentPosition={'start'}
                    getInputText={getInputText}/>
    </div>
    );
}