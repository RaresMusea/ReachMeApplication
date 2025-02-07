import {lazy, useContext, useEffect, useRef, useState} from "react";
import {onSnapshot} from "firebase/firestore";
import {activitiesRef} from "../../../../Modules/Firebase/FirebaseIntegration";
import {sortActivitiesDescending} from "../../../../Modules/Common Functionality/CommonFunctionality";
import RightSideFeedSkeleton from "../../../Skeleton/Feed/RightSideFeedSkeleton/RightSideFeedSkeleton";
import {StateManagementContext} from "../../../../Context/StateManagementContext";
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import {renderRechargeToast} from "../../../../Modules/Posts/PostModule";

const Activity = lazy(() => import("./Activity"));

export default function UserActivityCollection() {

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
    let {
        posts,
        setPosts
    } = useContext(StateManagementContext);
    let temp = [];
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            const unsubscribe = onSnapshot(activitiesRef, (snapshot) => {
                snapshot.docs.map((doc) => {
                    temp = doc.data().activities;
                });

                sortActivitiesDescending(temp);
                console.log(temp);
                console.log(loggedInAccount.userRealName);
                setActivities(temp.slice(0, 4));
                setLoading(false);
            });

            return () => {
                unsubscribe();
                effectRan.current = true;
            }
        }
    }, []);

    useEffect(() => {
        if (effectRan.current === true) {
            if (activities !== undefined && activities[0].hasOwnProperty('activityInitiator')) {
                if (activities[0].activityInitiator !== loggedInAccount.userRealName &&
                    activities[0].activityType !== "uploaded a new post.") {
                    renderRechargeToast();
                    effectRan.current = false;
                }
            }
        }
        effectRan.current = true;
    }, [activities])

    useEffect(() => {
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
                            const newPosts = structuredClone(posts);
                            newPosts.unshift(data);
                            setPosts(newPosts);
                        })
                        .catch(console.error);
                }
            }
        }
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