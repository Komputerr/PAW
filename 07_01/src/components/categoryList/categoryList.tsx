import { Link } from "react-router";
import styles from "./categoryList.module.scss";
import stylesL from "../link/Link.module.scss";
const categoryList = () => {
    return (
        <div className={styles.CategoryList}>

            <h1>Category List</h1>
            <ul>
                <li>Software</li>
                <li>Hardware</li>
                <li>Artificial Intelligence</li>
                <li>Cybersecurity</li>
                <li>Networking</li>
            </ul>
            <Link to="/" className={stylesL.Link}>Back to Home</Link>
        </div>
    );
}
export default categoryList;
