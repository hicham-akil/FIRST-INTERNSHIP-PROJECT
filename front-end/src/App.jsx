
import './App.css'
import React from 'react'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import {BrowserRouter, Route,Router, Routes} from 'react-router-dom';
import Navbar from './Components/Navbar'
import Showallproject from './Components/Showallproject'
import CreateProject from './Components/CreateProject'
import Notification from './Components/Notification';
import Chat from './Components/Chat';
function App() {

  return (
    
    <>
    <BrowserRouter>
      <Navbar/>
      <Chat/> 
      <Routes>
      <Route path="/Signin" element={
        <>
        <Signin></Signin>
        </>
      }>
        </Route>
      <Route path="/Signup" element={
        <>
       <Signup/>
        </>
      }>
        </Route>
     <Route path="/Showallproject" element={
        <>
        <Showallproject/>
        </>
      }>
        

      </Route>
     <Route path="/CreateProject" element={
        <>
       <CreateProject/>
        </>
      }>
        

      </Route>
     <Route path="/Notification" element={
        <>
      <Notification/>
        </>
      }>
        

      </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
