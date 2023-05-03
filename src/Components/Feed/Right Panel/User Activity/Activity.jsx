import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";

export default function Activity(props) {
    const activityType = props.activity.activityType;
    return (
        <div className="ActivityContainer">
            {
                activityType === "removed the profile picture" || activityType === "added a new profile picture." &&
                <>
                    <div>
                    <Avatar src={props.activity.initiatorProfilePicture}/>
                    <p className="ActivityDescriptor">{`${props.activity.activityInitiator} 
                    ${props.activity.activityType}`}</p>
                    </div>
                    <p className="ActivityDate">{parseDateAndTime(new Date(props.activity.activityDate))}</p>
                </>
            }
        </div>
    );
}