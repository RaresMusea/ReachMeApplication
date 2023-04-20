import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ResourceSharingContext } from "../../../Context/ResourceSharingContext";
import ImageInput from "../../Forms/Inputs/ImageInput";
import { Cancel, Description, Share } from "@mui/icons-material";
import "../../../Styles/Dialog/ShareImageDialog.scss";
import IconButton from "@mui/joy/IconButton";
import { Transition } from "../../Messaging/MessagingFrame";
import useInputValue from "../../../Hooks/Forms/useInputValue";
import { ConversationContext } from "../../../Context/ConversationContext";
import MultimediaCarouselPreview from "../../Messaging/Misc/MultimediaCarouselPreview";
import { handleMultimediaMessageSharing } from "../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import FileSharingListPreview from "../../Messaging/Misc/FileSharingListPreview";

export default function MediaShareDialog(props) {
  const {
    isSharable,
    setIsSharable,
    resource,
    type,
    extra,
    setExtra,
    fileList,
  } = useContext(ResourceSharingContext);
  const { setInputValue } = useInputValue("");
  const { data } = useContext(ConversationContext);
  const [reset, setReset] = useState(false);
  const [scroll, setScroll] = useState("scroll");
  let message = "";

  const getInputMessageText = (e) => {
    message = e.target.value;
    console.log(message);
  };

  useEffect(() => {
    if (type === "video") {
      document.querySelector(".VideoPreview").src = resource;
    }

    if (type === "files") {
      setScroll("hidden");

      if (extra) {
        if (extra.fileName.length === 0) {
          handleClose();
        }
      }
    }
  }, [resource, extra]);

  const handleClose = () => {
    setReset(true);
    if (type === "video") {
      document.querySelector(".VideoPreview").pause();
    }

    setInputValue("");
    message = "";
    setIsSharable(false);

    if (type === "files") {
      setExtra({
        source: [],
        fileName: [],
      });
    }
  };

  const turnOffReset = () => {
    setReset(false);
  };

  const handleMediaMessageSending = async () => {
    const messageConfiguration = {
      conversationId: data.conversationIdentifier,
      receiver: data.user,
      messageContent: message,
    };

    await handleMultimediaMessageSharing(type, fileList, messageConfiguration);
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isSharable}
        keepMounted
        maxWidth={"lg"}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="DialogTitle">{`Share ${
          type.includes("file/") ? "file" : "" + type
        } 
                    with ${props.receiver}`}</DialogTitle>
        <DialogContent className={scroll === "hidden" ? "InvisibleScroll" : ""}>
          {type === "image" && (
            <img
              className="ImagePreview"
              src={resource}
              alt="ImageToSend"
              width={600}
              height={400}
            />
          )}
          {type === "images" && <MultimediaCarouselPreview />}
          {type === "video" && (
            <video controls className="VideoPreview" src={resource} />
          )}
          {type === "videos" && <MultimediaCarouselPreview />}
          {type.includes("file/") && (
            <>
              <img
                src={extra.source}
                className="FileTypePreview"
                alt="File Type Icon"
              />
              <span className="FileName">{extra.fileName}</span>
            </>
          )}
          {type === "files" && <FileSharingListPreview />}
          <div className="DescriptionWrapper">
            <ImageInput
              className="DescriptionInput"
              type={2}
              error={{}}
              reset={reset}
              inputValue={""}
              turnOffReset={turnOffReset}
              icon={Description}
              placeholder={"Message"}
              adornmentPosition={"start"}
              getInputText={getInputMessageText}
            />
          </div>
        </DialogContent>
        <div className="ButtonsArea">
          <IconButton
            title="Share"
            className="Button ShareButton"
            onClick={handleMediaMessageSending}
          >
            Share
            <Share className="Icon" />
          </IconButton>
          <IconButton className="Button CancelButton" onClick={handleClose}>
            Cancel
            <Cancel className="Icon" />
          </IconButton>
        </div>
      </Dialog>
    </div>
  );
}
