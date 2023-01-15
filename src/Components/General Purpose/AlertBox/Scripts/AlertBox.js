import {Snackbar, Fade} from "@mui/material";
import React, {Component} from 'react';

export default function AlertBox(props) {

    const [open, setOpen] = React.useState(true);

    return (
        <div>
            <Snackbar open={open}
                      autoHideDuration={500}
                      onClose={() => setOpen(false)}
                      TransitionComponent={Fade}
                      message={this.props.message}/>
        </div>
    );
}