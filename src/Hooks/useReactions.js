import {useEffect, useState} from "react";
import like from "../Media/Images/like (1).svg";
import dislike from "../Media/Images/dislike (1).svg";
import liked from "../Media/Images/heart (2).svg";
import disliked from "../Media/Images/dislike (2).svg";

export default function useReactions(props){
    const [likedPost, setLikedPost] = useState(false);
    const [dislikedPost, setDislikedPost] = useState(false);
    const [likeIcon, setLikeIcon] = useState(like);
    const [dislikeIcon, setDislikeIcon] = useState(dislike);
    const [likesList, setLikesList] = useState([]);
    const [dislikesList, setDislikesList] = useState([]);

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

    const handleLikeSend = () => {
        if (dislikedPost) {
            setDislikedPost(!dislikedPost);
        }
        setLikedPost(!likedPost);
    }

    const handleDislikeSend = () => {
        if (likedPost) {
            setLikedPost(!likedPost);
        }

        setDislikedPost(!dislikedPost);
    }

    useEffect(() => {
        fetch(`http://localhost:8080/feed/post/${props.postIdentifier}/getLikes`)
            .then(resp => resp.json())
            .then(data => setLikesList(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/feed/post/${props.postIdentifier}/getDislikes`)
            .then(resp => resp.json())
            .then(data => setDislikesList(data))
            .catch(console.error);
    }, []);

    return{
        handleDislikeSend,
        handleLikeSend,
        likeIcon,
        likesList,
        dislikeIcon,
        dislikesList,
    }

}