import {Link} from 'react-router'
import styles from "./navBar.module.scss";
function NavBar(){
    return(<nav className={styles.NavBar}>
        <ul className={styles.NavBarList}>
            <li>
                <Link className={styles.NavBarListLink} to="/">HOME</Link>
            </li>
            <li>
                <Link className={styles.NavBarListLink} to="/postList">POST LIST</Link>
            </li>
            <li>
                <Link className={styles.NavBarListLink} to="/categoryList">CATEGORY LIST</Link>
            </li>
        </ul>
    </nav>
    );
}
export default NavBar;