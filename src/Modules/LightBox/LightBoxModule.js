import { parseDateAndTime } from "../Date/DatePipeModule";

export const buildMediaResourceAttributes = (
  imageHref,
  uploadDate,
  senderIdentifier
) => {
  return {
    href: imageHref,
    date: parseDateAndTime(uploadDate.toDate()),
    sender: senderIdentifier,
  };
};

export const buildFileResourceAttributes = (
  fileName,
  fileIcon,
  uploadDate,
  fileHref,
  senderIdentifier
) => {
  return {
    href: fileHref,
    date: parseDateAndTime(uploadDate.toDate()),
    sender: senderIdentifier,
    icon: fileIcon,
    name: fileName,
  };
};

export const getMediaResourceIndex = (
  mediaResourceArray,
  mediaResourceElem
) => {
  for (let i = 0; i < mediaResourceArray.length; i++) {
    if (mediaResourceArray[i].href === mediaResourceElem) {
      return i;
    }
  }
};

export const getMediaOnly = (mediaResourceArray) => {
  const result = [];
  mediaResourceArray.forEach((elem) => result.push(elem.href));
  return result;
};
