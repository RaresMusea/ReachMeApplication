import '../../../../Styles/Feed/Posts/Post Preview/PostPreview.scss';
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import {Avatar} from "@mui/joy";
import {getFileType} from "../../../../Modules/Validation/PostUploadFileFormatValidator";

export default function PostPreview(props) {

    return (
        <div className="PostPreviewWrapper">
            <div className="PostPreviewHeader">
                <Avatar src={loggedInAccount.profilePhotoHref}/>
                <div className="PostPreviewPostDetails">
                    <p style={{fontWeight: "bolder"}}>{`${loggedInAccount.userRealName}`}</p>
                    <p>{props.location}</p>
                </div>
            </div>
            <p className="PostDescription">
                {props.description}
            </p>
            {
                props.resource !== null && getFileType(props.resource) === "photo" &&
                <img className="ResourcePreview" src={URL.createObjectURL(props.resource)}
                     alt="PostToBeUploaded"/>
            }
            {
                props.resource !== null && getFileType(props.resource) === "video" &&
                <video controls src={URL.createObjectURL(props.resource)}/>
            }
        </div>
    )
}