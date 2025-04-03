import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 transition-all duration-700 ease-in-out transform hover:scale-105">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-2 text-sm">
              We are a passionate team working to create innovative solutions for a better future.
            </p>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zM9.29 16.29l-3-3 4.5-4.5 1.5 1.5-3 3 1.5 1.5-4.5 4.5-1.5-1.5z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 12c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM12 15.8c-.3 0-.6-.1-.8-.3l-2.1-2.1c-.5-.5-.5-1.3 0-1.8l1.5-1.5c.5-.5 1.3-.5 1.8 0l1.1 1.1c.5.5.5 1.3 0 1.8l-1.5 1.5c-.2.2-.5.3-.8.3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 12c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM13 16l-4-4 4-4"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-center text-sm text-gray-400">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
