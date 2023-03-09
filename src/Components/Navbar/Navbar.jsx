import '../../Styles/Navbar/Navbar.scss';
import {defaultNotificationIcon, defaultSearchIconName, searchIconEngaged} from "../../Modules/Object/ComponentProps";
import {changeIconSource} from "../../Modules/Feed/Navbar/NavbarModule";
import FeedDrawer from "../Feed/Drawer/FeedDrawer";
import MessagingFrame from "../Messaging/MessagingFrame";

export default function Navbar(props) {

    const toggleSearch = (event) => {
        const identifier = event.target.id;
        changeIconSource(identifier, searchIconEngaged);
    }

    return (
        <>
            <div className='NavigationWrapper'>
                <FeedDrawer className='Drawer'
                            scheduleUpdate={props.scheduleUpdate}/>
                <div className='RightSideNavigation'>
                    <div className='IconsDrawer'>
                        <img src={defaultSearchIconName}
                             className='Icon'
                             id='SearchIcon'
                             onClick={toggleSearch}
                             alt='Search Button Icon'
                             title='Search'/>
                        <img src={defaultNotificationIcon}
                             className='Icon'
                             id='SearchIcon2'
                             onClick={toggleSearch}
                             alt='Notifications Center'
                             title='Notifications'/>
                        <MessagingFrame resetPageTitleToFeedState={props.resetPageTitleToFeedState}/>
                    </div>
                </div>
            </div>
        </>
    );
}