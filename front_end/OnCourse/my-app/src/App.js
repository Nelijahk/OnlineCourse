import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Account from './Pages/Account';
import Edit from './Pages/EditAccount';
import NewCourse from './Pages/NewCourse';
import Course from './Pages/Course';
import AboutTeacher from './Pages/AboutTeacher';
import MyCourses from './Pages/MyCourses';
import EditCourse from './Pages/EditCourse';
import AllStudents from './Pages/AllStudents';
import Student from './Pages/Student';
import Accounts from './Pages/Accounts';
import ForTeacher from './Pages/ForTeacher';
import RegistTeacher from './Pages/RegistTeacher';
import Requests from './Pages/Requests';
import Request from './Pages/Request';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
        <div className="maincontainer">
            <Router>
                <Header></Header>
                <Routes>
                    <Route exact path ='/' element={<Home />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/account' element={<Account />} />
                    <Route exact path='/accounts' element={<Accounts />} />
                    <Route exact path='/edit' element={<Edit />} />
                    <Route exact path='/newcourse' element={<NewCourse />} />
                    <Route exact path='/course/:name' element={<Course />} />
                    <Route exact path='/course/teacher/:name' element={<AboutTeacher />} />
                    <Route exact path='/mycourses' element={<MyCourses />} />
                    <Route exact path='/course/edit/:name' element={<EditCourse />} />
                    <Route exact path='/course/students/:name' element={<AllStudents />} />
                    <Route exact path='/user/:user_name' element={<Student />} />
                    <Route exact path='/teacher' element={<ForTeacher />} />
                    <Route exact path='/registteacher' element={<RegistTeacher />} />
                    <Route exact path='/requests' element={<Requests />} />
                    <Route exact path='/request/:user_name' element={<Request />} />
                </Routes>
                <hr></hr>
                <Footer></Footer>
            </Router>
        </div>
    )
  };
}
export default App;
