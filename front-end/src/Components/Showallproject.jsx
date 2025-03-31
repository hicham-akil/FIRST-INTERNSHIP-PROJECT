import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './Chat';
import FetchMessages from './FetchMessages';
import Fetchuserproject from './Fetchuserproject';
import { Link } from 'react-router-dom';
import ProjectFiles from './ProjectFiles';

const Showallproject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const is_admin = JSON.parse(localStorage.getItem("is_admin"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/project', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  const handleChangestatus = async (e, idproject) => {
    const newStatus = e.target.value;
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update/${idproject}/status`, { status: newStatus }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("Status updated:", response.data);

      // Update the status in the data state after it has been updated in the database
      setData(prevData =>
        prevData.map(project =>
          project.id === idproject ? { ...project, status: newStatus } : project
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-blue-500">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Projects</h2>

      {is_admin ? (
        // Admin view
        <>
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((project) => (
                <div key={project.id} className="p-5 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition">
                  <p>
                    {project.id}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mt-2">Client ID: {project.user_id}</p>
                  <p className="text-gray-600 mt-2">{project.description}</p>

                  <select
                    value={project.status} 
                    onChange={(e) => handleChangestatus(e, project.id)} 
                    className="border p-2 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  {project.priority&& project.estimated_completion?(
              <>
                <h1>{project.priority}</h1>
                <h1>{project.estimated_completion}</h1>
                <ProjectFiles projectId={project.id}/>
              </>
            ):(
              <>
              <p>not specified yet</p>
              </>
            )}
                  {/* Show chat and fetch messages for the admin */}
                  {project.status === 'approved' && (
  <div className="mt-4">

    <Link to={`/chat/${project.id}/${project.user_id}`} className="text-blue-500 underline">Go Contact</Link>
    <Link to={`/addFild/${project.id}`} className="text-blue-500 underline">Go add field</Link>
  </div>
)}

                  
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
    
        <Fetchuserproject />
      )}
    </div>
  );
};

export default Showallproject;
