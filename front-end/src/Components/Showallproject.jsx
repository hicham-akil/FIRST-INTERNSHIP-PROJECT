import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chat from './Chat';
import FetchMessages from './FetchMessages';
import Fetchuserproject from './Fetchuserproject';
import { Link } from 'react-router-dom';
import ProjectFiles from './ProjectFiles';

// This component fetches and displays all projects, showing different content depending on the user's role (admin or not).
// Admins can update project statuses, view project details, and access additional options like adding files and contacting users.

const Showallproject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const is_admin = JSON.parse(localStorage.getItem("is_admin"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          setError("You must be logged in to view projects.");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/project', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError("Unauthorized. Please log in.");
        } else {
          setError(error.message || "Something went wrong");
        }
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
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">All Projects</h2>

      {is_admin ? (
        // Admin view
        <>
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No projects available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((project) => (
                <div key={project.id} className="p-5 bg-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-transform transform hover:scale-105">
                  <p className="text-gray-500">Project ID: {project.id}</p>
                  <h3 className="text-xl font-semibold text-indigo-700 mt-2">{project.title}</h3>
                  <p className="text-gray-600 mt-2">Client ID: {project.user_id}</p>
                  <p className="text-gray-600 mt-2">{project.description}</p>

                  <div className="mt-4">
                    <label htmlFor="status" className="block text-gray-600">Status</label>
                    <select
                      id="status"
                      value={project.status} 
                      onChange={(e) => handleChangestatus(e, project.id)} 
                      className="w-full mt-1 border p-2 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option value="pending">Pending</option>
                      <option value="approved" className="text-green-600">Approved</option>
                      <option value="rejected" className="text-red-600">Rejected</option>
                    </select>
                  </div>

                  {project.priority && project.estimated_completion ? (
                    <div className="mt-4">
                      <h4 className="text-yellow-700">Priority: {project.priority}</h4>
                      <h4 className="text-gray-800">Estimated Completion: {project.estimated_completion}</h4>
                      <ProjectFiles projectId={project.id}/>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-2">Priority and completion not specified yet</p>
                  )}

                  {project.status === 'approved' && (
                    <div className="mt-4">
                      <Link to={`/chat/${project.id}/${project.user_id}`} className="text-blue-500 hover:underline">Go to Chat</Link>
                      <br />
                      <Link to={`/addFild/${project.id}`} className="text-blue-500 hover:underline">Go to Add Field</Link>
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
