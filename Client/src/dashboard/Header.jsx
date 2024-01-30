import React from "react";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { BsPersonCircle, BsSearch, BsJustify } from "react-icons/bs";

function Header({ OpenSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from session storage
    sessionStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="w-full flex justify-end mt-2">
        <BsPersonCircle className="icon w-10 h-10 absolute" />

        <div className="border-none relative -right-1">
          <Select className="border-none w-20 h-10 mt-1">
            <Option>
              <button onClick={handleLogout} className="w-14 h-8 font-bold">
                Log Out
              </button>
            </Option>
          </Select>
        </div>
      </div>
    </header>
  );
}

export default Header;
