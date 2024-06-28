import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary dark:bg-darkBackground shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="flex items-center">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center space-x-1 text-accent">
            <span>Grandiose</span>
            <span className="text-light dark:text-primary">Abodes</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-secondary dark:bg-secondary rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search your dream home..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 p-3 text-light dark:text-light placeholder-gray-400"
          />
          <button aria-label="Search" className="p-2">
            <FaSearch className="text-accent dark:text-light" />
          </button>
        </form>
        <div className="flex items-center space-x-4">
          <ul className="hidden sm:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-light "
              }
            >
              <li className="p-3">Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li className="p-3">About</li>
            </NavLink>
            <DarkModeToggle />
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-accent flex items-center"
                  : "text-light dark:text-light flex items-center"
              }
            >
              <li>
                <FaUserCircle
                  size={35}
                  className="text-accent dark:text-accent  "
                />
              </li>
            </NavLink>
          </ul>
          <button
            className="sm:hidden text-light dark:text-light"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={25} className="text-accent" />
          </button>
        </div>
        {menuOpen && (
          <ul className="sm:hidden absolute right-0 top-16 bg-primary dark:bg-darkBackground p-4 space-y-2 shadow-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-light"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-light"
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-accent"
                  : "text-light dark:text-light flex items-center"
              }
            >
              <li className="flex items-center">
                <FaUserCircle
                  size={20}
                  className="mr-2 text-accent dark:text-accent"
                />
                Profile
              </li>
            </NavLink>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
