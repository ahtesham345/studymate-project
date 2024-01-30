import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if the user is already logged in before rendering the login page
    if (sessionStorage.getItem("token")) {
      // If token exists, user is already logged in, so redirect to dashboard based on role
      const decodedToken = JSON.parse(
        atob(sessionStorage.getItem("token").split(".")[1])
      );
      if (decodedToken.role === "admin") {
        navigate("/dashboard");
      } else if (decodedToken.role === "student") {
        navigate("/student");
      }
    }
  }, []);

  const handleLogin = async () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 4) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email_address: email,
        password: password,
      });
      sessionStorage.setItem("isLoggedIn", "true");
      // Store the token in Session storage
      sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login unsuccessful. Please check your credentials.");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-5xl font-semibold mb-4 text-center">Login</h1>
        <form action="post">
          {/* <!-- Username Input --> */}
          <div className="mb-4">
            <label className="block text-gray-600 font-bold">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border font-semibold border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label className="block text-gray-600 font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border font-semibold border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <!-- Remember Me Checkbox --> */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label className="text-gray-600 ml-2 font-semibold ">
              Remember Me
            </label>
          </div>
          {/* <!-- Forgot Password Link --> */}
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline font-semibold">
              Forgot Password?
            </a>
          </div>
          {/* <!-- Login Button --> */}
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signin;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth/login', {
//         email_address: email,
//         password: password,
//       });

//       console.log('Login successful:', response.data);
//       // Optionally, you can store the token in state or a global state management solution

//       // Redirect to a different page or perform other actions on successful login
//     } catch (error) {
//       console.error('Login failed:',error);
//       // Optionally, show an error message to the user
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex justify-center items-center h-screen">

//     <div className="w-1/2 h-screen hidden lg:block">

//          <img src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80" alt="Placeholder Image" className="object-cover w-full h-full"/>

//     </div>

//     <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
//       <h1 className="text-5xl font-semibold mb-4 text-center">Login</h1>
//       <form action="post" >
//         {/* <!-- Username Input --> */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-bold">Username</label>
//           <input type="text"  value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border font-semibold border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
//         </div>
//         {/* <!-- Password Input --> */}
//         <div className="mb-4">
//           <label className="block text-gray-600 font-bold">Password</label>
//           <input type="password"  value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border font-semibold border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
//         </div>
//         {/* <!-- Remember Me Checkbox --> */}
//         <div className="mb-4 flex items-center">
//           <input type="checkbox" id="remember" name="remember" className="text-blue-500"/>
//           <label  className="text-gray-600 ml-2 font-semibold ">Remember Me</label>
//         </div>
//         {/* <!-- Forgot Password Link --> */}
//         <div className="mb-6 text-blue-500">
//           <a href="#" className="hover:underline font-semibold">Forgot Password?</a>
//         </div>
//         {/* <!-- Login Button --> */}
//         <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" onClick={handleLogin}>Login</button>
//       </form>

//     </div>
//     </div>
//   );
// };

// export default Signin;

// <div>
// <h1>Login</h1>
// <form>
//   <label>Email:</label>
//   <input
//     type="text"
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//   />

//   <label>Password:</label>
//   <input
//     type="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />

//   <button type="button" onClick={handleLogin}>
//     Login
//   </button>
// </form>
// </div>
