import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from './commentList.module.scss'
import type { Comment } from "../../types/Comment/Comment.ts";

function CommentList() {
    const { id } = useParams<{ id: string }>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!id) return;
        (() => {
            setIsLoading(true)
        })()
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then(res => res.json())
            .then((json: Comment[]) => setComments(json))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);


    return (
        <div className={styles.CommentList}>
            {isLoading && (
                <div>
                    Trwa ładowanie danych...
                </div>
            )}
            {isError && (
                <div>
                    Wystąpił nieoczekiwany błąd
                </div>
            )}
            {!isLoading && !isError && (
                <>
                    <h2 className={styles.CommentListHeading}>
                        Comments
                    </h2>
                    {comments.length === 0 && (
                        <div className={styles.CommentListError}>
                            Nie znaleziono komentarzy dla tego posta
                        </div>
                    )}
                    {comments.map(comment => (
                        <div className={styles.CommentListComment}>
                            <h4 className={styles.CommentListCommentName} key={comment.id}>
                                Title: {comment.name}
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
