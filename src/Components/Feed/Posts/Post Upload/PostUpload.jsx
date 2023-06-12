import '../../../../Styles/Feed/Posts/Post Upload/PostUpload.scss';
import gallery from '../../../../Media/Images/gallery.svg';
import {Avatar} from "@mui/joy";
import {loggedInAccount} from "../../../../Services/Feed Services/FeedDrawerService";
import {Slide} from "@mui/material";
import PostUploadSkeleton from "../../../Skeleton/Feed/PostUploadSkeleton/PostUploadSkeleton";
import PostPreview from "../Post Preview/PostPreview";
import usePostUploader from "../../../../Hooks/usePostUploader";
import {ToastContainer} from "react-toastify";
import {RemoveCircle, Undo} from "@mui/icons-material";
import {useContext, useRef} from "react";
import LocationDialog from "../Post Preview/Dialog/LocationDialog";
import {buildPostObject} from "../../../../Modules/Posts/PostModule";
import {uploadPost} from "../../../../Services/Feed Services/PostService";
import {StateManagementContext} from "../../../../Context/StateManagementContext";

export default function PostUpload() {
    const {
        description,
        setDescription,
        handleInputChange,
        handleFileSelection,
        loading,
        start,
        setStart,
        resource,
        setResource,
        location,
        setLocation,
    } = usePostUploader();

    let {setUpdate, setRefreshReactions} = useContext(StateManagementContext);
    const topRef = useRef();
    const textAreaRef = useRef();

    const abortPostUpload = () => {
        setStart(false);
        textAreaRef.current.value = "";
        setLocation("");
        setResource(null);
        setDescription("");
    }

    /* const [profilePicture, setProfilePicture] = useState(localStorage.getItem("profilePhoto"));*/

    const handlePostUpload = async () => {
        const postObject = buildPostObject(location, description, resource, loggedInAccount);
        await uploadPost(postObject);
        setRefreshReactions(true);
        setTimeout(()=>{}, 700);
        setUpdate(true);
        abortPostUpload();
        //window.location.reload();
    }

    return (
        <div className="PostUploadWrapper" ref={topRef}>
            {
                loading === true ?
                    <PostUploadSkeleton/>
                    :
                    <>
                        <div className="UploadFirstRow">
                            <label htmlFor=" username">
                                <Avatar className="PostUploadAvatar" src={loggedInAccount.profilePhotoHref}/>
                            </label>
                            <textarea
                                ref={textAreaRef}
                                onChange={handleInputChange}
                                className="UploadInput" id="username"
                                placeholder={`Reach out other users @${loggedInAccount.userName}`}/>
                        </div>
                        <div className="Options">
                            <div className="Divider"/>
                            <div className="Actions">
                                <div className="PostEditActions">
                                    <input type="file"
                                           style={{display: "none"}}
                                           id="media"
                                           onChange={handleFileSelection}/>
                                    <label htmlFor="media">
                                        <div className="ClickableObject">
                                            <span>Add media</span>
                                            <img src={gallery} alt="Attach an image or a video as a post"
                                                 className="ClickableIcon"/>
                                        </div>
                                    </label>
                                    <LocationDialog location={location}
                                                    setLocation={setLocation}/>
                                    {
                                        resource !== null &&
                                        <div className="ClickableObject"
                                             onClick={() => {
                                                 setResource(null);
                                                 topRef.current?.scrollIntoView({
                                                     behavior: "smooth"
                                                 });
                                             }}>
                                            <span>Remove attached media</span>
                                            <RemoveCircle
                                                style={{color: "red"}}
                                                className="ClickableIcon"/>
                                        </div>
                                    }
                                    {
                                        description &&
                                        <div className="ClickableObject"
                                             onClick={abortPostUpload}>
                                            <span>Abort post upload</span>
                                            <Undo
                                                style={{color: "#2c3e50"}}
                                                className="ClickableIcon"/>
                                        </div>
                                    }
                                </div>
                                {
                                    description &&
                                    <button
                                        onClick={handlePostUpload}
                                        className="UploadButton">Upload
                                    </button>
                                }
                            </div>
                        </div>
                    </>
            }
            {
                start &&
                <Slide direction="right" in={start} mountOnEnter unmountOnExit>
                    <div className="PostUploadPreview">
                        <h2 className="UploadHeader">Upload a post</h2>
                        <PostPreview
                            location={location}
                            setLocation={setLocation}
                            setResource={setResource}
                            resource={resource}
                            description={description}/>
                    </div>
                </Slide>
            }
            <div id="UploadSnackbar"/>
            <ToastContainer position="top-left"/>
        </div>
    );
}