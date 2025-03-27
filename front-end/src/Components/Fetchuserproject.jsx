import React, { useState, useEffect } from 'react';
import FetchMessages from './FetchMessages';

const Fetchuserproject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getUserProjects', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data.projects);  // Assuming the API returns a 'projects' field
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Projects</h2>
      <ul>
        {projects.map((project) => (
            <>
          <li key={project.id}>{project.title}</li>
          <FetchMessages/>  
            </>
        ))}
      </ul>
    </div>
  );
};

export default Fetchuserproject;
