import React, { useState } from 'react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
 const navigate=  useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");

  };

  return (
    <nav className="bg-white border-gray-200 h-14 dark:bg-gray-900 flex items-center justify-end pr-4">
      <div className="relative">
        {/* User icon */}
        <button
          type="button"
          className="focus:outline-none"
          onClick={toggleDropdown}
        >
          <FaUser className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer" />
        </button>
        
        {/* Logout dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md">
            <ul className=''>
              <li>
                <button
                  type="button"
                  className="block px-4 text-gray-700  w-full text-left"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className=" items-center" />Logout
                </button>
              </li>
              {/* Add more dropdown items as needed */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
