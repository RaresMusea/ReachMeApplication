import {lazy, useEffect, useState} from "react";
import {onSnapshot} from "firebase/firestore";
import {activitiesRef} from "../../../../Modules/Firebase/FirebaseIntegration";
import {sortActivitiesDescending} from "../../../../Modules/Common Functionality/CommonFunctionality";
import RightSideFeedSkeleton from "../../../Skeleton/Feed/RightSideFeedSkeleton/RightSideFeedSkeleton";

const Activity = lazy(() => import("./Activity"));

export default function UserActivityCollection() {

    const [loading, setLoading] = useState(true);
    const [activities, setActivities] = useState([]);
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