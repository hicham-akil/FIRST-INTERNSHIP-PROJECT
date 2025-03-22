import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Showallproject = () => {
    const [data,setdata]=useState([]);
    const token=localStorage.getItem("token");
    useEffect(()=>{
 const fetchdata=async()=>{
            try{

              const response=await axios.get('http://127.0.0.1:8000/api/project',{
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization":`Bearer ${token}`
                    },
                });
                setdata(response.data.data);
            } catch(error){
       console.log(error);
       
    } 
    }
    fetchdata();
},[])
    return (
        <div>
        <h1>{project.title}</h1>

        
    </div>
  )
}

export default Showallproject