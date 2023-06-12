import {lazy, useContext, useEffect, useState} from "react";
import {StateManagementContext} from "../../../../Context/StateManagementContext";

const Post = lazy(() => import ("./Post"));

export default function PostsCollection() {

    const {posts, setPosts, manualRecharge, setManualRecharge} = useContext(StateManagementContext);
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

    useEffect(() => {
        if (manualRecharge) {
            setLoading(true);
            setPosts([]);
            fetch(`http://localhost:8080/feed/post`)
                .then(response => response.json())
                .then(data => {
                    setPosts(data);
                    setTimeout(() => {
                        setManualRecharge(false);
                        setLoading(false);
                    }, 1500);
                })
                .catch(console.error);
        }
    }, [manualRecharge])

    return (<div className="PostsWrapper">
        {
            posts.map(post =>
                <Post
                    key={post.postIdentifier}
                    loading={loading}
                    post={post}/>
            )
        }
    </div>);
}