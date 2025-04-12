
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
import FetchMessages from './Components/FetchMessages';
import ChatClient from './Components/chatClient';
import Messages from './Components/Messages';
import AddprojectFilforadmin from './Components/AddprojectFilforadmin';
import AdminStatistics from './Components/AdminStatistics';
import HomePage from './Components/Home';
import Footer from './Components/footer';
import Opinion from './Components/Opinion';
import ShowOpinions from './Components/showopinons';
import ShowUseropinion from './Components/ShowUseropinion';
function App() {
  const is_admin = JSON.parse(localStorage.getItem("is_admin"));

  return (
    
    <>
     
    {/* {is_admin &&(
      <>
      <FetchMessages/> 
      </>
      
      )} */}
      <BrowserRouter>
        <Navbar/>
      <Routes>
      <Route path="/" element={
        <>
        <HomePage/>
          </>
        }>
          </Route>
      <Route path="/chat/:projectId/:userId" element={<Chat />} />
      
 <Route path="/message/:userId" element={<Messages />} /> 
        <Route path="/client/chat/:projectId" element={<ChatClient />} />
        <Route path="/addFild/:projectId" element={<AddprojectFilforadmin />} />

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
     <Route path="/statistics" element={
       <>
      <AdminStatistics/>
        </>
      }>
        

      </Route>
     <Route path="/notification" element={
       <>
       <Notification/>
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
        <Opinion></Opinion>
        <ShowUseropinion/>
        <ShowOpinions/>
        <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App
