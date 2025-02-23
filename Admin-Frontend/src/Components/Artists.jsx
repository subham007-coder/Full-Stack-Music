import React from 'react'

function Artists() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Artists</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">Artists List</h3>
          <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">Export List</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Songs</th>
                <th className="px-6 py-3 text-left">Genre</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample data - replace with actual data */}
              <tr className="border-b border-gray-700">
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">15</td>
                <td className="px-6 py-4">Pop</td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-400 mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Artists 