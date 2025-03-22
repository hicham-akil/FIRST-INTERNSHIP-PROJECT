import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Showallproject = () => {
    const [data,setdata]=useState([]);
    const token=localStorage.getItem("token");
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(()=>{
 const fetchdata=async()=>{
            try{

              const response=await axios.get('http://127.0.0.1:8000/api/project',{
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization":`Bearer ${token}`
                    },
                });
                setLoading(false);
                setdata(response.data.data);
                console.log('showdata',response.data.data)
            } catch(error){
                setError(error.message)
       console.log(error);
       
    } 
    }
    fetchdata();
},[])
if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    return (
        <div>
        <h2>All Projects</h2>
        <ul>
          {data.map((project) => (
            <li key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Showallproject