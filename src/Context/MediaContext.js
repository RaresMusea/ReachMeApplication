import { createContext, useState } from "react";

export const MediaContext = createContext();

export const MediaContextProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);
  const [photosAndVideos, setPhotosAndVideos] = useState([]);

  return (
    <MediaContext.Provider
      value={{
        photos,
        setPhotos,
        videos,
        setVideos,
        files,
        setFiles,
        photosAndVideos,
        setPhotosAndVideos,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};
