import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logOut } = useAuth();

  return (
    <nav className="flex justify-between">
      <Link to="/">
        <h1>Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/tasks/create">Create task</Link>
            </li>
            <li>
              <Link to="/" onClick={() => logOut()}>
                Logout
              </Link>
            </li>
            <li>
              <h1>{user.username}</h1>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
