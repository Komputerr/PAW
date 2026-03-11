import { useParams } from "react-router";
import styles from './commentList.module.scss';
import {useComments} from "../../hooks/useComments.ts";

function CommentList() {

    const { id } = useParams<{ id: string }>();
    const {data: comments,isLoading,isError} = useComments(id);

    return (
        <div className={styles.CommentList}>
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
            {!isLoading && !isError && comments && (
                <>
                    <h2 className={styles.CommentListHeading}>
                        Comments
                    </h2>
                    {comments.length === 0 && (
                        <div className={styles.CommentListError}>
                            No comments found for this post.
                        </div>
                    )}
                    {comments.map(comment => (
                        <div className={styles.CommentListComment} key={comment.id}>
                            <h4 className={styles.CommentListCommentName}>
                                {comment.name}
                            </h4>
                            <h6 className={styles.CommentListCommentUser}>
                                User: {comment.email}
                            </h6>
                            <p className={styles.CommentListCommentBody}>
                                {comment.body}
                            </p>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default CommentList;
