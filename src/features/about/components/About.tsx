import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function About() {
  const repoURL = import.meta.env.VITE_APP_REPO_URL;
  const buildDate = format(__BUILD_DATE__, "dd.MM.yyyy");
  const buildDateTitle = format(__BUILD_DATE__, "MMM dd, yyyy");

  return (
    <div className="mx-4 max-w-screen-xl py-12 lg:mx-8 xl:mx-auto">
      <h2 className="mb-2 mt-8 text-2xl">About</h2>
      <div className="flex flex-col justify-start gap-4">
        <div>
          <div>Homepage photos by:</div>
          <ul className="ml-4">
            <li>
              <span>{"Pine Watt (Unsplash) - "}</span>
              <Link
                to="https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"
                target="_blank"
                className="text-blue-500 hover:underline dark:text-blue-500"
              >
                {
                  "https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"
                }
              </Link>
            </li>
            <li>
              <span>{"Claudio Testa (Unsplash) - "}</span>
              <Link
                to="https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
                target="_blank"
                className="text-blue-500 hover:underline dark:text-blue-500"
              >
                {
                  "https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
                }
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div>Project repository:</div>
          <Link
            to={repoURL}
            target="_blank"
            className="text-blue-500 hover:underline dark:text-blue-500"
          >
            {repoURL}
          </Link>{" "}
        </div>

        <div>
          <div>
            <span>Version: </span>
            <span>{`v${import.meta.env.VITE_APP_VERSION}`}</span>
          </div>
          <div>
            <span>Build date: </span>
            <time title={buildDateTitle}>{buildDate}</time>
          </div>
        </div>
      </div>
    </div>
  );
}
