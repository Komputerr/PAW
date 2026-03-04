import styles from './postDetails.module.scss'
import CommentList from "../commentList/commentList.tsx";
import User from "../user/user.tsx";
import {usePost} from "../../hooks/usePost.ts";
import {useParams} from "react-router";

function PostDetails() {
    const { id } = useParams<{ id: string }>();
    const {data: post,isLoading,isError} = usePost(id);

    return (
        <div className={styles.Main}>
            {isLoading && (
                <div>
                    Loading...
                </div>
            )}
            {isError && (
                <div>
                    Error occurred
                </div>
            )}
            {!isError && !isLoading && post &&
                (
                    <div className={styles.Post}>
                        <h1 className={styles.PostId}>Post {post.id}</h1>
                        <User/>
                        <h2 className={styles.PostTitle}>{post.title}</h2>
                        <p className={styles.PostBody}>{post.body}</p>
                    </div>
                )
            }

            <CommentList/>
        </div>

    );
}

export default PostDetails;
