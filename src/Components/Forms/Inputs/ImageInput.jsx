import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import '../../../Styles/Forms/Input/ImageInput.scss';
import {ThemeProvider} from "@mui/material";
import {isObjectEmpty} from "../../../Modules/Object/ObjectModule";
import {styles, theme} from "../../../Modules/Themes/InputTheme";
import useInputValue from "../../../Hooks/Forms/useInputValue";

export default function ImageInput(props) {
    const {inputValue, setInputValue} = useInputValue(props.inputValue);
    const [focus, setFocus] = React.useState("action.active");
    const [error, setError] = useState(props.error);

    useEffect(() => {
        if (!isObjectEmpty(props.error)) {
            setError(props.error);
        }

        if (props.reset) {
            setInputValue(props.inputValue);
            setError(props.error);
            props.turnOffReset();
        }

    }, [props.error, props.reset, props.inputValue]);

    const focused = () => {
        if (error['hasErrors']) {
            setInputValue("");
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
                                           <InputAdornment
                                               position={props.adornmentPosition}>
                                               <props.icon sx={{color: focus, mr: 1, my: 0.5}}/>
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
                                       console.log(error);
                                       if (error['hasErrors']) {
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
                    <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mb: 1.8}}>
                        <props.icon sx={{color: focus, mr: 1, my: !isObjectEmpty(error) ? 2.9 : 0.5}}/>
                        <TextField label={props.placeholder}
                                   sx={{width: {sm: 200, md: 300, lg: 400}, fontWeight: "bolder",}}
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
                                       if (error['hasErrors']) {
                                           setError({});
                                       }

                                       props.getInputText(e, props.classname);
                                       console.log(props.classname);
                                       setInputValue(e.target.value);
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