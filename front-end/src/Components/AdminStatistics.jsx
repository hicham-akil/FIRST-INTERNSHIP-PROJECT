import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// This React component allows an admin to add additional fields (priority and estimated completion date) to a project.  
// It retrieves the project ID from the URL parameters and submits data to an API using Axios with authentication.  
// The form includes a dropdown for priority selection and a date input for the estimated completion date.

const AdminStatistics = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/daily-statistics");
            setStatistics(response.data);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">📊 Daily Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statistics.map((stat) => (
                    <div key={stat.id} className="bg-white p-4 shadow-md rounded-lg">
                        <p className="text-gray-500 text-sm">📅 {new Date(stat.generated_at).toLocaleDateString()}</p>
                        <p className="text-xl font-semibold">Total Projects: {stat.total_projects}</p>
                        <p className="text-green-600">✅ Accepted: {stat.accepted_projects}</p>
                        <p className="text-red-600">❌ Rejected: {stat.rejected_projects}</p>
                        <p className="text-yellow-500">🕒 Pending: {stat.pending_projects}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStatistics;
