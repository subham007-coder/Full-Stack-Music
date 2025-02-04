import React from 'react'

function ManagePlaylists() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Playlists</h2>
      <div className="bg-gray-800 p-4 lg:p-6 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <h3 className="text-xl">Featured Playlists</h3>
          <button className="w-full sm:w-auto bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            Create New Playlist
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <img 
              src="/placeholder.jpg" 
              alt="Playlist" 
              className="w-full aspect-square object-cover rounded mb-2"
            />
            <h4 className="font-semibold mb-1">Top Hits 2024</h4>
            <p className="text-sm text-gray-400 mb-2">50 songs</p>
            <div className="flex gap-2">
              <button className="text-blue-500 hover:text-blue-400">Edit</button>
              <button className="text-red-500 hover:text-red-400">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagePlaylists 