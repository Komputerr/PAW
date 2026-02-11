import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from './postDetails.module.scss'
import type { Post } from "../../types/Post/Post";
import CommentList from "../commentList/commentList.tsx";

function PostDetails() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!id) return;
        (() => {
            setIsLoading(true)
        })()
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then((data: Post) => setPost(data))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) return <div>Ładowanie posta...</div>;
    if (isError) return <div>Błąd ładowania posta</div>;
    if (!post) return null;

    return (
        <div className={styles.Main}>
            <div className={styles.Post}>
                <h1 className={styles.PostId}>Post {post.id}</h1>
                <h2 className={styles.PostTitle}>{post.title}</h2>
                <p className={styles.PostBody}>{post.body}</p>
            </div>
            <CommentList/>
        </div>

    );
}

export default PostDetails;
