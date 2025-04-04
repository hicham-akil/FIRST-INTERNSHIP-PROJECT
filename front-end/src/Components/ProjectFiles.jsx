import React, { useState, useEffect } from "react";
import axios from "axios";
// This component fetches and displays files associated with a specific project using the projectId prop.
// It checks if the user is logged in by validating the token and handles loading, errors, and file previews accordingly.


const ProjectFiles = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("🚨 No token found! User is not logged in.");
      setError("You are not logged in.");
      setLoading(false);
      return;
    }

    const fetchFiles = async () => {
      try {
        console.log("📡 Fetching files for project ID:", projectId);

        const response = await axios.get("http://127.0.0.1:8000/api/files", {
          params: { project_id: projectId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ API Response Data:", response.data);

        if (!response.data.files || response.data.files.length === 0) {
          console.error("❌ API did not return any files:", response.data);
          setError("No files found for this project.");
          setLoading(false);
          return;
        }

        setFiles(response.data.files);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to fetch files. Error:", error);
        setError("Failed to fetch files.");
        setLoading(false);
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
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Project Files
      </h2>

      {files.length === 0 ? (
        <div>No files found for this project.</div>
      ) : (
        <ul className="space-y-3">
          {files.map((file, index) => (
            <li key={file.id || index} className="flex justify-between items-center">
              <span className="text-gray-700">{file.file_name}</span>

              <div className="flex flex-col items-start">
            
                {file.file_path && file.file_path.endsWith(".pdf") ? (
                  <iframe
                    src={file.file_path}
                    width="600"
                    height="400"
                    title="File Preview"
                    className="border-2 border-gray-300 rounded"
                  ></iframe>
                ) : (
                  <span className="text-gray-500">No preview available for this file type.</span>
                )}

                <a
                  href={file.file_path} 
                  className="text-blue-500 hover:text-blue-600 mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectFiles;
