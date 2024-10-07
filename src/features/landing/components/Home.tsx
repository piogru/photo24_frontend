import { Link } from "react-router-dom";
import LoginForm from "../../accounts/components/LoginForm";

export default function Home() {
  return (
    <div className="mx-auto px-8 max-w-screen-2xl w-full h-full flex flex-row justify-center items-center gap-4 md:gap-8 lg:gap-16">
      <div className="relative px-4 hidden md:block grow">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/potoh/image/upload/v1727970843/assets/gobtdiwptpzsshovoj1u.jpg"
            className="relative z-20 max-w-[60%] -rotate-12 p-3 bg-white dark:bg-gray-700 border border-slate-300 dark:border-slate-600 rounded-xl drop-shadow-lg"
          />
          <img
            src="https://res.cloudinary.com/potoh/image/upload/v1727970841/assets/el9xavcvycwwzpagqyqk.jpg"
            className="absolute top-0 left-[40%] max-w-[60%] rotate-12 p-3 bg-white dark:bg-gray-700 border border-slate-300 dark:border-slate-600 rounded-xl drop-shadow-lg"
          />
        </div>

        <div className="absolute -bottom-24 w-full mt-12 text-center text-gray-500">
          <div className="inline">Photos by: </div>
          <Link
            to="https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"
            target="_blank"
            className="text-blue-500 dark:text-blue-500 hover:underline"
          >
            {"Pine Watt"}
          </Link>
          <span>{", "}</span>
          <Link
            to="https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
            target="_blank"
            className="text-blue-500 dark:text-blue-500 hover:underline"
          >
            {"Claudio Testa"}
          </Link>
        </div>
      </div>

      <div className="w-full max-w-xs shrink-0">
        <LoginForm />
      </div>
    </div>
  );
}
