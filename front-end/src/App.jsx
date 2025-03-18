import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import {BrowserRouter, Route,Router, Routes} from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

      <Route path="/Home" element={
        <>
        <h1>hellow home</h1>
        </>
      }>
        </Route>
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
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
