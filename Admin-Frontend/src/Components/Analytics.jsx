import React from 'react'

function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 lg:p-6 rounded-lg">
          <h3 className="text-lg mb-2">Total Streams</h3>
          <p className="text-2xl lg:text-3xl font-bold">1.2M</p>
          <p className="text-green-500 text-sm">↑ 12% from last month</p>
        </div>
        <div className="bg-gray-800 p-4 lg:p-6 rounded-lg">
          <h3 className="text-lg mb-2">Active Users</h3>
          <p className="text-2xl lg:text-3xl font-bold">45.3K</p>
          <p className="text-green-500 text-sm">↑ 8% from last month</p>
        </div>
        <div className="bg-gray-800 p-4 lg:p-6 rounded-lg">
          <h3 className="text-lg mb-2">Revenue</h3>
          <p className="text-2xl lg:text-3xl font-bold">$52.5K</p>
          <p className="text-red-500 text-sm">↓ 3% from last month</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 lg:p-6 rounded-lg overflow-x-auto">
        <h3 className="text-xl mb-4">Popular Songs</h3>
        <div className="min-w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 px-4">Song</th>
                <th className="text-right py-2 px-4">Streams</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Song Title 1</td>
                <td className="text-right py-2 px-4">250K</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-4">Song Title 2</td>
                <td className="text-right py-2 px-4">180K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics 