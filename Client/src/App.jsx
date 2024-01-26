import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './components/Signin'
//import DashboardComp from './dashboard/DashboardComp';
import Dashboard from './dashboard/Dashboard/Dashboard'
import DashCalender from './dashboard/DashCalender/DashCalender'
import DashEvent from './dashboard/DashEvent/DashEvent'
import DashForm from './dashboard/DashForm/DashForm'
import DashLayout from './dashboard/DashLayout/DashLayout'
import DashStudent from './dashboard/DashStudent/DashStudent'
import DashTask from './dashboard/DashTask/DashTask'
function App() {

  return (
   <BrowserRouter>
    <Routes>
       <Route exact path="/" element={ <Signin/>} />
       {/* <Route  path='/dashboard' element={<DashboardComp/>}/> */}
       <Route  path='/dashboard' element={<Dashboard/>}/>
       <Route  path='/DashCalender' element={<DashCalender/>}/>
       <Route  path='/DashEvent' element={<DashEvent/>}/>
       <Route  path='/DashForm' element={<DashForm/>}/>
       <Route  path='/DashLayout' element={<DashLayout/>}/>
       <Route  path='/DashStudent' element={<DashStudent/>}/>
       <Route  path='/DashTask' element={<DashTask/>}/>

      </Routes>
   </BrowserRouter>
   
  )
}

export default App

