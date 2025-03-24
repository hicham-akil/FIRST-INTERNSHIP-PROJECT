import React from 'react'

import { useState } from 'react';
import axios from 'axios';
const CreateProject = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
      
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const token = localStorage.getItem("token");
    
      if (!token) {
        return <div>Error: You are not logged in. Please log in first.</div>;
      }

 const handleSubmit=async(e)=>{
    e.preventDefault()
            try{

              const response=await axios.post('http://127.0.0.1:8000/api/create',formData,{
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization":`Bearer ${token}`
                    },
                });
                setLoading(false);
                setFormData({ title: "",description: "" });
            } catch(error){
                setError(error.message)
       console.log(error);
       
    } 
    }
    

if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
       
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            required
          ></textarea>
    
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
  )
}

export default CreateProject