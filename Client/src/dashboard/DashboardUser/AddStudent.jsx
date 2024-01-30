import axios from "axios";
import React, { useState } from "react";
import Header from "../../dashboard/Header";
import Sidebar from "../../dashboard/Sidebar";
function AddUser() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [userData, setUserData] = useState({
    user_name: "",
    email_address: "",
    password: "",
    role_name: "",
  });
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/adduser",
        userData,
        config
      );
      console.log("User added successfully:", response.data);
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="w-full h-screen max-w-xs mx-auto mt-28">
        <form
          onSubmit={handleSubmit}
          className="w-[1100px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-10 "
        >
        
          <div className="w-8/12 mb-6 mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              value={userData.user_name}
              onChange={(e) =>
                setUserData({ ...userData, user_name: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-8/12 mb-6 mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              value={userData.email_address}
              onChange={(e) =>
                setUserData({ ...userData, email_address: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-8/12 mb-6 mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-8/12 mb-6 mx-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role:
            </label>
            <select
              value={userData.role_name}
              onChange={(e) =>
                setUserData({ ...userData, role_name: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="student">student</option>
            </select>
          </div>
          <div className="w-8/12 mx-auto">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
