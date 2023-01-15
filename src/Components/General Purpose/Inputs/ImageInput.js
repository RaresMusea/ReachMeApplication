import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import './ImageInput.scss';
import {ThemeProvider} from "@mui/material";
import isObjectEmpty from "../Objects";
import {theme, styles} from "./InputTheme";
import {useEffect, useState} from "react";


export default function ImageInput(props) {
    const [name, setName] = React.useState("");
    const [inputValue,setInputValue]=useState(props.inputValue);
    const [focus, setFocus] = React.useState("action.active");
    const [error, setError]=useState(props.error);

/*    const onInputChanged = (event) => {
        setInputValue(event.target.value);
    }*/

    useEffect(()=>{
        if(!isObjectEmpty(props.error)){
            setError(props.error);
        }
    }, [props.error])
    
    const focused = (e) => {
        if(error['hasErrors']){
            //setInputValue("");
        }
        setFocus("#094561");
    }

    const blurred = () => {
        setFocus("action.active");
    }

    return (

        <>
            {props.type === 1 ?
                <ThemeProvider theme={theme}>
                    <Box>
                        <TextField label="TextField"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position={props.adornmentPosition}>
                                        <props.icon sx={{color:focus, mr: 1, my: 0.5}}/>
                                    </InputAdornment>
                                ),
                                classes: {
                                    input: styles.textInput
                                },

                            }}
                            variant="standard"
                            error={isObjectEmpty(props.error) ? undefined : true}
                            helperText={(isObjectEmpty(error) || !error['hasErrors']) ? undefined : error['message']}
                            onChange={(e) => {
                                props.getInputText(e, props.classname);
                                setInputValue(e.target.value);

                                if(error['hasErrors']){
                                    setError({});
                                }
                            }}
                            value={inputValue}
                            onFocus={focused}
                            onBlur={blurred}
                        />
                    </Box>
                </ThemeProvider>
                :
                <ThemeProvider theme={theme}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent:'center',mb:1.8}}>
                        <props.icon sx={{color: focus, mr: 1, my:!isObjectEmpty(error)?2.9:0.5}}/>
                        <TextField label={props.placeholder}
                                   sx={{width: {sm: 200, md:300, lg: 400}, fontWeight: "bolder",}}
                                   error={isObjectEmpty(error) ? undefined : true}
                                   helperText={(isObjectEmpty(error) || !error['hasErrors']) ? undefined : error['message']}
                                   InputProps={{
                                       classes: {
                                           input: styles.textInput,
                                       }
                                   }}
                                   variant="standard"
                                   className='text-field'
                                   onChange={(e) => {
                                       if(error['hasErrors']){
                                           setError({});
                                       }

                                       props.getInputText(e, props.classname);
                                       console.log(props.classname);
                                       setInputValue(e.target.value);
                                       //console.log("Input value: "+inputValue);
                                   }}
                                   value={inputValue}
                                   onFocus={focused}
                                   onBlur={blurred}
                        />
                    </Box>
                </ThemeProvider>
            }
        </>
    );
}