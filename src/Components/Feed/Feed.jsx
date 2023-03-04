// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata} from "../../Services/Feed Services/FeedDrawerService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";

export default function Feed() {

    const [update, setUpdate] = useState(false);
    const [titleNeedsUpdate, setTitleNeedsUpdate] = useState(false);

    useEffect(() => {
        document.title = `ReachMe - Feed`;
        getRequiredMetadata(currentlyLoggedInUser);
        console.log("this got called at startup");

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
    }

    const resetPageTitleToFeedState = () => {
        setTitleNeedsUpdate(true);
    }

    return (
        <>
            <Navbar
                resetPageTitleToFeedState={resetPageTitleToFeedState}
                scheduleUpdate={scheduleUpdate}/>
            <div id='SignOutModal'/>
            <h1>Hai noroc</h1>
        </>
    );
}