import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

// This React component allows an admin to view daily statistics such as the number of accepted, rejected, and pending projects.
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
            <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-8">📊 Daily Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statistics.map((stat) => (
                    <div key={stat.id} className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <p className="text-gray-500 text-sm mb-2">📅 {new Date(stat.generated_at).toLocaleDateString()}</p>
                        <p className="text-xl font-semibold text-gray-800 mb-2">Total Projects: {stat.total_projects}</p>
                        <p className="text-green-600 font-medium">✅ Accepted: {stat.accepted_projects}</p>
                        <p className="text-red-600 font-medium">❌ Rejected: {stat.rejected_projects}</p>
                        <p className="text-yellow-500 font-medium">🕒 Pending: {stat.pending_projects}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminStatistics;
