import React from 'react'

function UserReports() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Reports</h2>
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl">Recent Reports</h3>
          <div className="flex gap-2">
            <select className="bg-gray-700 px-4 py-2 rounded">
              <option>All Types</option>
              <option>Content</option>
              <option>Technical</option>
              <option>Other</option>
            </select>
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left">Report ID</th>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="px-6 py-4">#12345</td>
                <td className="px-6 py-4">user123</td>
                <td className="px-6 py-4">Content</td>
                <td className="px-6 py-4">
                  <span className="bg-yellow-500 px-2 py-1 rounded text-sm">Pending</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-400 mr-3">View</button>
                  <button className="text-green-500 hover:text-green-400">Resolve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserReports 