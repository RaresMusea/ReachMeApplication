import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import './ImageInput.scss';
import {ThemeProvider} from "@mui/material";
import isObjectEmpty from "../Objects";
import {theme, styles} from "./InputTheme";




export default function ImageInput(props) {
    const [value, setValue] = React.useState("action.active");
    const [name, setName] = React.useState("");


    const handleChange = (e) => {
        setName(e.target.value);
    }

    const onInputChanged = (event) => {
        setValue(event.target.value);
    }

    const [focus, setFocus] = React.useState("action.active");

    const focused = () => {
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
                        <TextField
                            id="input-with-icon-textfield"
                            label="TextField"
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
                            helperText={(isObjectEmpty(props.error) || !props.error['hasErrors']) ? undefined : props.error['message']}
                            onChange={(e) => {
                                props.getInputText(e, props.classname)
                            }}
                            onFocus={focused}
                            onBlur={blurred}
                        />
                    </Box>
                </ThemeProvider>
                :
                <ThemeProvider theme={theme}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent:'center',mb:1.8}}>
                        <props.icon sx={{color: focus, mr: 1, my:!isObjectEmpty(props.error)?2.9:0.5}}/>
                        <TextField id="input-with-sx"
                                   label={props.placeholder}
                                   sx={{width: {sm: 200, md:300, lg: 400}, fontWeight: "bolder"}}
                                   error={isObjectEmpty(props.error) ? undefined : true}
                                   helperText={(isObjectEmpty(props.error) || !props.error['hasErrors']) ? undefined : props.error['message']}
                                   InputProps={{
                                       classes: {
                                           input: styles.textInput,
                                       }
                                   }}
                                   variant="standard"
                                   className='text-field'
                                   onChange={(e) => {
                                       props.getInputText(e, props.classname)
                                   }}
                                   onFocus={focused}
                                   onBlur={blurred}
                        />
                    </Box>
                </ThemeProvider>
            }
        </>
    );
}