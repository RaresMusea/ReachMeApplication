import '../../../Styles/../Styles/Messaging/Sidebar/MessagingFrameSideBar.scss';
import MessagingHeader from "../Header/MessagingHeader";
import UserSearcher from "../Misc/UserSearcher";
import {useState} from "react";
import {increaseTheOpacity} from "../../../Modules/Animation Control/Opacity";
import Chats from "./Chats";

export default function MessagingFrameSideBar(props) {
    const [searcherVisible, setSearcherVisible] = useState(false);

    const enableSearch = () => {
        setSearcherVisible(true);
        setTimeout(() => {
            const searcher = document.querySelector('.Searcher');
            searcher.style.display = `block`;
            increaseTheOpacity(searcher, 30)
        }, 100);
    }

    return (
        <>
            <div className="SidebarWrapper">
                <MessagingHeader close={props.close}
                                 enableSearch={enableSearch}/>
                {
                    searcherVisible ?
                        <UserSearcher/>
                        : null
                }
                <Chats/>
            </div>
        </>
    );
}