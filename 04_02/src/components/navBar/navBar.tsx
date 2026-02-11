import {Link} from 'react-router'
import styles from "./navBar.module.scss";
function NavBar(){
    return(<nav className={styles.NavBar}>
        <ul className={styles.NavBarList}>
            <li>
                <Link className={styles.NavBarListLink} to="/">Strona główna</Link>
            </li>
            <li>
                <Link className={styles.NavBarListLink} to="/postList">Lista postów</Link>
            </li>
            <li>
                <Link className={styles.NavBarListLink} to="/categoryList">Lista kategorii</Link>
            </li>
        </ul>
    </nav>
    );
}
export default NavBar;