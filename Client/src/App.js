import Dashboard from './Component/Dashboard/Dashboard';
import Signin from './Component/Signin/Signin';
import Students from './Component/Dashboard/Students/Students'
import AddStudent from './Component/Dashboard/Students/AddStudent'
import EditStudent from './Component/Dashboard/Students/EditStudent'
import Group from './Component/Dashboard/Groups/Group'
import AddGroup from './Component/Dashboard/Groups/AddGroup'
import EditGroup from './Component/Dashboard/Groups/EditGroup'
import Sessions from './Component/Dashboard/Sessions/Sessions';
import AddSession from './Component/Dashboard/Sessions/AddSession';
import EditSession from './Component/Dashboard/Sessions/EditSession';
import Events from './Component/Dashboard/Calenders/Calenders'
import AddEvent from './Component/Dashboard/Calenders/AddCalender'
import EditEvent from './Component/Dashboard/Calenders/EditCalender'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Assesments from './Component/Dashboard/Assesments/Assesments';
import AddAssesment from './Component/Dashboard/Assesments/AddAssesment';
import EditAssesment from './Component/Dashboard/Assesments/EditAssesment';
import Grades  from './Component/Dashboard/Grades/Grades';
import AddGrade from './Component/Dashboard/Grades/AddGrade';
import EditGrade from './Component/Dashboard/Grades/EditGrade';


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
       <Route path='/AddGroup' element={<AddGroup/>}/>
       <Route path='/EditGroup/:userId' element={<EditGroup/>}/>
       <Route path='/Sessions' element={<Sessions/>}/>
       <Route path='/AddSession' element={<AddSession/>}/>
       <Route path='/EditSession/:userId' element={<EditSession/>}/>
       <Route path='/Events' element={<Events/>}/>
       <Route path='/AddEvent' element={<AddEvent/>}/>
       <Route path='/EditEvent/:userId' element={<EditEvent/>}/>
       <Route path='/Assesments' element={<Assesments/>}/>
       <Route path='/AddAssesment' element={<AddAssesment/>}/>
       <Route path='/EditAssesment/:userId' element={<EditAssesment/>}/>
       <Route path='/Grades' element={<Grades/>}/>
       <Route path='/AddGrade' element={<AddGrade/>}/>
       <Route path='/EditGrade/:userId' element={<EditGrade/>}/>

           </Routes>
           </BrowserRouter>

 
  );
}

export default App;
