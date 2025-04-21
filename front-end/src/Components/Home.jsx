import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import AdminStatistics from './AdminStatistics';
import projectPlanImage from '../images/projectplan.jpeg';

const HomePage = () => {
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const storedIsAdmin = JSON.parse(localStorage.getItem('is_admin'));
    setIsAdmin(storedIsAdmin);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {isAdmin === null ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : isAdmin ? (
        <AdminStatistics />
      ) : (
        <>
          {/* Hero Section */}
          <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 text-center px-4">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: -50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl font-bold mb-6">
                Transform Your Vision Into Reality
              </h1>
              <p className="mt-4 text-xl opacity-90">
                Get expert guidance from our top-tier consultants to bring your projects to life with confidence.
              </p>
              <motion.button 
                className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/CreateProject">Start Your Project Now</Link>
              </motion.button>
            </motion.div>
          </header>

          {/* Features Section */}
          <section className="max-w-7xl mx-auto py-20 px-6">
            <h2 className="text-4xl font-bold text-center mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-16">
              We deliver exceptional consulting services tailored to your unique needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Industry Experts",
                  description: "Access to vetted professionals with proven track records in diverse industries."
                },
                {
                  title: "Streamlined Process",
                  description: "Efficient workflow from submission to approval with clear milestones."
                },
                {
                  title: "Data Security",
                  description: "Enterprise-grade protection for your sensitive project information."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-blue-600 text-4xl mb-4">{index + 1}.</div>
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>


          {/* Methodology Section */}
          <section className="max-w-7xl mx-auto py-20 px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Proven Methodology</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A structured approach that delivers consistent, measurable results for every project.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <img src={projectPlanImage} alt="Project planning process" className="w--1/2 relative left-[30%] rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                {[
                  "Needs Assessment",
                  "Expert Matching",
                  "Solution Design",
                  "Implementation"
                ].map((step, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-lg">
                    <div className="text-blue-600 font-bold text-lg mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {!token && (
        <section className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-20 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join our platform today and take the first step toward project success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/Signup">Create Free Account</Link>
              </motion.button>
              <motion.button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/Login">Existing User? Login</Link>
              </motion.button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
