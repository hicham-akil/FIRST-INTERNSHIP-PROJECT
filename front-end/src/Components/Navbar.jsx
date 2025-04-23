import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isadmine = JSON.parse(localStorage.getItem('is_admin'));
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
<div className="bg-gray-100 shadow-md flex justify-between items-center px-6 py-3">


      <div>
        <Link className="text-2xl font-semibold text-gray-700 hover:text-gray-900" to="/">Oplus</Link>
      </div>

      <div className="flex items-center space-x-6 relative">
        

        {isadmine ? (
          <>
          <Link className="text-gray-600 hover:font-bold" to="/Showallproject">Show All Projects</Link>
          <Link className="text-gray-600 hover:font-bold" to="/statistics">Statistics</Link>
          </>
        ) : (
          <>
          <Link className="text-gray-600 hover:font-bold" to="/Showallproject">My project</Link>
          <Link className="text-gray-600 hover:font-bold" to="/notification">Notification</Link>
          </>
        )}

        {token ? (
          <div className="relative" ref={dropdownRef}>
            <span
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-700 font-medium cursor-pointer hover:underline"
            >
              {name}
            </span>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>
                <Link
                  to="/Signin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Change Account
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="text-gray-600 hover:font-bold" to="/Signup">Signup</Link>
            <Link className="text-gray-600 hover:font-bold" to="/Signin">Signin</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
