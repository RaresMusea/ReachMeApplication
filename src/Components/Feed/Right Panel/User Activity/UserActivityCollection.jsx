import {lazy, useContext, useEffect, useRef, useState} from "react";
import {onSnapshot} from "firebase/firestore";
import {activitiesRef} from "../../../../Modules/Firebase/FirebaseIntegration";
import {sortActivitiesDescending} from "../../../../Modules/Common Functionality/CommonFunctionality";
import RightSideFeedSkeleton from "../../../Skeleton/Feed/RightSideFeedSkeleton/RightSideFeedSkeleton";
import {StateManagementContext} from "../../../../Context/StateManagementContext";

const Activity = lazy(() => import("./Activity"));

export default function UserActivityCollection() {

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    const effectRan = useRef(false);
    let {
        posts,
        setPosts
    } = useContext(StateManagementContext);
    let temp = [];

    useEffect(() => {
        const unsubscribe = onSnapshot(activitiesRef, (snapshot) => {
            snapshot.docs.map((doc) => {
                temp = doc.data().activities;
            });
            sortActivitiesDescending(temp);
            setActivities(temp.slice(0, 4));
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (!effectRan.current === false) {
            if (posts.length !== 0 && activities.length !== 0) {
                if ("postIdentifier" in activities[0]) {
                    const lastPostId = activities[0].postIdentifier;
                    const identifiers = [];
                    posts.forEach(post => {
                        identifiers.push(post.postIdentifier);
                    });
                    if (!identifiers.includes(lastPostId)) {
                        fetch("http://localhost:8080/feed/post/" + lastPostId)
                            .then(response => response.json())
                            .then(data => {
                                setPosts([data, ...posts]);
                            })
                            .catch(console.error);
                    }
                }
            }
        }
        effectRan.current = true;

    }, [activities]);

    return (
        <div className="UserActivityCollectionWrapper">

            <h3>Latest activities</h3>
            {
                loading === true ? <RightSideFeedSkeleton rows={3}/>
                    :
                    activities.length !== 0 &&
                    activities.map(activity =>
                        <Activity activity={activity}/>
                    )
            }

        </div>
    );
}