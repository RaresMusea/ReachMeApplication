import '../../../Styles/../Styles/Messaging/Sidebar/MessagingFrameSideBar.scss';
import MessagingHeader from "../Header/MessagingHeader";
import UserSearcher from "../Misc/UserSearcher";
import {useState} from "react";
import {increaseTheOpacity} from "../../../Modules/Animation Control/Opacity";

export default function MessagingFrameSideBar(props) {
    const [searcherVisible, setSearcherVisible] = useState(false);

    const enableSearch = () => {
        setSearcherVisible(true);
        setTimeout(() => {
            increaseTheOpacity(document.querySelector('.Searcher'), 30)
        }, 100);
    }

    return (
        <>
            <div className="SidebarWrapper">
                <MessagingHeader close={props.close}
                                 enableSearch={enableSearch}/>
                {searcherVisible ?
                    <UserSearcher/>
                    : null
                }
            </div>
        </>
    );
}