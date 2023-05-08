import UserHoverCard from "../../../User/Hover Card/UserHoverCard";
import {useContext, useEffect, useState} from "react";
import {StateManagementContext} from "../../../../Context/StateManagementContext";
import {formatLatestActivity} from "../../../../Modules/Feed/Latest Activities/LatestActivitiesModule";

export default function Activity(props) {
    const [target, setTarget] = useState({});
    const {profilePhotoUpdate, setProfilePhotoUpdate, bioUpdate, setBioUpdate} = useContext(StateManagementContext);

    useEffect(() => {
        fetch(`http://localhost:8080/account/${props.activity.initiatorId}`)
            .then(response => response.json())
            .then((data) => setTarget(data))
            .catch(err => console.log(err));

        setTimeout(() => {
        }, 200);

        if (profilePhotoUpdate) {
            setProfilePhotoUpdate(false);
        }

        if (bioUpdate) {
            setBioUpdate(false);
        }

    }, [profilePhotoUpdate, bioUpdate]);

    return (
        <div className="ActivityContainer">
            <>
                <div>
                    <UserHoverCard
                        additionalInfo={<div>
                            <p>{formatLatestActivity(props.activity)}</p>
                            {
                                "postIdentifier" in props.activity &&
                                <div>
                                    {
                                        props.activity.activityType === "uploaded a new post." &&
                                        <p>{props.activity.resource}</p>
                                    }
                                    {
                                        props.activity.activityType === "uploaded a new photo." &&
                                        <img src={props.activity.resource} alt="Uploaded photo"/>
                                    }
                                    {
                                        props.activity.activityType === "uploaded a new video." &&
                                        <video controls src={props.activity.resource}/>
                                    }
                                </div>
                            }
                        </div>}
                        userInfo={target}
                        currentProfilePhoto={props.activity.initiatorProfilePicture}/>
                    <p className="ActivityDescriptor">{`${props.activity.activityInitiator} 
                    ${props.activity.activityType}`}</p>
                </div>
            </>
        </div>
    );
}