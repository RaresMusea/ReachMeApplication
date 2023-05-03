import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import {defaultProfilePic} from "../../../../Modules/Exporters/ImageExporter";

export default function NewUser(props) {

    return (
        <div className="NewUser">
            <div className="NewUserLeftSide">
                <Avatar src={props.newUser.lastUserPhoto===undefined?defaultProfilePic:props.newUser.lastUserPhoto}/>
                <div className="NameDetailsColumn">
                    <p className="UserRealName">{props.newUser.usersList}</p>
                    <p>{props.newUser.latestRegistration}</p>
                    <p>{`Joined ${parseDateAndTime(new Date(props.newUser.lastLogTimeStamp))}`}</p>
                </div>

            </div>
        </div>
    );
}