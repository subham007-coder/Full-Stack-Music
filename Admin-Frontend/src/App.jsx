import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HamburgerMenu from './Components/HamburgerMenu'
import Dashboard from './Components/Dashboard'
import Songs from './Components/Songs'
import Artists from './Components/Artists'
import Users from './Components/Users'
import Analytics from './Components/Analytics'
import AddSong from './Components/AddSong'
import AddArtist from './Components/AddArtist'
import ManagePlaylists from './Components/ManagePlaylists'
import UserReports from './Components/UserReports'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className='min-h-screen bg-black text-white relative'>
        {/* Hamburger Menu */}
        <HamburgerMenu 
          isOpen={sidebarOpen} 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        {/* Navbar */}
        <Navbar />

        <div className="flex pt-14">
          {/* Sidebar */}
          <div 
            className={`
              fixed top-0 left-0 min-h-screen w-64 
              transform transition-transform duration-300 ease-in-out
              lg:relative lg:translate-x-0 
              bg-gray-900 z-50 pt-10
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="p-4 space-y-4 overflow-y-auto h-full">
              <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
              </div>
              <div className="space-y-2">
                <Link 
                  to="/add-song" 
                  className="block w-full text-left p-2 hover:bg-gray-800 rounded"
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  Add New Song
                </Link>
                <Link 
                  to="/add-artist" 
                  className="block w-full text-left p-2 hover:bg-gray-800 rounded"
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  Add New Artist
                </Link>
                <Link 
                  to="/manage-playlists" 
                  className="block w-full text-left p-2 hover:bg-gray-800 rounded"
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  Manage Playlists
                </Link>
                <Link 
                  to="/user-reports" 
                  className="block w-full text-left p-2 hover:bg-gray-800 rounded"
                  onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                >
                  User Reports
                </Link>
              </div>
            </div>
          </div>
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}
          
          {/* Main Content */}
          <div className={`
            w-full transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'lg:ml-64' : ''}
            p-4 sm:p-6 lg:p-8
          `}>
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/songs" element={<Songs />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/users" element={<Users />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/add-song" element={<AddSong />} />
                <Route path="/add-artist" element={<AddArtist />} />
                <Route path="/manage-playlists" element={<ManagePlaylists />} />
                <Route path="/user-reports" element={<UserReports />} />
                <Route path="*" element={<div>Page not found</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App