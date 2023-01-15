import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#094561',
        },
        secondary: {
            main: '#ff0000',
        },
    },
});

const styles = {
    textInput: {
        fontFamily: 'serif',
        padding: '0',
        color: 'red'
    }
};

export {theme, styles};