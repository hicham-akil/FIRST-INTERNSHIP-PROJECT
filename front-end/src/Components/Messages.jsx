import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// This component fetches and displays messages for a specific user and project using the `userId` and `projectId` from the URL.
// It periodically fetches new messages every 5 seconds and handles loading, error, and empty state appropriately.


const Messages = () => {
  const { userId,projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/messages/${userId}/${projectId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      
      // Handle empty messages correctly
      setMessages(data.messages || []); 
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]); // Ensure the state is always an array
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [userId, token]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Messages from User </h2>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages available from this user.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="p-2 bg-blue-100 rounded-lg shadow-sm">
              <span className="text-gray-800">{msg.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
