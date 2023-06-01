import '../../../../Styles/Feed/Posts/Posts Collection/Post.scss';
import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import PostSkeleton from "../../../Skeleton/Feed/PostSkeleton";
import PostOptionsMenu from "../Post Options/PostOptionsMenu";
import FsLightbox from "fslightbox-react";
import {useState} from "react";
import useReactions from "../../../../Hooks/useReactions";


export default function Post(props) {
    const [lightBoxToggled, setLightBoxToggled] = useState(false);
    const {
        handleLikeSend,
        handleDislikeSend,
        likeIcon,
        likesList,
        dislikeIcon,
        dislikesList,
    } = useReactions(props);

    return (
        <div className="PostWrapper">
            {props.loading ?
                <PostSkeleton post={props.post}/>
                :
                <>
                    <div className="PostHeader">
                        <div className="PostDetails">
                            <Avatar src={props.post.postOwnersProfilePicture}/>
                            <div>
                                <p style={{fontWeight: "bolder"}}>{`${props.post.postOwner}`}</p>
                                <p>{props.post.location}</p>
                                <p>{parseDateAndTime(new Date(props.post.timestamp))}</p>
                            </div>
                        </div>
                        <PostOptionsMenu/>
                    </div>
                    <div>
                        {
                            props.post.postType === "text" ?
                                <div className="TextPost">
                                    <p className="PostDescriptionBig">{props.post.postDescription}</p>
                                </div>
                                :
                                <div className="MediaPost">
                                    <p className="PostDescription">
                                        {props.post.postDescription}
                                    </p>
                                    {
                                        props.post.postType === "photo" ?
                                            <img src={props.post.uploadedMediaHref}
                                                 alt="Uploaded Photo"
                                                 onClick={() => {
                                                     setLightBoxToggled(!lightBoxToggled)
                                                 }}
                                                 className="PostResource"
                                            />
                                            :
                                            <video controls src={props.post.uploadedMediaHref}
                                                   className="PostResource"/>
                                    }
                                </div>
                        }
                        <div className="PostDivider"/>
                        <div className="PostReactions">
                            <div
                                className="Reaction">
                                <img
                                    onClick={handleLikeSend}
                                    src={likeIcon} alt="Like Reaction Icon"/>
                                <span>
                                    {likesList.length !== undefined ? likesList.length + " likes" : "No likes"}
                                </span>
                            </div>
                            <div
                                className="Reaction">
                                <img
                                    onClick={handleDislikeSend}
                                    src={dislikeIcon} alt="Like Reaction Icon"/>
                                <span>
                                    {dislikesList.length !== undefined ? dislikesList.length + " dislikes" : "No dislikes"}
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            }
            <FsLightbox
                toggler={lightBoxToggled}
                sources={[props.post.uploadedMediaHref]}
                slide={1}
            />
        </div>

    );
}