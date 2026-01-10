import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-100">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              IntelliSpend
            </span>
          </div>

          {/* Simple Navigation */}
          <nav className="flex items-center gap-10">
            <a href="#" className="text-gray-500 font-semibold hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-500 font-semibold hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-gray-500 font-semibold hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          {/* Action Button */}
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 IntelliSpend. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-blue-600 transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;