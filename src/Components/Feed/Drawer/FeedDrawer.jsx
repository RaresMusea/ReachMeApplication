import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import '../../../Styles/Navbar/Navbar.scss';
import '../../../Styles/Navbar/FeedDrawer.scss';
import logoPic from "../../../Media/Images/logoPic.svg";
import UpperSection from "./UpperSection";
import MiddleSection from "./MiddleSection";

export default function FeedDrawer(props) {
    const [width, setWidth] = React.useState(0);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const [optionSelected, setOptionSelected] = useState(false);

    const toggleOption = () => {
        setOptionSelected(!optionSelected);
    }

    useEffect(() => {
        if (window.innerWidth > 600) {
            setWidth(400);
        } else {
            setWidth(250);
        }
    }, [width]);

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <Box
            className="DrawerBox"
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : width}}
            role="presentation"
            onKeyDown={toggleDrawer(anchor, optionSelected)}
        >

            <UpperSection update={props.scheduleUpdate}/>
            <Divider/>
            <MiddleSection
                scheduleUpdate={props.scheduleUpdate}
                toggleOption={toggleOption}/>
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
                        onClose={toggleDrawer(anchor, optionSelected)}
                    >
                        {list(anchor)}
                    </Drawer>
                    {/*<div id="ProfilePictureManagementAlerts"/>*/}
                </React.Fragment>
            ))}
        </div>
    );
}
