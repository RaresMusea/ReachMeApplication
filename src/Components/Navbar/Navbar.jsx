import '../../Styles/Navbar/Navbar.scss';
import {defaultSearchIconName, searchIconEngaged} from "../../Modules/Object/ComponentProps";
import {changeIconSource} from "../../Modules/Feed/Navbar/NavbarModule";
import FeedDrawer from "../Feed/Drawer/FeedDrawer";

export default function Navbar() {

    const reload = () => {
        window.location.reload();
    }

    const toggleSearch = (event) => {
        const identifier = event.target.id;
        changeIconSource(identifier, searchIconEngaged);
    }

    return (
        <>
            <div className='NavigationWrapper'>
                {/*<div className='LeftSideNavigation'>
                    <img src={logoPic}
                         alt='ReachMe App Logo'
                         className='LogoImage'/>
                    <h1 className='ReachMeLogoText'>
                        ReachMe
                    </h1>*/}
                <FeedDrawer className='Drawer'/>
                <div className='RightSideNavigation'>
                    <div className='IconsDrawer'>
                        <img src={defaultSearchIconName}
                             className='Icon'
                             id='SearchIcon'
                             onClick={toggleSearch}
                             alt='Search Button Icon'
                             title='Search'/>
                        <img src={defaultSearchIconName}
                             className='Icon'
                             id='SearchIcon2'
                             onClick={toggleSearch}
                             alt='Search Button Icon'
                             title='Search'/>
                        <img src={defaultSearchIconName}
                             className='Icon'
                             style={{marginRight: "1em"}}
                             id='SearchIcon3'
                             onClick={toggleSearch}
                             alt='Search Button Icon'
                             title='Search'/>
                    </div>
                </div>
            </div>
        </>
    );
}