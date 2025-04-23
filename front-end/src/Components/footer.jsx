import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 relative top-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {/* About Us */}
          <div className="sm:w-1/3">
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p className="text-sm text-gray-400">
              We are a passionate team working to create innovative solutions for a better future.
            </p>
          </div>

          {/* Quick Links */}
          <div className="sm:w-1/3">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="sm:w-1/3">
            <h3 className="text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              {[...Array(3)].map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16l-4-4 4-4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4">
          <p className="text-center text-sm text-gray-500">© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
