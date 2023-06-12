import '../../../../Styles/Feed/Posts/Posts Collection/Post.scss';
import {Avatar} from "@mui/joy";
import {parseDateAndTime} from "../../../../Modules/Date/DatePipeModule";
import PostSkeleton from "../../../Skeleton/Feed/PostSkeleton";
import FsLightbox from "fslightbox-react";
import {useEffect, useState} from "react";
import useReactions from "../../../../Hooks/useReactions";
import ReactionsDialog from "./Reactions/ReactionsDialog";
import commentIcon from "../../../../Media/Images/comment (1).svg";
import CommentsSection from "./Reactions/CommentsSection";

export default function Post(props) {
    const [lightBoxToggled, setLightBoxToggled] = useState(false);
    const {
        handleLikeSend,
        handleDislikeSend,
        likeIcon,
        likesList,
        dislikeIcon,
        postAuthorName,
        dislikesList,
    } = useReactions(props);

    const [commentsCount, setCommentsCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/comments-section/${props.post.postIdentifier}/count`)
            .then(response => response.json())
            .then(data => {
                setCommentsCount(data);
            })
            .catch(console.error);
    }, []);
    return (
        <div className="PostWrapper">
            {
                props.loading ?
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
                            {/*<PostOptionsMenu/>*/}
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
                                        onClick={() => handleLikeSend(props.post)}
                                        src={likeIcon} alt="Like Reaction Icon"/>
                                    <ReactionsDialog
                                        trigger={
                                            <span style={{cursor: "pointer"}}>
                                    {
                                        (likesList !== undefined && likesList.length !== 0) ?
                                            likesList.length + (likesList.length === 1 ? ' like' : ' likes')
                                            : "No likes"
                                    }
                                </span>
                                        }
                                        title={`Likes for post uploaded by ${props.post.postOwner}.`}
                                        postId={props.post.postIdentifier}
                                        titleColor={'#108e8e'}
                                    />
                                </div>
                                <div className="Reaction">
                                    <img
                                        onClick={() => {
                                            handleDislikeSend(props.post)
                                        }}
                                        src={dislikeIcon} alt="Like Reaction Icon"/>
                                    <ReactionsDialog
                                        trigger={
                                            <span style={{cursor: "pointer"}}>
                                    {
                                        (dislikesList !== undefined && dislikesList.length !== 0) ?
                                            dislikesList.length + (dislikesList.length === 1 ? ' dislike' : ' dislikes')
                                            : "No dislikes"
                                    }
                                </span>
                                        }
                                        title={`Dislikes for post uploaded by ${props.post.postOwner}.`}
                                        postId={props.post.postIdentifier}
                                        titleColor={'red'}/>
                                </div>
                                <CommentsSection
                                    trigger={
                                        <div className="Reaction">
                                            <img src={commentIcon}
                                                 alt={"View comments"}
                                            />
                                            <span style={{cursor: "pointer"}}>
                                                    {
                                                        commentsCount === 0 ? "No comments" : `${commentsCount} 
                                                        ${commentsCount === 1 ? "comment" : "comments"}`
                                                    }
                                                </span>
                                        </div>
                                    }
                                    postOwner={props.post.postOwner}
                                    postAuthorName={postAuthorName}
                                    postId={props.post.postIdentifier}
                                    setCommentsCount={setCommentsCount}
                                />
                                <FsLightbox
                                    toggler={lightBoxToggled}
                                    sources={[props.post.uploadedMediaHref]}
                                    slide={1}
                                />
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}