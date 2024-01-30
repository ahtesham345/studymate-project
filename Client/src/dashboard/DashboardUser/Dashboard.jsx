import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard/Header";
import Sidebar from "../../dashboard/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function DashboardComp() {
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from the API
  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a GET request to the API endpoint
      const response = await axios.get(
        "http://localhost:5000/users/all-users",
        config
      );

      // Set the fetched user data to the state
      const userData = response.data.Users;
      setData(userData);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts or when it returns to the page
    fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts or when it returns

  useEffect(() => {
    // Check if the user was redirected from the login page
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const token = sessionStorage.getItem("token");

    if (!token) {
      // If not authenticated, redirect to the login page
      navigate("/");
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Show a welcome toast message based on the user's role
      if (isLoggedIn === "true" && decodedToken) {
        if (decodedToken.role === "admin") {
          toast.success("Welcome to the Admin Dashboard!");
        } else if (decodedToken.role === "student") {
          toast.success("Welcome to the Student Dashboard!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make a DELETE request to the API endpoint to delete the user
      await axios.delete(
        `http://localhost:5000/users/user-delete/${userId}`,
        config
      );

      // Refetch user data after deletion
      fetchUserData();

      // Show success message
      toast.success("User deleted successfully!");
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error deleting user:", error);
      // Show error message
      //  toast.error("Error deleting user. Please try again later.");
    }
  };
  const handleEditClick = (userId) => {
    // Navigate to the Update page with userId as URL parameter
    window.location.href = `/Update/${userId}`;
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className="w-[1400px] ">
        <div className="w-full flex justify-end">
          <button className=" mt-4 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
            <Link to="/AddStudent">Add Student</Link>
          </button>
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  User Name
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Email Address
                </th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            {data.map((ele) => {
              return (
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4">{ele.user_name}</td>
                    <td class="px-6 py-4">{ele.email_address}</td>

                    <td class="px-6 py-4">
                      <div class="flex justify-end gap-4">
                        <a
                          x-data="{ tooltip: 'Delete' }"
                          href="#"
                          onClick={() => handleDeleteUser(ele._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </a>
                        <a
                          x-data="{ tooltip: 'Edit' }"
                          href="#"
                          onClick={() => handleEditClick(ele._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6"
                            x-tooltip="tooltip"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                            />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
