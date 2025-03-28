import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState({ acceptedproject: [], rejectedproject: [] });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/notificationforstatus", {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      setNotifications(response.data);
    })
    .catch(error => {
      console.error("Error fetching notifications:", error);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Notifications</h2>

      <div className="mt-4">
        <h3 className="text-green-500">Accepted Projects</h3>
        {notifications.acceptedproject.length > 0 ? (
          <ul>
            {notifications.acceptedproject.map((project) => (
              <li key={project.id} className="bg-green-100 p-2 my-2 rounded">
                {project.title} - Accepted ✅
              </li>
            ))}
          </ul>
        ) : (
          <p>No accepted projects</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-red-500">Rejected Projects</h3>
        {notifications.rejectedproject.length > 0 ? (
          <ul>
            {notifications.rejectedproject.map((project) => (
              <li key={project.id} className="bg-red-100 p-2 my-2 rounded">
                {project.name} - Rejected ❌
              </li>
            ))}
          </ul>
        ) : (
          <p>No rejected projects</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
