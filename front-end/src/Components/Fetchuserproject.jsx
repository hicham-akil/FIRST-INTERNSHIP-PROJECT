import React, { useState, useEffect } from 'react';
import FetchMessages from './FetchMessages';
import ChatClient from './chatClient';
import { Link } from 'react-router-dom';
import ProjectFiles from './ProjectFiles';
// This React component fetches and displays a list of projects for the logged-in user.
// It uses the 'useState' hook to manage the list of projects, loading state, error messages, and a reload trigger.
// It fetches the projects from a backend API, handles errors if the request fails, and triggers a reload when a project is deleted.
// The component also provides a 'delete project' functionality, which sends a DELETE request to the backend API.

const Fetchuserproject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getUserProjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data.projects);
        setreload(false) 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [reload]);

  const handledeleteproject= async(projectId)=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteproject/${projectId}` ,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setreload(true)

      if (!response.ok) {
        throw new Error('Failed to  delete');
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="text-center text-gray-600">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Projects</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <h3 className="text-xl font-bold">{project.status}</h3>
            <h1>{project.priority}</h1>
            <h1>{project.estimated_completion}</h1>
            <button className='bg-red-300 border-1 rounded-4xl' onClick={()=>handledeleteproject(project.id)}>delete project</button>
       
            {project.status==='approved'&& project.estimated_completion && project.priority?(
              <>
              </>
            ):(
              <>
              <p>not specified yet</p>
              </>
            )}
      

            <div className="mt-4">
              <Link 
                to={`/client/chat/${project.id}`} 
                className="text-blue-500 underline"
              >
                Go Contact Admin
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Fetchuserproject;
