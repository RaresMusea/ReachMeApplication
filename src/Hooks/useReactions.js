import {useContext, useEffect, useState} from "react";
import like from "../Media/Images/like (1).svg";
import dislike from "../Media/Images/dislike (1).svg";
import liked from "../Media/Images/heart (2).svg";
import disliked from "../Media/Images/dislike (2).svg";
import {markDislike, markLike, unmarkReaction} from "../Services/Firebase Service/Feed/FirebaseFeedService";
import {loggedInAccount} from "../Services/Feed Services/FeedDrawerService";
import {StateManagementContext} from "../Context/StateManagementContext";

export default function useReactions(props) {
    const {refreshReactions, setRefreshReactions} = useContext(StateManagementContext);
    const [likedPost, setLikedPost] = useState(false);
    const [dislikedPost, setDislikedPost] = useState(false);
    const [likeIcon, setLikeIcon] = useState(like);
    const [dislikeIcon, setDislikeIcon] = useState(dislike);
    const [likesList, setLikesList] = useState([]);
    const [dislikesList, setDislikesList] = useState([]);
/*    const [commentsCount, setCommentsCount] = useState(0);*/
    const [postAuthorName, setPostAuthorName] = useState("");
    const increaseLikesEndpoint = `http://localhost:8080/feed/post/increase-likes/`;
    const increaseDislikesEndpoint = `http://localhost:8080/feed/post/increase-dislikes/`;
    const requestConfig = {
        method: 'PATCH',
        body: JSON.stringify({}),
        headers: {'Content-type': `application / json; charset = UTF - 8`}
    };



    useEffect(() => {
        fetch(`http://localhost:8080/account/${props.post.accountIdentifier}`)
            .then(response => response.json())
            .then(data => {
                setPostAuthorName(data.userRealName);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!refreshReactions) {
            setLikesList(props.post.likedBy);
            setDislikesList(props.post.dislikedBy);
            setRefreshReactions(false);
        }
        if (props.post.likedBy.includes(loggedInAccount.userFirebaseIdentifier)) {
            setLikedPost(true);
        }
        if (props.post.dislikedBy.includes(loggedInAccount.userFirebaseIdentifier)) {
            setDislikedPost(true);
        }

    }, []);

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

    const handleLikeSend = async (post) => {
        if (likedPost) {
            setLikedPost(!likedPost);
            await unmarkReaction(post.postIdentifier);
            await updateLikes();
            return;
        }

        if (dislikedPost) {
            await unmarkReaction(post.postIdentifier);
            fetch(`http://localhost:8080/account/${post.accountIdentifier}`)
                .then(response => response.json())
                .then(data => {
                    setLikedPost(!likedPost);
                    setDislikedPost(!dislikedPost);
                    updateLikes();
                    updateDislikes();
                    setTimeout(() => {
                        markLike(data.userRealName, post.accountIdentifier, post.postType, post.postIdentifier);
                    }, 200);
                })
                .catch(console.error);
            return;
            //@TODO: ADD ACTIVITY FOR THIS PURPOSE
        }
        setLikedPost(!likedPost);
        fetch(`http://localhost:8080/account/${post.accountIdentifier}`)
            .then(response => response.json())
            .then(data => {
                markLike(data.userRealName, post.accountIdentifier, post.postType, post.postIdentifier);
                updateLikes();
            })
            .catch(console.error);
    }

    const handleDislikeSend = async (post) => {
        if (dislikedPost) {
            setDislikedPost(!dislikedPost);
            await updateDislikes();
            await unmarkReaction(post.postIdentifier);
            return;
        }

        if (likedPost) {
            await unmarkReaction(post.postIdentifier);
            fetch(`http://localhost:8080/account/${post.accountIdentifier}`)
                .then(response => response.json())
                .then(data => {
                    setLikedPost(!likedPost);
                    setDislikedPost(!dislikedPost);
                    updateDislikes();
                    updateLikes();
                    setTimeout(() => {
                        markDislike(data.userRealName, post.accountIdentifier, post.postType, post.postIdentifier);
                    });
                })
                .then(console.error);
            return;
            //@TODO: ADD ACTIVITY FOR THIS PURPOSE
        }

        fetch(`http://localhost:8080/account/${post.accountIdentifier}`)
            .then(response => response.json())
            .then(data => {
                setDislikedPost(!dislikedPost);
                updateDislikes();
                markDislike(data.userRealName, post.accountIdentifier, post.postType, post.postIdentifier);
            })
            .catch(console.error);
    }

    const updateLikes = async () => {
        fetch(`${increaseLikesEndpoint}${props.post.postIdentifier}/${loggedInAccount.userFirebaseIdentifier}`,
            requestConfig)
            .then(response => response.json())
            .then(data => setLikesList(data.likedBy))
            .catch(console.error);
    }

    const updateDislikes = async () => {
        fetch(`${increaseDislikesEndpoint}${props.post.postIdentifier}/${loggedInAccount.userFirebaseIdentifier}`,
            requestConfig)
            .then(response => response.json())
            .then(data => setDislikesList(data.dislikedBy))
            .catch(console.error);
    }
    return {
        handleDislikeSend,
        handleLikeSend,
        likeIcon,
        postAuthorName,
        likesList,
        dislikeIcon,
        dislikesList,
    }
}