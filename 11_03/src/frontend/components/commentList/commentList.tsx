import { useState } from 'react';
import { useParams } from "react-router";
import styles from './commentList.module.scss';
import { useComments, useAddComment } from "../../hooks/useComments.ts";

function CommentList() {

    const { id } = useParams<{ id: string }>();
    const { data: comments, isLoading, isError } = useComments(id);
    const addComment = useAddComment(id);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        if (!author.trim() || !content.trim()) return;
        await addComment.mutateAsync({ author, content });
        setAuthor('');
        setContent('');
    };

    return (
        <div className={styles.CommentList}>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error occurred</div>}
            {!isLoading && !isError && comments && (
                <>
                    <h2 className={styles.CommentListHeading}>Comments</h2>

                    <div className={styles.CommentListForm}>
                        <input
                            placeholder="Your name"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                        <textarea
                            placeholder="Write a comment..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={addComment.isPending || !author.trim() || !content.trim()}
                        >
                            {addComment.isPending ? 'Sending...' : 'Add comment'}
                        </button>
                    </div>

                    {comments.length === 0 && (
                        <div className={styles.CommentListError}>
                            No comments found for this post.
                        </div>
                    )}
                    {comments.map(comment => (
                        <div className={styles.CommentListComment} key={comment.id}>
                            <h4 className={styles.CommentListCommentName}>{comment.author}</h4>
                            <p className={styles.CommentListCommentBody}>{comment.content}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default CommentList;