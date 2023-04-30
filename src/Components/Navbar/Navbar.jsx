import "../../Styles/Navbar/Navbar.scss";
import {defaultSearchIconName, searchIconEngaged,} from "../../Modules/Object/ComponentProps";
import {changeIconSource} from "../../Modules/Feed/Navbar/NavbarModule";
import FeedDrawer from "../Feed/Drawer/FeedDrawer";
import MessagingFrame from "../Messaging/MessagingFrame";
import React from "react";
import NotificationManager from "./Notifications/NotificationManager";
import {Tooltip} from "@mui/joy";

export default function Navbar(props) {
  const toggleSearch = (event) => {
    const identifier = event.target.id;
    changeIconSource(identifier, searchIconEngaged);
  };
  
  return (
    <>
      <div className="NavigationWrapper">
        <FeedDrawer className="Drawer" scheduleUpdate={props.scheduleUpdate} />
        <div className="RightSideNavigation">
          <div className="IconsDrawer">
            <Tooltip title="Search">
              <img
                src={defaultSearchIconName}
                className="Icon"
                id="SearchIcon"
                onClick={toggleSearch}
                alt="Search Button Icon"
                title="Search"
              />
            </Tooltip>
            <NotificationManager />
            <MessagingFrame
              resetPageTitleToFeedState={props.resetPageTitleToFeedState}
            />
          </div>
        </div>
      </div>
    </>
  );
}
