import React, { useState } from "react";
import axios from "axios";
import { Send, Phone, Mail, MapPin, CheckCircle, AlertCircle, Star } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    messageType: "inquiry", // القيمة الافتراضية
    rating: null,
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من صحة التقييم إذا كانت رسالة فيدباك
    if (formData.messageType === "feedback" && !formData.rating) {
      setStatus({
        type: "error",
        message: "الرجاء اختيار تقييم لرسالة الفيدباك",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/contacts/create", formData);
      setStatus({ type: "success", message: "تم إرسال رسالتك بنجاح!" });
      setFormData({ 
        name: "", 
        email: "", 
        messageType: "inquiry",
        rating: null,
        message: "" 
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً.",
      });
    }
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen py-16">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="relative text-center">
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-[#f8e5d7]"></div>
          <h1 className="relative inline-block px-8 bg-[#FFF7F2] text-4xl font-bold text-[#AA1313]">اتصل بنا</h1>
        </div>
        <p className="text-center mt-6 text-gray-600 max-w-2xl mx-auto">
          نحن هنا للإجابة على استفساراتك واستقبال ملاحظاتك
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-[#AA1313]"></div>
            <div className="p-8">
              {status && (
                <div
                  className={`p-4 mb-6 rounded-lg flex items-center justify-center ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5 ml-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 ml-2" />
                  )}
                  {status.message}
                </div>
              )}
              
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#AA1313]">أرسل لنا رسالة</h2>
              <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-lg font-medium mb-2 text-right" htmlFor="name">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f8e5d7] focus:border-[#AA1313] transition-all"
                    required
                    placeholder="أدخل اسمك الكامل"
                    dir="rtl"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-lg font-medium mb-2 text-right" htmlFor="email">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f8e5d7] focus:border-[#AA1313] transition-all"
                    required
                    placeholder="أدخل بريدك الإلكتروني"
                    dir="rtl"
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-lg font-medium mb-2 text-right">
                    نوع الرسالة
                  </label>
                  <select
                    name="messageType"
                    value={formData.messageType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f8e5d7] focus:border-[#AA1313] transition-all"
                    dir="rtl"
                  >
                    <option value="inquiry">استفسار</option>
                    <option value="feedback">فيدباك</option>
                  </select>
                </div>

                {formData.messageType === "feedback" && (
                  <div className="mb-5">
                    <label className="block text-lg font-medium mb-2 text-right">
                      التقييم
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-2xl focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-7 cursor-pointer ${
                              star <= (hoverRating || formData.rating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-lg font-medium mb-2 text-right" htmlFor="message">
                    رسالتك
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#f8e5d7] focus:border-[#AA1313] transition-all"
                    rows="6"
                    required
                    placeholder="اكتب رسالتك هنا..."
                    dir="rtl"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#AA1313] text-white py-3 px-6 rounded-lg hover:bg-red-800 duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="h-2 bg-[#AA1313]"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-[#AA1313]">معلومات التواصل</h3>
                <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-[#FFF7F2] p-4 rounded-lg">
                    <div className="p-2 bg-[#f8e5d7] rounded-full">
                      <Phone className="h-5 w-5 text-[#AA1313]" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">هاتف</p>
                      <p className="font-medium">+962 779 538 580</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#FFF7F2] p-4 rounded-lg">
                    <div className="p-2 bg-[#f8e5d7] rounded-full">
                      <Mail className="h-5 w-5 text-[#AA1313]" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                      <p className="font-medium">info@athwabna.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-[#FFF7F2] p-4 rounded-lg">
                    <div className="p-2 bg-[#f8e5d7] rounded-full">
                      <MapPin className="h-5 w-5 text-[#AA1313]" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">العنوان</p>
                      <p className="font-medium">الزرقاء، الأردن</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-2 bg-[#AA1313]"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-center text-[#AA1313]">ساعات العمل</h3>
                <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
                
                <div className="space-y-2 text-right">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الأحد - الخميس</span>
                    <span>9:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الجمعة</span>
                    <span>9:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">السبت</span>
                    <span>مغلق</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Bottom Element */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-[#AA1313]"></div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-16 h-1 bg-[#f8e5d7]"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;