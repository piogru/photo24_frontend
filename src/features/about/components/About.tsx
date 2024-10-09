import { Link } from "react-router-dom";

export default function About() {
  const repoURL = import.meta.env.VITE_APP_REPO_URL;

  return (
    <div className="max-w-screen-xl mx-4 lg:mx-8 xl:mx-auto py-12">
      <h2 className="text-2xl mt-8 mb-2">About</h2>
      <div className="flex flex-col justify-start gap-4 ">
        <div>Homepage photos by:</div>
        <ul className="ml-4">
          <li>
            <span>{"Pine Watt (Unsplash) - "}</span>
            <Link
              to="https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"
              target="_blank"
              className="text-blue-500 dark:text-blue-500 hover:underline"
            >
              {"https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"}
            </Link>
          </li>
          <li>
            <span>{"Claudio Testa (Unsplash) - "}</span>
            <Link
              to="https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
              target="_blank"
              className="text-blue-500 dark:text-blue-500 hover:underline"
            >
              {
                "https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
              }
            </Link>
          </li>
        </ul>
        <div>
          <div>Project repository:</div>
          <Link
            to={repoURL}
            target="_blank"
            className="text-blue-500 dark:text-blue-500 hover:underline"
          >
            {repoURL}
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
