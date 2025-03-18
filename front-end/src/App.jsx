import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
function App() {
  const [message, setMessage] = useState('hellow')

  return (
    <>
   
     <Signin/> 
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <br />
     <Signup/> 
    </>
  )
}

export default App
