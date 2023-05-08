import '../../../../Styles/Feed/Posts/Posts Collection/Post.scss';
import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import PostSkeleton from "../../../Skeleton/Feed/PostSkeleton";
import PostOptionsMenu from "../Post Options/PostOptionsMenu";
import FsLightbox from "fslightbox-react";
import {useEffect, useState} from "react";
import liked from '../../../../Media/Images/heart (2).svg';
import like from '../../../../Media/Images/like (1).svg';
import dislike from '../../../../Media/Images/dislike (1).svg';
import disliked from '../../../../Media/Images/dislike (2).svg';


export default function Post(props) {
    const [lightBoxToggled, setLightBoxToggled] = useState(false);
    const [likedPost, setLikedPost] = useState(false);
    const [dislikedPost, setDislikedPost] = useState(true);
    const [likeIcon, setLikeIcon] = useState(like);
    const [dislikeIcon, setDislikeIcon] = useState(dislike);

    useEffect(() => {
        if (likedPost) {
            setLikeIcon(liked);
        } else {
            setLikeIcon(like);
        }
    }, [likedPost]);

    useEffect(() => {
        if (dislikedPost) {
            setDislikeIcon(disliked);
        } else {
            setDislikeIcon(dislike);
        }
    }, [dislikedPost]);

    const handleLikeSend=()=>{
        if(dislikedPost){
            setDislikedPost(!dislikedPost);
        }
        setLikedPost(!likedPost);
    }

    const handleDislikeSend=()=>{
        if(likedPost){
            setLikedPost(!likedPost);
        }

        setDislikedPost(!dislikedPost);
    }

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
                                onClick={handleLikeSend}
                                className="Reaction">
                                <img src={likeIcon} alt="Like Reaction Icon"/>
                                <span>Likes</span>
                            </div>
                            <div
                                onClick={handleDislikeSend}
                                className="Reaction">
                                <img src={dislikeIcon} alt="Like Reaction Icon"/>
                                <span>Dislikes</span>
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