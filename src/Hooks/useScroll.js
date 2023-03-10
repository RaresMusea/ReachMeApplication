import {useEffect, useRef} from "react";


export default function useScroll(element) {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [element]);

    return scrollRef;
}