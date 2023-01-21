// eslint-disable-next-line no-unused-vars
import {useEffect} from "react";

export default function Feed() {

    useEffect(() => {
        document.title = 'ReachMe - Feed';
    },);

    return (
        <>
            <div id='SignOutModal'/>
            <h1>Hai noroc</h1>
        </>
    );
}