import { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../constext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  //! signOut ------------
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //! theme toggle switch button ---------
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "winter");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  //* handle Theme button------------
  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `text-blue-500 font-bold` : "font-normal"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive ? `text-blue-500 font-bold` : "font-normal"
          }
        >
          All-Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-products"
          className={({ isActive }) =>
            isActive ? `text-blue-500 font-bold` : "font-normal"
          }
        >
          My-Products
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/create-a-product"
              className={({ isActive }) =>
                isActive ? `text-blue-500 font-bold` : "font-normal"
              }
            >
              Create-A-Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bids"
              className={({ isActive }) =>
                isActive ? `text-blue-500 font-bold` : "font-normal"
              }
            >
              My-Bids
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-downloadsProducts"
              className={({ isActive }) =>
                isActive ? `text-blue-500 font-bold` : "font-normal"
              }
            >
              Downloads
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          Smart<span>Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {/* Toggle (switch) -----------*/}
        <div className="mr-2">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked
            className="toggle"
          />
        </div>
        {/* user active-------------------- */}
        {user ? (
          <Link
            to="/login"
            onClick={handleSignOut}
            className="btn text-white bg-gradient-to-r from-primary to-secondary"
          >
            Sign Out
          </Link>
        ) : (
          <Link
            to="/register"
            className="btn text-white bg-gradient-to-r from-primary to-secondary"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
