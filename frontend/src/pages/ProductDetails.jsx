import React, { useState } from "react";
import damerImage from '../assets/damer.jpg';

const ProductDetails = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
      {/* Navbar */}
      <nav className="bg-[#2B2B2B] py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <ul className="flex space-x-4">
            <li><a href="men.html" className="text-white hover:text-gray-300">رجال</a></li>
            <li><a href="woman.html" className="text-white hover:text-gray-300">نساء</a></li>
            <li><a href="kids.html" className="text-white hover:text-gray-300">أطفال</a></li>
          </ul>
          <a href="index.html" className="mx-auto">
            <img src="images/logo.png" alt="Logo" className="w-48" />
          </a>
          <div className="flex space-x-5 text-white">
            <a href="?lang=en"><i className="bi bi-globe"></i></a>
            <a href="#"><i className="bi bi-person"></i></a>
            <a href="#"><i className="bi bi-search"></i></a>
            <a href="./cart.html"><i className="bi bi-cart"></i></a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img src={damerImage} alt="Product Image" className="w-80 h-96 border-2 border-gray-700 rounded-lg" />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">الدامر التراثي التقليدي المصنوع من الجوخ</h3>
            <p className="text-gray-500">السعر السابق: <del>60 دينار</del></p>
            <p className="text-red-500 text-xl">السعر: 45 دينار</p>
            <form className="mt-4">
              <div className="mb-4">
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option value="small" hidden>اختر المقاس</option>
                  <option value="small">صغير</option>
                  <option value="medium">متوسط</option>
                  <option value="large">كبير</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
                  <i className="bi bi-cart mr-2"></i> أضف الى السلة
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded">
                  <i className="bi bi-heart"></i>
                </button>
              </div>
            </form>
            <div className="mt-6">
              <h6 className="mb-2">تاريخ التوصيل المتوقع: 9 يناير - 13 يناير</h6>
              <h6>ألوان أخرى متوفرة</h6>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-8 bg-white p-6 border border-black rounded-lg shadow-md w-4/5 mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">التفاصيل</h3>
            <button onClick={toggleDetails} className="text-2xl">
              {isDetailsVisible ? "↑" : "↓"}
            </button>
          </div>
          {isDetailsVisible && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">الدامر الأردني التقليدي، المصنوع من الجوخ</h4>
              <ul className="list-disc pr-6">
                <li><strong>المواصفات</strong></li>
                <li>لون أسود</li>
                <li>مطرز باللون الذهبي</li>
              </ul>
              <h4 className="text-lg font-semibold mt-4">عن المنتج</h4>
              <p className="mt-2">
                الدامر: لباس تقليدي أردني يُلبس بالخفيف وهو عبارة عن معطف يصل إلى ما دون الخصر، يُلبس مع لباس الرأس
                "القفطانة" تكون مصنوعة من الجورجيت الناعم و"العقال" المصنوع من شعر الماعز. بينما في الشتاء يُلبس "الكبر"
                مع "الدامر" المصنوع من قماش الجوخ.
              </p>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h4 className="text-xl font-bold mb-4">قد يعجبك أيضاً</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img src="images/damer.jpg" alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h6 className="font-semibold">الدامر الأردني التقليدي</h6>
                <p className="text-gray-500">63 دينار</p>
                <div className="flex justify-between mt-4">
                  <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
                    <i className="bi bi-cart mr-2"></i> أضف الى السلة
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2B2B2B] text-white mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="images/footer_logo.png" alt="Logo" className="w-12 h-12 mx-auto mb-4" />
              <p className="text-center">
                نقدم لكم أزياء شعبية تعزز ارتباطنا بثقافتنا الشعبية
                وتحافظ على الفلكلور والعروض الثقافية في الأردن.
              </p>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4 text-center">روابط تهمك</h6>
              <ul className="text-center">
                <li><a href="about.html">من نحن</a></li>
                <li><a href="contact.html">اتصل بنا</a></li>
                <li><a href="#">الخصوصية</a></li>
                <li><a href="#">الشروط والأحكام</a></li>
                <li><a href="#">سياسة الاستبدال والاسترجاع</a></li>
              </ul>
            </div>
            <div>
              <h6 className="text-lg font-bold mb-4 text-center">خدمة العملاء</h6>
              <div className="text-center">
                <a href="#" className="block"><i className="bi bi-phone"></i> جوال</a>
                <a href="#" className="block"><i className="bi bi-whatsapp"></i> واتساب</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#"><i className="bi bi-facebook text-2xl"></i></a>
              <a href="#"><i className="bi bi-instagram text-2xl"></i></a>
              <a href="#"><i className="bi bi-snapchat text-2xl"></i></a>
              <a href="#"><i className="bi bi-tiktok text-2xl"></i></a>
              <a href="#"><i className="bi bi-twitter-x text-2xl"></i></a>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <img src="https://lh3.googleusercontent.com/KE8W2U_931n24DtWrvySEdKwnx6dLeaoaXBV6nXNHKbJd32mnIx-eaxXPdsRscJMT8vxyLy59XKVkr_UXlswXFJ2KjomzkqV-ud3=s0" alt="Google Pay" className="w-10" />
              <img src="https://images.seeklogo.com/logo-png/30/2/apple-pay-payment-mark-logo-png_seeklogo-306167.png" alt="Apple Pay" className="w-10" />
              <img src="images/Visa.png" alt="Visa" className="w-10" />
              <img src="images/mada.png" alt="Mada" className="w-10" />
            </div>
            <p className="text-sm">© جميع الحقوق محفوظة | 2025 أثوابنا</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetails;