// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// function Dashboard() {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       // تدمير الرسم البياني السابق إذا كان موجودًا
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       // إنشاء رسم بياني جديد
//       const ctx = chartRef.current.getContext('2d');
//       chartInstance.current = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//           datasets: [{
//             label: 'Revenue',
//             data: [100, 200, 300, 400, 500, 600, 700],
//             backgroundColor: 'red'
//           }]
//         }
//       });
//     }

//     // تنظيف الرسم البياني عند تفكيك المكون
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className="flex h-screen bg-[#FFF7F2] font-sans" dir="ltr">
//       {/* Sidebar */}
//       <div className="w-64 h-screen bg-[#2b2b2b] text-white fixed p-5">
//         <h3 className="mb-10 text-xl font-bold">📌Athwabna Shop</h3>
//         <ul className="flex flex-col space-y-2">
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📊 Dashboard</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📦 Products</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">👥 Customers</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🛒 Orders</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚚 Shipments</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">💳 Transactions</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">⚙️ Settings</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚪 Logout</a></li>
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="ml-64 p-5 w-full">
//         <h2 className="text-2xl font-bold">📈 Overview</h2>
//         <div className="grid grid-cols-12 gap-4 mt-4">
//           <div className="col-span-8">
//             <div className="bg-white rounded-lg shadow p-5">
//               <h6 className="text-gray-500">Total Revenue</h6>
//               <h4 className="text-xl font-bold">JD 980,273.00</h4>
//               <canvas ref={chartRef} className="w-full h-64"></canvas>
//             </div>
//           </div>
//           <div className="col-span-4">
//             <div className="bg-white rounded-lg shadow p-5 mb-4">
//               <h5 className="text-lg font-semibold mb-3">Customers</h5>

//               <div className="flex justify-between mb-1">
//                 <p>📌Current Customers</p>
//                 <p>85%</p>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
//                 <div className="bg-green-500 h-5 rounded-full" style={{ width: '85%' }}></div>
//               </div>

//               <div className="flex justify-between mb-1">
//                 <p>📌New Customers</p>
//                 <p>66%</p>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
//                 <div className="bg-blue-400 h-5 rounded-full" style={{ width: '66%' }}></div>
//               </div>

//               <div className="flex justify-between mb-1">
//                 <p>📌Target Customers</p>
//                 <p>90%</p>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
//                 <div className="bg-yellow-500 h-5 rounded-full" style={{ width: '90%' }}></div>
//               </div>

//               <div className="flex justify-between mb-1">
//                 <p>📌Retarget Customers</p>
//                 <p>30%</p>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
//                 <div className="bg-red-500 h-5 rounded-full" style={{ width: '30%' }}></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-5">
//               <h5 className="text-lg font-semibold mb-3">📊 Stats Overview</h5>

//               <p>👨 Men: <b>88%</b></p>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//                 <div className="bg-blue-600 h-5 rounded-full" style={{ width: '88%' }}></div>
//               </div>

//               <p>👩 Women: <b>63%</b></p>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//                 <div className="bg-[#f24b9e] h-5 rounded-full" style={{ width: '63%' }}></div>
//               </div>

//               <p>🧒 Kids: <b>38%</b></p>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//                 <div className="bg-red-500 h-5 rounded-full" style={{ width: '38%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold mt-6 mb-4">🏆 Top Products</h3>
//         <div className="grid grid-cols-12 gap-4">
//           <div className="col-span-6">
//             <div className="bg-white rounded-lg shadow p-5">
//               <h5 className="text-lg font-semibold">🧥 Traditional Thobe</h5>
//               <p>Sold: <b>150</b></p>
//               <p>Price: <b>JD 50.00</b></p>
//             </div>
//           </div>
//           <div className="col-span-6">
//             <div className="bg-white rounded-lg shadow p-5">
//               <h5 className="text-lg font-semibold">🧣 Embroidered Scarf</h5>
//               <p>Sold: <b>200</b></p>
//               <p>Price: <b>JD 25.00</b></p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';

// function Dashboard() {
//   const [overviewData, setOverviewData] = useState(null);
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     const fetchOverviewData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/overview', {
//           withCredentials: true,
//         });
//         setOverviewData(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOverviewData();
//   }, []);

//   useEffect(() => {
//     if (chartRef.current && overviewData) {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }

//       const ctx = chartRef.current.getContext('2d');
//       chartInstance.current = new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//           datasets: [{
//             label: 'Revenue (JD)',
//             data: overviewData.monthlyRevenue,
//             backgroundColor: '#ff6b6b',
//           }]
//         }
//       });
//     }

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [overviewData]);

//   if (!overviewData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex h-screen bg-[#FFF7F2] font-sans" dir="ltr">
//       {/* Sidebar */}
//       <div className="w-64 h-screen bg-[#2b2b2b] text-white fixed p-5">
//         <h3 className="mb-10 text-xl font-bold">📌Athwabna Shop</h3>
//         <ul className="flex flex-col space-y-2">
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📊 Dashboard</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📦 Products</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">👥 Customers</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🛒 Orders</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚚 Shipments</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">💳 Transactions</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">⚙️ Settings</a></li>
//           <li><a href="#" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚪 Logout</a></li>
//         </ul>
//       </div>

//       {/* Content */}
//       <div className="ml-64 p-5 w-full">
//         <h2 className="text-2xl font-bold">📈 Overview</h2>

//         {/* New Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
//           <div className="bg-white shadow rounded-lg p-5 text-center">
//             <h4 className="text-sm text-gray-500 mb-2">👥 Users</h4>
//             <p className="text-2xl font-bold">{overviewData.usersCount}</p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-5 text-center">
//             <h4 className="text-sm text-gray-500 mb-2">📦 Products</h4>
//             <p className="text-2xl font-bold">{overviewData.productsCount}</p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-5 text-center">
//             <h4 className="text-sm text-gray-500 mb-2">🛒 Orders</h4>
//             <p className="text-2xl font-bold">{overviewData.ordersCount}</p>
//           </div>
//           <div className="bg-white shadow rounded-lg p-5 text-center">
//             <h4 className="text-sm text-gray-500 mb-2">💰 Total Revenue</h4>
//             <p className="text-2xl font-bold">JD {overviewData.totalRevenue}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-4 mt-4">
//           <div className="col-span-8">
//             <div className="bg-white rounded-lg shadow p-5">
//               <h6 className="text-gray-500">Revenue Chart</h6>
//               <canvas ref={chartRef} className="w-full h-64"></canvas>
//             </div>
//           </div>
//           <div className="col-span-4">
//             <div className="bg-white rounded-lg shadow p-5 mb-4">
//               <h5 className="text-lg font-semibold mb-3">Customers</h5>
//               <div className="flex justify-between mb-1">
//                 <p>📌 Current Customers</p>
//                 <p>{overviewData.totalCustomers}</p>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-5 mb-4">
//                 <div className="bg-green-500 h-5 rounded-full" style={{ width: '100%' }}></div>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-5">
//   <h5 className="text-lg font-semibold mb-3">📊 Stats Overview</h5>

//   <p>👨 Men: <b>{overviewData.genderStats.men}</b> customers ({Math.round((overviewData.genderStats.men / overviewData.totalCustomers) * 100)}%)</p>
//   <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//     <div className="bg-blue-600 h-5 rounded-full" style={{ width: `${(overviewData.genderStats.men / overviewData.totalCustomers) * 100}%` }}></div>
//   </div>

//   <p>👩 Women: <b>{overviewData.genderStats.women}</b> customers ({Math.round((overviewData.genderStats.women / overviewData.totalCustomers) * 100)}%)</p>
//   <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//     <div className="bg-[#f24b9e] h-5 rounded-full" style={{ width: `${(overviewData.genderStats.women / overviewData.totalCustomers) * 100}%` }}></div>
//   </div>

//   <p>🧒 Kids: <b>{overviewData.genderStats.kids}</b> customers ({Math.round((overviewData.genderStats.kids / overviewData.totalCustomers) * 100)}%)</p>
//   <div className="w-full bg-gray-200 rounded-full h-5 mb-3">
//     <div className="bg-red-500 h-5 rounded-full" style={{ width: `${(overviewData.genderStats.kids / overviewData.totalCustomers) * 100}%` }}></div>
//   </div>
// </div>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold mt-6 mb-4">🏆 Top Products</h3>
// <div className="grid grid-cols-12 gap-4">
//   {overviewData.topProducts && overviewData.topProducts.map((product) => (
//     <div key={product._id} className="col-span-6">
//       <div className="bg-white rounded-lg shadow p-5">
//         <h5 className="text-lg font-semibold">{product.name}</h5>
//         <p>Sold: <b>{product.sold}</b></p>
//         <p>Price: <b>JD {product.price}</b></p>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;


// src/pages/Dashboard.js
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Overview from '../components/Overview';
import Products from '../components/Products';
import Customers from '../components/Customers';
import Orders from '../components/Orders';
import Workshops from '../components/Workshops';
// import Transactions from '../components/Transactions';
import Messages from '../components/Messages';
import Settings from '../components/Settings';

function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/logout", { withCredentials: true });
      navigate("/login"); // يرجع لصفحة تسجيل الدخول
    } catch (err) {
      console.error("Logout error", err);
    }
  };
  return (
    <div className="flex h-screen bg-[#FFF7F2] font-sans">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#2b2b2b] text-white fixed left-0 top-0 p-5">

        <h3 className="mb-10 text-xl font-bold">📌Athwabna Shop</h3>

        <ul className="flex flex-col space-y-2">
          <li>
            <Link to="/dashboard" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">📦 Products</Link>
          </li>
          <li>
            <Link to="/dashboard/customers" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">👥 Customers</Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🛒 Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/workshops" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🛒 Workshops</Link>
          </li>
          {/* <li>
            <Link to="/admin/dashboard/shipments" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">🚚 Shipments</Link>
          </li>
          <li>
            <Link to="/admin/dashboard/transactions" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">💳 Transactions</Link>
          </li> */}
          <li>
            <Link to="/dashboard/messages" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">
              💬 Messages
            </Link>
          </li>
          <li>
            <Link to="/dashboard/settings" className="text-white flex items-center mb-2 hover:bg-gray-700 p-2 rounded">⚙️ Settings</Link>
          </li>
          <button
            onClick={handleLogout}
            className="flex items-center mb-2 text-red-600 hover:bg-red-100 px-4 py-2 rounded"
          >
            🚪 Logout
          </button>
        </ul>
      </div>

      {/* Content */}
      <div className="ml-64 p-5 w-full">
        {/* <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1> */}
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="workshops" element={<Workshops />} />
          {/* <Route path="shipments" element={<Shipments />} />
          <Route path="transactions" element={<Transactions />} /> */}
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
