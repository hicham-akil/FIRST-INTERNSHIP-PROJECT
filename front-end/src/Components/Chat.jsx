import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import Messages from './Messages';
// This React component implements a chat feature where users can send and receive messages in real-time.
// It uses Pusher to listen for incoming messages on a specific channel and updates the message list dynamically.
// The component also allows users to send messages to a backend API with authentication using a token stored in localStorage.

const Chat = () => {
  const { projectId, userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const pusher = new Pusher('d0fa2845657e4004ce00', {
      cluster: 'mt1',
      forceTLS: true,
    });

    const channel = pusher.subscribe('chat-channel');

    channel.bind('message.received', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      pusher.unsubscribe('chat-channel');
    };
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/sendmessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            message,
            project_id: projectId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Chat with User </h2>

      <div className="flex flex-col bg-white p-4 rounded-lg overflow-y-auto h-96 mb-4 shadow-inner">
        <Messages userId={userId} projectId={projectId} />
      </div>

      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-start mb-2 p-2 bg-blue-100 rounded-md">
            <span className="text-gray-800">{msg}</span>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message"
          className="flex-1 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
