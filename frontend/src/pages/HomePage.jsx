import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="flex justify-center mt-5">
        <p className="text-4xl font-bold text-center">
          Task Manager lets you organize your tasks in a simple way.
        </p>
      </div>
      <div className="md:grid grid-cols-2">
        <div className="p-5">
          <img
            src="/assets/home_image.jpg"
            alt="home image"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-center m-5 pb-5 md:pb-0">
          {isAuthenticated ? (
            <>
              <p className="text-3xl font-semibold mb-5">Manage your tasks!</p>
              <div className="flex gap-x-4 mt-5">
                <Link
                  to="/tasks"
                  className="bg-slate-700 hover:bg-slate-800 text-slate-50 font-medium rounded-lg md:text-xl px-5 py-2.5"
                >
                  View tasks
                </Link>
                <Link
                  to="/tasks/create"
                  className="bg-slate-700 hover:bg-slate-800 text-slate-50 font-medium rounded-lg md:text-xl px-5 py-2.5"
                >
                  New task
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-3xl font-semibold mb-5">Get started!</p>
              <div className="flex gap-x-4 mt-5">
                <Link
                  to="/login"
                  className="bg-slate-700 hover:bg-slate-800 text-slate-50 font-medium rounded-lg md:text-xl px-5 py-2.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-slate-400 hover:bg-slate-500 text-slate-50 font-medium rounded-lg md:text-xl px-5 py-2.5"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
