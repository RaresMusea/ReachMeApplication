export const determineMessageType = (notificationBody) => {
  switch (notificationBody.messageType) {
    case "text":
      return "message";
    case "file":
      return "file";
    case "photo":
      return "photo";
    case "video":
      return "video";
  }
};
