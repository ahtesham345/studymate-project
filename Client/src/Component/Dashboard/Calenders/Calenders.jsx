import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Sidebar from '../../../partials/Sidebar'
import Header from '../../../partials/Header'

function Calenders() {
    const [data,setData] = useState([]);
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
            `http://localhost:5000/calender/all-events`,
            config
          );
          
    
          // Set the fetched user data to the state
          setData(response.data);
    
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      useEffect(() => {
        // Fetch user data when the component mounts or when it returns to the page
        fetchUserData();
      }, []) 

      const HandleEditCalender = (userId) => {
        // Navigate to the Update page with userId as URL parameter
          window.location.href = `/EditEvent/${userId}`;
      };

      const HandleDeleteCalender = async (userId) => {
        try {
          const token = sessionStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          // Make a DELETE request to the API endpoint to delete the user
          await axios.delete(
            `http://localhost:5000/calender/delete-event/${userId}`,
            config
          );
    
          // Refetch user data after deletion
          fetchUserData();
    
          // Show success message
          // toast.success("User deleted successfully!");
        } catch (error) {
        
          console.error("Error deleting user:", error);
       
        }
      };



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
        <div className="ml-4 mt-2">
          {/* Content of the dashboard */}
          <div className="w-full flex justify-end mr-32 my-3">
          <button className=" bg-blue-500  font-bold py-2 px-4 rounded-md">
            <Link to="/AddEvent" className="text-white no-underline">Add Event</Link>
          </button>
        </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
         <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
             <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                 <tr>
                     <th scope="col" class="px-6 py-3">
                         Event-Name
                     </th>
                     <th scope="col" class="px-6 py-3">
                         Event-Date 
                     </th>
                     <th scope="col" class="px-6 py-3">
                         Event-Time 
                     </th>
                     <th scope="col" class="px-6 py-3">
                         Description 
                     </th>
                    
                     <th scope="col" class="px-6 py-3">
                         Student-Name  
                     </th>
                     <th scope="col" class="px-6 py-3">
                         Action
                     </th>
                 </tr>
             </thead>
             <tbody>
              {
                data.map((item) => {
                  return(
                 <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                     <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                         {item.event_name}
                     </td>
                     <td class="px-6 py-4">
                     {item.event_time}
                     </td>
                     <td class="px-6 py-4">
                     {item.event_date}
                     </td>
                     <td class="px-6 py-4">
                     {item.event_description}
                     </td>
                     <td class="px-6 py-4">
                     {item.user_id.user_name}
                     </td>
                     <td class=" pl-16 space-x-2 py-4">
                         <button  className="font-medium text-blue-600 dark:text-blue-500 no-underline  hover:no-underline" onClick={() =>HandleEditCalender(item._id)}>Edit</button>
                         <button  className="font-medium text-red-600 no-underline hover:text-red-600 hover:no-underline" onClick={() =>HandleDeleteCalender(item._id)}>Delete</button>
                     </td>
                 </tr>
                     )
                    })
                  }
             </tbody>
         </table>
     </div>
          {/* Other components and content */}
        </div>
      </main>
    </div>
  </div>
  )
}

export default Calenders
