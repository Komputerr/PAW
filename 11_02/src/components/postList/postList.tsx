import styles from './postList.module.scss'
import {Link} from "react-router";
import {usePosts} from "../../hooks/usePosts.ts";

function PostList() {
    const {data: posts,isLoading,isError} = usePosts();
    return (
        <div className={styles.Main}>
            <div className={styles.PostList}>
                {isLoading && (
                    <div className={styles.PostListsLoading}>
                        Loading...
                    </div>
                )}
                {isError && (
                    <div className={styles.PostListError}>
                        Error occurred
                    </div>
                )}
                {!isLoading && !isError && posts && (
                    <>
                        {posts.length === 0 && (
                            <div className={styles.PostListError}>
                                No posts found
                            </div>
                        )}
                        {posts.map(p => (
                            <div className={styles.PostListPost} key={p.id}>
                                <h5 className={styles.PostListPostTitle}>
                                    {p.title}
                                </h5>
                                <p className={styles.PostListPostBody}>
                                    {p.body.substring(0, 50)}...
                                </p>
                                <Link to={"/postList/post/" + p.id} className={styles.PostListPostLink}>
                                    Go to post
                                </Link>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
export default PostList;