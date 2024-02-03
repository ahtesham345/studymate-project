import Dashboard from './Component/Dashboard/Dashboard';
import Signin from './Component/Signin/Signin';
import Students from './Component/Dashboard/Students/Students'
import AddStudent from './Component/Dashboard/Students/AddStudent'
import EditStudent from './Component/Dashboard/Students/EditStudent'
import Group from './Component/Dashboard/Groups/Group'
import EditGroup from './Component/Dashboard/Groups/EditGroup'
import {BrowserRouter,Routes,Route} from "react-router-dom";



function App() {
  return (
    
           <BrowserRouter>
           <Routes>
      <Route path='/' element={<Signin/>} /> 
       <Route path='/Dashboard' element={<Dashboard/>}/>
       <Route path='/Students' element={<Students/>}/>
       <Route path='/AddStudent' element={<AddStudent/>}/>
       <Route path='/EditStudent/:userId' element={<EditStudent/>}/>
       <Route path='/Groups' element={<Group/>}/>
       <Route path='/EditGroup/:userId' element={<EditGroup/>}/>
           </Routes>
           </BrowserRouter>

 
  );
}

export default App;
