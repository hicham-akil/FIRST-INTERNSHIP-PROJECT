import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Opinion = () => {
    const [opinionMessage, setOpinionMessage] = useState('');

    const sendData = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/opinion", {
                opinion_message: opinionMessage
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
            setOpinionMessage('');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mb-10 bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Share Your Opinion</h2>
                <input 
                    type="text" 
                    value={opinionMessage} 
                    onChange={(e) => setOpinionMessage(e.target.value)} 
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your opinion..."
                />
                <button 
                    onClick={sendData} 
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Opinion;
