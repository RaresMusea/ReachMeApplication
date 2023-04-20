import { useContext } from "react";
import { ResourceSharingContext } from "../../../Context/ResourceSharingContext";
import { ConversationContext } from "../../../Context/ConversationContext";
import "../../../Styles/Messaging/Misc/FileSharingListPreview.scss";
import IconButton from "@mui/joy/IconButton";
import { RemoveCircle } from "@mui/icons-material";

export default function FileSharingListPreview() {
  const { extra, setExtra } = useContext(ResourceSharingContext);
  const { data } = useContext(ConversationContext);

  const removeItem = (fileName) => {
    const newSource = [];
    const newFileName = [];

    for (let i = 0; i < extra.fileName.length; i++) {
      if (fileName === extra.fileName[i]) {
        continue;
      }
      newSource.push(extra.source[i]);
      newFileName.push(extra.fileName[i]);
    }

    setExtra({
      source: newSource,
      fileName: newFileName,
    });
  };

  return (
    <div className="FileSharingListWrapper">
      <p className="ListHeadingTitle">
        {`Your are about to share ${extra.source.length} files with ${data.user.userRealName}:`}
      </p>
      <div className="List">
        {extra.fileName.map((file, index) => (
          <FileSharingListItem
            file={file}
            key={index}
            extra={extra}
            source={extra.source}
            icon={extra.source[index]}
            setExtra={setExtra}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
}

function FileSharingListItem(props) {
  return (
    <div className="FileSharingListItemWrapper">
      <div className="LeftSide">
        <img
          src={props.icon}
          alt="List Item Icon Image"
          className="ListItemIconImage"
        />
        <p>{props.file}</p>
      </div>
      <IconButton
        className="RightSide"
        title="Remove file"
        onClick={() => {
          props.removeItem(props.file);
        }}
      >
        <RemoveCircle />
      </IconButton>
    </div>
  );
}
