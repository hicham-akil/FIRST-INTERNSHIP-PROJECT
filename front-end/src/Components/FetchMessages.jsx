import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
// This React component fetches and displays messages for a receiver. 
// It retrieves the messages from an API and listens for new messages in real-time using Pusher.
// The component also handles loading, error states, and refreshes the messages when the window gains focus.

const FetchMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const pusher = new Pusher('d0fa2845657e4004ce00', {
      cluster: 'mt1',
      forceTLS: true
    });

    const channel = pusher.subscribe('chat-channel');
    
    channel.bind('message.received', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [token]);

  useEffect(() => {
    window.addEventListener("focus", fetchMessages);
    return () => window.removeEventListener("focus", fetchMessages);
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages available.</p>
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

export default FetchMessages;
