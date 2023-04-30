import {useEffect, useState} from "react";
import {defaultProfilePic} from "../../Modules/Exporters/ImageExporter";

import "../../Styles/Toast/MessageNotificationToast.scss";
import {getUserPhoto, toastProfilePicture,} from "../../Services/Toast Service/ToastService";

export default function MessageNotificationToast(props) {
  const [photoRef, setPhotoRef] = useState(defaultProfilePic);
  useEffect(() => {
    getUserPhoto(props.senderId).catch(console.error);
    setPhotoRef(toastProfilePicture);
  }, []);
  return (
    <div className="ToastWrapper">
      <div className="ToastRowOne">
        <img
          src={photoRef}
          className="ReceiverProfilePictureRounded"
          alt="Receiver Profile Picture Rounded"
        />
        <h3>{`Your have ${props.count} unread messages from ${props.sender}.`}</h3>
      </div>
      <div className="ToastRowTwo">
        <button>Dismiss</button>
        <button>Go to message</button>
      </div>
    </div>
  );
}
