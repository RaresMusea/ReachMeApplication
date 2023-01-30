import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import '../../../Styles/Navbar/Navbar.scss';
import '../../../Styles/Navbar/FeedDrawer.scss';
import logoPic from "../../../Media/Images/logoPic.svg";
import UpperSection from "./UpperSection";

export default function FeedDrawer(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : (window.innerWidth > 800 ? 400 : 230)}}
            role="presentation"
            /*onClick={toggleDrawer(anchor, false)}*/
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <UpperSection update={props.update}/>
            {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>*/}
            <Divider/>
            {/*<List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>*/}
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div className='LeftSideNavigation'
                         onClick={toggleDrawer(anchor, true)}
                         title='My ReachMe'>
                        <img src={logoPic}
                             alt='ReachMe App Logo'
                             className='LogoImage'/>
                        <h1 className='ReachMeLogoText'>
                            ReachMe
                        </h1>
                    </div>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        variant="temporary"
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
