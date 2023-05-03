import {useEffect, useState} from "react";

export default function UserActivityCollection() {

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(false);
    },[]);

    return (
        <div className="UserActivityCollectionWrapper">
            <h3>Latest activities</h3>
        </div>
    );
}