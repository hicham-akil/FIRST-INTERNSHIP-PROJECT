import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

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
      // Send the message to the backend
      await fetch('http://your-laravel-app.local/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      setMessage('');
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
