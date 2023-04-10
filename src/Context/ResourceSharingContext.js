import {createContext, useState} from "react";

export const ResourceSharingContext = createContext(undefined);

export const ResourceSharingContextProvider = ({children}) => {
    const [isSharable, setIsSharable] = useState(false);
    const [resource, setResource] = useState(null);
    const [preview, setPreview] = useState(null);
    const [type, setType] = useState("");
    const [extra, setExtra] = useState({});

    return (
        <ResourceSharingContext.Provider
            value={{
                isSharable,
                setIsSharable,
                resource,
                setResource,
                preview,
                setPreview,
                type,
                setType,
                extra,
                setExtra
            }}>
            {children}
        </ResourceSharingContext.Provider>
    );

};