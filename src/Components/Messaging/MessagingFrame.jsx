import * as React from 'react';
import {useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import '../../Styles/Messaging/MessagingFrame.scss';
import {defaultMessagingIcon} from "../../Modules/Object/ComponentProps";
import MessagingFrameSideBar from "./Sidebar/MessagingFrameSideBar";
import Conversation from "./Conversation/Conversation";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessagingFrame(props) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        document.title = `ReachMe Messaging`
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.resetPageTitleToFeedState();
        setOpen(false);
    };

    return (
        <div>
            <img src={defaultMessagingIcon}
                 className='Icon'
                 style={{marginRight: "1em"}}
                 id='SearchIcon3'
                 onClick={handleClickOpen}
                 alt='Search Button Icon'
                 title='Messages'/>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {/*<AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            ReachMe messaging
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>*/}
                <div className="ReachMeMessagingWrapper">
                    <MessagingFrameSideBar close={handleClose}/>
                    <Conversation/>
                </div>
            </Dialog>
        </div>
    );
}