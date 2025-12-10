import { Link } from "react-router";
const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Yo, this is the dashboard</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
}
export default Dashboard;
