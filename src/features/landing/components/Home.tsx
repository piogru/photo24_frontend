import { Link } from "react-router-dom";
import LoginForm from "../../accounts/components/LoginForm";

export default function Home() {
  return (
    <div
      className="mx-auto flex h-full w-full max-w-screen-2xl flex-row items-center justify-center
        gap-4 px-8 md:gap-8 lg:gap-16"
    >
      <div className="relative hidden grow px-4 md:block">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/potoh/image/upload/v1727970843/assets/gobtdiwptpzsshovoj1u.jpg"
            className="relative z-20 max-w-[60%] -rotate-12 rounded-xl border border-slate-300 bg-white
              p-3 drop-shadow-lg dark:border-slate-600 dark:bg-gray-700"
          />
          <img
            src="https://res.cloudinary.com/potoh/image/upload/v1727970841/assets/el9xavcvycwwzpagqyqk.jpg"
            className="absolute left-[40%] top-0 max-w-[60%] rotate-12 rounded-xl border
              border-slate-300 bg-white p-3 drop-shadow-lg dark:border-slate-600
              dark:bg-gray-700"
          />
        </div>

        <div className="absolute -bottom-24 mt-12 w-full text-center text-gray-500">
          <div className="inline">Photos by: </div>
          <Link
            to="https://unsplash.com/photos/aerial-shot-of-forest-2Hzmz15wGik"
            target="_blank"
            className="text-blue-500 hover:underline dark:text-blue-500"
          >
            {"Pine Watt"}
          </Link>
          <span>{", "}</span>
          <Link
            to="https://unsplash.com/photos/green-hills-with-forest-under-cloudy-sky-during-daytime--SO3JtE3gZo"
            target="_blank"
            className="text-blue-500 hover:underline dark:text-blue-500"
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
