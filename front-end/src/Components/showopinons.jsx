import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowOpinions = () => {
    const [opinions, setOpinions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/getopinons", {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setOpinions(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Opinions</h2>
            {opinions.length > 0 ? (
                opinions.map((opinion, index) => (
                    <div key={index} className="border-b py-4">
                        <h3 className="text-lg font-bold text-blue-600">{opinion.client?.company_name}</h3>
                        <p className="text-gray-700 mt-2">{opinion.opinion_message}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No opinions available.</p>
            )}
        </div>
    );
};

export default ShowOpinions;