import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 p-4 fixed top-0 w-full z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* <img src="/spotify-logo.png" alt="Logo" className="h-8 w-8 mr-2 ml-8 lg:ml-2" /> */}
          <span className="text-xl font-bold hidden sm:block">Music Admin</span>
        </div>

        {/* Desktop navigation menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/songs" className="hover:text-gray-300">Songs</Link>
          <Link to="/artists" className="hover:text-gray-300">Artists</Link>
          <Link to="/users" className="hover:text-gray-300">Users</Link>
          <Link to="/analytics" className="hover:text-gray-300">Analytics</Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-800 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <>
          <div className="md:hidden fixed top-[64px] left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
            <div className="flex flex-col space-y-2 px-4 py-4">
              <Link 
                to="/" 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/songs" 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Songs
              </Link>
              <Link 
                to="/artists" 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Artists
              </Link>
              <Link 
                to="/users" 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Users
              </Link>
              <Link 
                to="/analytics" 
                className="block w-full text-left px-3 py-2 rounded hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analytics
              </Link>
            </div>
          </div>

          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
            style={{ top: '64px' }}
          ></div>
        </>
      )}
    </nav>
  )
}

export default Navbar