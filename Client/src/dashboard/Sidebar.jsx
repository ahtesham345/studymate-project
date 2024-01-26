import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { FaRegUser,FaTasks } from "react-icons/fa";
 import { SlCalender } from "react-icons/sl";
 import { MdEvent } from "react-icons/md";

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);
   // Check if the user was redirected from the login page
   
   useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
              // Decode the token directly
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      // Check if the decoded token has id and role properties
      if (decodedToken && decodedToken.id && decodedToken.role) {
        // Set the id and role in the state
        // console.log('Decoded Token:', decodedToken);
        setRole(decodedToken.role);
      } else {
        // Handle the case where id or role is not present in the decoded token
        setError({ message: 'ID or role not found in the decoded token' });
      }
            } catch (error) {
              setError(error);
            }
          };
    
        fetchData();

      

      }, []);


      if (error) {
        return <p>Error: {error.message}</p>;
      }
  return (
    <aside id="sidebar">
        <div className='sidebar-title'>
           <h1 className='text-3xl font-semibold text-white'>StudyMate</h1>
            
        </div>

        <ul className='sidebar-list'>
        {role === 'admin' && (
          <>
            <Link to="/dashboard">
              <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                  <FaRegUser className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'> User</h1>
                </a>
              </li>
            </Link>
            <Link to="/DashTask">
              <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                  <FaTasks className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'> Task</h1>
                </a>
              </li>
            </Link>
            <Link to="/DashCalender">
              <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                  <SlCalender className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'>Calender</h1>
                </a>
              </li>
            </Link>
          </>
        )
        }
        
       
{
    role === 'student' && (

        <>
        <Link to="/DashEvent">
            <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                <MdEvent className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'> Event</h1>
                </a>
            </li>
            </Link>
            <Link to="/DashStudent">
            <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                <FaRegUser className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'>Students</h1>
                </a>
            </li>
            </Link>
            <Link to="/DashForm">
            <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                <FaRegUser className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'> Forms</h1>
                </a>
            </li>
            </Link>
            <Link to="/DashLayout">
            <li className='sidebar-list-item'>
                <a href="" className='flex flex-row gap-x-5'>
                <FaRegUser className='w-8 h-8 ' /> <h1 className='text-xl font-bold mt-2'>Layout</h1>
                </a>
            </li>
            </Link> 
        </>
    )
}


      
        </ul>
    </aside>
    
  )
  
}

export default Sidebar





            