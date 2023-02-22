// eslint-disable-next-line no-unused-vars
import {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata} from "../../Services/Feed Services/FeedDrawerService";
import {currentlyLoggedInUser} from "../../Modules/Session/CurrentSessionModule";

export default function Feed() {

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        document.title = 'ReachMe - Feed';
        getRequiredMetadata(currentlyLoggedInUser);
        console.log("this got called at startup");
    }, []);

    useEffect(() => {
        if (update) {
            getRequiredMetadata(currentlyLoggedInUser);
            setUpdate(false);
            console.log("he updated me!!!");
        }
    }, [update]);

    const scheduleUpdate = () => {
        setUpdate(true);
    }

    return (
        <>
            <Navbar scheduleUpdate={scheduleUpdate}/>
            <div id='SignOutModal'/>
            <h1>Hai noroc</h1>
        </>
    );
}