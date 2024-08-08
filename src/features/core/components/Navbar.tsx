import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div>Nav</div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/profile">Test profile</Link>
        </li>
        <li>
          <Link to="/accounts/login">Login</Link>
        </li>
        <li>
          <Link to="/accounts/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
