import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Dashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // تدمير الرسم البياني السابق إذا كان موجودًا
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // إنشاء رسم بياني جديد
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Revenue',
            data: [100, 200, 300, 400, 500, 600, 700],
            backgroundColor: 'red'
          }]
        }
      });
    }

    // تنظيف الرسم البياني عند تفكيك المكون
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#FFF7F2] font-sans" dir="ltr">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#2b2b2b] text-white fixed p-5">
        <h3 className="mb-10 text-xl font-bold">📌Athwabna Shop</h3>
        <ul className="flex flex-col space-y-2">
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📊 Dashboard</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📦 Products</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">👥 Customers</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🛒 Orders</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚚 Shipments</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">💳 Transactions</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">⚙️ Settings</a></li>
          <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚪 Logout</a></li>
        </ul>
      </div>
      
      {/* Content */}
      <div className="ml-64 p-5 w-full">
        <h2 className="text-2xl font-bold">📈 Overview</h2>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow p-5">
              <h6 className="text-gray-500">Total Revenue</h6>
              <h4 className="text-xl font-bold">JD 980,273.00</h4>
              <canvas ref={chartRef} className="w-full h-64"></canvas>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow p-5 mb-4">
              <h5 className="text-lg font-semibold mb-3">Customers</h5>
              
              <div className="flex justify-between mb-1">
                <p>📌Current Customers</p>
                <p>85%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
                <div className="bg-green-500 h-5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <p>📌New Customers</p>
                <p>66%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
                <div className="bg-blue-400 h-5 rounded-full" style={{ width: '66%' }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <p>📌Target Customers</p>
                <p>90%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
                <div className="bg-yellow-500 h-5 rounded-full" style={{ width: '90%' }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <p>📌Retarget Customers</p>
                <p>30%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
                <div className="bg-red-500 h-5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-5">
              <h5 className="text-lg font-semibold mb-3">📊 Stats Overview</h5>
              
              <p>👨 Men: <b>88%</b></p>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
                <div className="bg-blue-600 h-5 rounded-full" style={{ width: '88%' }}></div>
              </div>
              
              <p>👩 Women: <b>63%</b></p>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
                <div className="bg-[#f24b9e] h-5 rounded-full" style={{ width: '63%' }}></div>
              </div>
              
              <p>🧒 Kids: <b>38%</b></p>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
                <div className="bg-red-500 h-5 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-4">🏆 Top Products</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h5 className="text-lg font-semibold">🧥 Traditional Thobe</h5>
              <p>Sold: <b>150</b></p>
              <p>Price: <b>JD 50.00</b></p>
            </div>
          </div>
          <div className="col-span-6">
            <div className="bg-white rounded-lg shadow p-5">
              <h5 className="text-lg font-semibold">🧣 Embroidered Scarf</h5>
              <p>Sold: <b>200</b></p>
              <p>Price: <b>JD 25.00</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;