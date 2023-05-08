import {lazy, useContext, useEffect, useState} from "react";
import {StateManagementContext} from "../../../../Context/StateManagementContext";

const Post = lazy(() => import ("./Post"));

export default function PostsCollection() {

    const {posts, setPosts} = useContext(StateManagementContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/feed/post`)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
            .catch(console.error);

        setTimeout(() => {
            setLoading(false)
        }, 2000);

    }, []);


    return (<div className="PostsWrapper">
        {
            posts.map(post =>
                <Post
                    loading={loading}
                    post={post}/>
            )
        }
    </div>);
}