import React, {useContext, useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata,} from "../../Services/Feed Services/FeedDrawerService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {ConversationContext} from "../../Context/ConversationContext";

export default function Feed() {
  const [update, setUpdate] = useState(false);
  const { data } = useContext(ConversationContext);

  useEffect(() => {
    document.title = `ReachMe - Feed`;
    getRequiredMetadata(currentlyLoggedInUser);
  }, []);


  useEffect(() => {
    if (update) {
      getRequiredMetadata(currentlyLoggedInUser);
      setUpdate(false);
    }
  }, [update]);

  const scheduleUpdate = () => {
    setUpdate(true);
  };

  const resetPageTitleToFeedState = () => {
    document.title = "ReachMe - Feed";
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
