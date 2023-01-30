import {Fade, Snackbar} from "@mui/material";
import {useState} from "react";

export default function AlertBox(props) {

    const [open, setOpen] = useState(true);

    return (
        <div>
            <Snackbar open={open}
                      autoHideDuration={500}
                      onClose={() => setOpen(false)}
                      TransitionComponent={Fade}
                      message={props.message}/>
        </div>
    );
}