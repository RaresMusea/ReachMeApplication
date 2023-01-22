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

        if (update) {
            getRequiredMetadata(currentlyLoggedInUser);
            setUpdate(false);
            if (update === false) {
                console.log("i was reset");
            }
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