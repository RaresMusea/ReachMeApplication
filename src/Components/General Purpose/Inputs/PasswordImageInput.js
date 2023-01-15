import {IconButton, ThemeProvider} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {styles, theme} from "./InputTheme";
import Box from "@mui/material/Box";
import isObjectEmpty from "../Objects";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";

export default function PasswordImageInput(props) {

    const [inputValue, setInputValue] = useState(props.inputValue);
    const [error, setError] = useState(props.error);
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState("action.active");

    useEffect(() => {
        if (!isObjectEmpty(props.error)) {
            setError(props.error);
        }
    }, [props.error]);

    const focused = () => {
        if (error['hasErrors']) {
            setInputValue("");
        }
        setFocus("#094561");
    }

    const blurred = () => {
        setFocus("action.active");
    }

    const showPasswordHandler = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', mb: 1.8}}>
                <props.icon sx={{color: focus, mr: 1, my: !isObjectEmpty(props.error) ? 2.9 : 0.5}}/>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label={props.placeholder}
                    sx={{width: {sm: 300, md: 300, lg: 400}, fontWeight: "bolder"}}
                    error={isObjectEmpty(error) ? undefined : true}
                    helperText={(isObjectEmpty(error) || !error['hasErrors']) ? undefined : props.error['message']}
                    InputProps={{
                        classes: {
                            input: styles.textInput,
                        },
                        endAdornment:
                            <IconButton aria-label="toggle password visibility"
                                        aria-valuetext={showPassword ? "Hide password" : "Show password"}
                                        onClick={showPasswordHandler}
                                        onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>

                    }}

                    variant="standard"
                    className='text-field'
                    onChange={(e) => {
                        props.getInputText(e, props.classname);
                        setInputValue(e.target.value);

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
    );
}