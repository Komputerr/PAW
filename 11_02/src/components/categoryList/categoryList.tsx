import styles from "./categoryList.module.scss";
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
        </div>
    );
}
export default categoryList;
