import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>Home page</div>
      <Link to={"/accounts/login"} className="flex space-x-4">
        <div>Login</div>
      </Link>
    </div>
  );
}
