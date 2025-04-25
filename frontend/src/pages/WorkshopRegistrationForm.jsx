import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const WorkshopRegistrationForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [showPayment, setShowPayment] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const workshop = location.state?.workshop;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleShowPayment = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handleRegistration = async () => {
    try {
      await axios.post(`http://localhost:5000/api/workshops/${id}/register`, formData);
      setSuccess(true);
      // لا تفرغ النموذج مباشرة حتى تظهر المعلومات برسالة النجاح
      // setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setError(' أنت مسجل مسبقًا في هذه الورشة.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">نموذج التسجيل في الورشة</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-right">
          <p>✅ تم الدفع والتسجيل بنجاح!</p>
          <p>👤 الاسم: {formData.name}</p>
          <p>📧 البريد الإلكتروني: {formData.email}</p>
          <p>📞 الهاتف: {formData.phone}</p>
          <p>📍 الورشة: {workshop?.title}</p>
          <p>💰 المبلغ المدفوع: {workshop?.price} د.أ</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
          </svg>
          <span className="block sm:inline">{error}</span>
        </div>
      )}


      <form onSubmit={handleShowPayment} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="الاسم الكامل"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        {!showPayment && !success && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            تسجيل ودفع
          </button>
        )}
      </form>

      {showPayment && !success && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            اختر طريقة الدفع (المبلغ: {workshop?.price} د.أ):
          </h3>
          <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              createOrder={() => {
                return fetch("http://localhost:5000/api/payments/create-paypal-order", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ price: workshop?.price }),
                })
                  .then((res) => res.json())
                  .then((data) => data.orderID);
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  handleRegistration(); // تسجيل المستخدم بعد الدفع الناجح
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};

export default WorkshopRegistrationForm;


