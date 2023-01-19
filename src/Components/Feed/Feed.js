// eslint-disable-next-line no-unused-vars
import {useEffect} from "react";

export default function Feed() {

    useEffect(() => {
        document.title = 'ReachMe - Feed';
    },);

    window.addEventListener("popstate", (e) => {
        e.preventDefault();
    })

    return (
        <h1>Hai noroc</h1>
    );
}