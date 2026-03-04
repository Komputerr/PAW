import styles from './user.module.scss'
import {useUser} from "../../hooks/useUser.ts";
import {useParams} from "react-router";

function User() {
    const { id } = useParams<{ id: string }>();
    const {data: user,isLoading,isError} = useUser(id);

    return (
        <div className={styles.Main}>
            {isLoading && (
                <div>
                    Loading...
                </div>
            )}
            {isError && (
                <div>
                    Error occurred
                </div>
            )}
            {!isError && !isLoading && user &&
                (
                    <div className={styles.User}>
                        <h2 className={styles.UserName}>User: {user.username}</h2>
                    </div>
                )
            }
        </div>

    );
}

export default User;
