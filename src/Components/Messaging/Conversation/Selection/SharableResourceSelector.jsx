import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {
  AttachFile,
  InsertDriveFile,
  Photo,
  VideoCameraFrontSharp,
} from "@mui/icons-material";
import IconButton from "@mui/joy/IconButton";
import { List } from "@mui/joy";
import PropTypes from "prop-types";
import "../../../../Styles/Messaging/Conversation/Conversation.scss";
import "../../../../Styles/Messaging/Conversation/SharableResourceSelector.scss";
import { useContext, useState } from "react";
import { Transition } from "../../MessagingFrame";
import {
  getFileExtension,
  getFileIconBasedOnFileExtension,
  getFileIconsBasedOnFilesExtensions,
  getFileNames,
  isFileOrDocumentProcessingSuccessful,
  isImageProcessingSuccessful,
  isVideoProcessingSuccessful,
} from "../../../../Modules/Messaging/ResourceSharing/SharableResourceSelectorModule";
import { ResourceSharingContext } from "../../../../Context/ResourceSharingContext";

function SimpleDialog(props) {
  const { onClose, selectedValue } = props;

  const handleClose = () => {
    onClose(selectedValue);
    props.updateResource([]);
    props.updateFileList([]);
  };

  const onProcessingSuccessful = (resources) => {
    handleClose();
    props.updateFileList(resources);
    if (resources.length === 1) {
      props.updateResource(URL.createObjectURL(resources[0]));
    } else {
      const temp = [];
      for (let res of resources) {
        temp.push(URL.createObjectURL(res));
      }
      props.updateResource(temp);
    }
    props.markAsSharable();
  };

  const onFileOrDocumentProcessingSuccessful = (resources) => {
    handleClose();
    props.updateFileList(resources);

    if (resources.length === 0) {
      props.configureExtra({
        source: getFileIconBasedOnFileExtension(resources[0]),
        fileName: resources[0].name,
      });
    } else {
      props.configureExtra({
        source: getFileIconsBasedOnFilesExtensions(resources),
        fileName: getFileNames(resources),
      });
    }

    props.markAsSharable();
  };

  const onImageSelection = (e) => {
    const files = e.target.files;
    if (isImageProcessingSuccessful(files)) {
      props.markType(files.length === 1 ? "image" : "images");
      onProcessingSuccessful(files);
    }

    document.querySelector("#PhotoPicker").files = null;
  };

  const onVideoSelection = (e) => {
    const files = e.target.files;
    if (isVideoProcessingSuccessful(files)) {
      props.markType(files.length === 1 ? "video" : "videos");
      onProcessingSuccessful(files);
    }
  };

  const onFileOrDocumentSelection = (e) => {
    const files = e.target.files;
    if (isFileOrDocumentProcessingSuccessful(files)) {
      props.markType(
        files.length === 1 ? `file/${getFileExtension(files[0])}` : "files"
      );
      onFileOrDocumentProcessingSuccessful(files);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={props.open}
      TransitionComponent={Transition}
    >
      <DialogTitle className="DialogTitle">{`Select the file type that you want to share`}</DialogTitle>
      <List className="SelectionOptions">
        <ListItemButton className="SelectionElement">
          <label htmlFor="PhotoPicker">
            Photo
            <input
              type="file"
              name="PhotoPicker"
              id="PhotoPicker"
              onChange={onImageSelection}
              multiple={true}
              style={{ display: "none" }}
              accept="image/svg+xml, image/gif, image/jpg, image/png, image/jpeg, image/webp"
            />
            <Photo />
          </label>
        </ListItemButton>
        <ListItemButton className="SelectionElement">
          <label htmlFor="VideoPicker">
            Video
            <input
              type="file"
              name="VideoPicker"
              multiple={true}
              accept="video/mp4, video/x-m4v, video/*"
              id="VideoPicker"
              onChange={onVideoSelection}
              style={{ display: "none" }}
            />
            <VideoCameraFrontSharp />
          </label>
        </ListItemButton>
        <ListItemButton className="SelectionElement">
          <label htmlFor="DocumentPicker">
            File or document
            <input
              type="file"
              name="DocumentPicker"
              multiple={true}
              id="DocumentPicker"
              onChange={onFileOrDocumentSelection}
              style={{ display: "none" }}
            />
            <InsertDriveFile />
          </label>
        </ListItemButton>
      </List>
      <div id="Alerts" />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SharableResourceSelector() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const {
    setIsSharable,
    setResource,
    setType,
    resource,
    setExtra,
    setFileList,
  } = useContext(ResourceSharingContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getRes = () => {
    return resource;
  };

  const markAsSharable = () => {
    setIsSharable(true);
  };

  const configureExtra = (extra) => {
    setExtra(extra);
  };

  const markType = (typeName) => {
    setType(typeName);
  };

  const updateResource = (res) => {
    setResource(res);
  };

  const updateFileList = (fileList) => {
    setFileList(fileList);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <IconButton
        title="Attach media"
        onClick={handleClickOpen}
        className="MessageSenderIconButton"
      >
        <AttachFile className="AttachIcon" />
      </IconButton>
      <div>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
          updateResource={updateResource}
          markAsSharable={markAsSharable}
          markType={markType}
          configureExtra={configureExtra}
          updateFileList={updateFileList}
          getRes={getRes}
        />
      </div>
    </>
  );
}
