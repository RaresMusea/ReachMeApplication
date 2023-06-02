import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Avatar, List, ListItem} from "@mui/joy";


function SimpleDialog(props) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };


    return (
        <Dialog
            className="ReactionsDialog"
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "900px",
                    },
                },
            }}
            onClose={handleClose}
            open={open}>
            <DialogTitle
                style={{color: props.titleColor}}
                className="ReactionsDialogTitle">{props.title}
            </DialogTitle>
            <List className="ReactionsList">
            {
                props.content === undefined || props.content.length===0?
                    <p className="NoReactions">This post has no reactions yet.</p>
                    :
                    props.content.map(element => (
                        <ListItem className="ListElement">
                            <Avatar
                                style={{marginRight:"0.5em"}}
                                src={element.profilePhotoHref}/>
                            <span>{element.userRealName}</span>
                        </ListItem>
                    ))
            }
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ReactionsDialog(props) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState([]);

    useEffect(() => {
        if(open) {
            fetch(`http://localhost:8080/feed/post/${props.postId}/accountsWho${props.title.includes("Likes")?"Liked":"Disliked"}`)
                .then(response => response.json())
                .then(data => {
                    setContent(data)
                    console.log(data);
                })
                .catch(console.error);
        }
    }, [open])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                {props.trigger}
            </div>
            <SimpleDialog
                titleColor={props.titleColor}
                title={props.title}
                content={content}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}