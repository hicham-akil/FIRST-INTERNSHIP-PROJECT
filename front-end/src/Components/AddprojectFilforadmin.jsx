import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// This React component fetches and displays daily statistics for admin users.  
// It retrieves data from an API endpoint using Axios inside a useEffect hook.  
// The statistics are displayed in a responsive grid layout with project counts categorized by status.

const AddProjectFieldsForAdmin = () => {
    const { projectId } = useParams();
    const [fieldsData, setFieldsData] = useState({ project_id: projectId, priority: "", estimated_completion: "" });
    const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

    
    const handleFieldsSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/addfields", fieldsData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
        setFieldsData({ project_id: projectId, priority: "", estimated_completion: "" });
      } catch (error) {
        setMessage(error.response?.data.message || "Error adding fields");
      }
    };
  
    return (
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-bold mt-6 mb-4">Add Fields to Project (Admin)</h2>
        <form onSubmit={handleFieldsSubmit} className="space-y-2">
          <select
            value={fieldsData.priority}
            onChange={(e) => setFieldsData({ ...fieldsData, priority: e.target.value })}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            placeholder="Estimated Completion"
            value={fieldsData.estimated_completion}
            onChange={(e) => setFieldsData({ ...fieldsData, estimated_completion: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Add Fields</button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    );
};

export default AddProjectFieldsForAdmin;
