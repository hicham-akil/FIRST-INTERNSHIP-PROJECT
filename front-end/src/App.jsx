import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
function App() {
  const [message, setMessage] = useState('hellow')

  return (
    <>
      <h1 className='text-red-500'>{message}</h1>    
      <button onClick={() => setMessage('Hello, React!')}>Change Message</button>
    </>
  )
}

export default App
