import React, { useState, useEffect } from 'react';
import { FiBell, FiHome, FiPackage, FiUsers, FiShoppingCart, FiTool, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import Overview from '../components/Overview';
import Products from '../components/Products';
import Customers from '../components/Customers';
import Orders from '../components/Orders';
import Workshops from '../components/Workshops';
import Messages from '../components/Messages';
import Notifications from '../components/Notifications';
import Settings from '../components/Settings';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // مراقبة عرض النافذة وتغيير حالة السايدبار بناءً على ذلك
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // التحقق من عرض النافذة عند تحميل المكون
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/api/users/adminlogout", { withCredentials: true });
      navigate("/login"); // يرجع لصفحة تسجيل الدخول
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // تحديد القائمة النشطة
  const isActive = (path) => {
    return location.pathname === path || 
          (path !== "/dashboard" && location.pathname.startsWith(path));
  };

  // إغلاق السايدبار عند النقر على قائمة في الشاشات الصغيرة
  const handleNavClick = () => {
    if (windowWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#FFF7F2]">
      {/* زر فتح/إغلاق السايدبار للشاشات الصغيرة */}
      <button 
        onClick={toggleSidebar}
        className="fixed z-50 top-4 right-4 md:hidden bg-[#2b2b2b] text-white p-2 rounded-md shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* تراكب شفاف خلف السايدبار في الشاشات الصغيرة */}
      {isSidebarOpen && windowWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } fixed h-screen bg-[#2b2b2b] text-white right-0 top-0 overflow-y-auto shadow-xl z-40 transition-transform duration-300 ease-in-out w-64 md:w-64 md:translate-x-0`}
      > 
        {/* رأس السايدبار */}
        <div className="py-6 px-5 border-b border-gray-600">
          <div className="flex items-center justify-center">
            <h3 className="text-xl font-bold text-center">
              <span className="text-[#AA1313]">أثوابنا</span>
              <span className="text-white mx-1">|</span>
              <span className="text-gray-300">لوحة التحكم</span>
            </h3>
          </div>
        </div>

        {/* قائمة السايدبار */}
        <div className="p-4">
          <ul className="flex flex-col space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard") && location.pathname === "/dashboard" 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiHome className="ml-2 text-lg" />
                <span>نظرة عامة</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/products" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/products") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiPackage className="ml-2 text-lg" />
                <span>المنتجات</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/customers" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/customers") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiUsers className="ml-2 text-lg" />
                <span>العملاء</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/orders" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/orders") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiShoppingCart className="ml-2 text-lg" />
                <span>الطلبات</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/workshops" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/workshops") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiTool className="ml-2 text-lg" />
                <span>ورش العمل</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/messages" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/messages") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiMessageSquare className="ml-2 text-lg" />
                <span>الرسائل</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/notifications" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/notifications") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiBell className="ml-2 text-lg" />
                <span>الإشعارات</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/dashboard/settings" 
                onClick={handleNavClick}
                className={`flex items-center text-sm px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive("/dashboard/settings") 
                  ? "bg-[#AA1313] text-white font-medium" 
                  : "text-gray-300 hover:bg-[#222222]"
                }`}
              >
                <FiSettings className="ml-2 text-lg" />
                <span>الإعدادات</span>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* زر تسجيل الخروج */}
        <div className="px-4 py-5 absolute bottom-0 w-full border-t border-gray-600">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-3 px-4 rounded-lg text-white bg-[#AA1313] hover:bg-[#8a0f0f] transition-all duration-300 cursor-pointer"
          >
            <FiLogOut className="ml-2" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`transition-all duration-300 w-full ${isSidebarOpen && windowWidth >= 768 ? 'mr-64' : 'mr-0'} p-5`}>
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;