import React from "react";

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Total Songs</h3>
        <p className="text-3xl font-bold mt-2">1,234</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Total Artists</h3>
        <p className="text-3xl font-bold mt-2">156</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Active Users</h3>
        <p className="text-3xl font-bold mt-2">10,567</p>
      </div>
    </div>
  );
}

export default Dashboard;
