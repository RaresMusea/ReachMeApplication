// eslint-disable-next-line no-unused-vars
import {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import {getRequiredMetadata} from "../../Services/Feed Services/FeedDrawerService";

export let updateNeeded = false;

export default function Feed() {

    useEffect(() => {
        document.title = 'ReachMe - Feed';
        getRequiredMetadata(localStorage.getItem("currentlyLoggedInUser"));
        console.log("effect");
        /*if(updateNeeded) {
            getRequiredMetadata(localStorage.getItem("currentlyLoggedInUser"));
        }*/
    }, []);

    return (
        <>
            <Navbar/>
            <div id='SignOutModal'/>
            <h1>Hai noroc</h1>
        </>
    );
}