import React, { useState } from 'react'
import axios from "axios";
const Signup = () => {
    const [formdata,setformdata]=useState({
        name:"",
        password:"",
        email:"",
    })

    const handlechange = (e) => {
        const {name,value}=e.target
        setformdata({...formdata,[name]:value})
        console.log(formdata)
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
            try {
            const response= await axios.post("http://127.0.0.1:8000/api/Signup",formdata,  {
                headers: { "Content-Type": "application/json" },
              });
            localStorage.setItem("token", response.data.token); 
            console.log("Signup successful:", response.data);
         
        }catch(error){
            console.error("Signup error:", error.response?.data || error.message);
        }
    }

  return (  
    <div>
        <form action="" onSubmit={handlesubmit}>
            <label htmlFor="name">Username</label>
            <input type="text" id="name" name="name" onChange={(e)=>handlechange(e)} required></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e)=>handlechange(e)} required></input>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e)=>handlechange(e)} required></input>
            <button  type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default Signup