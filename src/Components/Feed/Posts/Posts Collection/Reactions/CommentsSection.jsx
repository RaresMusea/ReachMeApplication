import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {List, ListItem} from "@mui/joy";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import noCommentsImage from '../../../../../Media/Images/undraw_real_time_collaboration_c62i.svg';
import {loggedInAccount} from "../../../../../Services/Feed Services/FeedDrawerService";
import IconButton from "@mui/joy/IconButton";
import {SendSharp} from "@mui/icons-material";
import {configureCommentAddingPayload} from "../../../../../Services/Post Services/PostService";
import {markCommentActivity} from "../../../../../Services/Firebase Service/Feed/FirebaseFeedService";

function CommentsDialog(props) {
    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog
            className="ReactionsDialog"
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "900px",
                        maxHeight:"500px",
                        height:"500px",
                    },
                },
            }}
            onClose={handleClose}
            open={open}>
            <DialogTitle
                style={{color: "#108e8e"}}
                className="ReactionsDialogTitle">
                Viewing comments section for the post uploaded by {props.postOwner}
            </DialogTitle>
            {
                props.comments === undefined || props.comments.length === 0 ?
                    <div className="NoComments">
                        <img src={noCommentsImage} className="NoCommentsImage" alt="No comments"/>
                        <h3>This post has no comments yet.</h3>
                    </div>
                    :
                    <List className="CommentsList">
                        {
                            props.comments.map(comment => (
                                <ListItem key={comment.commentIdentifier}>
                                    <p className="Comment">
                                        <b style={{color: comment.commentAuthor === loggedInAccount.userName ? "#108e8e" : "black"}}>{comment.commentAuthor}:</b>
                                        &nbsp;{comment.content}
                                    </p>
                                </ListItem>
                            ))
                        }
                    </List>
            }

            <div className="CommentForm">
                <textarea
                    onKeyDown={props.handleCommentAddingFromKey}
                    onChange={(e) => {
                        props.setText(e.target.value);
                    }}
                    className="CommentInput"
                    placeholder={props.postOwner === loggedInAccount.userName ? `Add a comment to your post` :
                        `Add a comment to ${props.postOwner}`}/>
                <IconButton
                    onClick={props.handleCommentAdding}
                    title="Add comment">
                    <SendSharp className={"SendCommentIcon"}/>
                </IconButton>
            </div>
        </Dialog>
    );
}

CommentsDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function CommentsSection(props) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const handleCommentAdding = async () => {
        const payload = configureCommentAddingPayload(text, props.postId);
        document.querySelector(".CommentInput").value = ``;
        fetch(`http://localhost:8080/comments-section`, payload)
            .then(response => response.json())
            .then(data => {
                const newCommentsList = [...comments, data];
                setComments(newCommentsList);
                markCommentActivity(props.postAuthorName, text);
                props.setCommentsCount(newCommentsList.length);
                setText("");
            })
            .catch(console.error);
    }

    const handleCommentAddingFromKey = async (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (open) {
            fetch(`http://localhost:8080/comments-section/${props.postId}`)
                .then(response => response.json())
                .then(data => {
                    setComments(data)
                })
                .catch(console.error);
        }
    }, [open]);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(props.postId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleClickOpen}>
                {props.trigger}
            </div>
            <CommentsDialog
                postOwner={props.postOwner}
                comments={comments}
                setText={setText}
                handleCommentAdding={handleCommentAdding}
                handleCommentAddingFromKey={handleCommentAddingFromKey}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}