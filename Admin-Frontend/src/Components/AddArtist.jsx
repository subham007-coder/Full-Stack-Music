import React from 'react'

function AddArtist() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Artist</h2>
      <div className="bg-gray-800 p-6 rounded-lg max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Artist Name</label>
            <input 
              type="text" 
              className="w-full bg-gray-700 rounded p-2"
              placeholder="Enter artist name"
            />
          </div>
          <div>
            <label className="block mb-2">Bio</label>
            <textarea 
              className="w-full bg-gray-700 rounded p-2 h-32"
              placeholder="Enter artist bio"
            ></textarea>
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
            <label className="block mb-2">Profile Image</label>
            <input 
              type="file" 
              className="w-full bg-gray-700 rounded p-2"
              accept="image/*"
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 px-6 py-2 rounded hover:bg-green-700"
          >
            Add Artist
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddArtist 