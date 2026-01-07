import {Link} from 'react-router'
import styles from "./home.module.scss";
import stylesL from "../link/Link.module.scss";
const Home = () => {
    return (
        <div className={styles.Home}>
            <h1>Home</h1>
            <p>Welcome in to my Home-site!</p>
            <ul>
                <li>
                    <Link to="/posts" className={stylesL.Link}>Go see our posts</Link>
                </li>
                <li>
                    <Link to="/categoryList" className={stylesL.Link}>Go visit the list of categories</Link>
                </li>
            </ul>
        </div>
    );
}
export default Home;