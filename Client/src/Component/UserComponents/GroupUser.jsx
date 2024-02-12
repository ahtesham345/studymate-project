import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GroupUser() {
  const [userData, setUserData] = useState(null);

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
          "http://localhost:5000/group/get-all-groups",
          config
        );
  
        const allUsersData = response.data;
        console.log("Fetched User Data:", allUsersData); // Debugging
        setUserData(allUsersData);
      } catch (error) {
        console.log("Error Fetching User Data", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  console.log("datas", userData);
  
  const getUserId = (tokens) => {
    try {
      const tokenParts = tokens.split('.');
      const decodedPayload = atob(tokenParts[1]);
      const payloadObj = JSON.parse(decodedPayload);
      const userId = payloadObj.id;
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
  const tokens = sessionStorage.getItem("token");
  const userId = getUserId(tokens);
  
  console.log('User id:', userId);
  
  // Function to find user by ID
  const findUserById = (userId) => {
    if (!userData) return null;
    const group = userData.find(group => group.user_id._id === userId);
    return group || {}; // Return an empty object if user is not found
  };
  
  const currentUser = findUserById(userId);
  console.log("Current User:", currentUser);
  




  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pl-60">
          {/* Your main content goes here */}
          <div className="ml-10 mt-2">
            {/* Content of the dashboard */}
            {currentUser &&  (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Group name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        User Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {currentUser.group_name}
    </td>
    <td className="px-6 py-4">{currentUser.user_id.user_name}</td>
    
  </tr>
</tbody>

                </table>
              </div>
            )}
            {/* Other components and content */}
          </div>
        </main>
      </div>
    </div>
  );
}



export default GroupUser;
