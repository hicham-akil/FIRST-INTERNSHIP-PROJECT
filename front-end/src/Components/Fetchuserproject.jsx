import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectFiles from './ProjectFiles';

const Fetchuserproject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);

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
        setReload(false);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [reload]);

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deleteproject/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      setReload(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500 font-semibold">Loading your projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Projects</h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500">You haven't submitted any projects yet.</p>
      ) : (
        <ul className="space-y-6">
          {projects.map((project) => (
            <li
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{project.title}</h3>
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                  project.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {project.status}
                </span>
              </div>

              <div className="text-gray-700 space-y-2">
                <p><strong>Priority:</strong> {project.priority || <em className="text-gray-400">Not specified</em>}</p>
                <p><strong>Estimated Completion:</strong> {project.estimated_completion || <em className="text-gray-400">Not specified</em>}</p>
              </div>

              {!(project.status === 'approved' && project.estimated_completion && project.priority) && (
                <p className="text-sm text-red-500 mt-2">Project details are not fully specified yet.</p>
              )}

              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <Link
                  to={`/client/chat/${project.id}`}
                  className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-center transition"
                >
                  Contact Admin
                </Link>

                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                >
                  Delete Project
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Fetchuserproject;
  