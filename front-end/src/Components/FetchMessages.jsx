import React, { useState, useEffect } from 'react';

const FetchMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch messages when the component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/getMessagesForReceiver', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();
        setMessages(data); 
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchMessages();
  }, [token]);

  // Render loading, error, or messages
  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="messages-container">
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages available.</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-item">
              {msg.message} {/* Adjust if message structure is different */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchMessages;
