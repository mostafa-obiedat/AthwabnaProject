import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Overview() {
  const [overviewData, setOverviewData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/overview', {
          withCredentials: true,
        });
        setOverviewData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverviewData();
  }, []);

  useEffect(() => {
    if (chartRef.current && overviewData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Revenue (JD)',
            data: overviewData.monthlyRevenue,
            backgroundColor: '#ff6b6b',
          }]
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [overviewData]);

  if (!overviewData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#FFF7F2] font-sans" dir="ltr">
  

      {/* Content */}
      <div className="ml-64 p-5 w-full">
        <h2 className="text-2xl font-bold">📈 Overview</h2>

        {/* New Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="text-sm text-gray-500 mb-2">👥 Users</h4>
            <p className="text-2xl font-bold">{overviewData.usersCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="text-sm text-gray-500 mb-2">📦 Products</h4>
            <p className="text-2xl font-bold">{overviewData.productsCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="text-sm text-gray-500 mb-2">🛒 Orders</h4>
            <p className="text-2xl font-bold">{overviewData.ordersCount}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h4 className="text-sm text-gray-500 mb-2">💰 Total Revenue</h4>
            <p className="text-2xl font-bold">JD {overviewData.totalRevenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow p-5">
              <h6 className="text-gray-500">Revenue Chart</h6>
              <canvas ref={chartRef} className="w-full h-64"></canvas>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow p-5 mb-4">
              <h5 className="text-lg font-semibold mb-3">Customers</h5>
              <div className="flex justify-between mb-1">
                <p>📌 Current Customers</p>
                <p>{overviewData.totalCustomers}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
                <div className="bg-green-500 h-5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-5">
  <h5 className="text-lg font-semibold mb-3">📊 Stats Overview</h5>
  
  <p>👨 Men: <b>{overviewData.genderStats.men}</b> customers ({Math.round((overviewData.genderStats.men / overviewData.totalCustomers) * 100)}%)</p>
  <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
    <div className="bg-blue-600 h-5 rounded-full" style={{ width: `${(overviewData.genderStats.men / overviewData.totalCustomers) * 100}%` }}></div>
  </div>

  <p>👩 Women: <b>{overviewData.genderStats.women}</b> customers ({Math.round((overviewData.genderStats.women / overviewData.totalCustomers) * 100)}%)</p>
  <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
    <div className="bg-[#f24b9e] h-5 rounded-full" style={{ width: `${(overviewData.genderStats.women / overviewData.totalCustomers) * 100}%` }}></div>
  </div>

  <p>🧒 Kids: <b>{overviewData.genderStats.kids}</b> customers ({Math.round((overviewData.genderStats.kids / overviewData.totalCustomers) * 100)}%)</p>
  <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
    <div className="bg-red-500 h-5 rounded-full" style={{ width: `${(overviewData.genderStats.kids / overviewData.totalCustomers) * 100}%` }}></div>
  </div>
</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-4">🏆 Top Products</h3>
<div className="grid grid-cols-12 gap-4">
  {overviewData.topProducts && overviewData.topProducts.map((product) => (
    <div key={product._id} className="col-span-6">
      <div className="bg-white rounded-lg shadow p-5">
        <h5 className="text-lg font-semibold">{product.name}</h5>
        <p>Sold: <b>{product.sold}</b></p>
        <p>Price: <b>JD {product.price}</b></p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default Overview;