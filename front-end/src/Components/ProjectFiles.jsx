import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectFiles = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError('You are not logged in.');
      setLoading(false);
      return;
    }

    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/files', {
          params: { project_id: projectId }, // Sending project_id as query parameter
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        setFiles(response.data.file); // Update the state with the files
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch files.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchFiles();
  }, [projectId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Project Files</h2>

      {files.length === 0 ? (
        <div>No files found for this project.</div>
      ) : (
        <ul className="space-y-3">
          {files.map((file) => (
            <li key={file.id} className="flex justify-between items-center">
              <span className="text-gray-700">{file.file_name}</span>
              <a
                href={`http://127.0.0.1:8000/storage/${file.file_path}`}
                className="text-blue-500 hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectFiles;
