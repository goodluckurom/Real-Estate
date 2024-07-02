import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaUserCircle, FaBars, FaCog } from "react-icons/fa";
import ThemeSettings from "./ThemeSettings";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header className="bg-secondary dark:bg-darkBackground dark:shadow-2xl  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/" className="flex items-center">
          <h1 className="font-bold text-lg sm:text-2xl flex items-center space-x-1">
            <span className="text-accent">Grandiose</span>
            <span className="text-light dark:text-primary">Abodes</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-lightSecondary dark:bg-darkSecondary rounded-lg flex items-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-accent"
        >
          <input
            type="text"
            placeholder="Search your dream home..."
            className="w-32 sm:w-80 p-3 text-lightText dark:text-darkText placeholder-gray-500 bg-transparent focus:outline-none rounded-l-lg  transition-colors duration-300"
          />
          <button
            aria-label="Search"
            className="p-3  rounded-r-lg  dark:bg-darkAccent hover:dark:bg-darkAccentDark transition-colors duration-300 flex items-center justify-center"
          >
            <FaSearch className="text-accent" />
          </button>
        </form>
        <div className="flex items-center space-x-4 ">
          <ul className="hidden sm:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li>About</li>
            </NavLink>{" "}
            <button
              className="text-light dark:text-primary"
              onClick={() => setSettingsOpen(true)}
            >
              <FaCog size={25} className="text-accent" />
            </button>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li>
                <FaUserCircle size={35} />
              </li>
            </NavLink>
          </ul>{" "}
          <button
            className="text-light dark:text-primary md:hidden"
            onClick={() => setSettingsOpen(true)}
          >
            <FaCog size={25} className="text-accent" />
          </button>
          <button
            className="sm:hidden text-light dark:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={25} className="text-accent" />
          </button>
        </div>
        {menuOpen && (
          <ul className="sm:hidden absolute right-0 top-16 bg-secondary dark:bg-dark p-4 space-y-2 shadow-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-accent" : "text-light dark:text-primary"
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-accent"
                  : "text-light dark:text-primary flex items-center"
              }
            >
              <li className="flex items-center">
                <FaUserCircle size={20} className="mr-2" />
                Profile
              </li>
            </NavLink>
          </ul>
        )}
      </div>
      {settingsOpen && <ThemeSettings onClose={() => setSettingsOpen(false)} />}
    </header>
  );
};

export default Header;
