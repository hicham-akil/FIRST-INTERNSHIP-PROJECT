import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Showallproject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const is_admin = JSON.parse(localStorage.getItem("is_admin"));
 const [status, setstatus] = useState({
  status:''
 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/project', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
const handleChangestatus=async(e,idproject)=>{
  const newStatus = e.target.value;
  setstatus(newStatus);
    try {
  const response = await axios.put(`http://127.0.0.1:8000/api/update/${idproject}/status`,{ status: newStatus }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }
)
console.log("Status updated:", response.data);
} catch (error) {
  console.error("Error updating status:", error.response?.data || error.message);
}
};
  if (loading) {
    return <div className="text-center text-lg text-blue-500">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Projects</h2>
      
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <div key={project.id} className="p-5 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              { is_admin ?(
                <>
                 <select value={status} onChange={(e)=>handleChangestatus(e,project.id)} className="border p-2 rounded">
                 <option value="pending">Pending</option>
                 <option value="approved">Approved</option>
                 <option value="rejected">Rejected</option>
               </select>
               
                    </>
              
              ):(
                <>
                 <p className={`mt-3 text-sm font-medium px-3 py-1 inline-block rounded-lg 
                  ${project.status === "completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                {project.status}
              </p>
                    </>

              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showallproject;
