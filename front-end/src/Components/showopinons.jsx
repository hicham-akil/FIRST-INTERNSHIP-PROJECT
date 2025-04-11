import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Showopinons = () => {
    const [opinions,setopinions]=useState()
    useEffect(()=>{
    const fetchdata=async()=>{
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/getopinons", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log(response.data)
            setopinions(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }
   fetchdata()
},[]) 
  return (
    <div>
  {opinions?.map((opinion,index)=>(
    <div  key={index}>
        <h1>{opinion.client?.company_name}</h1>
    <p>{opinion.opinion_message}</p>
        </div>

  ))}
    </div>
  )
}

export default Showopinons