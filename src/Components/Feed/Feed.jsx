import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { getRequiredMetadata } from "../../Services/Feed Services/FeedDrawerService";
import { currentlyLoggedInUser } from "../../Modules/Session/CurrentSessionModule";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useMessageNotifications from "../../Hooks/useMessageNotifications";
import { ConversationContext } from "../../Context/ConversationContext";

export default function Feed() {
  const [update, setUpdate] = useState(false);
  const [titleNeedsUpdate, setTitleNeedsUpdate] = useState(false);
  const { messageNotifications, newMessagesCount } = useMessageNotifications();
  const { data } = useContext(ConversationContext);

  useEffect(() => {
    document.title = `ReachMe - Feed`;
    getRequiredMetadata(currentlyLoggedInUser);

    if (titleNeedsUpdate) {
      document.title = `ReachMe - Feed`;
      setTitleNeedsUpdate(false);
    }
  }, [titleNeedsUpdate]);

  useEffect(() => {
    if (update) {
      getRequiredMetadata(currentlyLoggedInUser);
      setUpdate(false);
    }

    if (titleNeedsUpdate) {
      document.title = `ReachMe - Feed`;
      setTitleNeedsUpdate(false);
    }
  }, [update, titleNeedsUpdate]);

  const scheduleUpdate = () => {
    setUpdate(true);
  };

  const resetPageTitleToFeedState = () => {
    setTitleNeedsUpdate(true);
  };

  return (
    <>
      <Navbar
        resetPageTitleToFeedState={resetPageTitleToFeedState}
        scheduleUpdate={scheduleUpdate}
      />
      <div id="SignOutModal" />
      <ToastContainer />
    </>
  );
}
