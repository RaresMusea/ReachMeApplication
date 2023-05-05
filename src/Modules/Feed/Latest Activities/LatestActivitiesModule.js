import {parseDateAndTime} from "../../Date/DatePipeModule";

export const formatLatestActivity = (activity) => {
    const initiator = activity.activityInitiator;
    let type = activity.activityType;
    type = type.toLowerCase().replace(".","");
    const activityDate = parseDateAndTime(new Date(activity.activityDate)).toLowerCase();

    return `${initiator} ${type} ${activityDate}.`;
}