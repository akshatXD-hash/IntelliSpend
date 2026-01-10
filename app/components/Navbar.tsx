'use client';

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const firstLetter = session?.user?.name?.charAt(0).toUpperCase();

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-10 py-6 flex items-center justify-between">
        
        {/* Brand Logo - Made Bigger */}
        <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-200 group-hover:rotate-3 transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            IntelliSpend
          </span>
        </Link>

        {/* Center Navigation - Spaced Out */}
        <div className="hidden lg:flex items-center gap-12 text-base font-bold text-gray-500">
          <Link href="/" className="hover:text-blue-600 transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Auth Actions - High End Buttons */}
        <div className="flex items-center gap-6">
          {!session ? (
            <>
              <button 
                onClick={() => signIn()}
                className="text-base font-bold text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log In
              </button>
              <Link 
                href="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
              >
                Get Started Free
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => signOut()}
                className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
              >
                Log Out
              </button>
              {/* Premium Profile Avatar */}
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative w-12 h-12 rounded-full bg-blue-600 border-2 border-white text-white flex items-center justify-center text-lg font-black shadow-lg">
                  {firstLetter}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;