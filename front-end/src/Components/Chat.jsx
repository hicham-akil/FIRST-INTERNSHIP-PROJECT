import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chat = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem("token");

  // Initialize Pusher and subscribe to the channel when the component mounts
  useEffect(() => {
    // Initialize Pusher with your credentials
    const pusher = new Pusher('d0fa2845657e4004ce00', {
      cluster: 'mt1',
      forceTLS: true
    });

    // Subscribe to the chat channel
    const channel = pusher.subscribe('chat-channel');

    // Listen for the event that a new message is received
    channel.bind('message.received', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup when the component unmounts
    return () => {
      pusher.unsubscribe('chat-channel');
    };
  }, []);

  // Handle message input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        // Send the message and project_id to the backend
        const response = await fetch('http://127.0.0.1:8000/api/sendmessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            message, 
            project_id: projectId, // Pass project_id here
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setMessage(''); // Clear message input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
