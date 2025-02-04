import React from 'react'

function AddSong() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Song</h2>
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Song Title</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 rounded p-2"
              placeholder="Enter song title"
            />
          </div>
          <div>
            <label className="block mb-2">Artist</label>
            <select className="w-full bg-gray-700 rounded p-2">
              <option>Select Artist</option>
              {/* Add artist options here */}
            </select>
          </div>
          <div>
            <label className="block mb-2">Genre</label>
            <select className="w-full bg-gray-700 rounded p-2">
              <option>Select Genre</option>
              <option>Pop</option>
              <option>Rock</option>
              <option>Hip Hop</option>
              <option>Jazz</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Duration (in seconds)</label>
            <input 
              type="number" 
              className="w-full bg-gray-700 rounded p-2"
              placeholder="Enter duration"
            />
          </div>
          <div>
            <label className="block mb-2">Upload Song File</label>
            <input 
              type="file" 
              className="w-full bg-gray-700 rounded p-2"
              accept="audio/*"
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Add Song
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddSong 