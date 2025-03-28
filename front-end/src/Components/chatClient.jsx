import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchMessages from './FetchMessages';

const ChatClient = () => {
    const { projectId } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem("token");

    const handleSendMessage = async () => {
        if (!token) {
            setError('You need to be logged in to send a message');
            return;
        }

        if (message.trim() !== '') {
            setLoading(true);
            setError('');

            try {
                const response = await fetch('http://127.0.0.1:8000/api/sendMessageToAdmin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        message,
                        project_id: projectId,
                    }),
                });

                if (response.ok) {
                    setMessage('');
                    setError('');
                } else {
                    throw new Error("Failed to send message");
                }
            } catch (error) {
                console.error("Error sending message:", error);
                setError('There was an error sending the message. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Message cannot be empty');
        }
    };

    return (
        <div className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-lg max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Client Chat</h2>

            <FetchMessages />

            <div className="flex flex-col space-y-4 mt-6">
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default ChatClient;
