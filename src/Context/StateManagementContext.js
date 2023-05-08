import {createContext, useState} from "react";

export const StateManagementContext = createContext();

export const StateManagementContextProvider = ({children}) => {
    const [joinedUserUpdate, setJoinedUserUpdate] = useState(false);
    const [conversationEmpty, setConversationEmpty] = useState(true);
    const [profilePhotoUpdate, setProfilePhotoUpdate] = useState(false);
    const [bioUpdate, setBioUpdate] = useState(false);
    const [posts, setPosts] = useState([]);
    const [newPosts, setNewPosts] = useState([]);
    const [update, setUpdate] = useState(false);


    return (
        <StateManagementContext.Provider
            value={{
                joinedUserUpdate,
                setJoinedUserUpdate,
                conversationEmpty,
                newPosts,
                setNewPosts,
                setConversationEmpty,
                update,
                setUpdate,
                posts,
                setPosts,
                profilePhotoUpdate,
                setProfilePhotoUpdate,
                bioUpdate,
                setBioUpdate,
            }}>
            {children}
        </StateManagementContext.Provider>
    );

};