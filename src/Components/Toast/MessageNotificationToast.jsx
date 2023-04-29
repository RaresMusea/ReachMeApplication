import { useContext, useEffect } from "react";
import { defaultProfilePic } from "../../Modules/Exporters/ImageExporter";

import "../../Styles/Toast/MessageNotificationToast.scss";
import { ConversationContext } from "../../Context/ConversationContext";

export default function MessageNotificationToast(props) {
  const { data } = useContext(ConversationContext);
  const picture =
    data.user.profilePhotoHref !== undefined
      ? data.user.profilePhotoHref
      : defaultProfilePic;

  useEffect(() => {
    console.log(picture);
  });

  return (
    <div className="ToastWrapper">
      <div className="ToastRowOne">
        <img
          src={data.user.profilePhotoHref}
          className="ReceiverProfilePictureRounded"
          alt="Receiver Profile Picture Rounded"
        />
        <h3>{`${props.sender} sent you a message`}</h3>
      </div>
      <div className="ToastRowTwo">
        <button>Dismiss</button>
        <button>Go to message</button>
      </div>
    </div>
  );
}
