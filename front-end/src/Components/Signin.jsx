import React, { useState } from 'react'
import axios from "axios";
const Signin = () => {
    const [formdata,setformdata]=useState({
        password:"",
        email:"",
    })
    const token=localStorage.getItem('token');

    const handlechange = (e) => {
        const {name,value}=e.target
        setformdata({...formdata,[name]:value})
        console.log(formdata)
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
            try {
            const response= await axios.post("http://127.0.0.1:8000/api/Signup",formdata,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });
                console.log("Response:", response.data);
         
         
        }catch(error){
            console.error("Signup error:", error.response?.data || error.message);
        }
    }

  return (  
    <div>
        <form action="" onSubmit={handlesubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e)=>handlechange(e)} required></input>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e)=>handlechange(e)} required></input>
            <button  type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Signin;