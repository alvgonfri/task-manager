import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-slate-700 text-slate-50 flex gap-x-5 px-10 py-5 mb-2 fixed top-0 left-0 right-0">
      <Link to="/">
        <img
          src="/src/assets/logo/logo.png"
          alt="logo"
          className="h-10 hover:opacity-50 transition duration-500"
        />
      </Link>
      <div className="flex lg:hidden flex-grow justify-end">
        <button
          className="bg-slate-400 hover:bg-slate-500 px-3 py-1 rounded-md border"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {isAuthenticated ? (
        <div
          id="authMenu"
          className={`bg-slate-700 lg:flex ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex-grow items-center justify-between absolute lg:relative top-16 lg:top-0 w-full lg:w-auto left-0 py-2 lg:py-0 px-10 lg:px-0`}
        >
          <div className="flex gap-x-5 flex-col lg:flex-row gap-y-2 lg:gap-y-0 mb-2 lg:mb-0">
            <Link to="/tasks" className=" hover:font-bold">
              Tasks
            </Link>
            <Link to="/tasks/create" className=" hover:font-bold">
              Create task
            </Link>
          </div>
          <div className="flex gap-x-5 items-start lg:items-stretch flex-col lg:flex-row gap-y-2 lg:gap-y-0">
            <Link
              to="/"
              onClick={() => logOut()}
              className="bg-slate-400 hover:bg-slate-500 rounded-md border border-slate-50 px-3 py-1 transition duration-500"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </Link>
            <h1 className="flex items-center">
              <FontAwesomeIcon icon={faUser} /> &nbsp; {user.username}
            </h1>
          </div>
        </div>
      ) : (
        <div
          id="noAuthMenu"
          className={`bg-slate-700 lg:flex ${
            isMenuOpen ? "block" : "hidden"
          } lg:flex-grow items-center justify-end absolute lg:relative top-16 lg:top-0 w-full lg:w-auto left-0 py-2 lg:py-0 px-10 lg:px-0`}
        >
          <div className="flex gap-x-5 items-start lg:items-stretch flex-col lg:flex-row gap-y-2 lg:gap-y-0 mb-2 lg:mb-0">
            <Link
              to="/login"
              className="hover:bg-slate-50 hover:text-slate-700 rounded-md border border-slate-50 px-3 py-1 transition duration-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-slate-400 hover:bg-slate-500 rounded-md border border-slate-50 px-3 py-1 transition duration-500"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
