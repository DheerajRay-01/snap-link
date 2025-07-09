import React from "react";
// import {user} from '../../utils/demo.js'
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProfileIcon from "../ProfileIcon";

function Navbar() {
const user = useSelector((state) => state?.user?.user);

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm px-5">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-100 rounded-box z-1 mt-3 w-55 p-2 shadow "
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-links"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white" : ""
                  }
                >
                  My Links
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/qr-codes"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white" : ""
                  }
                >
                  QR Codes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "bg-black text-white" : ""
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl logo-font" to="/">
            SnapLink
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "bg-black text-white" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-links"
                className={({ isActive }) =>
                  isActive ? "bg-black text-white" : ""
                }
              >
                My Links
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/qr-codes"
                className={({ isActive }) =>
                  isActive ? "bg-black text-white" : ""
                }
              >
                QR Codes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "bg-black text-white" : ""
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
    <div className="navbar-end">
 
  <ProfileIcon user={user}/>
</div>

      </div>
    </div>
  );
}

export default Navbar;
