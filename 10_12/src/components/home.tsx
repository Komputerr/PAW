import {Link} from 'react-router'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome in to my Home-site!</p>
            <Link to="/dashboard">Go visit our Dashboard</Link>
            <br/>
            <Link to="/settings">Go visit our Settings</Link>
            <br/>
            <Link to="/contacts">Go visit our Contacts</Link>
        </div>
    );
}
export default Home;