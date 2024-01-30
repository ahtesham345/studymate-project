import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../../dashboard/Header'
import Sidebar from '../../dashboard/Sidebar'
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Update = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        

        const response = await axios.get(
          `http://localhost:5000/users/get-user/${userId}`,
          config
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data for editing:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `http://localhost:5000/users/user-update/${userId}`,
        userData,
        config
      );
      toast.success("Field Updated Successfully !");

        setTimeout(()=>{
          navigate('/dashboard')
        },2000)

//       //console.log("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <div className="w-full h-screen max-w-xs mx-auto mt-28">

          <form
        onSubmit={handleSubmit}
        className="w-[1100px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-10"
      >

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <input
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email_address"
            value={userData.email_address}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role:
          </label>
          <select
            value={userData.role}
            name="role"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      {/* <ToastContainer/> */}
    </div>
    </div>
  );
};

export default Update;
