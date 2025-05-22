import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Overview() {
  const [overviewData, setOverviewData] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // جلب البيانات الخاصة بالملخص
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

  // رسم الرسم البياني عند توفر البيانات
  useEffect(() => {
    if (chartRef.current && overviewData) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
          datasets: [{
            label: 'الإيرادات (دينار أردني)',
            data: overviewData.monthlyRevenue,
            backgroundColor: '#AA1313',
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
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
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFF7F2]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AA1313] mx-auto"></div>
          <p className="mt-4 text-lg text-[#2B2B2B] font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF7F2] min-h-screen">
      {/* المحتوى الرئيسي */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
          <h2 className="text-2xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">نظرة عامة - أثوابنا</h2>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-5 text-center border-t-4 border-[#AA1313] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-[#FFF7F2] rounded-full">
                <span className="text-xl">👥</span>
              </div>
            </div>
            <h4 className="text-sm text-gray-500 mb-1">المستخدمين</h4>
            <p className="text-2xl text-[#2B2B2B]">{overviewData.usersCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 text-center border-t-4 border-[#AA1313] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-[#FFF7F2] rounded-full">
                <span className="text-xl">📦</span>
              </div>
            </div>
            <h4 className="text-sm text-gray-500 mb-1">المنتجات</h4>
            <p className="text-2xl text-[#2B2B2B]">{overviewData.productsCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 text-center border-t-4 border-[#AA1313] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-[#FFF7F2] rounded-full">
                <span className="text-xl">🛒</span>
              </div>
            </div>
            <h4 className="text-sm text-gray-500 mb-1">الطلبات</h4>
            <p className="text-2xl text-[#2B2B2B]">{overviewData.ordersCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5 text-center border-t-4 border-[#AA1313] transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-2">
              <div className="p-3 bg-[#FFF7F2] rounded-full">
                <span className="text-xl">💰</span>
              </div>
            </div>
            <h4 className="text-sm text-gray-500 mb-1">الإيرادات الإجمالية</h4>
            <p className="text-2xl text-[#2B2B2B]">{overviewData.totalRevenue} د.أ</p>
          </div>
        </div>

        {/* قسم الرسم البياني والإحصائيات */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 h-full">
              <h6 className="text-gray-500 mb-4 font-medium text-lg">رسم بياني للإيرادات الشهرية</h6>
              <div className="relative h-80">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* إحصائيات العملاء */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg font-semibold text-[#2B2B2B]">العملاء</h5>
                <span className="text-[#AA1313]">{overviewData.totalCustomers}</span>
              </div>
              <div className="flex justify-between mb-1">
                <p className="text-gray-600">العملاء الحاليين</p>
                <p className="">{overviewData.totalCustomers}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-gradient-to-r from-[#AA1313] to-[#e85151] h-4 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            {/* إحصائيات الجنس */}
            <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-1 h-6 bg-[#AA1313] ml-3"></div>
                <h5 className="text-lg font-semibold text-[#2B2B2B]">نظرة عامة على الإحصائيات</h5>
              </div>
              
              <div className="mb-5">
                <div className="flex justify-between mb-1">
                  <p className="text-gray-600">👨 الرجال</p>
                  <p className="">{overviewData.genderStats.men} ({Math.round((overviewData.genderStats.men / overviewData.totalCustomers) * 100)}%)</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div className="bg-[#2B2B2B] h-3 rounded-full" style={{ width: `${(overviewData.genderStats.men / overviewData.totalCustomers) * 100}%` }}></div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between mb-1">
                  <p className="text-gray-600">👩 النساء</p>
                  <p className="">{overviewData.genderStats.women} ({Math.round((overviewData.genderStats.women / overviewData.totalCustomers) * 100)}%)</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div className="bg-[#AA1313] h-3 rounded-full" style={{ width: `${(overviewData.genderStats.women / overviewData.totalCustomers) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <p className="text-gray-600">🧒 الأطفال</p>
                  <p className="">{overviewData.genderStats.kids} ({Math.round((overviewData.genderStats.kids / overviewData.totalCustomers) * 100)}%)</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                  <div className="bg-amber-500 h-3 rounded-full" style={{ width: `${(overviewData.genderStats.kids / overviewData.totalCustomers) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* المنتجات الأكثر مبيعًا */}
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <div className="w-1 h-8 bg-[#AA1313] ml-3"></div>
            <h3 className="text-xl font-bold text-[#2B2B2B] pb-2 w-full border-b border-gray-200">أفضل المنتجات مبيعاً</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overviewData.topProducts && overviewData.topProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md p-5 border border-gray-100 transition-all duration-300 hover:shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold text-[#2B2B2B]">{product.name}</h5>
                  <span className="bg-[#FFF7F2] text-[#AA1313] text-xs font-bold px-3 py-1 rounded-full">الأكثر مبيعاً</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 mb-2">
                  <p>تم البيع:</p>
                  <p className="text-[#2B2B2B]">{product.sold} قطعة</p>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <p>السعر:</p>
                  <p className="font-bold text-[#AA1313]">{product.price} دينار</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;