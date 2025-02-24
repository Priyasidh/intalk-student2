import logo from './logo.svg';
import './App.css';
import Register from './Component/Register';
import  Login from './Component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Student from './Component/Student';
import Dashboard from './Component/Dashboard';
import DisplayStudent from './Component/DisplayStudent';
import UpdateStudent from './Component/UpdateStudent';
import Mark from './Component/Mark';
import DisplayMark from './Component/DisplayMark';
import UpdateMark from './Component/UpdateMark';

function App() {
  return (

    <>
    {/* <Dashboard/> */}
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/Register" element={<Register />} />
       <Route path="/Dashboard" element={<Dashboard/>} />
       <Route path="/Student" element={<Student/>} />
       <Route path='/DisplayStudent' element={<DisplayStudent/>}/>
       <Route path='/UpdateStudent/:rno' element={<UpdateStudent/>}/>
       <Route path='/Mark' element={<Mark/>}/>
       <Route path='/DisplayMark' element={<DisplayMark/>}/>
       <Route path='/UpdateMark/:id' element={<UpdateMark/>}/>
       
     </Routes>
   </BrowserRouter>
  </>
  //   <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Register />} />
  //     <Route path="/Login" element={<Login/>} />
  //     <Route path='/Student' element={<Student/>}/>
  //   </Routes>
  // </BrowserRouter>

 

   
  );
}

export default App;
