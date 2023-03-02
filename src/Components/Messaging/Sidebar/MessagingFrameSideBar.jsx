import '../../../Styles/../Styles/Messaging/Sidebar/MessagingFrameSideBar.scss';
import MessagingHeader from "../Header/MessagingHeader";

export default function MessagingFrameSideBar(props) {
    return (
        <>
            <div className="SidebarWrapper">
                <MessagingHeader close={props.close}/>
            </div>
        </>
    );
}