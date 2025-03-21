// src/App.jsx
import React from 'react';

function Checkout() {
  return (
    <div className="bg-[#FFF7F2] min-h-screen">
      
      {/* Checkout Container */}
      <div className="container mx-auto p-4">
        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4">
            <img src="https://via.placeholder.com/50" alt="User" className="rounded-full mr-4" />
            <div>
              <p className="font-bold">مرحبًا بك، مصطفى عبدات</p>
              <p className="text-sm text-gray-600">أثوابنا / سلة التسوق / انهاء الطلب</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-bold">إجمالي الطلب</h5>
            <span className="text-2xl font-bold">50 د.أ</span>
          </div>
          <p className="text-red-500 text-sm mb-4">لديك كوبون تخفيض؟</p>
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg mr-2"
              placeholder="ادخل رمز الكوبون"
            />
            <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg">تطبيق</button>
          </div>
          <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center">
            <i className="bi bi-chevron-down ml-2"></i>
            تفاصيل الفاتورة
          </button>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h5 className="font-bold mb-4">1. عنوان التوصيل</h5>
          <form>
            <div className="mb-4">
              <label className="block mb-2">المدينة</label>
              <select className="w-full p-2 border rounded-lg">
                <option>اختر المدينة</option>
                <option>عمان</option>
                <option>الزرقاء</option>
                <option>إربد</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">العنوان</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="أدخل العنوان بالتفصيل"
              />
            </div>
            <div className="mb-4">
              <input type="checkbox" id="saveAddress" className="mr-2" />
              <label htmlFor="saveAddress">حفظ هذا العنوان للتوصيل في المستقبل</label>
            </div>
            <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">تأكيد العنوان</button>
          </form>
        </div>

        {/* Shipping Method Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h5 className="font-bold mb-4">2. شركة الشحن</h5>
          <div className="mb-4">
            <input type="radio" name="shipping" id="aramex" className="mr-2" defaultChecked />
            <label htmlFor="aramex">أرامكس (5 دينار - تسليم خلال يومين)</label>
          </div>
          <div className="mb-4">
            <input type="radio" name="shipping" id="local" className="mr-2" />
            <label htmlFor="local">شركة محلية (3 دينار - تسليم خلال 3-5 أيام)</label>
          </div>
          <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">تأكيد شركة الشحن</button>
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h5 className="font-bold mb-4">3. طريقة الدفع</h5>
          <div className="flex space-x-4 mb-4">
            <img src="https://banner2.cleanpng.com/20180803/hyo/e12d16e2f210bc9e3e744318ad7ceea5.webp" alt="MasterCard" className="h-8" />
            <img src="images/Visa.png" alt="Visa" className="h-8" />
            <img src="images/mada.png" alt="Mada" className="h-8" />
          </div>
          <form>
            <div className="mb-4">
              <label className="block mb-2">رقم البطاقة</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="أدخل رقم البطاقة"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2">تاريخ الانتهاء</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block mb-2">رمز التحقق (CVC)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="123"
                />
              </div>
            </div>
            <button className="bg-[#CEBEB3] text-white px-4 py-2 rounded-lg w-full">إكمال الدفع</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;