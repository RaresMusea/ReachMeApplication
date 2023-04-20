import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { getRequiredMetadata } from "../../Services/Feed Services/FeedDrawerService";
import { currentlyLoggedInUser } from "../../Modules/Session/CurrentSessionModule";
import "react-toastify/dist/ReactToastify.css";

export default function Feed() {
  const [update, setUpdate] = useState(false);
  const [titleNeedsUpdate, setTitleNeedsUpdate] = useState(false);
  /* const {newMessagesCount} = useContext(MessageNotificationContext);*/

  /* const notify=()=>toast(`Your have ${newMessagesCount} messages.`);*/

  /*   useEffect(()=>{
           console.log("circ");
           if(newMessagesCount !== 0){
               notify();
           }
       }, [newMessagesCount])*/

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
      console.log("he updated me!!!");
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
      {/*<ToastContainer/>*/}
    </>
  );
}
