import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShowUseropinion = () => {
    const [opinions, setOpinions] = useState([]);
    const [re, setre] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/useropinion", {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setOpinions(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [re]);

    const deleteopinion = async () => {
        try {
            const response = await axios.delete("http://127.0.0.1:8000/api/delete", {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            console.log(response);
            setre(!re);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Opinions</h2>
            {opinions.length > 0 ? (
                opinions.map((opinion, index) => (
                    <div key={index} className="border-b py-4 mb-4">
                        <h3 className="text-lg font-bold text-blue-600">{opinion.client?.company_name}</h3>
                        <p className="text-gray-700 mt-2">{opinion.opinion_message}</p>
                        <div className="mt-4">
                            <button 
                                onClick={deleteopinion}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">You haven't made any opinions yet.</p>
            )}
        </div>
    );
};

export default ShowUseropinion;
