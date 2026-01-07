import {Link} from "react-router";
import styles from "./posts.module.scss";
import stylesL from "../link/Link.module.scss";
const Posts = () => {
    return (
        <div className={styles.Posts}>
            <h1>Posts</h1>
            <p>This is where posts are gonna be</p>
            <Link to="/" className={stylesL.Link}>Back to Home</Link>
        </div>
    );
}
export default Posts;
