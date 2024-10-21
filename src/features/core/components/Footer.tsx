import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Footer() {
  const date = __BUILD_DATE__;
  const title = format(date, "MMM dd, yyyy");

  return (
    <footer className="box-border hidden flex-row justify-center space-x-2 border-t border-slate-300 p-2 sm:flex dark:border-slate-600">
      <Link to="/about" className="hover:underline">
        About
      </Link>
      <span>{`v${import.meta.env.VITE_APP_VERSION}`}</span>
      <time title={title}>{format(date, "dd.MM.yyyy")}</time>
    </footer>
  );
}
