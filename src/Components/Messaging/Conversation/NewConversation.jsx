import {MessageRounded} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";

export default function NewConversation(props) {

    return (
        <>
            <IconButton title="Start a new conversation"
                        className="IconButton"
                        onClick={props.enableSearch}>
                <MessageRounded className="RightSideHeaderIcon"/>
            </IconButton>
        </>
    )
}