import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './components/Signin'
//import DashboardComp from './dashboard/DashboardComp';
import Dashboard from './dashboard/DashboardUser/Dashboard'
import DashCalender from './dashboard/DashCalender/DashCalender'
import DashEvent from './dashboard/DashEvent/DashEvent'
import DashForm from './dashboard/DashForm/DashForm'
import DashLayout from './dashboard/DashLayout/DashLayout'
import DashStudent from './dashboard/DashStudent/DashStudent'
import DashTask from './dashboard/DashTask/DashTask'
import Sidebar from './dashboard/Sidebar';
import AddStudent from './dashboard/DashboardUser/AddStudent';
import Update from './dashboard/DashboardUser/Update';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (<>
  <ToastContainer/>
   <BrowserRouter>
    <Routes>
       <Route exact path="/" element={ <Signin/>} />
       {/* <Route  path='/dashboard' element={<DashboardComp/>}/> */}
       <Route  path='/dashboard' element={<Dashboard/>}/>
       <Route  path='/DashCalender' element={<DashCalender/>}/>
       <Route path='/Sidebar' element={<Sidebar/>}/>
       <Route  path='/DashEvent' element={<DashEvent/>}/>
       <Route  path='/DashForm' element={<DashForm/>}/>
       <Route  path='/DashLayout' element={<DashLayout/>}/>
       <Route  path='/DashStudent' element={<DashStudent/>}/>
       <Route  path='/DashTask' element={<DashTask/>}/>
       <Route path='/AddStudent' element={<AddStudent/>}/>
       <Route path="/Update/:userId" element={<Update/>}/>
      
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

