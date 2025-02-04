import React from 'react'

function Users() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl mb-2">Users List</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <input 
              type="search" 
              placeholder="Search users..." 
              className="bg-gray-700 px-4 py-2 rounded"
            />
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Search</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left">Username</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="px-6 py-4">user123</td>
                <td className="px-6 py-4">user@example.com</td>
                <td className="px-6 py-4">
                  <span className="bg-green-500 px-2 py-1 rounded text-sm">Active</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-yellow-500 hover:text-yellow-400 mr-3">Suspend</button>
                  <button className="text-red-500 hover:text-red-400">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;