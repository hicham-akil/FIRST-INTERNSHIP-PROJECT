import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-20 text-center">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our Consulting Platform
        </motion.h1>
        <motion.p
          className="mt-4 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Submit your project details and get expert consulting today.
        </motion.p>
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center">Why Choose Us?</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Expert Consultants", "Fast Project Approval", "Secure & Reliable"].map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <h3 className="text-2xl font-semibold">{feature}</h3>
              <p className="mt-3 text-gray-700">Lorem ipsum dolor sit amet consectetur.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-200 py-20 text-center">
        <h2 className="text-4xl font-bold">About Our Platform</h2>
        <p className="max-w-3xl mx-auto mt-4 text-lg">We connect clients with top consultants to ensure their projects succeed.</p>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center">What Our Clients Say</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <p className="text-gray-700 italic">"This platform changed my business! Highly recommended."</p>
              <h4 className="mt-4 font-semibold">John Doe</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold">Start Your Consultation Today</h2>
        <p className="mt-4 text-lg">Sign up and submit your project in minutes.</p>
        <motion.button
          className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
        >
          Sign Up Now
        </motion.button>
      </section>
    </div>
  );
};

export default HomePage;
