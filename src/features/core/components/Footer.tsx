import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center p-2 space-x-2 border-t border-slate-300 dark:border-slate-600">
      <Link to="/about" className="hover:underline">
        About
      </Link>
      <span>{`v${__APP_VERSION__}`}</span>
      <span>{format(__BUILD_DATE__, "dd.MM.yyyy")}</span>
    </footer>
  );
}
