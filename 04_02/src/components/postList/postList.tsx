import { useEffect, useState } from "react"
import type {Post} from "../../types/Post/Post.ts";
import styles from './postList.module.scss'
import {Link} from "react-router";

function PostList() {
    const [posts, setPosts] = useState<Array<Post>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        (() => {
            setIsLoading(true)
        })()
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((json: Array<Post>) => {
                setPosts(json)
            })
            .catch(() => {
                setIsError(true)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, []);

    return (
        <div className={styles.Main}>
            <div className={styles.PostList}>
                {isLoading && (
                    <div className={styles.PostListsLoading}>
                        Trwa ładowanie danych...
                    </div>
                )}
                {isError && (
                    <div className={styles.PostListError}>
                        Wystąpił nieoczekiwany błąd
                    </div>
                )}
                {!isLoading && !isError && (
                    <>
                        {posts.length === 0 && (
                            <div className={styles.PostListError}>
                                Brak wpisów
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
                                    Przejdź do wpisu
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